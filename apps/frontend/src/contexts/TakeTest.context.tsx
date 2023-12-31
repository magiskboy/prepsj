import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { Examination, Question, getFullExamination, submitTest } from '@/apis/get-interviews';

type TakeTestProps = {
  submit: () => Promise<void>;
  onChange: (questionId: number, answer: string[]) => void;
  reset: () => void;
  result: UserResult[];
  data?: Examination & {
    questions: Question[];
  };
  submited: boolean;
}

const initialValue: TakeTestProps = {
  submit: () => {throw new Error('Not implemented')},
  onChange: () => {},
  reset: () => {},
  result: [],
  submited: false,
}

export const TakeTestContext = createContext(initialValue);

type UserResult = Question & {
  index: number;
  answer: string[];
  correct?: string[];
};

type TakeTestProviderProps = {
    examinationId: number;
}

export function TakeTestProvider({ examinationId, children }: PropsWithChildren<TakeTestProviderProps>) {
  const { data } = useQuery({
    queryKey: [examinationId],
    queryFn: () => getFullExamination(examinationId),
    staleTime: 5 * 60 * 1000,
  });
  const [submited, setSubmitted] = useState(false);
  const [result, setResult] = useState<UserResult[]>([]);

  useEffect(() => {
    if (!data) return;
    setResult(data.questions.map(
      (item, index) => ({
        ...item,
        index: index+1,
        answer: [] ,
      })
    ));
  }, [data]);

  const submit = async (): Promise<void> => {
    const res = await submitTest(examinationId, result);
    setSubmitted(true);
    const correct = res.reduce<Record<number, string[]>>(
      (prev, curr) => ({...prev, [curr.id]: curr.correct}), {});
    setResult(result.map(item => ({ ...item, correct: correct[item.id]})));
  }

  const onChange = (questionId: number, answer: string[]) => {
    if (submited) return;
    setResult(result.map(item => {
      if (item.id === questionId) {
        return {
          ...item,
          answer,
        }
      }
      return { ...item };
    }));
  }

  const reset = () => {
    if (!data) return;
    setSubmitted(false);
    setResult(data.questions.map(
      (item, index) => ({
        ...item,
        index: index+1,
        answer: [] ,
      })
    ));
  }

  return (
    <TakeTestContext.Provider value={{
      submit,
      reset,
      onChange,
      result,
      data,
      submited,
    }}>
      {children}
    </TakeTestContext.Provider>
  )
}