import { Button, Card } from 'flowbite-react'
import { Link } from 'react-router-dom';
// import { BsStar, BsPencil } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

import Text from '@/components/Text/Text.component'

export type Props = {
    id: number;
    slug: string;
    title: string;
    description?: string;
    numberOfStar: number;
    numberOfTake: number;
    createdBy: any;
    createdAt: string;
    updatedAt: string;
}

export default function ExaminationCard({id, title, description, numberOfStar, numberOfTake }: Props) {
  const { t } = useTranslation();

  return (
    <Card>
      <Text.Heading as="h2" size={1}>{title}</Text.Heading>
      <p className="text-ellipsis line-clamp-4 flex-1">{description}</p>
      {/* <div className="flex gap-5">
        <span className="flex gap-1 items-center">
          <BsStar /> {numberOfStar.toLocaleString()}
        </span>
        <span className="flex gap-1 items-center">
          <BsPencil /> {numberOfTake.toLocaleString()}
        </span>
      </div> */}
      <div className="flex gap-5">
        {/* <Button fullSized as={Link} to={`/examinations/${id}`}>{t('View')}</Button> */}
        <Button fullSized as={Link} to={`/examinations/${id}/take`}>{t('Take')}</Button>
      </div>
    </Card>
  )
}