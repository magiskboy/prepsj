import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './submission.dto';

@Controller('/api/submissions')
export class SubmissionController {
    constructor(
        private readonly submissionService: SubmissionService,
    ) {}

    @Post()
    @HttpCode(201)
    async createSubmission(@Body() body: CreateSubmissionDto) {
        const data = await this.submissionService.createSubmission(body);
        return {
            message: 'Submission created successfully',
            data,
        }
    }
}
