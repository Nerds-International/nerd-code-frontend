import { makeAutoObservable } from "mobx";

class LanguageStore {
  Languages = {
    PYTHON: "python",
    JAVASCRIPT: "javascript",
  };

  current_lang = this.Languages.JAVASCRIPT;

  constructor() {
    makeAutoObservable(this);
  }

  getCurrentLanguage = () => {
    return this.current_lang;
  };

  setCurrentLanguage = (lang) => {
    if (Object.values(this.Languages).includes(lang)) {
      this.current_lang = lang;
    }
  };
}

export const languageStore = new LanguageStore();
