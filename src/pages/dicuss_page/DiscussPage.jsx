import { observer } from "mobx-react-lite";
import { forumStore } from "../../store/forum/ForumStore";
import { useEffect, useMemo, useState } from "react";
import "./DiscussPage.css";
import { Button, Flex, Input, List } from "antd";
import CreateTopicModal from "../../components/create_topic_modal/CreateTopicModal";
import TopicCard from "../../components/topic_card/TopicCard";
import { SearchOutlined } from '@ant-design/icons';

const DiscussPage = observer(() => {
    const [isCreateTopicModalVisible, setIsCreateTopicModalVisible] = useState(false);
    const { getTopics } = forumStore;
    const store = forumStore;
    const [filter, setFilter] = useState({});
    const topics = useMemo(() => getTopics(filter), [filter, store.topics]);

    const handleSearch = (e) => {
        setFilter({ title: e.target.value });
    };

    const sortByDateDescending = { time: -1 };
    const sortByLikesDescending = { likes: -1 };
    const sortByMessagesCountDescending = { messages: -1 };

    const fetchTopics = async (page = 1, limit = 10) => {
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
                throw new Error(errorData.message || 'Error fetching topics');
            }

            const data = await response.json();
            const getTopic = data.map(item => {
                const messages = item.comments.map(comment => ({
                    id: comment._id,
                    author: comment.user_id,
                    time: comment.created_at,
                    text: comment.comment
                }));
                return {
                    id: item._id,
                    author: item.author_id,
                    time: item.created_at,
                    title: item.title,
                    text: item.description,
                    likes: item.likes,
                    messages: messages
                };
            });
            store.setTopics(getTopic);
            console.log(store.getTopics());
        } catch (error) {
            console.error('Error fetching topics:', error.message || 'Error fetching topics');
        } finally {
            console.log("nice");
        }
    };

    useEffect(() => {
        fetchTopics(1, 10);
    }, []);

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
                <Input
                    placeholder="Search topic by name..."
                    className="search"
                    onChange={handleSearch}
                    allowClear
                    style={{ width: "20%", fontFamily: "RopaSans", paddingLeft: "10px" }}
                    prefix={<SearchOutlined />}
                />
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
