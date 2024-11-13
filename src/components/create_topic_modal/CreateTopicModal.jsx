import {observer} from "mobx-react-lite";
import {forumStore} from "../../store/forum/ForumStore";
import {Form, Input, Modal} from "antd";
import TextArea from "antd/lib/input/TextArea";

const CreateTopicModal = observer(({visible, setVisible}) => {
  const { addTopic } = forumStore;
  const [form] = Form.useForm()

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      /* ============================================ mock ========================================= */
      const topicData = {
        author: 'RomaZZZ',
        title: values.title,
        text: values.text,
      };

      addTopic(topicData)

      setVisible(false);
      form.resetFields();
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
        label={'Title'}
        rules={[{required: true, message: 'Input title of topic'}]}
        name='title'
      >
        <Input placeholder={'Title'}/>
      </Form.Item>

      <Form.Item
        label={'Text'}
        rules={[{required: true, message: 'Input text of topic'}]}
        name='text'
      >
        <TextArea placeholder={'Text of topic'} style={{
          minHeight: 50,
          maxHeight: 400,
        }}/>
      </Form.Item>

    </Form>
  </Modal>);
});

export default CreateTopicModal;