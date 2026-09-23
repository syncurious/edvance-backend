import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'node:path';
import request from 'supertest';
import { AppController } from '../src/app.controller.js';
import { AppService } from '../src/app.service.js';
import { AllExceptionsFilter } from '../src/common/filters/all-exceptions.filter.js';
import { SuperAdminGuard } from '../src/common/guards/super-admin.guard.js';
import { createAppValidationPipe } from '../src/common/pipes/app-validation.pipe.js';
import { AppConfigService } from '../src/config/config.service.js';
import { AuthController } from '../src/modules/auth/auth.controller.js';
import { AuthGuard } from '../src/modules/auth/auth.guard.js';
import { AuthService } from '../src/modules/auth/auth.service.js';
import { AuthorizationService } from '../src/modules/auth/authorization.service.js';
import { DevTokenEnvironmentGuard } from '../src/modules/auth/dev-token-environment.guard.js';
import { DevTokenRateLimitGuard } from '../src/modules/auth/dev-token-rate-limit.guard.js';

const authService = {
  extractBearerToken: jest.fn(),
  authenticateAccessToken: jest.fn(),
  createDevelopmentToken: jest.fn(),
};

const appConfig = { isDevelopmentOrTest: true };
const authorizationService = {
  getSession: jest.fn(),
  isPlatformSuperAdmin: jest.fn(),
  assignSystemRole: jest.fn(),
};

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController, AuthController],
      providers: [
        AppService,
        AuthGuard,
        DevTokenEnvironmentGuard,
        DevTokenRateLimitGuard,
        SuperAdminGuard,
        { provide: AppConfigService, useValue: appConfig },
        { provide: AuthService, useValue: authService },
        { provide: AuthorizationService, useValue: authorizationService },
      ],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    app.setGlobalPrefix('api/v1');
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(createAppValidationPipe());
    app.useStaticAssets(join(process.cwd(), 'src', 'public'), {
      prefix: '/api/docs/assets',
    });
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder().setTitle('Evdance API').setVersion('1.0').build(),
    );
    SwaggerModule.setup('api/docs', app, document, {
      customSiteTitle: 'Evdance API Reference',
      customCssUrl: '/api/docs/assets/swagger/swagger-theme.css',
    });
    authService.extractBearerToken.mockImplementation((authorization) => {
      const [scheme, token] = authorization?.split(' ') ?? [];
      if (scheme !== 'Bearer' || !token) {
        throw new UnauthorizedException('Authentication is required.');
      }
      return token;
    });
    authService.authenticateAccessToken.mockResolvedValue({
      id: 'user-id',
      email: 'user@evdance.test',
    });
    authService.createDevelopmentToken.mockResolvedValue({
      access_token: 'access-token',
      refresh_token: 'refresh-token',
      expires_in: 3600,
      token_type: 'bearer',
    });
    authorizationService.getSession.mockResolvedValue({
      user: { id: 'user-id', email: 'user@evdance.test' },
      platform: { roles: [], permissions: [] },
      memberships: [],
    });
    authorizationService.isPlatformSuperAdmin.mockResolvedValue(false);
    appConfig.isDevelopmentOrTest = true;
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200)
      .expect({ data: { status: 'ok' } });
  });

  it('/docs (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/docs')
      .expect(200)
      .expect('Content-Type', /html/);

    expect(response.text).toContain('Evdance API Reference');
    expect(response.text).toContain('swagger-theme.css');
  });

  it('/docs theme asset (GET)', () =>
    request(app.getHttpServer())
      .get('/api/docs/assets/swagger/swagger-theme.css')
      .expect(200)
      .expect('Content-Type', /css/));

  it('/auth/me (GET)', () =>
    request(app.getHttpServer())
      .get('/api/v1/auth/me')
      .set('Authorization', 'Bearer session-token')
      .expect(200)
      .expect({ data: { id: 'user-id', email: 'user@evdance.test' } }));

  it('/auth/me rejects a missing token', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/auth/me')
      .expect(401);

    expect(response.body.error).toMatchObject({
      code: 'UNAUTHORIZED',
      message: 'Authentication is required.',
      details: null,
    });
    expect(response.body.error.requestId).toEqual(expect.any(String));
  });

  it('/auth/session (GET)', () =>
    request(app.getHttpServer())
      .get('/api/v1/auth/session')
      .set('Authorization', 'Bearer session-token')
      .expect(200)
      .expect({
        data: {
          user: { id: 'user-id', email: 'user@evdance.test' },
          platform: { roles: [], permissions: [] },
          memberships: [],
        },
      }));

  it('/auth/dev/token (POST)', () =>
    request(app.getHttpServer())
      .post('/api/v1/auth/dev/token')
      .send({ email: 'test@example.com', password: 'test-password' })
      .expect(200)
      .expect({
        access_token: 'access-token',
        refresh_token: 'refresh-token',
        expires_in: 3600,
        token_type: 'bearer',
      }));

  it('/auth/dev/token rejects invalid credentials', async () => {
    authService.createDevelopmentToken.mockRejectedValue(
      new UnauthorizedException('Invalid email or password.'),
    );

    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/dev/token')
      .send({ email: 'test@example.com', password: 'invalid-password' })
      .expect(401);

    expect(response.body.error).toMatchObject({
      code: 'UNAUTHORIZED',
      message: 'Invalid email or password.',
      details: null,
    });
  });

  it('/auth/dev/token validates the request body', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/dev/token')
      .send({ email: 'not-an-email' })
      .expect(400);

    expect(response.body.error).toMatchObject({
      code: 'VALIDATION_ERROR',
      message: 'Request validation failed.',
    });
    expect(authService.createDevelopmentToken).not.toHaveBeenCalled();
  });

  it('/auth/dev/token applies a per-IP rate limit', async () => {
    const payload = { email: 'test@example.com', password: 'test-password' };

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await request(app.getHttpServer())
        .post('/api/v1/auth/dev/token')
        .send(payload)
        .expect(200);
    }

    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/dev/token')
      .send(payload)
      .expect(429);

    expect(response.body.error).toMatchObject({
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many development token requests. Try again later.',
    });
  });

  it('/auth/dev/token is blocked outside development and test environments', async () => {
    appConfig.isDevelopmentOrTest = false;

    await request(app.getHttpServer())
      .post('/api/v1/auth/dev/token')
      .send({ email: 'test@example.com', password: 'test-password' })
      .expect(404);

    expect(authService.createDevelopmentToken).not.toHaveBeenCalled();
  });

  afterEach(async () => {
    await app.close();
  });
});
