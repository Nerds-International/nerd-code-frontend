import React from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import { useState } from 'react';
import './Form.css';

const { Title } = Typography;

const SignUpForm = ({ setIsAuthenticated }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    
    if (values.password !== values.confirmPassword) {
      notification.error({
        message: 'Registration Failed',
        description: 'Passwords do not match!',
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error during registration');
      }

      const data = await response.json();

      notification.success({
        message: 'Registration Successful',
        description: 'You have successfully signed up!',
      });

      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('uuid', data.uuid);

      setIsAuthenticated(true);
      

    } catch (error) {
      notification.error({
        message: 'Registration Failed',
        description: error.message || 'Error during registration',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <Title level={3} className="auth-form-title">Sign Up</Title>
      <Form
        name="signup"
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

        <Form.Item
          label={<span className="auth-form-label">Confirm Password</span>}
          name="confirmPassword"
          className="auth-form-item"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="auth-form-button"
            loading={isLoading}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <a className="auth-form-link" href="/login">Already have an account? Log in</a>
    </div>
  );
};

export default SignUpForm;
