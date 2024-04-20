import React from "react";
import "../UserPanel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList } from '@fortawesome/free-solid-svg-icons'

const ShoppingListButton = () => {

    return (
        <>
            <FontAwesomeIcon icon={faTableList} className="shopList" />
            <b>Zamówienia</b>
        </>
    );
};

export default ShoppingListButton;