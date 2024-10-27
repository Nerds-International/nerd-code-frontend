import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

describe('Header Component', () => {
    test('renders header with logo and navigation', () => {
        render(<Header />);
        
        // Проверяем, что изображение заголовка отображается
        const logo = screen.getByAltText('nerd-code');
        expect(logo).toBeInTheDocument();

        // Проверяем наличие навигационных ссылок
        expect(screen.getByText('Problems')).toBeInTheDocument();
        expect(screen.getByText('Discuss')).toBeInTheDocument();
        expect(screen.getByText('Battle')).toBeInTheDocument();
        expect(screen.getByText('Log In')).toBeInTheDocument();
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });

    test('logo is linked to homepage', () => {
        render(<Header />);
        
        const logoLink = screen.getByRole('link', { name: /nerd-code/i });
        expect(logoLink).toHaveAttribute('href', '/');
    });

    test('navigation tabs are links', () => {
        render(<Header />);
        
        const problemsTab = screen.getByText('Problems');
        const discussTab = screen.getByText('Discuss');
        const battleTab = screen.getByText('Battle');
        
        expect(problemsTab.closest('a')).toHaveAttribute('href', '/problems');
        expect(discussTab.closest('a')).toHaveAttribute('href', '/discuss');
        expect(battleTab.closest('a')).toHaveAttribute('href', '/battle');
    });

    test('login and signup links are present', () => {
        render(<Header />);
        
        expect(screen.getByText('Log In').closest('a')).toHaveAttribute('href', '/login');
        expect(screen.getByText('Sign Up').closest('a')).toHaveAttribute('href', '/signup');
    });
});
