import { render, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CompleteProfileForm from './CompleteProfileForm';
import { authStore } from '../../store/auth/AuthStore';

jest.mock('../../store/auth/AuthStore');

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};

describe('CompleteProfileForm', () => {
    const userData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
    };

    const backToSignIn = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the form with all fields', () => {
        const { getByText, getByPlaceholderText } = render(
            <CompleteProfileForm userData={userData} backToSignIn={backToSignIn} />
        );

        expect(getByText('Complete Your Profile')).toBeInTheDocument();
        expect(getByPlaceholderText('Username')).toBeInTheDocument();
        expect(getByPlaceholderText('Full name')).toBeInTheDocument();
        expect(getByText('Choose an avatar')).toBeInTheDocument();
        expect(getByText('I have read and agree with the Terms of Service and Code of Conduct')).toBeInTheDocument();
        expect(getByText('Create account')).toBeInTheDocument();
    });

    it('calls authStore.signUp and backToSignIn on form submission', async () => {
        authStore.signUp.mockResolvedValueOnce();

        const { getByPlaceholderText, getByText, getByRole } = render(
            <CompleteProfileForm userData={userData} backToSignIn={backToSignIn} />
        );

        fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(getByPlaceholderText('Full name'), { target: { value: 'Test User' } });

        fireEvent.mouseDown(getByText('Choose an avatar'));
        const avatarOption = getByText('Avatar 1');
        fireEvent.click(avatarOption);

        const submitButton = getByRole('button', { name: 'Create account' });
        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(authStore.signUp).toHaveBeenCalledWith(
            userData.email,
            userData.password,
            'testuser',
            'Test User',
            1,
            userData.confirmPassword
        );

        expect(backToSignIn).toHaveBeenCalled();
    });

});
