import React from "react";
import { useNavigate } from "react-router-dom";
import "../UserPanel.css";
import AccountButton from "./AccountButton";
import ShoppingListButton from "./ShoppingListButton";
import HomeUserPanel from "./HomeUserPanel";


const SideNav = () => {
    const navigate = useNavigate();

    const handleShoppingListButtonClick = () => {
        navigate("/historia-zakupow");
    }

    const handleUserButtonClick = () => {
        navigate("/dane-uzytkownika");
    }

    const handleHomeUserPanelButtonClick = () => {
        navigate("/profil");
    }
    
    return (
        <div className="UserPanelSideNav">
            <div id="sideNav">
                <a onClick={handleHomeUserPanelButtonClick} >
                    <HomeUserPanel />
                </a>
                <a onClick={handleUserButtonClick} >
                    <AccountButton />
                </a>
                <a onClick={handleShoppingListButtonClick} >
                    <ShoppingListButton />
                </a>
            </div>
        </div>
    );
};

export default SideNav;