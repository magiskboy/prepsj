import { formatDistanceToNow as formatDistanceToNowFn } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';

export function formatDistanceToNow(date: any, localeCode?: string, t?: any): string {
  let locale = enUS;
  if (localeCode === 'vi' || localeCode === 'vi-VN') {
    locale = vi;
  }
  return `${formatDistanceToNowFn(date, { locale })} ${t ? t('ago') : 'ago'}`
}