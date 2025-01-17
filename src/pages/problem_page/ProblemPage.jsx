import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import problemsStore from "../../store/problem/ProblemsStore";
import "./ProblemPage.css";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { languageStore } from "../../store/language/LanguageStore";
import useCodeRunnerJS from "../../hooks/UseCodeRunnerJS";
import VisualizingTestCase from "../../components/visualizing_test_case/VisualizingTestCase";
import ProblemAttemptTable from "../../components/problem_attempt_table/ProblemAttemptTable";
import Cookies from "js-cookie";
import { format } from 'date-fns';
// import ModalResult from "../../components/modal_result/ModalResult";

const ProblemPage = observer(() => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const task = problemsStore.tasks.find((task) => task.id === id);
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [runType, setRunType] = useState("");
  const { Languages, getCurrentLanguage, setCurrentLanguage } = languageStore;
  const [likeCount, setLikeCount] = useState(task ? task.likes : 0);
  const [dislikeCount, setDislikeCount] = useState(task ? task.dislikes : 0);
  const [selectedButton, setSelectedButton] = useState(null);
  const [combinedCode, setCombinedCode] = useState("");
  const { result, error } = useCodeRunnerJS(combinedCode);
  const [pythonResult, setPythonResult] = useState(null);
  const [pythonMessage, setPythonMessage] = useState("");
  const store = problemsStore;
  const [uname, setUname] = useState("");
  const [attempt, setAttempt] = useState([]);
  const [isUsernameLoaded, setIsUsernameLoaded] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        fetch('http://localhost:3000/auth/getUser', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'id': Cookies.get('id'),
              'accessToken': Cookies.get('accessToken'),
          },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        })
        .then(data => {
            setUname(data.username);
            setIsUsernameLoaded(true);
        })
        .catch(error => {
            console.error(error.message);
        });
      
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        fetch(`http://localhost:3000/res/attemptsByUser`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'taskId': id,
              'id': Cookies.get('id'),
              'accessToken': Cookies.get('accessToken'),
          },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('failed to get attempts');
            }
            return response.json();
        })
        .then(result => {
            const newAttempts = result.map(item => ({
                id: item._id,
                taskId: item.task_id,
                userName: uname,
                language: item.language,
                result: item.result,
                time: item.time
            }));
            setAttempt(newAttempts);
        })
        .catch(error => {
            console.error(error.message);
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchTaskById = async (taskId) => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error fetching task');
        }

        const data = await response.json();
        console.log("Fetched task data:", data);
        const getTask = {
          id: data._id,
          name: data.title,
          description: data.description,
          difficulty: data.difficulty,
          likes: data.likes,
          dislikes: data.dislikes,
          createdAt: data.created_at,
          testCases: data.test_cases,
          input_type: data.input_type,
          output_type: data.output_type,
        };
        store.setTask([getTask]);
      } catch (error) {
        console.error('Error fetching task:', error.message || 'Error fetching task');
      }
    };

    if (isUsernameLoaded && id) {
      fetchAttempts();
      if (!task) {
        fetchTaskById(id);
      }
    }
  }, [isUsernameLoaded, id, task, store]);

  useEffect(() => {
    if (task) {
      const functionName = generateFunctionName(task.name);
      let functionTemplate;
      let tests = ``;
      let tests_output = ``;
      if (getCurrentLanguage() === Languages.JAVASCRIPT) {
        functionTemplate = `function ${functionName}() {\n    // Your function code here\n    return 0; \n}`;
        tests_output = `[`;
        for (let i = 0; i < task.testCases.length; i++) {
          tests =
            tests +
            `const result${i} = JSON.stringify(${functionName}(${task.testCases[i].input})) === JSON.stringify(${task.testCases[i].expected_output});\n`;
          tests_output = tests_output + `result${i}, `;
        }
        tests_output = tests_output.slice(0, -2) + `];`;
      } else {
        functionTemplate = `def f() :\n   return 0 \n`;
        for (let i = 0; i < task.testCases.length; i++) {
          tests =
            tests +
            `f(${task.testCases[i].input}) == ${task.testCases[i].expected_output}\n`;
        }
      }
      setCode2(functionTemplate);
      setCode3(tests + tests_output);
    }
  }, [task, getCurrentLanguage()]);

  const generateFunctionName = (name) => {
    const words = name.split(/\s+/);
    const firstWord = words[0].charAt(0).toLowerCase() + words[0].slice(1);
    const functionName = firstWord + words.slice(1).join("");
    return functionName;
  };

  const handleLike = () => {
    if (selectedButton !== "like") {
      setLikeCount(likeCount + 1);
      setSelectedButton("like");
      if (selectedButton === "dislike") {
        setDislikeCount(dislikeCount - 1);
      }
    }
  };

  const handleDislike = () => {
    if (selectedButton !== "dislike") {
      setDislikeCount(dislikeCount + 1);
      setSelectedButton("dislike");
      if (selectedButton === "like") {
        setLikeCount(likeCount - 1);
      }
    }
  };

  const handleTest = async () => {
    if (getCurrentLanguage() === languageStore.Languages.PYTHON) {
      try {
        console.log(JSON.stringify(task.testCases))
        console.log(code2)
        const response = await fetch('http://localhost:3000/tasks/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'id': Cookies.get('id'),
            'accessToken': Cookies.get('accessToken'),
          },
          body: JSON.stringify({
            code: code2,
            tests: task.testCases,
            language: "Python",
            type: "Test",
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
        }

        const python_result = await response.json();
        if (python_result.success === true) {
          setPythonResult(true);
          setPythonMessage(python_result.result);
        } else {
          setPythonResult(false);
          setPythonMessage(python_result);
        }
        console.log('Execution Result:', python_result);
      } catch (error) {
        console.error('Error executing Python code:', error.message);
      }
    } else {
      const combined = `${code2}\n${code3}`;
      setRunType("Test");
      setCombinedCode(combined);
    }
  };

  const handleRun = async () => {
    if (getCurrentLanguage() === languageStore.Languages.PYTHON) {
      try {
        console.log(JSON.stringify(task.testCases));
        console.log(code2);
        const response = await fetch('http://localhost:3000/tasks/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'id': Cookies.get('id'),
            'accessToken': Cookies.get('accessToken'),
          },
          body: JSON.stringify({
            code: code2,
            tests: task.testCases,
            language: "Python",
            type: "Run",
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
        }

        const python_result = await response.json();
        let trash = "";
        if (python_result.success === true) {
          setPythonResult(true);
          trash = "Pass";
          setPythonMessage(python_result.result);
        } else {
          setPythonResult(false);
          trash = "Fail";
          setPythonMessage(python_result);
          console.log(pythonMessage)
          console.log(pythonResult)
        }

        try {
          fetch('http://localhost:3000/res/attempts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'id': Cookies.get('id'),
                'accessToken': Cookies.get('accessToken'),
            },
            body: JSON.stringify({
                task_id: task.id,
                user_id: Cookies.get("id"),
                language: "Python",
                time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                result: trash,
            }),
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to post attempt');
              }
              return response.json();
          })
          .then(result_attempt => {
              setAttempt([...attempt, {
                  id: result_attempt._id,
                  taskId: result_attempt.task_id,
                  userName: uname,
                  language: result_attempt.language,
                  result: result_attempt.result,
                  time: result_attempt.time
              }]);
              console.log('Execution Result:', python_result);
          })
          .catch(error => {
              console.error('Error:', error.message);
          });
        
        } catch (error) {
          console.error('Error:', error.message);
        }

        console.log('Execution Result:', python_result);
      } catch (error) {
        console.error('Error executing Python code:', error.message);
      }
    } else {
      const functionName = generateFunctionName(task.name);
      let tpart1 = ``;
      let tpart2 = ``;
      tpart2 = `[`;
      for (let i = 0; i < task.testCases.length; i++) {
        tpart1 =
          tpart1 +
          `const result${i} = JSON.stringify(${functionName}(${task.testCases[i].input})) === JSON.stringify(${task.testCases[i].expected_output});\n`;
        tpart2 = tpart2 + `result${i}, `;
      }
      tpart2 = tpart2.slice(0, -2) + `];`;
      setRunType("Run");
      const combined = `${code2}\n${tpart1 + tpart2}`;
      setCombinedCode(combined);
      console.log(result);
    }
  };

  const processingResultJs = async () => {
    if (result && runType === "Run") {
      let summary = "Pass";
      console.log(result);
      for (const el of result) {
        if (el === false) {
          summary = "Fail";
        }
      }
      try {
        const response = await fetch('http://localhost:3000/res/attempts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'id': Cookies.get('id'),
            'accessToken': Cookies.get('accessToken'),
          },
          body: JSON.stringify({
            task_id: task.id,
            user_id: Cookies.get("id"),
            language: "JS",
            time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            result: summary,
          }),
        });
        const result_attempt = await response.json();
        setAttempt([...attempt, { id: result_attempt._id, taskId: result_attempt.task_id, userName: uname, language: result_attempt.language, result: result_attempt.result, time: result_attempt.time }]);
        console.log('Execution Result:', result_attempt);
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  }

  useEffect(() => {
    if (runType === "Run") {
      processingResultJs();
    }
  }, [runType, result]);

  const handleResult = () => {
    console.log(pythonResult)
    if (!result && pythonResult === null) return "";

    if (getCurrentLanguage() === languageStore.Languages.PYTHON) {
      if (pythonResult === true){
        return `<span class="problem-result-green">All tests passed!</span>\n`
      }else{
        const combinedResults = pythonMessage.map((element, index) => {
          return `<span class="problem-result-red">${element}</span>\n`;
        }).join('');
        return combinedResults;
      }
    }else{
      const resultArray = JSON.stringify(result).slice(1, -1).split(",");
      const errorArray = error ? [error] : [];
      const combinedResults = resultArray.map((element, index) => {
        let expectedValue = null;
        try {
          expectedValue = task.testCases[index].expected_output;
        } catch (error) {
          console.log("Expected value detected, but no test case found");
          expectedValue = true;
        }
        return element === 'true' ?
            `<span class="problem-result-green">Test${index + 1}: [✓]</span>\n` :
            `<span class="problem-result-red">Test${index + 1}: [✗] expected ${expectedValue}</span>\n`;
      }).concat(errorArray.map(err => `<span class="problem-result-error">\nError: ${err}!!!</span>\n`));

      return combinedResults.join('');
    }
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="general">
      <div className="problem-container">
        <div className="problem-info">
          <span className={"name"}>
            <div
              className={`big-difficulty-circle ${task.difficulty.toLowerCase()}`}
            ></div>
            <h2>{task.name}</h2>
          </span>
          <p>{task.description}</p>
          {/*<ModalResult state={"Lose"} />*/}
        </div>

        <div className="test-case-visualizing">
          <h2 style={{ marginTop: 0, paddingTop: 20 }}>Examples</h2>
          {task.testCases.slice(0, 2).map(testCase => (
            <VisualizingTestCase
              data={{
                input: testCase.input,
                output: testCase.expected_output,
              }}
              type={{
                input: parseInt(task.input_type),
                output: parseInt(task.output_type),
              }}
            />
          ))}
        </div>

        <div className="tests">
          <h2>Results:</h2>
          {(result || error || pythonResult || pythonMessage) && (
            <pre className="problem-results-text" dangerouslySetInnerHTML={{ __html: handleResult() }} />
          )}
        </div>

        <div className="additional-info">
          <div className="like-dislike-buttons">
            <button
              onClick={handleLike}
              className={selectedButton === "like" ? "selected" : ""}
            >
              👍 {likeCount}
            </button>
            <button
              onClick={handleDislike}
              className={selectedButton === "dislike" ? "dislike-selected" : ""}
            >
              👎 {dislikeCount}
            </button>
          </div>
        </div>

        <ProblemAttemptTable data={attempt} />
      </div>

      <div className="code-block">
        <div className="language">
          <label htmlFor="language-select">
            Choose a programming language:
          </label>
          <select
            id="language-select"
            value={getCurrentLanguage()}
            onChange={(e) => setCurrentLanguage(e.target.value)}
          >
            <option value="">--Please choose an option--</option>
            <option value={Languages.JAVASCRIPT}>JavaScript</option>
            <option value={Languages.PYTHON}>Python</option>
          </select>
        </div>
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
        <div className="self-test">
          <div className="input-test">
            <p>Test input:</p>
            <CodeEditor
              className="w-tc-editor-var"
              minHeight={200}
              value={code3}
              language={getCurrentLanguage()}
              onChange={(evn) => setCode3(evn.target.value)}
              padding={15}
              data-color-mode="dark"
              style={{
                backgroundColor: "#f5f5f5",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
            />
          </div>
        </div>
        <div className="button-group">
          <button onClick={handleTest}>Test</button>
          <button onClick={handleRun}>Run</button>
        </div>
      </div>
    </div>
  );
});

export default ProblemPage;


