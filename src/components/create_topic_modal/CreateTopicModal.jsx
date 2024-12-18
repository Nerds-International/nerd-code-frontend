import { observer } from "mobx-react-lite";
import { forumStore } from "../../store/forum/ForumStore";
import { Form, Input, Modal, Button, Flex } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "./CreateTopicModal.css";

const CreateTopicModal = observer(({ visible, setVisible }) => {
  const { addTopic } = forumStore;
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      /* ============================================ mock ========================================= */
      const topicData = {
        author: "RomaZZZ",
        title: values.title,
        text: values.text,
      };

      addTopic(topicData);

      setVisible(false);
      form.resetFields();
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      footer={
        <Flex justify="end" gap="10px">
          <Button key="cancel" className="create-topic-modal-button create-topic-cancel-button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button key="ok" className="create-topic-modal-button create-topic-ok-button" type="primary" onClick={handleOk}>
            OK
          </Button>
        </Flex>
      }
    >
      <Form form={form} layout={"vertical"}>
        <Form.Item
          label={"Title"}
          rules={[{ required: true, message: "Input title of topic" }]}
          name="title"
        >
          <Input className="create-topic-title" placeholder={"Title"} />
        </Form.Item>

        <Form.Item
          label={"Text"}
          rules={[{ required: true, message: "Input text of topic" }]}
          name="text"
        >
          <TextArea
            className="create-topic-text"
            placeholder={"Text of topic"}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default CreateTopicModal;
