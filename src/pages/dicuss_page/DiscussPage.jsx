import { observer } from "mobx-react-lite";
import { forumStore } from "../../store/forum/ForumStore";
import { useMemo, useState } from "react";
import "./DiscussPage.css";
import { Button, Flex, Input, List } from "antd";
import CreateTopicModal from "../../components/create_topic_modal/CreateTopicModal";
import TopicCard from "../../components/topic_card/TopicCard";

const DiscussPage = observer(() => {
  const [isCreateTopicModalVisible, setIsCreateTopicModalVisible] = useState(false);
  const { getTopics } = forumStore;
  const [filter, setFilter] = useState({});
  const topics = useMemo(() => getTopics(filter), [filter, getTopics]);

  const handleSearch = (e) => {
    setFilter({ title: e.target.value });
  };
  const sortByDateDescending = { time: -1 };
  const sortByLikesDescending = { likes: -1 };
  const sortByMessagesCountDescending = { messages: -1 };

  return (
    <>
      <Flex
        vertical={false}
        style={{
          padding: 10,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Flex vertical={false} style={{ gap: 50 }}>
          <Button
            className="sort-button"
            onClick={() => setFilter(sortByDateDescending)}
            color="default"
            variant="text"
          >
            Dates
          </Button>
          <Button
            className="sort-button"
            onClick={() => setFilter(sortByLikesDescending)}
            color="default"
            variant="text"
          >
            Likes
          </Button>
          <Button
            className="sort-button"
            onClick={() => setFilter(sortByMessagesCountDescending)}
            color="default"
            variant="text"
          >
            Hot
          </Button>
        </Flex>
        <Input className="search" onChange={handleSearch} allowClear style={{ width: "20%", fontFamily: "RopaSans"}} />
      </Flex>
      <List
        style={{
          marginTop: -10,
          padding: 20,
          height: 700,
          overflowY: "scroll",
          overflowX: "hidden",
        }}
        bordered={false}
        grid={{ column: 2, gutter: 40 }}
        dataSource={topics}
        renderItem={(topic) => (
          <List.Item style={{ cursor: "pointer" }}>
            <TopicCard topic={topic} />
          </List.Item>
        )}
      />
      <Button
        className="create-topic-button"
        onClick={() => setIsCreateTopicModalVisible(true)}
        color="default"
        variant="text"
      >
        Create topic
      </Button>
      <CreateTopicModal
        visible={isCreateTopicModalVisible}
        setVisible={setIsCreateTopicModalVisible}
      />
    </>
  );
});

export default DiscussPage;
