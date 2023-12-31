import { useParams } from "react-router-dom";

import { Question } from "@/apis/get-interviews";
import { TakeTestProvider } from '@/contexts/TakeTest.context';

import ExaminationOutline from "./components/ExaminationOutline/ExaminationOutline.component";
import ExaminationPresentation from "./components/ExaminationPresentation/ExaminationPresentation.component";

export function Component() {
  const { id } = useParams<{id: string}>();

  return (
    <TakeTestProvider examinationId={Number(id)}>
      <main className="flex-1 mb-20 flex flex-col flex-col-reverse md:flex-row lg:w-10/12 mx-auto">
        <div className="w-full">
          <ExaminationPresentation />
        </div>
        <div className="px-5 md:w-5/12">
          <ExaminationOutline />
        </div>
      </main>
    </TakeTestProvider>
  )
}

Component.displayName = "TakeExamination";

export type UserResult = Question & {
  index: number;
  answer: string[];
};