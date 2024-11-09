import { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { CloseOutlined } from '@ant-design/icons'; // Импортируем иконку CloseOutlined из Ant Design
import './Form.css'; // Импортируем CSS файл

const FormModalWindow = ({ onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="auth-form-container">
        <div className="form-modal-header">
            <button className="close-button" onClick={onClose}>
                <CloseOutlined />
            </button>
        </div>
          <div className="form-modal-content">
            {isSignIn ? (
              <SignInForm toggleForm={toggleForm} />
            ) : (
              <SignUpForm toggleForm={toggleForm} />
            )}
          </div>
    </div>
  );
};

export default FormModalWindow;
