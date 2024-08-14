//TODO: add i18n
import { type I18nOptions, createI18n } from 'vue-i18n'
import en from '../locales/en.json'

export const SUPPORTED_LOCALES: Record<string, string> = {
    en: 'English',
    nl: 'Nederlands',
}

export const DEFAULT_LOCALE = 'en'

export const i18nOptions: I18nOptions = {
    locale: DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
    messages: {
        en
    },
    legacy: false,
}

export const i18n = createI18n(i18nOptions)