import {observer} from "mobx-react-lite";
import {Button, Col, Menu, Row} from "antd";
import Search from "antd/es/input/Search";

const DiscussPage = observer (() => {
  const sortItems = [
    {
      label: 'Date',
      key: 'sort-by-date',
    },
    {
      label: 'Likes',
      key: 'sort-by-likes',
    },
    {
      label: 'Hot',
      key: 'sort-by-hot'
    }
  ]
  return (<>
    <Row justify="space-around">
      <Col>
        <Menu items={sortItems} mode="horizontal" style={{width: 200}}/>
      </Col>
      <Col>
        <Search/>
      </Col>
    </Row>
    {/*<TopicsList/> пока хз, наверно чтобы массив мапать в топики*/}
    <Button>Create topic</Button>
  </>);
})

export default DiscussPage;