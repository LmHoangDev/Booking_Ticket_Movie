import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(detector)
  .use(backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en", // use en if detected lng is not available
    debug: true,
    whitelist: ["chi", "en", "vi"], //Liệt kê các ngôn ngữ
    saveMissing: true,
    interpolation: {
      escapeValue: true, // not needed for react as it escapes by default
    }, // send not translated keys to endpoint
  });

export default i18n;
