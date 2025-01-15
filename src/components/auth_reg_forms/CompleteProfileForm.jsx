import { Form, Input, Button, Checkbox, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../store/auth/AuthStore';
import { useState } from 'react'; // Импортируем useState
import './Form.css';

const { Item } = Form;
const { Option } = Select;

const avatarOptions = [
  { value: 1, imgSrc: '/img/avatar1.png', label: 'Avatar 1' },
  { value: 2, imgSrc: '/img/avatar2.png', label: 'Avatar 2' },
  { value: 3, imgSrc: '/img/avatar3.png', label: 'Avatar 3' },
];

const CompleteProfileForm = observer(({ userData, backToSignIn }) => {
  const [form] = Form.useForm();
  
  // Состояние для хранения выбранного аватара
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const onFinish = async (values) => {
    const { email, password, confirmPassword } = userData;
    await authStore.signUp(email, password, values.username, values.fullName, values.avatar, confirmPassword);
    backToSignIn();
  };

  // Обработчик изменения выбора аватара
  const handleAvatarChange = (value) => {
    const avatar = avatarOptions.find(option => option.value === value);
    setSelectedAvatar(avatar ? avatar.imgSrc : null);
  };

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
          <Select placeholder="Choose an avatar" onChange={handleAvatarChange}>
            {avatarOptions.map(option => (
              <Option key={option.value} value={option.value}>
                {/* Отображаем изображение слева и текст справа */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={option.imgSrc} alt={`Avatar ${option.value}`} style={{ width: 20, height: 20, marginRight: 8 }} />
                  {option.label} {/* Текст аватара */}
                </div>
              </Option>
            ))}
          </Select>
        </Item>

        {/* Отображение выбранного аватара */}
        {selectedAvatar && (
          <div style={{ marginTop: 10 }}>
            <h4>Selected Avatar:</h4>
            <img src={selectedAvatar} alt="Selected Avatar" style={{ width: 80, height: 80 }} />
          </div>
        )}

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
