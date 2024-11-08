import { observer } from "mobx-react-lite";
import { Menu, Button } from "antd"; // Импортируем Button для кнопок "Log In" и "Sign Up"
import { pageStore } from "../../store/PageStore";
import NerdFaceImage from "../nerdFaceImage/NerdFaceImage";
import { Link } from 'react-router-dom'; // Импортируем Link
import './Navbar.css'; // Импортируйте ваш CSS файл для Navbar

const Navbar = observer(() => {
  const { Pages, setCurrentPage } = pageStore;

  const navbarItems = [
    {
      label: (<Link to="/"><NerdFaceImage /></Link>), // Добавляем Link к NerdFaceImage
      key: Pages.MAIN,
    },
    {
      label: <Link className="tab" to="/problems">Problems</Link>, // Добавляем Link для Problems
      key: Pages.PROBLEMS_LIST,
    },
    {
      label: <Link className="tab" to="/discuss">Discuss</Link>, // Добавляем Link для Discuss
      key: Pages.DISCUSS,
    },
    {
      label: <Link className="tab" to="/battle">Battle</Link>, // Добавляем Link для Battle
      key: Pages.BATTLE,
    },
  ];

  const handleClick = (e) => {
    setCurrentPage(e.key);
  }

  return (
    <div className="header">
      <Menu
        className="tabs"
        mode="horizontal"
        items={navbarItems}
        onClick={handleClick}
        selectedKeys={[]}
      />
      <div className="separator" />
      <div className="login">
        <Link to="/login">Log In</Link>
      </div>
      <Button className="signup" type="primary">
        <Link to="/signup">Sign Up</Link>
      </Button>
    </div>
  );
});

export default Navbar;