import "./BattleScreen.css";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { languageStore } from "../../store/LanguageStore";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const BattleScreen = observer(() => {
  return (
    <div className="BattleScreen">
      <div className="left-column">
        <TaskDescription />
        <ButtonCostContainer />
      </div>
      <div className="right-column">
        <BattleWindows />
      </div>
    </div>
  );
});

const TaskDescription = () => {
  return (
    <div className="task-container">
      <h2>Описание задачи</h2>
      <p>Здесь будет описание вашей задачи...</p>
    </div>
  );
};

const ButtonCostContainer = () => {
  return (
    <div className="button-cost-container">
      <div className="buttons-column">
        <button className="action-button">Кнопка 1</button>
        <button className="action-button">Кнопка 2</button>
        <button className="action-button">Кнопка 3</button>
      </div>
      <div className="cost-column">
        <div className="cost-numbers">
          <p>100</p>
          <p>200</p>
          <p>300</p>
        </div>
      </div>
    </div>
  );
};

const BattleWindows = observer(() => {
  const { getCurrentLanguage } = languageStore;
  const [code1, setCode1] = useState("");
  const [formattedCode1, setFormattedCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [formattedCode2, setFormattedCode2] = useState("");

  useEffect(() => {
    setFormattedCode1(code1);
  }, [code1]);

  useEffect(() => {
    setFormattedCode2(code2);
  }, [code2]);

  return (
    <div className="code-blocks">
      <div className="code-block">
        <h2 id="my-code">Code Block 1</h2>
        <textarea
          aria-labelledby="my-code"
          value={code1}
          onChange={(e) => setCode1(e.target.value)}
          rows={10}
          className="code-input"
        />
        <SyntaxHighlighter language={getCurrentLanguage()}>
          {formattedCode1}
        </SyntaxHighlighter>
        <div className="button-group">
          <button>Test</button>
          <button>Run</button>
        </div>
      </div>
      <div className="code-block">
        <h2 id="enemy-code">Code Block 2</h2>
        <textarea
          aria-labelledby="enemy-code"
          value={code2}
          onChange={(e) => setCode2(e.target.value)}
          rows={10}
          className="code-input"
        />
        <SyntaxHighlighter language={getCurrentLanguage()}>
          {formattedCode2}
        </SyntaxHighlighter>
        <div className="button-group">
          <button>Test</button>
          <button>Run</button>
        </div>
      </div>
    </div>
  );
});

export default BattleScreen;