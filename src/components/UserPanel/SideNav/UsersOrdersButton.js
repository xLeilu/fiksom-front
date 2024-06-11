import React from "react";
import "../UserPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";

const UsersOrdersButton = () => {
    return (
        <>
            <FontAwesomeIcon icon={faShop} className="userData" />
            <b>Zamówienia admin</b>
        </>
    );
};

export default UsersOrdersButton;
