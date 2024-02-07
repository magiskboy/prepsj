import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { ExaminationModule } from 'src/examination/examination.module';

@Module({
  imports: [ExaminationModule],
  providers: [SubmissionService],
  controllers: [SubmissionController]
})
export class SubmissionModule {}
