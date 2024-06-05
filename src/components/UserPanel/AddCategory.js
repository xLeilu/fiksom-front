import React, { useState } from "react";
import SideNav from "./SideNav/SideNav";
import { useNavigate } from "react-router-dom";
import "./UserPanel.css";

const AddCategory = ({ isAdmin }) => {
    const host = process.env.REACT_APP_API_BASE_URL;
    const [Code, setCode] = useState("");
    const [Name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoryData = {
            Code: Code,
            Name: Name,
        };

        try {
            const response = await fetch(
                `${host}/componenttype/insertcomponenttype`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(categoryData),
                }
            );

            if (response.ok) {
                alert("Dodano kategorię");
                navigate("/");
            } else {
                alert("Wystąpił błąd podczas dodawania kategorii");
                console.error("Błąd podczas dodawania kategorii");
            }
        } catch (error) {
            alert("Wystąpił błąd podczas dodawania kategorii");
            console.error("Wystąpił błąd: ", error);
        }
    };

    return (
        <div className="addCategoryPanel">
            <SideNav isAdminStatus={isAdmin} />
            <div id="addCategoryContent">
                <h2>Dodaj kategorię</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Code">Kod kategorii:</label>
                        <input
                            type="text"
                            id="Code"
                            value={Code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="Name">Nazwa kategorii:</label>
                        <input
                            type="text"
                            id="Name"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Dodaj</button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
