import "./Header.css";
import { observer } from "mobx-react-lite";


const Header = observer (() => {
    return (
        <header className="header">
             <a href="/"> {}
                <img src="/img/nerd.png" alt="nerd-code" className="nerd-icon" />
            </a>
            <nav>
                <ul className="tabs">
                    <li className="tab"><a href="/problems">Problems</a></li>
                    <li className="tab"><a href="/discuss">Discuss</a></li>
                    <li className="tab"><a href="/battle">Battle</a></li>
                    <li className="separator"></li> {}
                    <li className="login"><a href="/login">Log In</a></li>
                    <li className="signup"><a href="/signup">Sign Up</a></li>
                </ul>
            </nav>
        </header>
    );
});

export default Header;