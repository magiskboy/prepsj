import { Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from './submission.dto';
import { ExaminationService } from 'src/examination/examination.service';

@Injectable()
export class SubmissionService {
    constructor(
        private readonly examinationService: ExaminationService,
    ) {}

    async createSubmission(data: CreateSubmissionDto): Promise<{ result: { id: number, answer: string[], correct: string[] }[] }> {
        const examination = await this.examinationService.getExaminationDetail(data.examinationId);
        const questionMap = new Map(examination.questions.map(question => [question.id, question]));
        const result = data.result.map(item => {
            const question = questionMap.get(item.questionId);
            if (question.type === 'MCQ') {
                return {
                    id: item.questionId,
                    answer: item.optionCodes || [],
                    correct: question.options.filter(option => option.checked).map(option => option.code),
                }
            }
            return {
                id: item.questionId,
                answer: [item.text],
                correct: ['need to define by human']
            }
        });
        return { result }
    }
}
