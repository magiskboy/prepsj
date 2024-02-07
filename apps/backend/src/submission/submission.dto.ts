export interface CreateSubmissionDto {
    examinationId: number;
    result: {
        questionId: number;
        optionCodes?: string[];
        text?: string;
    }[];
}