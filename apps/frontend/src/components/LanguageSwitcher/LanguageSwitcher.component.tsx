import { useTranslation } from 'react-i18next';
import { Dropdown } from 'flowbite-react';
import { IoCheckmark } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";

type Props = {
    className?: string;
}

export default function LanguageSwitcher({className}: Props) {
  const { i18n } = useTranslation();
  const intl = new Intl.DisplayNames([i18n.language], { type: 'language'});
  const currentLanguage = i18n.resolvedLanguage;
  const languages = i18n.languages.filter(lng => lng.includes("-"));

  return <div className={className}>
    <Dropdown label={<GrLanguage />} inline arrowIcon={false} className={className}>
      {languages.map(language => <Dropdown.Item className="flex" key={language} onClick={() => {
        i18n.changeLanguage(language);
      }}>
        <span className="w-5 text-red-600">{language === currentLanguage ? <IoCheckmark /> : null}</span>
        <span>{intl.of(language)}</span>
      </Dropdown.Item>)}
    </Dropdown>
  </div>
}