import ExaminationCard, { Props as ExaminationsCardProps } from '@/components/ExaminationCard/ExaminationCard.component';

type Props = {
    exams: ExaminationsCardProps[];
}

export default function ExaminationsList({
  exams,
}: Props) {
  return (
    <div className={'grid grid-cols-1 gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:w-10/12 mx-auto sm:gap-5 lg:gap-10'}>
      {exams.map(exam => 
        <ExaminationCard key={exam.id} {...exam} />
      )}
    </div>
  )
}