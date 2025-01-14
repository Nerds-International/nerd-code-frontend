import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../store/auth/AuthStore';
import './Form.css';

const { Item } = Form;

const SignUpForm = observer(({ toggleForm, onComplete }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    onComplete(values.email, values.password, values.confirmPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.assign('http://localhost:3000/auth/github');
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Join NerdCode</h2>
      <Form form={form} name="signup" layout="vertical" onFinish={onFinish} className="auth-form">
        <Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Your email" />
        </Item>

        <Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Your password" />
        </Item>

        <Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Item>

        <Item>
          <Button type="primary" htmlType="submit" loading={authStore.isLoading} className="auth-form-button">
            Continue
          </Button>
        </Item>
      </Form>

      <div className="form-switch">
        <span>Already have an account? </span>
        <a onClick={toggleForm}>Log in</a>
      </div>
      <div className="auth-alt-options">
        <Button onClick={handleLogin} type="default">
          Sign in with GitHub
        </Button>
      </div>
    </div>
  );
});

export default SignUpForm;
