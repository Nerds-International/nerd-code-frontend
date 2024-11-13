// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { act } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { observer } from 'mobx-react-lite';
// import { languageStore } from '../../store/language/LanguageStore';
// import Battle from './Battle';
// import '@testing-library/jest-dom/extend-expect';

// // Mock useNavigate hook
// const mockNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockNavigate,
// }));

// // Mock languageStore
// jest.mock('../../store/language/LanguageStore', () => ({
//   languageStore: {
//     Languages: {
//       JAVASCRIPT: 'javascript',
//       PYTHON: 'python',
//     },
//     getCurrentLanguage: jest.fn(),
//     setCurrentLanguage: jest.fn(),
//   },
// }));

// describe('Battle Component', () => {
//   beforeEach(() => {
//     languageStore.getCurrentLanguage.mockReturnValue('javascript');
//     languageStore.setCurrentLanguage.mockImplementation((lang) => {
//       languageStore.getCurrentLanguage.mockReturnValue(lang);
//     });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders the Battle component', () => {
//     render(<Battle />);
//     expect(screen.getByText('Choose a programming language:')).toBeInTheDocument();
//   });

//   it('displays "Looking for nerds..." when findMatch is called', async () => {
//     render(<Battle />);
//     fireEvent.change(screen.getByLabelText('Choose a programming language:'), {
//       target: { value: languageStore.Languages.JAVASCRIPT },
//     });
//     fireEvent.click(screen.getByText('Find Match'));

//     await waitFor(() => {
//       expect(screen.getByText('Looking for nerds...')).toBeInTheDocument();
//     });
//   });

//   it('displays "The nerd for the battle has been found" when match is found', async () => {
//     render(<Battle />);
//     fireEvent.change(screen.getByLabelText('Choose a programming language:'), {
//       target: { value: languageStore.Languages.JAVASCRIPT },
//     });
//     fireEvent.click(screen.getByText('Find Match'));

//     await waitFor(() => {
//       expect(screen.getByText('The nerd for the battle has been found')).toBeInTheDocument();
//     });
//   });

//   it('displays "Nerds not found" when match is not found', async () => {
//     render(<Battle />);
//     fireEvent.change(screen.getByLabelText('Choose a programming language:'), {
//       target: { value: languageStore.Languages.PYTHON },
//     });
//     fireEvent.click(screen.getByText('Find Match'));

//     await waitFor(() => {
//       expect(screen.getByText('Nerds not found')).toBeInTheDocument();
//     });
//   });

//   it('navigates to "/battle" when match is found', async () => {
//     render(<Battle />);
//     fireEvent.change(screen.getByLabelText('Choose a programming language:'), {
//       target: { value: languageStore.Languages.JAVASCRIPT },
//     });
//     fireEvent.click(screen.getByText('Find Match'));

//     await waitFor(() => {
//       expect(mockNavigate).toHaveBeenCalledWith('/battle');
//     });
//   });
// });
