import {observer} from "mobx-react-lite";
import {Col, Row} from "antd";

const MainPage = observer (() => {
  return (<>
    <Row justify="space-around">
      <Col>
        News
      </Col>
      <Col>
        Last discuss
      </Col>
      <Col>
        Top nerds
      </Col>
    </Row>
  </>);
})

export default MainPage;