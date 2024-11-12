import { useState, useEffect } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import CompleteProfileForm from './CompeteProfileForm';
import { CloseOutlined } from '@ant-design/icons';
import './FormModalWindow.css';

const FormModalWindow = ({ onClose, isLogin }) => {
  const [formType, setFormType] = useState(() => (isLogin ? 'signIn' : 'signUp')); // Установка начального состояния один раз

  useEffect(() => {
    setFormType(isLogin ? 'signIn' : 'signUp');
  }, [isLogin]);

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
            />
          )}
          {formType === 'signUp' && (
            <SignUpForm
              toggleForm={() => setFormType('signIn')}
              onComplete={() => setFormType('completeProfile')}
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormModalWindow;
