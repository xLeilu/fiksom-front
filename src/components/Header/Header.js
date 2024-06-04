import React, { useEffect, useState } from "react";
import "./Header.css";
import LoginButton from "./LoginButton";
import BasketButton from "./BasketButton";
import UserAccountButton from "./UserAccountButton";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn }) => {
    const host = process.env.REACT_APP_API_BASE_URL;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${host}/componenttype/gettypes`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    setCategories([]);
                }
            } catch (error) {
                setCategories([]);
                console.error("Błąd podczas pobierania danych z API:", error);
            }
        };

        fetchCategories();
    }, [host]);

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
            {isLoggedIn && (
                <div className="bottom-nav">
                    <Link to="/produkty" title="All">
                        Wszystkie
                    </Link>
                    {categories.map((category) => (
                        <Link
                            key={category.code}
                            to={`/produkty/${category.code}`}
                            title={category.name}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;
