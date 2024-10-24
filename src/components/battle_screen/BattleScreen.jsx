import "./BattleScreen.css";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { languageStore } from "../../store/LanguageStore";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const BattleScreen = observer(() => {
  return (
    <div classname="BattleScreen">
      <BattleWindows />
      {/*
       *<Abilities />
       * <Task />
       * */}
    </div>
  );
});

export default BattleScreen;
//ЭТО ВРЕМЕННАЯ ЗАТЫЧКА
const BattleWindows = observer(() => {
  const { getCurrentLanguage } = languageStore;
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  return (
    <div>
      <h2 id="my-code">Code Block 1</h2>
      <textarea
        aria-labelledby="my-code"
        value={code1}
        onChange={(e) => setCode1(e.target.value)}
        rows={10}
        cols={50}
      />
      <SyntaxHighlighter language={getCurrentLanguage()}>
        {code1}
      </SyntaxHighlighter>
      <h2 id="enemy-code">Code Block 2</h2>
      <textarea
        aria-labelledby="enemy-code"
        value={code2}
        onChange={(e) => setCode2(e.target.value)}
        rows={10}
        cols={50}
      />
      <SyntaxHighlighter language={getCurrentLanguage()}>
        {code2}
      </SyntaxHighlighter>
    </div>
  );
});
