import React from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import { useState } from 'react';
import './Form.css';

const { Title } = Typography;

const AuthForm = ({ setIsAuthenticated }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      notification.success({
        message: 'Login Successful',
        description: 'You have successfully logged in!',
      });

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('uuid', data.uuid);

      setIsAuthenticated(true);
    } catch (error) {
      notification.error({
        message: 'Login Failed',
        description: error.message || 'Error during login',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <Title level={3} className="auth-form-title">Login</Title>
      <Form
        name="auth"
        layout="vertical"
        onFinish={onFinish}
        className="auth-form"
      >
        <Form.Item
          label={<span className="auth-form-label">Username</span>}
          name="username"
          className="auth-form-item"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label={<span className="auth-form-label">Password</span>}
          name="password"
          className="auth-form-item"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="auth-form-button"
            loading={isLoading}
          >
            Log In
          </Button>
        </Form.Item>
      </Form>

      <a className="auth-form-link" href="/signup">Don't have an account? Sign up</a>
    </div>
  );
};

export default AuthForm;
