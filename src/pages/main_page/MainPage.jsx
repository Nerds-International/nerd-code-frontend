import {observer} from "mobx-react-lite";
import {Avatar, Card, Col, Flex, List, Row, Typography} from "antd";
import { useSearchParams } from "react-router-dom";
import {mainStore} from "../../store/main/MainStore";
import {forumStore} from "../../store/forum/ForumStore";
import Meta from "antd/lib/card/Meta";
import TopicCard from "../../components/topic_card/TopicCard";
import {useEffect} from "react";
import Cookies from 'js-cookie';

const { Title } = Typography;

const MainPage = observer(() => {
    const { getNews } = mainStore;
    const { getTopics } = forumStore;
    const store = forumStore;
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const fetchTopics = async (page = 1, limit = 10) => {
        try {       
          
          const url = new URL('http://localhost:3000/forums');
          url.searchParams.append('page', page);
          url.searchParams.append('limit', limit);
          const idFromCookie = Cookies.get('id');
          const accessTokenFromCookie = Cookies.get('accessToken');
          fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'id': idFromCookie,
                'accessToken': accessTokenFromCookie,
                'refreshToken': refreshToken,
            },
          })
          .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Error fetching topics');
                });
            }
            return response.json();
          })
          .then(data => {
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
            // console.log(store.getTopics());
          })
          .catch(error => {
            console.error(error.message);
          });
          } catch (error) {
              console.error('Error fetching topics:', error.message || 'Error fetching topics');
          } finally {
              // console.log("nice");
          }
    };

    useEffect(() => {
        if (id) {
          Cookies.set('id', id, { expires: 52 });
        }
        if (accessToken) {
          Cookies.set('accessToken', accessToken, { expires: 52 });
        }
        if (refreshToken) {
          Cookies.set('refreshToken', refreshToken, { expires: 52 });
        }

        // console.log(Cookies.get('accessToken'))
        fetchTopics(1, 10);
    }, []);

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
          <Col span={8} style={{ height: '100%', width: '45%', overflow: 'hidden', cursor: 'default'}}>
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
                <List.Item style={{cursor: 'pointer'}}>
                  <TopicCard topic={topic} showMessages={3}/>
                </List.Item>
              )}
            />
          </Col>
          {/* ============ TOP NERDS ============== */}
          <Col span={8} style={{ height: '100%', width: '20%', overflow: 'hidden', cursor: 'default'}}>
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
