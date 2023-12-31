import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import { APP_TITLE } from '@/environments';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher.component';

import logo from '@/assets/images/logo.jpg';

export default function Header() {
  return (
    <Navbar fluid className="sticky top-0 z-10">
      <Brand />
      <LanguageSwitcher className="mr-5" />
      <Navbar.Toggle />
      <Navbar.Collapse>
        <NavLinks />
      </Navbar.Collapse>
    </Navbar>
  )
}

function Brand() {
  return (
    <Navbar.Brand as={Link} href="/" className="flex-1">
      <img src={logo} className="mr-3 h-6 sm:h-9" alt={`${APP_TITLE} Logo`} />
      <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">{APP_TITLE}</span>
    </Navbar.Brand>
  )
}

function NavLinks() {
  const {t} = useTranslation();
  return (
    <>
      <Navbar.Link as={Link} to="/" active>{t('Home')}</Navbar.Link>
      <Navbar.Link as={Link} to="/about">{t('About')}</Navbar.Link>
      <Navbar.Link as={Link} to="/#">{t('Beta')}</Navbar.Link>
      <Navbar.Link as={Link} to="/contact">{t('Contact')}</Navbar.Link>
    </>
  )
}
