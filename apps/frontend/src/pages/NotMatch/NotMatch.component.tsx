import image from '@/assets/images/not-found-image.png';
import { useTranslation } from 'react-i18next';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export function Component() {
  const { t } = useTranslation();
  return (
    <main className="flex-1 flex items-center">
      <div className="grid grid-cols-2 h-full">
        <div className="text-center flex flex-col place-content-center">
          <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            <span className="block mb-3">{t('Oops!')}</span>
            <span>{t('Page Not Found')}</span>
          </h2>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{t("The page you are looking for couldn’t be found")}</p>

          <div className="gap-5 flex w-full justify-center">
            <Button as={Link} to="/">{t('Go home')}</Button>
            <Button as={Link} to="/contact">{t('Contact us')}</Button>
          </div>
        </div>
        <div className="justify-center flex">
          <img src={image} alt="Not found" />
        </div>
      </div>
    </main>
  )
}

Component.displayName = "NotMatch";