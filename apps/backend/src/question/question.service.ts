import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>
    ) {}

    async createQuestions(data: Omit<Question, 'id'>[]) {
        return this.questionRepository.save(data);
    }
}
