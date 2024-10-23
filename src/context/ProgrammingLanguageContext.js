import { createContext, useState, useContext } from "react";

const ProgrammingLanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("");
  return (
    <ProgrammingLanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </ProgrammingLanguageContext.Provider>
  );
};

export const useProgrammingLanguage = () =>
  useContext(ProgrammingLanguageContext);
