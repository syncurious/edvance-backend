import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AppConfigModule } from './config/config.module.js';
import { DatabaseModule } from './infrastructure/database/database.module.js';
import { SchoolsModule } from './modules/schools/schools.module.js';

@Module({
  imports: [AppConfigModule, DatabaseModule, SchoolsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
