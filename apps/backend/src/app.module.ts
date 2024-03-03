import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ExaminationModule } from './examination/examination.module';
import { QuestionModule } from './question/question.module';
import { StorageModule } from './storage/storage.module';
import { SubmissionModule } from './submission/submission.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env',
        '.development.env',
        '.local.env',
        '.stag.env',
        '.prod.env',
      ],
    }),
    StorageModule,
    QuestionModule,
    ExaminationModule,
    SubmissionModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
