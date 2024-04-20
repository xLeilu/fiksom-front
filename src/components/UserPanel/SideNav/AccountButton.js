import React from "react";
import "../UserPanel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

const AccountButton = () => {

    return (
        <>
            <FontAwesomeIcon icon={faUser} className="userData"/>
            <b>Dane uzytkownika</b>
        </>
    );
};

export default AccountButton;