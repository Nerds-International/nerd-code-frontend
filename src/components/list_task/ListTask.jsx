import { observer } from 'mobx-react-lite';
import './ListTask.css';

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
                    <a href={`/task?id=${task.id}`} className="task-link">View Task</a>
                </div>
            ))}
        </div>
    );
});

export default ListTask;

