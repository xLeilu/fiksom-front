import React from "react";
import "../UserPanel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'

const HomeUserPanel = () => {

    return (
        <>
            <FontAwesomeIcon icon={faHouseUser} className="userData"/>
            <b>Panel uzytkownika</b>
        </>
    );
};

export default HomeUserPanel;