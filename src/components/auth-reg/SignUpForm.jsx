import { Form, Input, Button, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../store/AuthStore';
import './Form.css';

const { Title } = Typography;

const SignUpForm = observer(() => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    authStore.signUp(values.username, values.password, values.confirmPassword);
  };

  return (
    <div className="auth-form-container">
      <Title level={3} className="auth-form-title">Sign Up</Title>
      <Form
        form={form}
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
            loading={authStore.isLoading}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <a className="auth-form-link" href="/signin">Already have an account? Log in</a>
    </div>
  );
});

export default SignUpForm;
