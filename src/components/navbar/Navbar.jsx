import { useState } from 'react';
import { observer } from "mobx-react-lite";
import { Menu } from "antd";
import { pageStore } from "../../store/page/PageStore";
import { authStore } from "../../store/auth/AuthStore";
import { Link } from 'react-router-dom';
import NerdFaceImage from "../nerd_face_image/NerdFaceImage";
import FormModalWindow from "../auth_reg_forms/FormModalWindow";
import './Navbar.css';

const Navbar = observer(() => {
  const { Pages, setCurrentPage } = pageStore;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleClick = (e) => {
    setCurrentPage(e.key);
  };

  const handleLogout = () => {
    authStore.signOut();
  };

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
      label: <Link className="tab" to="/search_battle">Battle</Link>,
      key: Pages.BATTLE,
    },
  ];

  const unauthorizedItems = [
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

  const authorizedItems = [
    {
      label: <div></div>, // Здесь будет ваша реклама (аватарка)
      key: 'avatar'
    },
    {
      label: <div className="separator-vertical"></div>,
      key: 'separator',
    },
    {
      label: <div className="" to="#" onClick={() => { setIsFormVisible(true); setIsLogin(true); }}>
        Welcome, {authStore.userInfo ? authStore.userInfo.username : "Рома"}</div>,
      key: 'welcome',
    },
    {
      label: <Link className="tab" to="#" onClick={() => {handleLogout()}}>Logout</Link>,
      key: 'logout',
    },
  ];


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
        {authStore.isAuthenticated ? (
          authorizedItems.map(item => (
              <div key={item.key} className="auth-tab-wrapper">
                {item.label}
              </div>
            ))
        ) : (
          unauthorizedItems.map(item => (
            <div key={item.key} className="auth-tab-wrapper">
              {item.label}
            </div>
          ))
        )}
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
