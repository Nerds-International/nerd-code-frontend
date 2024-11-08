import "./BattleScreen.css";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { languageStore } from "../../store/LanguageStore";
import CodeEditor from "@uiw/react-textarea-code-editor";

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
  const [code2, setCode2] = useState("");

  return (
    <div className="code-blocks">
      <div className="code-block">
        <CodeEditor
          value={code1}
          language={getCurrentLanguage()}
          onChange={(evn) => setCode1(evn.target.value)}
          padding={15}
          style={{
            backgroundColor: "#f5f5f5",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
        <div className="button-group">
          <button>Test</button>
          <button>Run</button>
        </div>
      </div>
      <div className="code-block">
        <CodeEditor
          value={code2}
          language={getCurrentLanguage()}
          onChange={(evn) => setCode2(evn.target.value)}
          padding={15}
          style={{
            backgroundColor: "#f5f5f5",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
          data-color-mode="dark"
        />
        <div className="button-group">
          <button>Test</button>
          <button>Run</button>
        </div>
      </div>
    </div>
  );
});

export default BattleScreen;
