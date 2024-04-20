import React from "react";
import "./UserPanel.css";
import SideNav from "./SideNav/SideNav"

const ShoppingList = ({ isLoggedIn }) => {
    return (
        <div className="userPanel">
            {isLoggedIn ? (
                <>
                    <SideNav />
                    <div id="shoppingListContent">
                        <h2>Historia zakupów</h2>
                        <p>Mozesz tutaj znaleźć historię swoich zakupów.</p>
                    </div>
                </>
                
            ):(
                <div id="userPanelContent">
                    <h2>Najpierw się zaloguj</h2>
                </div>
            )}
        </div>
    );
};

export default ShoppingList;