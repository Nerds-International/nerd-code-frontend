import { observer } from "mobx-react-lite";
import { Card, Flex, List, Typography, Col, Row, Avatar } from "antd";
import { Link } from "react-router-dom";
import { mainStore } from "../../store/main_store/MainStore";
import { forumStore } from "../../store/forumStore/ForumStore";
import Meta from "antd/lib/card/Meta";

const { Title } = Typography;

const MainPage = observer(() => {
  const { getNews } = mainStore;
  const { getTopics } = forumStore;

  return (
      <Flex
        vertical={false}
        style={{
          padding: 10,
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '90vh'
        }}
      >
        <Row gutter={16} style={{ height: '100%' }}>
          {/* ============ NEWS ============== */}
          <Col span={8} style={{ height: '100%', width: '45%', overflow: 'auto' }}>
            <Title level={2}>News</Title>
            <List
              style={{
                padding: 20,
              }}
              bordered={false}
              grid={{ column: 1 }}
              dataSource={getNews()}
              renderItem={(news) => (
                <List.Item>
                  <Card>
                    <img src={`public/img/${news.img_src}`} alt={news.title} style={{ width: '100%', height: 'auto' }} />
                    <Meta
                      title={news.title}
                      description={`Created at ${news.time}`}
                    />
                    <p>{news.text_preview}</p>
                  </Card>
                </List.Item>
              )}
            />
          </Col>
          {/* ============ DISCUSS ============== */}
          <Col span={8} style={{ height: '100%', width: '35%', overflow: 'auto' }}>
            <Title level={2}>Last Discuss</Title>
            <List
              style={{
                padding: 20,
              }}
              bordered={false}
              grid={{ column: 1 }}
              dataSource={getTopics().slice(0, 3)}
              renderItem={(topic) => (
                <List.Item>
                  <Card>
                    <Meta
                      title={<Link to={`/discuss/${topic.id}`}>{topic.title}</Link>} 
                      description={`Created by @${topic.author} at ${topic.time}`}
                      avatar={<Avatar src={''} alt={'ava'} size={'large'} style={{ background: '#FFCC00' }} />}
                    />
                    <Title level={4}>Last 3 Messages:</Title>
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
                  </Card>
                </List.Item>
              )}
            />
          </Col>
          {/* ============ TOP NERDS ============== */}
          <Col span={8} style={{ height: '100%', width: '20%', overflow: 'auto' }}>
            <Title level={2}>Top Nerds</Title>
            <div style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
              {mainStore.nerds.map((nerd, index) => (
                <div key={nerd.id} style={{ display: 'flex', alignItems: 'center', padding: '10px', marginBottom: '5px', border: '1px solid #ddd' }}>
                  <span style={{ marginRight: '10px' }}>{`#${index + 1}`}</span>
                  <Avatar src={`public/img/${nerd.img_src}`} alt={nerd.nickname} size={'small'} style={{ background: '#FFCC00', marginRight: '10px' }} />
                  <span style={{ marginRight: '10px' }}>{nerd.nickname}</span>
                  <span>{nerd.rating}</span>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Flex>
  );
});

export default MainPage;
