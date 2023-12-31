import { Footer as FlowbitFooter } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { BsFacebook, BsTwitter, BsGithub, BsLinkedin } from 'react-icons/bs';

import { APP_TITLE } from '@/environments';

export default function Footer() {
  const { t } = useTranslation()
  return (
    <FlowbitFooter container className="flex flex-col">
      <div className="grid w-full justify-between sm:flex sm:justify-between">
        <div>
          <FlowbitFooter.Brand
            src="https://banner2.cleanpng.com/20180717/eub/kisspng-computer-icons-interview-icon-design-business-symb-one-stop-service-5b4e503deead66.8937281315318590059776.jpg"
            href="/"
            name="PrepsJ"
            alt="PrepsJ Logo"
          />
        </div>
        <div className="grid grid-cols-3 gap-5 md:gap-10 lg:gap-20">
          <FlowbitFooter.LinkGroup col>
            <span className="font-bold uppercase">{t('About')}</span>
            <FlowbitFooter.Link target='_blank' href="https://getinterviews.com/guide">{t('How to use?')}</FlowbitFooter.Link>
            <FlowbitFooter.Link target='_blank' href="https://getinterviews.com/how-to-use-APIs">{t('How to integrate?')}</FlowbitFooter.Link>
          </FlowbitFooter.LinkGroup>
          <FlowbitFooter.LinkGroup col>
            <span className="font-bold uppercase">{t('Legal')}</span>
            <FlowbitFooter.Link target='_blank' href="https://getinterviews.com/policy">{t('Policy')}</FlowbitFooter.Link>
            <FlowbitFooter.Link target='_blank' href="https://getinterviews.com/terms">{t('Terms & Conditions')}</FlowbitFooter.Link>
          </FlowbitFooter.LinkGroup>
          <FlowbitFooter.LinkGroup col>
            <span className="font-bold uppercase">{t('Contact us')}</span>
            <FlowbitFooter.Link target='_blank' href="https://github.com/magiskboy">Github</FlowbitFooter.Link>
            <FlowbitFooter.Link target='_blank' href="https://www.linkedin.com/in/thanh-nguyen-khac/">LinkedIn</FlowbitFooter.Link>
            <FlowbitFooter.Link target='_blank' href="https://twitter.com/mag1skboy">Twitter</FlowbitFooter.Link>
          </FlowbitFooter.LinkGroup>
                    
        </div>
      </div>
      <FlowbitFooter.Divider />
      <div className="w-full flex justify-between">
        <FlowbitFooter.Copyright href="/" by={APP_TITLE} year={new Date().getFullYear()} />
        <div className="gap-5 flex">
          <FlowbitFooter.Icon icon={BsGithub} href="https://github.com/magiskboy" />
          <FlowbitFooter.Icon icon={BsLinkedin} href="https://www.linkedin.com/in/thanh-nguyen-khac/" />
          <FlowbitFooter.Icon icon={BsTwitter} href="https://twitter.com/mag1skboy" />
          <FlowbitFooter.Icon icon={BsFacebook} href="https://github.com/magiskboy" />
        </div>
      </div>
    </FlowbitFooter>
  )
}
