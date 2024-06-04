import React from "react";
import { useNavigate } from "react-router-dom";
import "../UserPanel.css";
import AccountButton from "./AccountButton";
import ShoppingListButton from "./ShoppingListButton";
import HomeUserPanel from "./HomeUserPanel";
import AddProductButton from "./AddProductButton";
import AddCategoryButton from "./AddCategoryButton";

const SideNav = () => {
    const navigate = useNavigate();

    const handleShoppingListButtonClick = () => {
        navigate("/historia-zakupow");
    };

    const handleUserButtonClick = () => {
        navigate("/dane-uzytkownika");
    };

    const handleHomeUserPanelButtonClick = () => {
        navigate("/profil");
    };

    const handleAddProductButtonClick = () => {
        navigate("/dodaj-produkt");
    };

    const handleAddCategoryButtonClick = () => {
        navigate("/dodaj-kategorie");
    };

    return (
        <div className="UserPanelSideNav">
            <div id="sideNav">
                <a onClick={handleHomeUserPanelButtonClick}>
                    <HomeUserPanel />
                </a>
                <a onClick={handleUserButtonClick}>
                    <AccountButton />
                </a>
                <a onClick={handleShoppingListButtonClick}>
                    <ShoppingListButton />
                </a>
                <a onClick={handleAddProductButtonClick}>
                    <AddProductButton />
                </a>
                <a onClick={handleAddCategoryButtonClick}>
                    <AddCategoryButton />
                </a>
            </div>
        </div>
    );
};

export default SideNav;
