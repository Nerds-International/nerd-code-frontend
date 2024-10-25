import * as React from "react";
import "./Header.css";

export default function Header() {
    return (
        <header className="header">
            <img src="img/nerd.png" alt="nerd-code" className="nerd-icon"/>
            <nav>
                <ul className="tabs">
                    <li className="tab"><a href="/problems">Problems</a></li>
                    <li className="tab"><a href="/discuss">Discuss</a></li>
                    <li className="tab"><a href="/battle">Battle</a></li>
                    <li className="separator"></li> {/* Добавляем разделитель */}
                    <li className="login"><a href="/login">Log In</a></li>
                    <li className="signup"><a href="/signup">Sign Up</a></li>
                </ul>
            </nav>
        </header>
    );
}
