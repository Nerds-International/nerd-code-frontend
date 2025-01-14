import { observer } from "mobx-react-lite";
import { Flex, Typography } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import { authStore } from "../../store/auth/AuthStore"; // Импортируем authStore

const { Title } = Typography;

const Like = observer(({ clickable = false, count, editCount = null, style = { position: "absolute", right: 30, top: 0 } }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (editCount) {
      setLiked(!liked);
      editCount(liked ? -1 : 1);
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
