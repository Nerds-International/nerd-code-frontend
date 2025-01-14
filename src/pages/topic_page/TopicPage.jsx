import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { forumStore } from "../../store/forum/ForumStore";
import { authStore } from "../../store/auth/AuthStore"; // Импортируйте authStore
import { Button, Card, Divider, Empty, Flex, List, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import NerdFaceImage from "../../components/nerd_face_image/NerdFaceImage";
import { useMemo, useState } from "react";
import SendMessageModal from "../../components/send_message_modal/SendMessageModal";
import Like from "../../components/like/Like";

const { Title } = Typography;

const TopicPage = observer(() => {
  const { getTopic, addMessageToTopic, addValueToTopicLikes } = forumStore;
  const { topicId } = useParams();
  const topic = useMemo(() => getTopic(topicId), [topicId]);
  const [isSendMessageModalVisible, setIsSendMessageModalVisible] = useState(false);

  const handleSendMessageButtonClick = () => {
    setIsSendMessageModalVisible(true);
  };

  const addToMessageList = (messageData) => {
    addMessageToTopic(topicId, messageData);
  };

  const handleEditCount = (value) => {
    addValueToTopicLikes(topicId, value);
  };

  return (
    <>
      <Card style={{ margin: 50 }}>
        <Meta
          title={<Title level={1}>{topic.title}</Title>}
          description={`Created by @${topic.author}, at ${topic.time}`}
        />
        <Like clickable={true} count={topic.likes} editCount={handleEditCount} />
        <Divider />
        <Title level={3}>{topic.text}</Title>
      </Card>
      <Card style={{ margin: 50 }}>
        <Flex justify={'space-between'} align={'baseline'}>
          <Title level={3}>Messages</Title>
          <Button
            style={{ width: 250 }}
            onClick={handleSendMessageButtonClick}
            disabled={!authStore.isAuthenticated} // Отключить кнопку, если пользователь не аутентифицирован
          >
            Send message
          </Button>
        </Flex>
        <Divider />
        {topic.messages.length === 0 && (
          <Empty description={'No comments yet... Be first!'} image={<NerdFaceImage />} />
        )}
        {topic.messages.length > 0 && (
          <List
            style={{ overflow: 'scroll' }}
            dataSource={topic.messages}
            renderItem={(message) => (
              <List.Item>
                <Meta
                  title={message.text}
                  description={`Authored by @${message.author}, at ${message.time}`}
                />
              </List.Item>
            )}
          />
        )}
      </Card>

      <SendMessageModal
        visible={isSendMessageModalVisible}
        setVisible={setIsSendMessageModalVisible}
        addToMessageList={addToMessageList}
      />
    </>
  );
});

export default TopicPage;
