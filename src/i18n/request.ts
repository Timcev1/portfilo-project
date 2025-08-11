import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
 
import en from '../locales/en.json';
import es from '../locales/es.json';

const messagesMap = {
  en,
  es
};

export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 
  const messages = messagesMap[locale as keyof typeof messagesMap];

  if (!messages) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  return { locale, messages };
});