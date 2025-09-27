import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'
import * as SecureStore from 'expo-secure-store'

import en from './locales/en.json'
import pt from './locales/pt.json'
import es from './locales/es.json'

const resources = {
  en: { translation: en },
  pt: { translation: pt },
}

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      const savedLanguage = await SecureStore.getItemAsync('user-language')

      if (savedLanguage) {
        callback(savedLanguage)
        return
      }

      const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'pt'
      const supportedLanguage = ['pt', 'en'].includes(deviceLanguage) ? deviceLanguage : 'pt'

      callback(supportedLanguage)
    } catch (error) {
      console.warn('Error detecting language:', error)
      callback('pt')
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await SecureStore.setItemAsync('user-language', lng)
    } catch (error) {
      console.warn('Error saving language:', error)
    }
  },
}

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng: 'pt',
    fallbackLng: 'en',
    debug: __DEV__,

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  })

export default i18n