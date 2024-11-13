import "./BattleScreen.css";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { languageStore } from "../../store/language/LanguageStore";
import { Table, Button } from 'antd';
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

const TaskDescription = observer(() => {
  return (
    <div className="task-container">
      <h2>Описание задачи</h2>
      <p>Здесь будет описание вашей задачи...</p>
    </div>
  );
});


const ButtonCostContainer = observer(() => {
  //MOCKED DATA================================================================================
  const dataSource = [
    {
      key: '1',
      action: <Button className="points-button" type="primary">Перевернуть</Button>,
      cost: 100,
    },
    {
      key: '2',
      action: <Button className="points-button" type="primary">Невидимость</Button>,
      cost: 200,
    },
    {
      key: '3',
      action: <Button className="points-button" type="primary">Стереть 10 символов</Button>,
      cost: 300,
    },
  ];

  const columns = [
    {
      title: 'Действие',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Стоимость',
      dataIndex: 'cost',
      key: 'cost',
    },
  ];
  //MOCKED DATA====================================================================
  return (
    <Table dataSource={dataSource} columns={columns} pagination={false} />
  );
});

const BattleWindows = observer(() => {
  const { getCurrentLanguage } = languageStore;
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");

  return (
    <div className="code-blocks">
      <div className="code-block">
        <CodeEditor
          className="w-tc-editor-var"
          minHeight={500}
          value={code1}
          language={getCurrentLanguage()}
          onChange={(evn) => setCode1(evn.target.value)}
          padding={15}
          data-color-mode="dark"
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
          className="w-tc-editor-var"
          minHeight={500}
          value={code2}
          language={getCurrentLanguage()}
          onChange={(evn) => setCode2(evn.target.value)}
          padding={15}
          data-color-mode="dark"
          style={{
            backgroundColor: "#f5f5f5",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
        <div className="button-group">
          <Button type="primary">Test</Button>
          <Button type="primary">Run</Button>
        </div>
      </div>
    </div>
  );
});

export default BattleScreen;