import "./AddTask.css";
import { useState } from "react";
import { observer } from "mobx-react-lite";

const AddTask = observer(() => {
    return (
        <div className="AddTask">
            <Task />
        </div>
    );
});

export default AddTask;

const Task = () => {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [inputData, setInputData] = useState([""]);
    const [outputData, setOutputData] = useState([""]);
    const [maxTime, setMaxTime] = useState([""]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (value) => {
        let newInputData = value.split("\n").filter(item => item.trim() !== "");
        setInputData(newInputData);
    };

    const handleOutputChange = (value) => {
        let newOutputData = value.split("\n").filter(item => item.trim() !== "");
        setOutputData(newOutputData);
    };

    const handleMaxTimeChange = (value) => {
        let newMaxTime = value.split("\n").filter(item => item.trim() !== "");
        setMaxTime(newMaxTime);
    };

    function isValidFloat(str) {
        const floatRegex = /^-?\d+(\.\d+)?$/;
        return floatRegex.test(str);
    }

    const validateData = () => {
        if (inputData.length !== outputData.length || inputData.length !== maxTime.length) {
            setError("The size of the input data, output data and time limit do not match");
            return false;
        }
        for (let i = 0; i < maxTime.length; i++) {
            if (!isValidFloat(maxTime[i])) {
                return false;
            }
        }
        setError("");
        return true;
    };

    async function submitTask() {
        if (!validateData()) return;

        setLoading(true);

        // запрос затычка(переделать под реальный запрос)
        try {
            const response = await fetch("https://example.com/submit-task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    taskName,
                    taskDescription,
                    inputData,
                    outputData,
                    maxTime,
                }),
            });

        } catch (error) {
            console.error("Error submitting task:", error);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="Task">
            <h2>Create Task</h2>
            <div>
                <label htmlFor="taskName">Task Name:</label>
                <input
                    id="taskName"
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="taskDescription">Task Description:</label>
                <textarea
                    id="taskDescription"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="inputData">Input Data:</label>
                <textarea
                    id="inputData"
                    onChange={(e) => handleInputChange(e.target.value)}
                />
                <label htmlFor="outputData">Output Data:</label>
                <textarea
                    id="outputData"
                    onChange={(e) => handleOutputChange(e.target.value)}
                />
                <label htmlFor="maxTime">Max Time (ms):</label>
                <textarea
                    id="maxTime"
                    onChange={(e) => handleMaxTimeChange(e.target.value)}
                />
            </div>
            <button onClick={submitTask} disabled={loading}>
                {loading ? "Submitting..." : "Submit Task"}
            </button>
            {success && <p>Task submitted successfully!</p>}
            {!success && !loading && <p>Task submission failed.</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};


