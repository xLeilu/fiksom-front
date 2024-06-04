import React from "react";
import "../UserPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

const AddCategoryButton = () => {
    return (
        <>
            <FontAwesomeIcon icon={faLayerGroup} className="addCategory" />
            <b>Dodaj kategorie</b>
        </>
    );
};

export default AddCategoryButton;
