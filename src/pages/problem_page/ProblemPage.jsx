import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import problemsStore from "../../store/problem/ProblemsStore";
import './ProblemPage.css';
import CodeEditor from "@uiw/react-textarea-code-editor";
import { languageStore } from "../../store/language/LanguageStore";

const ProblemPage = observer(() => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const task = problemsStore.tasks.find(task => task.id === id);
    const [code2, setCode2] = useState("");
    const [code3, setCode3] = useState("");
    const { Languages, getCurrentLanguage, setCurrentLanguage } = languageStore;
    const [likeCount, setLikeCount] = useState(task.likes);
    const [dislikeCount, setDislikeCount] = useState(task.dislikes);
    const [selectedButton, setSelectedButton] = useState(null);

    useEffect(() => {
        if (task) {
            const functionName = generateFunctionName(task.name);
            let functionTemplate;
            let tests = ``
            if (getCurrentLanguage() === Languages.JAVASCRIPT) {
                functionTemplate = `function ${functionName}() {\n    // Your function code here\n    return 0; \n}`;
                for (let i = 0; i < task.testCases.length; i++){
                    tests = tests + `${functionName}(${task.testCases[i].input}) === ${task.testCases[i].expected_output};\n`
                }
            } else {
                functionTemplate = `def ${functionName}() :\n    // Your function code here\n    return 0 \n`;
                for (let i = 0; i < task.testCases.length; i++){
                    tests = tests + `${functionName}(${task.testCases[i].input}) == ${task.testCases[i].expected_output}\n`
                }
            }
            setCode2(functionTemplate);
            setCode3(tests);
        }
    }, [task, getCurrentLanguage()]);

    const generateFunctionName = (name) => {
        const words = name.split(/\s+/);
        const firstWord = words[0].charAt(0).toLowerCase() + words[0].slice(1);
        const functionName = firstWord + words.slice(1).join('');
        return functionName;
    };

    const handleLike = () => {
        if (selectedButton !== 'like') {
            setLikeCount(likeCount + 1);
            setSelectedButton('like');
            if (selectedButton === 'dislike') {
                setDislikeCount(dislikeCount - 1);
            }
        }
    };

    const handleDislike = () => {
        if (selectedButton !== 'dislike') {
            setDislikeCount(dislikeCount + 1);
            setSelectedButton('dislike');
            if (selectedButton === 'like') {
                setLikeCount(likeCount - 1);
            }
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
                        <div className={`big-difficulty-circle ${task.difficulty.toLowerCase()}`}></div>
                        <h2>{task.name}</h2>
                    </span>
                    <p>{task.description}</p>
                </div>

                <div className="tests">
                    <h2>Results:</h2>
                </div>

                <div className="additional-info">
                    <h3>Total Solutions: 267</h3>
                    <div className="like-dislike-buttons">
                        <button
                            onClick={handleLike}
                            className={selectedButton === 'like' ? 'selected' : ''}
                        >
                            👍 {likeCount}
                        </button>
                        <button
                            onClick={handleDislike}
                            className={selectedButton === 'dislike' ? 'dislike-selected' : ''}
                        >
                            👎 {dislikeCount}
                        </button>
                    </div>
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
                    <button>Test</button>
                    <button>Run</button>
                </div>
            </div>
        </div>
    );
});

export default ProblemPage;



