import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../store/AuthStore';
import './Form.css';

const { Item } = Form;

const SignInForm = observer(({ toggleForm }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    authStore.signIn(values.username, values.password);
  };

  return (
    <>
      <h2 className="auth-form-title">Login</h2>
      <Form
        form={form}
        name="auth"
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

        <Item>
          <Button
            type="primary"
            htmlType="submit"
            className="auth-form-button"
            loading={authStore.isLoading}
          >
            Log In
          </Button>
        </Item>
      </Form>
      <div className="form-switch">
        <span>Don't have an account?</span>
        <a onClick={toggleForm} className="auth-form-link">Sign up</a>
      </div>
    </>
  );
});

export default SignInForm;
