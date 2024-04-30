import React from "react";
import "./MainContent.css";

const MainContent = ({ isLoggedIn }) => {
    return (
        <main>
            {isLoggedIn ? (
                <>
                    <h2>SKLEP INTERNETOWY</h2>
                    <p>Strona dla zalogowanych</p>
                </>
            ) : (
                <>
                    <h2>SKLEP INTERNETOWY</h2>
                    <p>Strona dla niezalogowanych</p>
                </>
            )}
        </main>
    );
};

export default MainContent;
