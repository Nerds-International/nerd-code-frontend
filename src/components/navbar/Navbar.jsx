import {observer} from "mobx-react-lite";
import {Menu} from "antd";
import {pageStore} from "../../store/PageStore";
import NerdFaceImage from "../nerdFaceImage/NerdFaceImage";

const Navbar = observer(() => {
  const {Pages, setCurrentPage} = pageStore;
  const navbarItems = [
    {
      label: (<NerdFaceImage/>),
      key: Pages.MAIN,
    },
    {
      label: 'Problems',
      key: Pages.PROBLEMS_LIST,
    },
    {
      label: 'Discuss',
      key: Pages.DISCUSS,
    },
    {
      label: 'Battle',
      key: Pages.BATTLE,
    },
  ];

  const handleClick = (e) => {
    setCurrentPage(e.key);
  }

  return (<>
    <Menu
      onClick={handleClick}
      mode="horizontal"
      selectedKeys={[]}
      items={navbarItems}
    />
  </>);
})

export default Navbar;