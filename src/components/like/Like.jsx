import {observer} from "mobx-react-lite";
import {Flex, Typography} from "antd";
import {HeartOutlined} from "@ant-design/icons";

const {Title} = Typography;

const Like = observer (({clickable = false, count, editCount = null, style = {position: "absolute", right: 30, top: 0}}) => {
  return (<Flex
    align={'baseline'}
    style={style} gap={15}>
    <Title level={5}>{count}</Title>
    {clickable && editCount && <HeartOutlined onClick={() => {if (editCount) editCount(1)}}/>}
    {(!clickable || !editCount) && <HeartOutlined/>}
  </Flex>);
});

export default Like;