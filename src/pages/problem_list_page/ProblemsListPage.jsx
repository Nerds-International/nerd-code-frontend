import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Input, Radio, Card } from 'antd';
import TaskStore from '../../store/task/TaskStore';
import ListTask from "../../components/list_task/ListTask";
import './ProblemsListPage.css';

const ProblemsListPage = observer(() => {
    const { tasks } = TaskStore;
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const difficultyOrder = {
        'Easy': 1,
        'Medium': 2,
        'Hard': 3
    };

    const filteredTasks = tasks.filter(task => {
        const matchesDifficulty = filter === 'all' || filter === 'Easy to Hard' || filter === 'Hard to Easy' || task.difficulty === filter;
        const matchesName = task.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesDifficulty && matchesName;
    }).sort((a, b) => {
        if (filter === 'Easy to Hard') {
            return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        }
        if (filter === 'Hard to Easy') {
            return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
        }
        return 0;
    });

    return (
        <div className="problems-list-page">
            <Card className="filters" title="Filter Options">
                <Input.Search
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    allowClear
                    style={{ marginBottom: '15px' }}
                />
                <span>Difficulty:</span>
                <Radio.Group
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                >
                    <Radio value="all">All</Radio>
                    <Radio value="Easy">Easy</Radio>
                    <Radio value="Medium">Medium</Radio>
                    <Radio value="Hard">Hard</Radio>
                    <Radio value="Easy to Hard">Easy to Hard</Radio>
                    <Radio value="Hard to Easy">Hard to Easy</Radio>
                </Radio.Group>
            </Card>
            <div className="task-list-container">
                <ListTask tasks={filteredTasks} />
            </div>
        </div>
    );
});

export default ProblemsListPage;
