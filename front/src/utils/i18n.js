import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import fr from "../locals/fr.json";
import en from "../locals/en.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            fr: { translation: fr },
            en: { translation: en },
        },
        lng: "fr", // c'est language par défualt
        debug: true,
        fallbackLng: "fr", // si jamais lng est introuvable 
        interpolation: {
            escapeValue: false,
        },
    });
export default i18n;