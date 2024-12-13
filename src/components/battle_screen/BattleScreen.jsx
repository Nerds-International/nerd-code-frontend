import "./BattleScreen.css";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { languageStore } from "../../store/language/LanguageStore";
import { Table, Button } from 'antd';
import energyStore from '../../store/energy/EnergyStore';
import CodeEditor from "@uiw/react-textarea-code-editor";
import useWebSocket from '../../hooks/useWebSocket';

const BattleScreen = observer(() => {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("console.log(\"Enemy Nerd\");\nconsole.log(\"evil nerds attack!\")");
  const [isUpsideDown, setIsUpsideDown] = useState(false);
  const [lagCount, setLagCount] = useState(0);
  const [pressCounter, setPressCounter] = useState(0);
  const [battleId, setBattleId] = useState("");
  const socket = useWebSocket('http://localhost:3000');

  useEffect(() => {
    if (socket) {
      socket.on('battleCreated', (data) => {
        console.log('Battle created:', data);
        setBattleId(data.battleId);
      });

      socket.on('opponentJoined', (data) => {
        console.log('Opponent joined:', data);
      });

      socket.on('codeUpdated', (data) => {
        console.log('Code updated:', data);
        setCode2(data.code);
      });

      socket.on('error', (data) => {
        console.error('Error:', data.message);
      });
    }
  }, [socket]);

  const createBattle = () => {
    if (socket) {
      socket.emit('createBattle', '5252');
    }
  };

  const joinBattle = () => {
    if (socket) {
      socket.emit('joinBattle', battleId);
    }
  };

  const syncCode = () => {
    if (socket) {
      socket.emit('syncCode', { battleId, code: code1 });
    }
  };

  const reverseCode = () => {
    setIsUpsideDown(true);
    setTimeout(() => setIsUpsideDown(false), 5000);
  };

  const applyLag = () => {
    setLagCount(Math.floor(Math.random() * 3) + 3);
    setPressCounter(0);
  };

  const eraseCharacters = () => {
    setCode2(code2.slice(10));
  };

  return (
    <div className="BattleScreen">
      <div className="left-column">
        <TaskDescription />
        <ButtonCostContainer
          reverseCode={reverseCode}
          applyLag={applyLag}
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
          isUpsideDown={isUpsideDown}
          lagCount={lagCount}
          pressCounter={pressCounter}
          setPressCounter={setPressCounter}
        />
        <div className="button-group">
          <Button type="primary" onClick={createBattle}>Create Battle</Button>
          <Button type="primary" onClick={joinBattle}>Join Battle</Button>
          <Button type="primary" onClick={syncCode}>Sync Code</Button>
        </div>
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

const ButtonCostContainer = observer(({ reverseCode, applyLag, eraseCharacters }) => {
  const { energy, setEnergy } = energyStore;

  const dataSource = [
    {
      key: '1',
      action: <Button className="points-button" type="primary" onClick={() => { setEnergy(energy - 5); reverseCode(); }}>Перевернуть</Button>,
      cost: 5,
    },
    {
      key: '2',
      action: <Button className="points-button" type="primary" onClick={() => { setEnergy(energy - 3); applyLag(); }}>Лаг</Button>,
      cost: 3,
    },
    {
      key: '3',
      action: <Button className="points-button" type="primary" onClick={() => { setEnergy(energy - 7); eraseCharacters(); }}>Стереть 10 символов</Button>,
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

const BattleWindows = observer(({ code1, setCode1, code2, setCode2, isUpsideDown, lagCount, pressCounter, setPressCounter }) => {
  const { getCurrentLanguage } = languageStore;

  const handleButtonPress = (action) => {
    if (lagCount > 0) {
      setPressCounter(pressCounter + 1);
      if (pressCounter + 1 >= lagCount) {
        setPressCounter(0);
        action();
      }
    } else {
      action();
    }
  };

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
            color: "black"
          }}
        />
        <div className="button-group">
          <button onClick={() => handleButtonPress(() => console.log('Test'))}>Test</button>
          <button onClick={() => handleButtonPress(() => console.log('Run'))}>Run</button>
        </div>
      </div>
      <div className="code-block" style={{ transform: isUpsideDown ? 'rotate(180deg)' : 'rotate(0deg)' }}>
        <CodeEditor
          className="w-tc-editor-var"
          minHeight={500}
          value={code2}
          language={getCurrentLanguage()}
          onChange={(evn) => setCode2(evn.target.value)}
          padding={15}
          data-color-mode="dark"
          readOnly={true}
          style={{
            backgroundColor: "#f5f5f5",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
        <div className="button-group">
          <Button type="primary" onClick={() => handleButtonPress(() => console.log('Test'))}>Test</Button>
          <Button type="primary" onClick={() => handleButtonPress(() => console.log('Run'))}>Run</Button>
        </div>
      </div>
    </div>
  );
});

export default BattleScreen;
