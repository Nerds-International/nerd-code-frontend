import { observer } from 'mobx-react-lite';
import './ListTask.css';
import {Link} from "react-router-dom";

const ListTask = observer(({ tasks }) => {
    return (
        <div className="task-list">
            {tasks.map(task => (
                <div key={task.id} className="task-item">
                    <div className="task-header">
                        <div className={`difficulty-circle ${task.difficulty.toLowerCase()}`}></div>
                        <h3>{task.name}</h3>
                    </div>
                    <p>{task.description.slice(0, 50)}...</p>
                    <Link to={`/problem?id=${task.id}`} className="task-link">View Task</Link>
                </div>
            ))}
        </div>
    );
});

export default ListTask;

