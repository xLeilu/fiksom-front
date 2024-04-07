import React from "react";
import "./Header.css";
import LoginButton from "./LoginButton";
import BasketButton from "./BasketButton";
import UserAccountButton from "./UserAccountButton";

const Header = () => {
    return (
        <header>
            <div className="top-nav">
                <div id="left">
                    <a href="/" title="Strona główna">FiksCom</a>
                </div>
                <div id="right">
                    <UserAccountButton/>
                    <BasketButton/>
                    <LoginButton/>
                </div>
            </div>
            <div className="bottom-nav">
                <a href="#" title="Grafika">Karty graficzne</a>
                <a href="#" title="RAM">Pamięć RAM</a>
                <a href="#" title="CPU">Procesory</a>
                <a href="#" title="xxx">xxx</a>
            </div>
        </header>
    );
};

export default Header;