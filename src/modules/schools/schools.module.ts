import { Module } from '@nestjs/common';
import { SuperAdminGuard } from '../../common/guards/super-admin.guard.js';
import { AuthModule } from '../auth/auth.module.js';
import { SchoolsController } from './schools.controller.js';
import { SchoolsRepository } from './schools.repository.js';
import { SchoolsService } from './schools.service.js';

@Module({
  imports: [AuthModule],
  controllers: [SchoolsController],
  providers: [SchoolsService, SchoolsRepository, SuperAdminGuard],
})
export class SchoolsModule {}
