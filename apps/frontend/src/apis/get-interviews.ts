import axios from 'axios';

import { GET_INTERVIEWS_BASE_URL } from '@/environments';

const client = axios.create({
  baseURL: GET_INTERVIEWS_BASE_URL,
});

export const getPublicExaminations = (): Promise<Examination[]> => 
  client.get("/examinations/public")
    .then(res => res.data.data || []);

export const getFullExamination = (id: number): Promise<Examination & { questions: Question[] }> =>
  client.get(`/examinations/${id}`)
    .then(res => res.data.data);

export const submitTest = (examId: number, result: {id: number, answer: string[]}[]): Promise<{id: number, answer: string[], correct: string[]}[]> =>
  new Promise(r => setTimeout(r, 0)).then(() => client.post('/submissions', {
    examinationId: examId,
    result: result.map(item => ({ questionId: item.id, answer: item.answer }))
  }).then(res => {
    const { result } = res.data.data;
    return result;
  }));

export type Examination = {
    id: number;
    title: string;
    slug: string;
    description?: string;
    createdAt: string;
    createdBy: {
        username: string;
    };
    updatedAt: string;
    numberOfStar: number;
    numberOfTake: number;
}

export type Question = {
    id: number;
    content: string;
    type: 'MCQ' | 'Text';
    options: {
        content: string;
        code: string;
    }[];
}

export type QuestionWithAnswer = {
    id: number;
    content: string;
    type: 'MCQ' | 'Text';
    options: {
        content: string;
        checked: boolean;
        explain?: string;
    }[];
}