import { Test, TestingModule } from '@nestjs/testing';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'node:path';
import request from 'supertest';
import { AppController } from '../src/app.controller.js';
import { AppService } from '../src/app.service.js';

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    app.setGlobalPrefix('api/v1');
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
    await app.init();
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

  afterEach(async () => {
    await app.close();
  });
});
