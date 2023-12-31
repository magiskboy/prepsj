import { TextInput } from 'flowbite-react';
import { ChangeEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

import { normalizeInput } from '@/helpers/string';
import Text from '@/components/Text/Text.component';

type Props = {
    className?: string;
    onChange?: (value: string) => void;
}

export default function SearchExamination({ className, onChange }: Props) {
  const { t } = useTranslation();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const keyword = normalizeInput(event.target.value);
    if (keyword && onChange) {
      onChange(keyword);
    }
  }

  return (
    <div className={`md:w-1/2 ${className}`}>
      <Text.Heading as="h2" className="text-center mb-4">{t('Which examinations are you looking for?')}</Text.Heading>
      <TextInput onChange={handleChange} placeholder='NodeJS interview questions in 2023...' />
    </div>
  )
}