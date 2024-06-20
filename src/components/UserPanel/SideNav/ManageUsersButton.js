import React from "react";
import "../UserPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";

const ManageUsersButton = () => {
    return (
        <>
            <FontAwesomeIcon icon={faUserPen} className="editUser" />
            <b>Zarządzaj userem</b>
        </>
    );
};

export default ManageUsersButton;
