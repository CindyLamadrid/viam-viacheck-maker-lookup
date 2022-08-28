import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) // passes i18n down to react-i18next
  .use(initReactI18next)
  .init({
    debug: false,
    lng: 'en',
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    backend: {
      // for all available options read the backend's repository readme file
      // loadPath:  `${process.env.REACT_APP_BUCKECT_LANGUAGE_URL}/locales/{{lng}}/{{ns}}.json`
      loadPath: `/locales/{{lng}}/{{ns}}.json`
    }
  });

export default i18n;
