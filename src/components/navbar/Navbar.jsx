import { useState } from 'react';
import { observer } from "mobx-react-lite";
import { Menu } from "antd";
import { pageStore } from "../../store/PageStore";
import { Link } from 'react-router-dom';
import NerdFaceImage from "../nerdFaceImage/NerdFaceImage";
import FormModalWindow from "../auth-reg/FormModalWindow";
import './Navbar.css';

const Navbar = observer(() => {
  const { Pages, setCurrentPage } = pageStore;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const navbarItems = [
    {
      label: (<Link to="/"><NerdFaceImage /></Link>),
      key: Pages.MAIN,
    },
    {
      label: <Link className="tab" to="/problems">Problems</Link>,
      key: Pages.PROBLEMS_LIST,
    },
    {
      label: <Link className="tab" to="/discuss">Discuss</Link>,
      key: Pages.DISCUSS,
    },
    {
      label: <Link className="tab" to="/battle">Battle</Link>,
      key: Pages.BATTLE,
    },
  ];

  const authItems = [
    {
      label: <div className="separator-vertical"></div>,
      key: 'separator',
    },
    {
      label: <Link className="tab" to="#" onClick={() => { setIsFormVisible(true); setIsLogin(true); }}>Log In</Link>,
      key: 'login',
    },
    {
      label: <Link className="tab" to="#" onClick={() => { setIsFormVisible(true); setIsLogin(false); }}>Sign Up</Link>,
      key: 'signup',
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
      <div className="auth-buttons">
        {authItems.map(item => (
          <div key={item.key} className="auth-tab-wrapper">
            {item.label}
          </div>
        ))}
      </div>
      {isFormVisible && (
        <div className="form-modal" onClick={(e) => e.stopPropagation()}>
          <FormModalWindow onClose={() => setIsFormVisible(false)} isLogin={isLogin} />
        </div>
      )}
    </div>
  );
});

export default Navbar;
