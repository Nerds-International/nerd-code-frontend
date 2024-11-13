import {observer} from "mobx-react-lite";
import {Form, Modal} from "antd";
import TextArea from "antd/lib/input/TextArea";

const SendMessageModal = observer(({visible, setVisible, addToMessageList}) => {
  const [form] = Form.useForm()

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      /* ======================== mock ================================ */
      const messageData = {
        author: 'RomaXXX',
        time: new Date().toLocaleDateString(),
        text: values.text
      }

      addToMessageList(messageData);

      form.resetFields();
      setVisible(false);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  }

  return (<Modal
    open={visible}
    onOk={handleOk}
    onCancel={handleCancel}
  >
    <Form form={form} layout={'vertical'}>
      <Form.Item
        label={'Message text'}
        rules={[{required: true, message: 'Input message text'}]}
        name='text'
      >
        <TextArea placeholder={'Text..'} style={{
          minHeight: 50,
          maxHeight: 400,
        }}/>
      </Form.Item>
    </Form>
  </Modal>);
});

export default SendMessageModal;