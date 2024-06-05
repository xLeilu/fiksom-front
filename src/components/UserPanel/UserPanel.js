import React from "react";
import "./UserPanel.css";
import SideNav from "./SideNav/SideNav";

const UserPanel = ({ isLoggedIn, isAdmin }) => {
    return (
        <div className="userPanel">
            {isLoggedIn ? (
                <>
                    <SideNav isAdminStatus={isAdmin} />
                    <div id="userPanelContent">
                        <h2>Twój profil</h2>
                        <p>Mozesz tutaj znaleźć dane na temat swojego konta.</p>
                    </div>
                </>
            ) : (
                <div id="userPanelContent">
                    <h2>Najpierw się zaloguj</h2>
                </div>
            )}
        </div>
    );
};

export default UserPanel;
