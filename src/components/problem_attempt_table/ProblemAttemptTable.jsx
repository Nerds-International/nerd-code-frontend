import {observer} from "mobx-react-lite";

const ProblemAttemptTable = observer( ({ data }) => {
    return (
        <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
            <tr>
                <th>ID</th>
                <th>Task ID</th>
                <th>User Name</th>
                <th>Language</th>
                <th>Result</th>
                <th>Time</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.id}>
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
