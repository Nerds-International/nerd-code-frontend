import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModalResult from './ModalResult';

describe('ModalResult', () => {
    test('renders the modal with success state', () => {
        render(<ModalResult state="Success" />);
        expect(screen.getByText('Success')).toBeInTheDocument();
        expect(screen.getByText('✅')).toBeInTheDocument();
    });

    test('renders the modal with lose state', () => {
        render(<ModalResult state="Lose" />);
        expect(screen.getByText('You lose')).toBeInTheDocument();
        expect(screen.getByText('😢')).toBeInTheDocument();
    });

    test('renders the modal with win state', () => {
        render(<ModalResult state="Win" />);
        expect(screen.getByText('You win, 100% nerd')).toBeInTheDocument();
        expect(screen.getByText('🤓')).toBeInTheDocument();
    });

    test('closes the modal when clicking the close button', () => {
        render(<ModalResult state="Success" />);
        fireEvent.click(screen.getByText('Close'));
        expect(screen.queryByText('Success')).not.toBeInTheDocument();
    });

    test('does not close the modal when clicking inside the content', () => {
        render(<ModalResult state="Success" />);
        fireEvent.click(screen.getByText('Success'));
        expect(screen.queryByText('Success')).toBeInTheDocument();
    });
});
