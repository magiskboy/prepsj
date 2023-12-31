import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import SearchExamination from '@/components/SearchExamination/SearchExamination.component';
import ExaminationsList from '@/components/ExaminationsList/ExaminationsList.component';
import { Examination } from '@/apis/get-interviews';
import { getPublicExaminations } from '@/apis/get-interviews';
import { LoadingContext } from '@/contexts/Loading.context';

export function Component() {
  const { isLoading, data = [] } = useQuery({
    queryKey: [getPublicExaminations.name],
    queryFn: getPublicExaminations,
    staleTime: 1 * 60 * 1000, // a minute
  });
  const { setLoading } = useContext(LoadingContext);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setLoading({ loading: isLoading, text: 'Loading list examinations...' });
  }, [isLoading, setLoading]);

  const renderedExaminations = data.filter(matchExamination(keyword));

  return (
    <main className="flex-1 px-2 py-5 sm:px-4 md:pb-20 md:px-5 lg:px-10 xl:px-20">
      <SearchExamination className="mx-5 mb-5 md:mb-10 md:mx-auto" onChange={setKeyword} />
      <ExaminationsList exams={renderedExaminations} />
    </main>
  )
}

function matchExamination(keyword: string) {
  return function(examination: Examination): boolean {
    if (!keyword) return true;
    keyword = keyword.toLowerCase();
    if (examination.title.toLocaleLowerCase().includes(keyword))
      return true;

    if (examination.description) {
      if (examination.description.toLowerCase().includes(keyword))
        return true;
    }

    return false;
  }
}

Component.displayName = "Home";