import { Module } from '@nestjs/common';
import { ExaminationService } from './examination.service';
import { StorageModule } from 'src/storage/storage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Examination } from './examination.entity';
import { ExaminationController } from './examination.controller';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [
    StorageModule,
    TypeOrmModule.forFeature([Examination]),
    QuestionModule,
  ],
  providers: [ExaminationService],
  controllers: [ExaminationController],
  exports: [ExaminationService],
})
export class ExaminationModule {}
