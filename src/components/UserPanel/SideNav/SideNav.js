import React from "react";
import { useNavigate } from "react-router-dom";
import "../UserPanel.css";
import AccountButton from "./AccountButton";
import ShoppingListButton from "./ShoppingListButton";
import HomeUserPanel from "./HomeUserPanel";
import AddProductButton from "./AddProductButton";
import AddCategoryButton from "./AddCategoryButton";
import UsersOrdersButton from "./UsersOrdersButton";
import ManageUsersButton from "./ManageUsersButton";

const SideNav = ({ isAdminStatus }) => {
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

    const handleUsersOrdersButtonClick = () => {
        navigate("/zamowienia-uzytkownikow");
    };
    const handleManageUsersButtonClick = () => {
        navigate("/zarzadzaj-uzytkownikiem");
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
                {isAdminStatus ? (
                    <>
                        <a onClick={handleAddProductButtonClick}>
                            <AddProductButton />
                        </a>
                        <a onClick={handleAddCategoryButtonClick}>
                            <AddCategoryButton />
                        </a>
                        <a onClick={handleUsersOrdersButtonClick}>
                            <UsersOrdersButton />
                        </a>
                        <a onClick={handleManageUsersButtonClick}>
                            <ManageUsersButton />
                        </a>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default SideNav;
