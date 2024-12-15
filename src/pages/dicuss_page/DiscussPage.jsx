import { observer } from "mobx-react-lite";
import { forumStore } from "../../store/forum/ForumStore";
import {useEffect, useMemo, useState} from "react";
import "./style.css";
import { Button, Flex, Input, List } from "antd";
import CreateTopicModal from "../../components/create_topic_modal/CreateTopicModal";
import TopicCard from "../../components/topic_card/TopicCard";

const DiscussPage = observer(() => {
    const [isCreateTopicModalVisible, setIsCreateTopicModalVisible] = useState(false)
    const { getTopics } = forumStore;
    const store = forumStore;
    const [filter, setFilter] = useState({})
    const topics = useMemo(() => getTopics(filter), [filter, getTopics()])

    const handleSearch = (e) => { setFilter({ title: e.target.value }) }
    const sortByDateDescending = { time: -1 };
    const sortByLikesDescending = { likes: -1 };
    const sortByMessagesCountDescending = { messages: -1 };

    async function getAllTopics(page = 1, limit = 10) {

        try {
            const url = new URL('http://localhost:3000/forums');
            url.searchParams.append('page', page);
            url.searchParams.append('limit', limit);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error fetching problems');
            }

            const data = await response.json();
            const getProblem = [];
            for (let i = 0; i < data.total; i++){
                getProblem.push({ id: data.tasks[i]._id, name: data.tasks[i].title, description: data.tasks[i].description, difficulty: data.tasks[i].difficulty, likes: data.tasks[i].likes, dislikes: data.tasks[i].dislikes,  createdAt: data.tasks[i].created_at, testCases: data.tasks[i].test_cases});
            }
            store.setTopics(getProblem);
            console.log(getProblem)
        } catch (error) {
            console.error('Error fetching tasks:', error.message || 'Error fetching tasks');
        } finally {
            console.log("nice")
        }
    }

    useEffect(() => {
        getAllTopics(1, 10);
    }, []);


  return (<>
    <Flex
      vertical={false}
      style={{
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      <Flex
        vertical={false}
        style={{ gap: 50 }}
      >
        <Button onClick={() => setFilter(sortByDateDescending)}>Dates</Button>
        <Button onClick={() => setFilter(sortByLikesDescending)}>Likes</Button>
        <Button onClick={() => setFilter(sortByMessagesCountDescending)}>Hot</Button>
      </Flex>
      <Input onChange={handleSearch} allowClear style={{ width: '20%' }} />
    </Flex>
    <List
      style={{
        padding: 20,
        height: 700,
        overflowY: "scroll",
        overflowX: "hidden",
      }}
      bordered={false}
      grid={{ column: 2, gutter: 40 }}
      dataSource={topics}
      renderItem={(topic) => <List.Item>
        <TopicCard topic={topic} />
      </List.Item>}
    />
    <Button
      style={{
        position: 'absolute',
        left: '40%',
        width: '20%',
      }}
      onClick={() => setIsCreateTopicModalVisible(true)}
    >
      Create topic
    </Button>
    <CreateTopicModal visible={isCreateTopicModalVisible} setVisible={setIsCreateTopicModalVisible} />
  </>);
})

export default DiscussPage;
