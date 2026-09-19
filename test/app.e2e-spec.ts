import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'node:path';
import request from 'supertest';
import { AppController } from '../src/app.controller.js';
import { AppService } from '../src/app.service.js';
import { AllExceptionsFilter } from '../src/common/filters/all-exceptions.filter.js';
import { AuthController } from '../src/modules/auth/auth.controller.js';
import { AuthGuard } from '../src/modules/auth/auth.guard.js';
import { AuthService } from '../src/modules/auth/auth.service.js';

const authService = {
  extractBearerToken: jest.fn(),
  authenticateAccessToken: jest.fn(),
};

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController, AuthController],
      providers: [
        AppService,
        AuthGuard,
        { provide: AuthService, useValue: authService },
      ],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    app.setGlobalPrefix('api/v1');
    app.useGlobalFilters(new AllExceptionsFilter());
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

  afterEach(async () => {
    await app.close();
  });
});
