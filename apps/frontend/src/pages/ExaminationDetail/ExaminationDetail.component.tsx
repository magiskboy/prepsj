import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { useQuery } from 'react-query';

import { useTranslation } from 'react-i18next';
import { BsPencil, BsStar } from 'react-icons/bs';
import { getPublicExaminations } from '@/apis/get-interviews';
import { formatDistanceToNow } from '@/helpers/date';
import Text from '@/components/Text/Text.component';

export function Component() {
  const { id } = useParams<{id: string}>();
  const { data, error, isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const examinations = await getPublicExaminations();
      return examinations.find(exam => exam.id === Number(id));
    },
    staleTime: 5 * 60 * 1000,
  });
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  if (isLoading) return null;
  if (error || !data) {
    navigate('/not-found');
    return null;
  }

  const lng = i18n.resolvedLanguage || 'en-US';
  const summaries = [
    [t('Take'), data.numberOfTake.toLocaleString()],
    [t('Like'), data.numberOfStar.toLocaleString()],
    [t('Created by'), data.createdBy?.username || t('Unknown')],
    [t('Created at'), formatDistanceToNow(data.createdAt, lng, t)],
    [t('Updated at'), formatDistanceToNow(data.updatedAt, lng, t)],
  ];
  const summary = (
    <div className="flex flex-col gap-1 md:gap-3">
      {summaries.map(([name, value]) =>
        <div className="flex justify-between" key={name as string}>
          <span className="font-semibold pr-5">{name}</span>
          <span>{value}</span>
        </div>  
      )}
    </div>
  );
    
  return (
    <main className="flex-1">
      <div className="flex w-11/12 mx-auto flex-wrap xl:w-9/12 lg:mt-4">
        <Text.Heading className="mb-4 w-full">{data.title}</Text.Heading>
        <div className="w-full md:w-4/12">
          {summary}
          <div className="w-full flex gap-5 justify-between">
            <Button className="my-5" fullSized color='red'><BsStar className="mr-2" /> {t('Like')}</Button>
            <Button className="my-5" fullSized as={Link} to={`/examinations/${id}/take`}><BsPencil className="mr-2" /> {t('Take a test')}</Button>
          </div>
        </div>
        <p className="md:w-7/12 md:px-8">{data.description}</p>
      </div>
    </main>
  )
}

Component.displayName = "ExaminationDetail";
