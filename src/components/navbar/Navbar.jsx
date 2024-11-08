import { useState } from 'react';
import { observer } from "mobx-react-lite";
import { Menu } from "antd"; // Импортируем Menu для создания меню
import { pageStore } from "../../store/PageStore";
import { Link } from 'react-router-dom'; // Импортируем Link
import NerdFaceImage from "../nerdFaceImage/NerdFaceImage";
import SignInForm from "../auth-reg/SignInForm";
import SignUpForm from "../auth-reg/SignUpForm";
import './Navbar.css'; // Импортируйте ваш CSS файл для Navbar

const Navbar = observer(() => {
  const { Pages, setCurrentPage } = pageStore;
  const [currentForm, setCurrentForm] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

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
      label: <Link className="tab" to="#" onClick={() => { setIsFormVisible(true); setCurrentForm('login'); }}>Log In</Link>,
      key: 'login',
    },
    {
      label: <Link className="auth-tab" to="#" onClick={() => { setIsFormVisible(true); setCurrentForm('signup'); }}>Sign Up</Link>,
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
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            {currentForm === 'login' && (
              <>
                <SignInForm />
                <div className="form-switch">
                  <span>Don't have an account?</span>
                  <Link to="#" onClick={() => { setCurrentForm('signup'); }} className="switch-link">Sign up</Link>
                </div>
              </>
            )}
            {currentForm === 'signup' && (
              <>
                <SignUpForm />
                <div className="form-switch">
                  <span>Already have an account?</span>
                  <Link to="#" onClick={() => { setCurrentForm('login'); }} className="switch-link">Log in</Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default Navbar;
