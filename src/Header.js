import * as React from "react";
import "./Header.css";
import nerdImage from './img/nerd.png'

export default function Header() {
    return (
        <header className="header">
             <a href="/"> {}
                <img src={nerdImage} alt="nerd-code" className="nerd-icon" />
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
}
