import { I18nextProvider } from 'react-i18next';
import { QueryClientProvider, QueryClient } from 'react-query';

import i18n from '@/i18n';
import { LoadingProvider } from '@/contexts/Loading.context';

const providers = [
  [LoadingProvider],
  [I18nextProvider, { i18n, defaultNS: 'translation' }],
  [QueryClientProvider, { client: new QueryClient() }],
];

export default function Providers({children}: React.PropsWithChildren) {
  const content = providers.reduce(
    (prev, [CurrentProvider, props]) =>
    // @ts-expect-error
      <CurrentProvider {...props}>{prev}</CurrentProvider>,
    children
  );
  return <>{content}</>
}
