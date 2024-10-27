import { observer } from 'mobx-react-lite';
import TaskStore from '../../store/TaskStore';
import './ListTask.css';

const ListTask = observer(() => {
    const { tasks } = TaskStore;

    return (
        <div className="task-list">
            {tasks.map(task => (
                <div key={task.id} className="task-item">
                    <h3>{task.name}</h3>
                    <p>{task.description.slice(0, 50)}...</p>
                    <p>Difficulty: {task.difficulty}</p>
                    <a href={`/task?id=${task.id}`} className="task-button">View Task</a>
                </div>
            ))}
        </div>
    );
});

export default ListTask;