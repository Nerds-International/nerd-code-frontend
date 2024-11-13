import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import ProblemsStore from '../../store/problem/ProblemsStore';
import ListTask from "../../components/list_task/ListTask";
import './ProblemsListPage.css';

const ProblemsListPage = observer(() => {
    const { tasks } = ProblemsStore;
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
            <div className="filters">
                <input className="name-search"
                       type="text"
                       placeholder="Search by name"
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>Difficulty options:</span>
                <div className="radio-buttons">
                    <label className="line">
                        <input
                            type="radio"
                            value="all"
                            checked={filter === 'all'}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        All
                    </label>
                    <label className="line">
                        <input
                            type="radio"
                            value="Easy"
                            checked={filter === 'Easy'}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        Easy
                    </label>
                    <label className="line">
                        <input
                            type="radio"
                            value="Medium"
                            checked={filter === 'Medium'}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        Medium
                    </label>
                    <label className="line">
                        <input
                            type="radio"
                            value="Hard"
                            checked={filter === 'Hard'}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        Hard
                    </label>
                    <label className="line">
                        <input
                            type="radio"
                            value="Easy to Hard"
                            checked={filter === 'Easy to Hard'}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        Easy to Hard
                    </label>
                    <label className="line">
                        <input
                            type="radio"
                            value="Hard to Easy"
                            checked={filter === 'Hard to Easy'}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        Hard to Easy
                    </label>
                </div>
            </div>
            <div className="task-list-container">
                <ListTask tasks={filteredTasks} />
            </div>
        </div>
    );
});

export default ProblemsListPage;

