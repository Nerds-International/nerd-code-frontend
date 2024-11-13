import {observer} from "mobx-react-lite";
import {forumStore} from "../../store/forum/ForumStore";
import {useState} from "react";
import "./style.css";
import {Avatar, Button, Card, Flex, List} from "antd";
import Search from "antd/lib/input/Search";
import Meta from "antd/lib/card/Meta";
import CreateTopicModal from "../../components/create_topic_modal/CreateTopicModal";

const DiscussPage = observer (() => {
  const [isCreateTopicModalVisible, setIsCreateTopicModalVisible] = useState(false)
  const {getTopics} = forumStore;

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
        style={{
          gap: 50
        }}
      >
        <Button value={'date'} disabled={true}>Date</Button>
        <Button value={'like'} disabled={true}>Likes</Button>
        <Button value={'hot'} disabled={true}>Hot</Button>
      </Flex>
      <Search disabled={true} style={{width: '20%'}}/>
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
      dataSource={getTopics()}
      renderItem={(topic) => <List.Item>
        <Card>
          <Meta
            title={topic.title}
            description={`Created by @${topic.author} at ${topic.time}`}
            avatar={<Avatar src={''} alt={'ava'} size={'large'} style={{ background: '#FFCC00'}}/>}
          />
        </Card>
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
    <CreateTopicModal visible={isCreateTopicModalVisible} setVisible={setIsCreateTopicModalVisible}/>
  </>);
})

export default DiscussPage;
