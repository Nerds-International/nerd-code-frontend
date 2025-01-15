import { observer } from "mobx-react-lite";
import { Flex, Typography } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import { authStore } from "../../store/auth/AuthStore";
import Cookies from "js-cookie";

const { Title } = Typography;

const Like = observer(({ clickable = false, count, editCount = null, style = { position: "absolute", right: 30, top: 0 } }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (editCount) {
      const newLikedState = !liked;
      const topicId = window.location.href.split('/')[4];
      setLiked(newLikedState);
      editCount(newLikedState ? 1 : -1);
      try {
        const endpoint = newLikedState ? `/forums/${topicId}/like` : `/forums/${topicId}/decrlike`;
        const response = await fetch(`http://localhost:3000${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accessToken': Cookies.get('accessToken'),
            'id': Cookies.get('id')
          },
        });

        if (!response.ok) {
          throw new Error('Ошибка при отправке лайка/дизлайка');
        }
      } catch (error) {
        console.error("Ошибка при отправке лайка/дизлайка:", error);
      }
    }
  };

  return (
    <Flex align={'baseline'} style={style} gap={15}>
      <Title level={5}>{count}</Title>
      {clickable && editCount && (
        <div>
          {liked ? (
            <HeartFilled
              onClick={authStore.isAuthenticated ? handleLike : undefined}
              style={{ color: 'red', cursor: authStore.isAuthenticated ? 'pointer' : 'not-allowed' }}
            />
          ) : (
            <HeartOutlined
              onClick={authStore.isAuthenticated ? handleLike : undefined}
              style={{ color: 'inherit', cursor: authStore.isAuthenticated ? 'pointer' : 'not-allowed' }}
            />
          )}
        </div>
      )}
      {(!clickable || !editCount) && <HeartOutlined />}
    </Flex>
  );
});

export default Like;
