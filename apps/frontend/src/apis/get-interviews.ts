import axios from 'axios';

import { GET_INTERVIEWS_BASE_URL } from '@/environments';

const client = axios.create({
  baseURL: GET_INTERVIEWS_BASE_URL,
});

export const getPublicExaminations = (): Promise<Examination[]> => 
  client.get("/examinations/public")
    .then(res => res.data.data || []);

export const getExamination = (id: number): Promise<Examination> =>
  client.get(`/examinations/${id}`)
    .then(res => ({
      id: res.data.data.id,
      ...res.data.data.attributes,
    }));

export const getFullExamination = (id: number): Promise<Examination & { questions: Question[] }> =>
  client.get(`/examinations/${id}/request`)
    .then(res => res.data.data);

export const submitTest = (examId: number, result: {id: number, answer: string[]}[]): Promise<{id: number, answer: string[], correct: string[]}[]> =>
  new Promise(r => setTimeout(r, 3000)).then(() => client.post('/examinations/marking-test', {
    id: examId,
    questions: result.map(item => ({ id: item.id, answer: item.answer }))
  }).then(res => {
    const { data } = res.data;
    return data.result;
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