import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const LoginButton = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <a>
            <FontAwesomeIcon
                icon={faRightToBracket}
                className="login"
                onClick={handleLoginClick}
            />
        </a>
    );
};

export default LoginButton;
