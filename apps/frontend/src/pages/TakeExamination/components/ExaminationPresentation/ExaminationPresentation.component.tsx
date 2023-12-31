import { useContext } from 'react';
import { Checkbox, TextInput } from 'flowbite-react';
import { IoMdCheckmark } from "react-icons/io";

import { TakeTestContext } from '@/contexts/TakeTest.context';
import type { Question as QuestionType } from '@/apis/get-interviews';

export default function ExaminationPresentation() {
  const { result, onChange } = useContext(TakeTestContext);
  const content = result.map(item => 
    item.type === 'MCQ' 
      ? <MCQQuestion key={item.id} index={item.index} data={item} onChange={onChange} />
      : <TextQuestion key={item.id} index={item.index} data={item} />
  );

  return (
    <div className="px-5 py-5">
      {content}
    </div>
  )
}

type QuestionProps = {
    index: number;
    data: QuestionType & {
      answer: string[];
      correct?: string[];
    };
    onChange?: (questionId: number, answer: string[]) => void;
}

function MCQQuestion({ index, data, onChange }: QuestionProps) {
  const { submited } = useContext(TakeTestContext);
  const { content, options, answer, id, correct } = data;

  return (
    <div className="mb-10 scroll-mt-20" id={`q-${index}`}>
      <div className="flex gap-2">
        <span className="font-bold">{index}.</span> <span>{content}</span>
      </div>
      <div className="pl-3">
        {options.map(item => 
          <div key={item.code} className={`my-3 flex items-center select-none w-fit gap-x-1 ${submited ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => {
            const code = item.code;
            if (answer.includes(code)) {
              onChange?.(id, answer.filter(v => v !== code).sort());
            }
            else {
              onChange?.(id, [...answer, code].sort());
            }
          }}>
            <Checkbox className="mr-3 focus:border-none focus:outline-none" readOnly checked={answer.includes(item.code)} />
            <span>{item.code}. {item.content}</span>
            {correct?.includes(item.code) && <IoMdCheckmark className="text-green-500 text-xl font-extrabold" />}
          </div>
        )}
      </div>
    </div>
  )
}

function TextQuestion({ data, index }: QuestionProps) {
  const { content } = data;

  return (
    <div className="mb-10" id={`q-${index}`}>
      <div><span className="font-bold">{index}.</span> {content}</div>
      <div>
        <TextInput type="textaria" />
      </div>
    </div>
  )
}