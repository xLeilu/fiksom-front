import React from "react";
import "../UserPanel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const AccountButton = () => {

    return (
        <>
            <FontAwesomeIcon icon={faCirclePlus} className="addProduct"/>
            <b>Dodaj produkt</b>
        </>
    );
};

export default AccountButton;