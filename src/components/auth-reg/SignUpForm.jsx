import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../store/AuthStore';
import './Form.css';

const { Item } = Form;

const SignUpForm = observer(({ toggleForm }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    authStore.signUp(values.username, values.password, values.confirmPassword);
  };

  return (
    <>
      <h2 className="auth-form-title">Sign Up</h2>
      <Form
        form={form}
        name="signup"
        layout="vertical"
        onFinish={onFinish}
        className="auth-form"
      >
        <Item
          label={<span className="auth-form-label">Username</span>}
          name="username"
          className="auth-form-item"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Enter your username" className="auth-form-input" />
        </Item>

        <Item
          label={<span className="auth-form-label">Password</span>}
          name="password"
          className="auth-form-item"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter your password" className="auth-form-input" />
        </Item>

        <Item
          label={<span className="auth-form-label">Confirm Password</span>}
          name="confirmPassword"
          className="auth-form-item"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password placeholder="Confirm your password" className="auth-form-input" />
        </Item>

        <Item>
          <Button
            type="primary"
            htmlType="submit"
            className="auth-form-button"
            loading={authStore.isLoading}
          >
            Sign Up
          </Button>
        </Item>
      </Form>
      <div className="form-switch">
        <span>Already have an account?</span>
        <a onClick={toggleForm} className="auth-form-link">Log in</a>
      </div>
    </>
  );
});

export default SignUpForm;
