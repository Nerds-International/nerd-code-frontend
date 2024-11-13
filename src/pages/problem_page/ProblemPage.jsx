import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TaskStore from '../../store/task/TaskStore';
import './ProblemPage.css';
import CodeEditor from "@uiw/react-textarea-code-editor";
import { languageStore } from "../../store/language/LanguageStore";

const ProblemPage = observer(() => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const task = TaskStore.tasks.find(task => task.id === parseInt(id));
    const [code2, setCode2] = useState("");
    const { Languages, getCurrentLanguage, setCurrentLanguage } = languageStore;
    const [inputTest, setInputTest] = useState('');

    const handleInputTest = (e) => {
        setInputTest(e.target.value);
    };

    if (!task) {
        return <div>Task not found</div>;
    }

    return (
        <div className="general">
            <div className="problem-container">
                <div className="problem-info">
                    <h2>{task.name}</h2>
                    <p>{task.description}</p>
                </div>

                <div className="tests">
                    <div className="test-cases">
                        <h3>Test Cases:</h3>
                        <p>Test1: (A, B) ➔ C</p>
                        <p>Test2: (F, G) ➔ H</p>
                    </div>
                    <div className="test-results">
                        <h3>Test Results:</h3>
                        <p>Test1: C ✔️</p>
                        <p>Test2: Z ❌, expected: H </p>
                    </div>
                </div>

                <div className="additional-info">
                    <h3>Total Solutions: 267</h3>
                    <p>👍 148 👎 53</p>
                </div>
            </div>

            <div className="code-block">
                <div className="language">
                    <label htmlFor="language-select">Choose a programming language:</label>
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
                        <textarea
                            placeholder="Enter test"
                            value={inputTest}
                            onChange={handleInputTest}
                        />
                    </div>
                    <div className="test-result-container">
                        <p>Test output:</p>
                    </div>
                </div>
                <div className="button-group">
                    <button>Test</button>
                    <button>Run</button>
                </div>
            </div>
        </div>
    );
});

export default ProblemPage;


