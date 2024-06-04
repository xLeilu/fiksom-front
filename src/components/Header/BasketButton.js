import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

const BasketButton = () => {
    const navigate = useNavigate();

    const handleBasketClick = () => {
        navigate("/koszyk");
    };

    return (
        <a>
            <FontAwesomeIcon
                icon={faBasketShopping}
                className="basket"
                onClick={handleBasketClick}
            />
        </a>
    );
};

export default BasketButton;
