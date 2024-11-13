import { languageStore } from "./LanguageStore";

describe("LanguageStore", () => {
  beforeEach(() => {
    languageStore.setCurrentLanguage(languageStore.Languages.JAVASCRIPT);
  });

  test("should initialize with JAVASCRIPT as the current language", () => {
    expect(languageStore.getCurrentLanguage()).toBe(
      languageStore.Languages.JAVASCRIPT,
    );
  });

  test("should change current language to a valid language and not change to an invalid one", () => {
    languageStore.setCurrentLanguage(languageStore.Languages.PYTHON);
    expect(languageStore.getCurrentLanguage()).toBe(
      languageStore.Languages.PYTHON,
    );

    const initialLang = languageStore.getCurrentLanguage();
    languageStore.setCurrentLanguage("invalid-lang");
    expect(languageStore.getCurrentLanguage()).toBe(initialLang);
  });

  test("should keep the current language unchanged for invalid inputs", () => {
    const originalLang = languageStore.getCurrentLanguage();
    languageStore.setCurrentLanguage(undefined);
    expect(languageStore.getCurrentLanguage()).toBe(originalLang);
  });
});
