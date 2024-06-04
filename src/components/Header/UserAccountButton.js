import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UserAccountButton = () => {
    const navigate = useNavigate();

    const handleUserAccClick = () => {
        navigate("/profil");
    };

    return (
        <a>
            <FontAwesomeIcon
                icon={faUser}
                className="profile"
                onClick={handleUserAccClick}
            />
        </a>
    );
};

export default UserAccountButton;
