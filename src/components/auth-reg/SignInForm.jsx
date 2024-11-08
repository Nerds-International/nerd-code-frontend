import { Form, Input, Button, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../store/AuthStore';
import './Form.css';

const { Title } = Typography;

const SignInForm = observer(() => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    authStore.signIn(values.username, values.password);
  };

  return (
    <div className="auth-form-container">
      <Title level={3} className="auth-form-title">Login</Title>
      <Form
        form={form}
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
            loading={authStore.isLoading}
          >
            Log In
          </Button>
        </Form.Item>
      </Form>

      <a className="auth-form-link" href="/signup">Don't have an account? Sign up</a>
    </div>
  );
});

export default SignInForm;
