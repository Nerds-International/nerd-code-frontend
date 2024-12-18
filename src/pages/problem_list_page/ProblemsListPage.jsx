import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import ListTask from "../../components/list_task/ListTask";
import { Input, Radio, Card } from 'antd';
import './ProblemsListPage.css';
import problemsStore from "../../store/problem/ProblemsStore";

const ProblemsListPage = observer(() => {
    const store = problemsStore;
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const difficultyOrder = {
        'easy': 1,
        'medium': 2,
        'hard': 3
    };

    const fetchTasks = async (page = 1, limit = 10) => {
        try {
            const url = new URL('http://localhost:3000/tasks/list');
            url.searchParams.append('page', page);
            url.searchParams.append('limit', limit);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error fetching tasks');
            }

            const data = await response.json();
            const getTask = [];
            for (let i = 0; i < data.total; i++){
                getTask.push({ id: data.tasks[i]._id, name: data.tasks[i].title, description: data.tasks[i].description, difficulty: data.tasks[i].difficulty, likes: data.tasks[i].likes, dislikes: data.tasks[i].dislikes,  createdAt: data.tasks[i].created_at, testCases: data.tasks[i].test_cases});
            }
            store.setTask(getTask);
            console.log(getTask)
        } catch (error) {
            console.error('Error fetching tasks:', error.message || 'Error fetching tasks');
        } finally {
            console.log("nice");
        }
    };

    useEffect(() => {
        fetchTasks(1, 10);
    }, []);

    const filterTasks = () => {
        return store.tasks.filter(task => {
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
    };

    const filteredTasks = filterTasks();

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
                    <Radio value="easy">Easy</Radio>
                    <Radio value="medium">Medium</Radio>
                    <Radio value="hard">Hard</Radio>
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
