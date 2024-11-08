import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddTask from './AddTask';

describe('Task Component', () => {
    test('render', () => {
        render(<AddTask />);
        expect(screen.getByText('Create Task')).toBeInTheDocument();
    });

    test('name/description', () => {
        render(<AddTask />);
        const taskNameInput = screen.getByLabelText('Task Name:');
        const taskDescriptionInput = screen.getByLabelText('Task Description:');

        fireEvent.change(taskNameInput, { target: { value: 'Test Task' } });
        fireEvent.change(taskDescriptionInput, { target: { value: 'Test Description' } });

        expect(taskNameInput.value).toBe('Test Task');
        expect(taskDescriptionInput.value).toBe('Test Description');
    });

    test('data validate', () => {
        render(<AddTask />);
        const inputDataTextarea = screen.getByLabelText('Input Data:');
        const outputDataTextarea = screen.getByLabelText('Output Data:');
        const maxTimeTextarea = screen.getByLabelText('Max Time (ms):');

        fireEvent.change(inputDataTextarea, { target: { value: '1\n2\n3' } });
        fireEvent.change(outputDataTextarea, { target: { value: '1\n2\n3' } });
        fireEvent.change(maxTimeTextarea, { target: { value: '10\n20\n30' } });

        const submitButton = screen.getByText('Submit Task');
        fireEvent.click(submitButton);

        expect(screen.queryByText('The size of the input data, output data and time limit do not match')).not.toBeInTheDocument();
        expect(screen.queryByText('The maximum execution time should be float')).not.toBeInTheDocument();
    });

    test('errors check', () => {
        render(<AddTask />);
        const inputDataTextarea = screen.getByLabelText('Input Data:');
        const outputDataTextarea = screen.getByLabelText('Output Data:');
        const maxTimeTextarea = screen.getByLabelText('Max Time (ms):');

        fireEvent.change(inputDataTextarea, { target: { value: '1\n2\n3' } });
        fireEvent.change(outputDataTextarea, { target: { value: '1\n2' } });
        fireEvent.change(maxTimeTextarea, { target: { value: '10\n20\n30' } });

        const submitButton = screen.getByText('Submit Task');
        fireEvent.click(submitButton);

        expect(screen.getByText('The size of the input data, output data and time limit do not match')).toBeInTheDocument();
    });
});
