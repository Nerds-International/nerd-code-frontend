import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListTask from './ListTask';
import ProblemsStore from '../../store/problem/ProblemsStore';

describe('ListTask Component', () => {
    beforeEach(() => {
        ProblemsStore.tasks = [
            { id: 1, name: 'Task 1', description: 'This is the description for task 1', difficulty: 'Easy' },
            { id: 2, name: 'Task 2', description: 'This is the description for task 2', difficulty: 'Medium' },
            { id: 3, name: 'Task 3', description: 'This is the description for task 3', difficulty: 'Hard' },
        ];
    });

    test('renders ListTask component', () => {
        render(<ListTask tasks={ProblemsStore.tasks} />);
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.getByText('Task 3')).toBeInTheDocument();
    });
});

