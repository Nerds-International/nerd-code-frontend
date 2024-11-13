import { Form, Input, Button, Checkbox, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../store/auth/AuthStore';
import './Form.css';

const { Item } = Form;
const { Option } = Select;

const avatarOptions = [
  { label: 'Avatar 1', value: 'avatar1' },
  { label: 'Avatar 2', value: 'avatar2' },
  { label: 'Avatar 3', value: 'avatar3' },
];

const CompleteProfileForm = observer(() => {
  const [form] = Form.useForm();

//   const onFinish = (values) => {
//   };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Complete Your Profile</h2>
      <Form form={form} name="profile" layout="vertical" onFinish={onFinish} className="auth-form">
        <Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Item>

        <Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input placeholder="Full name" />
        </Item>

        <Item
          label="Avatar"
          name="avatar"
          rules={[{ required: true, message: 'Please choose an avatar!' }]}
        >
          <Select placeholder="Choose an avatar">
            {avatarOptions.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Item>

        <Item>
          <Checkbox>
            I have read and agree with the Terms of Service and Code of Conduct
          </Checkbox>
        </Item>

        <Item>
          <Button type="primary" htmlType="submit" className="auth-form-button">
            Create account
          </Button>
        </Item>
      </Form>
    </div>
  );
});

export default CompleteProfileForm;
