import "./BattleScreen.css";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { languageStore } from "../../store/language/LanguageStore";
import { Table, Button } from 'antd';
import energyStore from '../../store/energy/EnergyStore';
import CodeEditor from "@uiw/react-textarea-code-editor";
import { webSocketStore } from "../../store/socket/WebSocketStore";
import { useNavigate } from "react-router-dom";
import useCodeRunnerJS from "../../hooks/UseCodeRunnerJS";
import ModalResult from "../../components/modal_result/ModalResult";

const BattleScreen = observer(() => {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [isUpsideDown1, setIsUpsideDown1] = useState(false);
  const [isUpsideDown2, setIsUpsideDown2] = useState(false);
  const location = useLocation();
  const battleId = location.state?.battleId || "defaultBattleId";
  const { socket } = webSocketStore;
  const [blurValue, setBlurValue] = useState(3);
  const [task, setTask] = useState({})
  const { Languages, getCurrentLanguage } = languageStore;
  const [combinedCode, setCombinedCode] = useState("");
  const { result } = useCodeRunnerJS(combinedCode);
  const [outcome, setOutcome] = useState(false);

  const reverseCode = (target) => {
    if (target === 1) {
      setIsUpsideDown1(true);
      setTimeout(() => setIsUpsideDown1(false), 10000);
    } else {
      setIsUpsideDown2(true);
      setTimeout(() => setIsUpsideDown2(false), 10000);
      socket.emit("useSkill", { battleId, skill_name: "reverse" })
    }
  };

  const seeThrough = () => {
    setBlurValue(0);
    setTimeout(() => setBlurValue(3), 5000);
  };

  const eraseCharacters = (target) => {
    if (target === 1) {
      setCode1(code1.slice(10));
    } else {
      socket.emit("useSkill", { battleId, skill_name: "erase" })
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('opponentJoined', (data) => {
        console.log('Opponent joined:', data);
      });

      socket.on('task', (data) => {
        setTask({
          title: data.task.title,
          description: data.task.description,
          testCases: data.task.test_cases
        });
        setTemplateCode(data.task.title);
      });

      socket.on('codeUpdated', (data) => {
        console.log('Code updated:', data);
        if (data.id !== socket.id) {
          setCode2(data.code);
        }
      });

      socket.on('error', (data) => {
        console.error('Error:', data.message);
      });

      socket.on('skillUsed', (data) => {
        if (data.skill_name === "reverse") {
          if (data.id !== socket.id) {
            reverseCode(1);
          }
        }

        if (data.skill_name === "erase") {
          if (data.id !== socket.id) {
            eraseCharacters(1);
          }
        }
      });
    }
  });

  const syncCode = () => {
    if (socket) {
      socket.emit('syncCode', { battleId, code: code1 });
    }
  };

  const generateFunctionName = (name) => {
    const words = name.split(/\s+/);
    const firstWord = words[0].charAt(0).toLowerCase() + words[0].slice(1);
    const functionName = firstWord + words.slice(1).join("");
    return functionName;
  };

  const setTemplateCode = (name) => {
    const functionName = generateFunctionName(name);
    let functionTemplate;
    if (getCurrentLanguage() === Languages.JAVASCRIPT) {
      functionTemplate = `function ${functionName}() {\n    // Your function code here\n    return 0; \n}`;
    } else {
      functionTemplate = `def ${functionName}() :\n   return 0 \n`;
    }
    setCode1(functionTemplate);
  };

  useEffect(() => {
    syncCode();
  });

  const runCode = () => {
    if (getCurrentLanguage() === Languages.JAVASCRIPT) {
      const functionName = generateFunctionName(task.title);
      let tpart1 = ``;
      let tpart2 = ``;
      tpart2 = `[`;
      for (let i = 0; i < task.testCases.length; i++) {
        tpart1 =
          tpart1 +
          `const result${i} = JSON.stringify(${functionName}([${task.testCases[i].input}])) === JSON.stringify([${task.testCases[i].expected_output}]);\n`;
        tpart2 = tpart2 + `result${i}, `;
      }
      tpart2 = tpart2.slice(0, -2) + `];`;
      const combined = `${code1}\n${tpart1 + tpart2}`;
      setCombinedCode(combined);
      console.log(result)
      if (result.every(Boolean)) {
        setOutcome(true)
      }
    } else {
      console.log("NOT IMPLEMENTED")
    }
  }

  return (
    <div className="BattleScreen">
      <div className="left-column">
        <TaskDescription
          task={task}
        />
        <ButtonCostContainer
          reverseCode={reverseCode}
          seeThrough={seeThrough}
          eraseCharacters={eraseCharacters}
        />
        <EnergyBar />
      </div>
      <div className="right-column">
        <BattleWindows
          code1={code1}
          setCode1={setCode1}
          code2={code2}
          setCode2={setCode2}
          isUpsideDown1={isUpsideDown1}
          isUpsideDown2={isUpsideDown2}
          blurValue={blurValue}
          runCode={runCode}
        />
        {outcome ? "" : <ModalResult state={"Win"} />}
      </div>
    </div>
  );
});

const TaskDescription = observer(({ task }) => {
  return (
    <div className="task-container">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      {/* <p>Входные данные: {task.testCases[0].input}</p>
      <p>Ожидаемые выходные данные: {task.testCases[0].input}</p> */}
    </div>
  );
});

const EnergyBar = observer(() => {
  const { energy, maxEnergy } = energyStore;

  const pieces = Array.from({ length: maxEnergy }, (_, index) => {
    const fraction = (index + 1) / 10;
    const isFilled = energy / maxEnergy >= fraction;
    return (
      <div
        key={index}
        style={{
          width: '9%',
          height: '20px',
          backgroundColor: isFilled ? '#ffcc00' : '#ddd',
          display: 'inline-block',
          marginRight: '1%',
          transition: 'background-color 0.5s',
        }}
      ></div>
    )
  });

  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <div style={{ display: 'flex', height: '20px' }}>{pieces}</div>
      <div style={{ textAlign: 'center', marginTop: '5px' }}>
        {energy}/{maxEnergy}
      </div>
    </div>
  );
});

const ButtonCostContainer = observer(({ reverseCode, seeThrough, eraseCharacters }) => {
  const { energy, setEnergy } = energyStore;

  const dataSource = [
    {
      key: '1',
      action: <Button className="points-button" type="primary" onClick={() => { setEnergy(energy - 5); reverseCode(2); }}>Перевернуть</Button>,
      cost: 5,
    },
    {
      key: '2',
      action: <Button className="points-button" type="primary" onClick={() => { setEnergy(energy - 3); seeThrough(); }}>Подглядеть</Button>,
      cost: 3,
    },
    {
      key: '3',
      action: <Button className="points-button" type="primary" onClick={() => { setEnergy(energy - 7); eraseCharacters(2); }}>Стереть 10 символов</Button>,
      cost: 7,
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

  return (
    <Table dataSource={dataSource} columns={columns} pagination={false} />
  );
});

const BattleWindows = observer(({ code1, setCode1, code2, setCode2, isUpsideDown1, isUpsideDown2, blurValue, runCode }) => {
  const { getCurrentLanguage } = languageStore;
  const { closeWebSocket, initWebSocket } = webSocketStore;
  const navigate = useNavigate();
  const endMatch = () => {
    closeWebSocket();
    initWebSocket();
    navigate("/search_battle");
  }

  const handleButtonPress = (action) => {
    action();
  };

  const generateRandomString = (n) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let randomString = '';

    for (let i = 0; i < n.length; i++) {
      const char = n[i];
      if (char === ' ' || char === '\t' || char === '\n') {
        randomString += char;
      } else {
        randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    }

    return randomString;
  };



  return (
    <div className="code-blocks">
      <div className="code-block" style={{ transform: isUpsideDown1 ? 'rotate(180deg)' : 'rotate(0deg)' }}>
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
            color: "black"
          }}
        />
        <div className="button-group">
          <Button type="primary" onClick={() => handleButtonPress(() => runCode())}>Run</Button>
        </div>
      </div>
      <div className="code-block" style={{ transform: isUpsideDown2 ? 'rotate(180deg)' : 'rotate(0deg)' }}>
        <CodeEditor
          className="w-tc-editor-var"
          minHeight={500}
          value={blurValue ? generateRandomString(code2) : code2}
          language={getCurrentLanguage()}
          onChange={(evn) => setCode2(evn.target.value)}
          padding={15}
          data-color-mode="dark"
          readOnly={true}
          style={{
            backgroundColor: "#f5f5f5",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            filter: "blur(" + blurValue + "px)",
            userSelect: "none"
          }}
        />
        <div className="button-group">
          <Button type="primary" onClick={() => handleButtonPress(() => console.log('Run'))}>Run</Button>
        </div>
      </div>
      <Button type="primary" onClick={() => endMatch()}>END BATTLE()</Button>
    </div>
  );
});

export default BattleScreen;
