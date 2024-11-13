import {observer} from "mobx-react-lite";
import {Avatar, Card, Divider, List} from "antd";
import Meta from "antd/lib/card/Meta";
import {useNavigate} from "react-router-dom";
import Like from "../like/Like";

const TopicCard = observer(({topic, showMessages}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/discuss/${topic.id}`)
  }

  return (<Card onClick={handleClick}>
    <Meta
      title={topic.title}
      description={`Created by @${topic.author} at ${topic.time}.`}
      avatar={<Avatar src={''} alt={'ava'} size={'large'} style={{ background: '#FFCC00'}}/>}
    />
    <Like count={topic.likes} clickable={false}/>

    {showMessages && showMessages > 0 && topic.messages.length > 0 && (
      <>
      <Divider/>
      <List
        dataSource={topic.messages.slice(0, 3)}
        renderItem={(message) => (
          <List.Item>
            <Meta
              title={message.text}
              description={`Author: @${message.author} at ${message.time}`}
            />
          </List.Item>
        )}
      />
      </>
    )}
    {showMessages && showMessages > 0 && topic.messages.length === 0 && (
      <>
        <Divider/>
        <p style={{ textAlign: 'center' }}>Start the discussion!</p>
      </>
    )}

  </Card>);
});

export default TopicCard;