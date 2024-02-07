export interface CreateExaminationDto {
    title: string;
    slug: string;
    description?: string;
    questions?: {
        content: string;
        type: 'Text' | 'MCQ';
        options?: {
            content: string;
            code: string;
            checked: boolean;
            explain?: string;
        }[];
    }[]
}