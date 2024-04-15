import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Logout = () => {
    const navigate = useNavigate();

    const handleLoginClick = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch(
                "http://localhost:5046/api/Account/SignOut",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {

                document.cookie = ".AspNetCore.Identity.Application=;";

                alert("Wylogowano pomyślnie");

                window.location.href = "/";
            } else {
                throw new Error("Wystąpił problem z wylogowaniem");
            }
        } catch(error){
            console.error("Błąd logowania: ", error);
        }

    }

    return (
        <FontAwesomeIcon icon={faRightFromBracket} className="logout" onClick={handleLoginClick} />
    );
};

export default Logout;