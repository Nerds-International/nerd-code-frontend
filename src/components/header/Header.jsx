import "./Header.css";
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';

const Header = observer (() => {
    return (
        <header className="header">
            <Link to="/">
                <img src="/img/nerd.png" alt="nerd-code" className="nerd-icon" />
            </Link>
            <nav>
                <ul className="tabs">
                    <li className="tab"><Link to="/problems">Problems</Link></li> {/* Используйте Link */}
                    <li className="tab"><Link to="/discuss">Discuss</Link></li>
                    <li className="tab"><Link to="/battle">Battle</Link></li>
                    <li className="separator"></li>
                    <li className="login"><Link to="/login">Log In</Link></li>
                    <li className="signup"><Link to="/signup">Sign Up</Link></li>
                </ul>
            </nav>
        </header>
    );
});

export default Header;