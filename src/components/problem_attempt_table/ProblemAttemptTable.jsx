import { observer } from "mobx-react-lite";
import './ProblemAttemptTable.css';

const ProblemAttemptTable = observer(({ data }) => {
    return (
        <table className="problem-attempt-table">
            <thead className="table-header">
            <tr>
                <th>ID</th>
                <th>Task ID</th>
                <th>User Name</th>
                <th>Language</th>
                <th>Result</th>
                <th>Time</th>
            </tr>
            </thead>
            <tbody className="table-body">
            {data.map((item) => (
                <tr key={item.id} className="table-row">
                    <td>{item.id}</td>
                    <td>{item.taskId}</td>
                    <td>{item.userName}</td>
                    <td>{item.language}</td>
                    <td>{item.result}</td>
                    <td>{item.time}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
});

export default ProblemAttemptTable;