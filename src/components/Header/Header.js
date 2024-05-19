import React from "react";
import "./Header.css";
import LoginButton from "./LoginButton";
import BasketButton from "./BasketButton";
import UserAccountButton from "./UserAccountButton";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

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
                <Link to="/produkty" title="All">
                    Wszystkie
                </Link>
                <Link to="/produkty/Karta Graficzna" title="Grafika">
                    Karty graficzne
                </Link>
                <Link to="/produkty/RAM" title="RAM">
                    Pamięć RAM
                </Link>
                <Link to="/produkty/Procesor" title="CPU">
                    Procesory
                </Link>
            </div>
        </header>
    );
};

export default Header;
