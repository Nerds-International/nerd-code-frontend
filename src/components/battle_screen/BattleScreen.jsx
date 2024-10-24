import "./BattleScreen.css";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { languageStore } from "../../store/LanguageStore";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

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

function BattleWindows() {
  const { getCurrentLanguage } = languageStore;
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  return (
    <div>
      <h1>This is the Test Page!</h1>
      <h2>Code Block 1</h2>
      <SyntaxHighlighter language={getCurrentLanguage()} style={solarizedlight}>
        <textarea
          value={code1}
          onChange={(e) => setCode1(e.target.value)}
          rows={100}
          cols={50}
        />
        {code1}
      </SyntaxHighlighter>
      <h2>Code Block 2</h2>
      <textarea
        value={code2}
        onChange={(e) => setCode2(e.target.value)}
        rows={100}
        cols={50}
      />
      <SyntaxHighlighter language={getCurrentLanguage()} style={solarizedlight}>
        {code2}
      </SyntaxHighlighter>
    </div>
  );
}
