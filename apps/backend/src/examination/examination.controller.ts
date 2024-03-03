import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { QuestionService } from 'src/question/question.service';
import { CreateExaminationDto } from './examination.dto';
import { ExaminationService } from './examination.service';

@Controller('/api/examinations')
export class ExaminationController {
  constructor(
    private readonly examinationService: ExaminationService,
    private readonly questionService: QuestionService,
  ) {}

  @Get('/public')
  async getPublicExaminations() {
    const result = await this.examinationService.getPublicExaminations();
    return {
      message: 'Get public examinations successfully',
      data: result,
    };
  }

  @Get('/:id')
  async getExaminationDetail(@Param('id') id: number) {
    const result = await this.examinationService.getExaminationDetail(
      Number(id),
    );
    const contentWithoutAnswer = {
      ...result,
      questions: result.questions.map((question) => ({
        ...question,
        options: question.options.map((option) => ({
          content: option.content,
          code: option.code,
        })),
      })),
    };

    if (!result) {
      throw new NotFoundException('Examination not found');
    }
    return {
      message: 'Get examination detail successfully',
      data: contentWithoutAnswer,
    };
  }

  @Post()
  @HttpCode(201)
  async createExamination(@Body() data: CreateExaminationDto) {
    const { title, description } = data;
    const examination = await this.examinationService.createExamination({
      title,
      description,
    });

    if (data.questions) {
      const questionWithExamination = data.questions.map((question) => ({
        ...question,
        examinations: [examination],
      }));
      await this.questionService.createQuestions(questionWithExamination);
    }

    return {
      message: 'Examination created successfully',
      data: examination,
    };
  }
}
