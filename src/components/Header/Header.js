import React from "react";
import "./Header.css";
import LoginButton from "./LoginButton";
import BasketButton from "./BasketButton";
import UserAccountButton from "./UserAccountButton";
import LogoutButton from "./LogoutButton";

const Header = ({ isLoggedIn }) => {
    return (
        <header>
            <div className="top-nav">
                <div id="left">
                    <a href="/" title="Strona główna">
                        FiksCom
                    </a>
                </div>
                <div id="right">
                    <UserAccountButton />
                    <BasketButton />
                    {isLoggedIn ? <LogoutButton /> : <LoginButton />}
                </div>
            </div>
            <div className="bottom-nav">
                <a href="/produkty" title="All">
                    Wszystkie
                </a>
                <a href="#" title="Grafika">
                    Karty graficzne
                </a>
                <a href="#" title="RAM">
                    Pamięć RAM
                </a>
                <a href="#" title="CPU">
                    Procesory
                </a>
            </div>
        </header>
    );
};

export default Header;
