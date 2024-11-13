import { observer } from "mobx-react-lite";
import { Card, Flex, List, Typography, Col, Row, Avatar } from "antd";
import { Link } from "react-router-dom";
import { mainStore } from "../../store/main/MainStore";
import { forumStore } from "../../store/forum/ForumStore";
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
        height: '90vh',
        overflow: 'auto'
      }}
    >
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Row gutter={16} style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
          {/* ============ NEWS ============== */}
          <Col span={8} style={{ height: '100%', width: '45%', overflow: 'hidden' }}>
            <Title level={2} style={{ textAlign: 'center' }}>News</Title>
            <List
              style={{
                padding: 20,
                maxHeight: '100%',
                overflow: 'auto'
              }}
              bordered={false}
              grid={{ column: 1 }}
              dataSource={getNews()}
              renderItem={(news) => (
                <List.Item>
                  <Card>
                    <img src={news.img_src} alt={news.title} style={{ width: '100%', height: 'auto' }} />
                    <Meta
                      title={news.title}
                      description={`${news.date}`}
                      style={{ textAlign: 'center' }}
                    />
                    <p>{news.text_preview}</p>
                  </Card>
                </List.Item>
              )}
            />
          </Col>
          {/* ============ DISCUSS ============== */}
          <Col span={8} style={{ height: '100%', width: '35%', overflow: 'hidden' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Last Discuss</Title>
            <List
              style={{
                padding: 20,
                maxHeight: '100%',
                overflow: 'auto'
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
                      style={{ textAlign: 'center' }}
                    />
                    {topic.messages.length > 0 ? (
                      <List
                        dataSource={topic.messages.slice(0, 3)}
                        renderItem={(message) => (
                          <List.Item>
                            <Meta
                              title={message.text}
                              description={`Author: @${message.author} at ${message.time}`}
                              style={{ textAlign: 'center' }}
                            />
                          </List.Item>
                        )}
                      />
                    ) : (
                      <p style={{ textAlign: 'center' }}>Start the discussion!</p>
                    )}
                  </Card>
                </List.Item>
              )}
            />
          </Col>
          {/* ============ TOP NERDS ============== */}
          <Col span={8} style={{ height: '100%', width: '20%', overflow: 'hidden' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Top Nerds</Title>
            <div style={{ display: 'flex', flexDirection: 'column', padding: 20, maxHeight: '100%', overflow: 'auto' }}>
              {mainStore.nerds.map((nerd, index) => (
                <div key={nerd.id} style={{ display: 'flex', alignItems: 'center', padding: '10px', marginBottom: '5px', border: '1px solid #ddd' }}>
                  <span style={{ marginRight: '10px' }}>{`#${index + 1}`}</span>
                  <Avatar src={`../public/img/${nerd.img_src}`} alt={nerd.nickname} size={'small'} style={{ background: '#FFCC00', marginRight: '10px' }} />
                  <span style={{ marginRight: '10px' }}>{nerd.nickname}</span>
                  <span>{nerd.rating}</span>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </Flex>
  );
});

export default MainPage;
