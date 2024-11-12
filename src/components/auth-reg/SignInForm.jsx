import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../store/AuthStore';
import './Form.css';

const { Item } = Form;

const SignInForm = observer(({ toggleToSignUp, onForgotPassword }) => {
  const [form] = Form.useForm();

  // const onFinish = async (values) => {
  //   authStore.signIn(values.email, values.password);
  // };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Log In</h2>
      <Form form={form} name="login" layout="vertical" onFinish={onFinish} className="auth-form">
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

        <Item>
          <Button type="primary" htmlType="submit" loading={authStore.isLoading} className="auth-form-button">
            Log In
          </Button>
        </Item>
      </Form>

      <div className="form-switch">
        <span>Don't have an account? </span>
        <a onClick={toggleToSignUp}>Sign Up</a>
      </div>
      <div className="auth-alt-options">
        <Button type="default">
          Sign in with GitHub
        </Button>
      </div>
      <div className="form-switch">
        <a onClick={onForgotPassword}>Forgot password?</a>
      </div>
    </div>
  );
});

export default SignInForm;
