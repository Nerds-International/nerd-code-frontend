import { observer } from "mobx-react-lite";
import { Menu } from "antd"; // Импортируем Menu для создания меню
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

  const authItems = [
    {
      label: <div className="separator-vertical"></div>, // Добавляем вертикальный разделитель
      key: 'separator',
    },
    {
      label: <Link className="tab" to="/login">Log In</Link>, // Добавляем Link для Log In
      key: 'login',
    },
    {
      label: <Link className="auth-tab" to="/signup">Sign Up</Link>, // Добавляем Link для Sign Up
      key: 'signup',
    },
  ];

  const handleClick = (e) => {
    setCurrentPage(e.key);
  }

  return (
    <div className="header">
      <Menu
      // <div className="navbar-buttons">
      //   </div>
        className="tabs"
        mode="horizontal"
        items={navbarItems}
        onClick={handleClick}
        selectedKeys={[]}
      />
      <div className="auth-buttons">
        {authItems.map(item => (
          <div key={item.key} className="auth-tab-wrapper">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Navbar;
