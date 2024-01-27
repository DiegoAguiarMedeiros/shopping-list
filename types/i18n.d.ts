declare module 'react-native-i18n' {
    import { DefaultLocale, FallbackLocale, TranslationDictionary } from 'react-native-i18n';
  
    interface I18n {
      t: (key: string, params?: object) => string;
      locale: string;
    }
  
    const i18n: I18n;
  
    export default i18n;
  
    export const defaultLocale: DefaultLocale;
    export const fallbackLocale: FallbackLocale;
    export const translations: TranslationDictionary;
  }
  