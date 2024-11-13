import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import './Form.css';
import { authStore } from '../../store/auth/AuthStore';

const { Item } = Form;

const ForgotPasswordForm = observer(({ onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    authStore.resetPassword(values.email, values.password);
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Reset Password</h2>
      <Form form={form} name="resetPassword" layout="vertical" onFinish={onFinish} className="auth-form">
        <Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Your email" />
        </Item>

        <Item
          label="New password"
          name="password"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input placeholder="Your new password" />
        </Item>

        <Item>
          <Button type="default" onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" className="auth-form-button">Reset Password</Button>
        </Item>
      </Form>
    </div>
  );
});

export default ForgotPasswordForm;