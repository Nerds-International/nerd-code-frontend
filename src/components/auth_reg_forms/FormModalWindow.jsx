import { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import CompleteProfileForm from './CompleteProfileForm';
import { CloseOutlined } from '@ant-design/icons';
import './FormModalWindow.css';

const FormModalWindow = ({ onClose, isLogin }) => {
  const [formType, setFormType] = useState(() => (isLogin ? 'signIn' : 'signUp'));
  const [userData, setUserData] = useState({});

  const handleComplete = (email, password, confirmPassword) => {
    setUserData({ email, password, confirmPassword});
    setFormType('completeProfile');
  };

  return (
    <div className="form-modal">
      <div className="form-container auth-form-container">
        <div className="form-modal-header">
          <button className="close-button" onClick={onClose}>
            <CloseOutlined />
          </button>
        </div>
        <div className="form-modal-content">
          {formType === 'signIn' && (
            <SignInForm
              toggleToSignUp={() => setFormType('signUp')}
              onForgotPassword={() => setFormType('forgotPassword')}
              onClose={onClose} // Передаем функцию закрытия модального окна
            />
          )}
          {formType === 'signUp' && (
            <SignUpForm
              toggleForm={() => setFormType('signIn')}
              onComplete={handleComplete}
            />
          )}
          {formType === 'forgotPassword' && (
            <ForgotPasswordForm
              onCancel={() => setFormType('signIn')}
            />
          )}
          {formType === 'completeProfile' && (
            <CompleteProfileForm
              backToSignIn={() => setFormType('signIn')}
              userData={userData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormModalWindow;
