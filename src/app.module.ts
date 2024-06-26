import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GlobalConfig} from '././config';
import {AuthModule} from './auth/auth.module';
import {OrganizationModule} from './organization/organization.module';
import { MailModule } from './mail/mail.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { OrgTaskTypeModule } from './org-task-type/org-task-type.module';
import { OrgTaskCategoryModule } from './org-task-category/org-task-category.module';
import { OrgTeamModule } from './org-team/org-team.module';
import { TaskModule } from './task/task.module';
import { TaskCommentModule } from './task-comment/task-comment.module';
import { VisitModule } from './visit/visit.module';
import { AttendanceModule } from './attendance/attendance.module';
import { MyPanelModule } from './my-panel/my-panel.module';
import { ReportModule } from './report/report.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [GlobalConfig.db, AuthModule, OrganizationModule, MailModule, WorkspaceModule, OrgTaskTypeModule, OrgTaskCategoryModule, OrgTeamModule, TaskModule, TaskCommentModule, VisitModule,  MyPanelModule, ReportModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
