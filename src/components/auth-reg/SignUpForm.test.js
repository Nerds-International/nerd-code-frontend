import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  const toggleFormMock = jest.fn();
  const onCompleteMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Сбросить моки перед каждым тестом
  });

  test('renders form elements', () => {
    render(<SignUpForm toggleForm={toggleFormMock} onComplete={onCompleteMock} />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  test('calls onComplete when form is submitted successfully', async () => {
    render(<SignUpForm toggleForm={toggleFormMock} onComplete={onCompleteMock} />);
    
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.input(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(onCompleteMock).toHaveBeenCalled();
    });
  });

  test('shows validation messages when fields are empty', async () => {
    render(<SignUpForm toggleForm={toggleFormMock} onComplete={onCompleteMock} />);
    
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(await screen.findByText(/please input your email/i)).toBeInTheDocument();
    expect(await screen.findByText(/please input your password/i)).toBeInTheDocument();
    expect(await screen.findByText(/please confirm your password/i)).toBeInTheDocument();
  });

  test('calls toggleForm when log in link is clicked', () => {
    render(<SignUpForm toggleForm={toggleFormMock} onComplete={onCompleteMock} />);
    
    fireEvent.click(screen.getByText(/log in/i));

    expect(toggleFormMock).toHaveBeenCalled();
  });
});