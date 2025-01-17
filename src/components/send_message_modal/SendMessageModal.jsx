import { observer } from "mobx-react-lite";
import { Form, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Cookies from "js-cookie";

const SendMessageModal = observer(({ visible, setVisible, addToMessageList, topicId }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      form.validateFields()
      .then(values => {
          const topicId = window.location.href.split('/')[4];
          const messageData = {
              authorId: Cookies.get('id'),
              time: new Date().toISOString(),
              text: values.text
          };
  
          return fetch(`http://localhost:3000/forums/${topicId}/comments`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'accessToken': Cookies.get('accessToken'),
                  'id': Cookies.get('id')
              },
              body: JSON.stringify(messageData)
          });
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Ошибка при отправке сообщения');
          }
          return response.json();
      })
      .then(responseData => {
          addToMessageList(responseData);
          form.resetFields();
          setVisible(false);
      })
      .catch(error => {
          console.error(error.message);
      });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal open={visible} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} layout={'vertical'}>
        <Form.Item
          label={'Message text'}
          rules={[{ required: true, message: 'Input message text' }]}
          name='text'
        >
          <TextArea
            placeholder={'Text..'}
            style={{
              minHeight: 50,
              maxHeight: 400,
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default SendMessageModal;
