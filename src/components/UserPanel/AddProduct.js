import React, { useState } from "react";
import "./UserPanel.css";
import SideNav from "./SideNav/SideNav";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    const [component, setComponent] = useState({
        componenttype: "",
        manufacturer: "",
        model: "",
        price: 10.0,
        quantityavailable: 1,
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setComponent({
            ...component,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setComponent((prevState) => ({
            ...prevState,
            image: file,
        }));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        console.log(component);

        try {
            const response = await fetch(
                "http://localhost:5046/api/component/UpsertComponent",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(component),
                }
            );

            if (response.status === 200) {
                alert("Dodano produkt pomyślnie");
                navigate("/dodaj-produkt");
            } else if (response.status === 401) {
                alert("Błąd autoryzacji");
            } else {
                throw new Error("Wystąpił problem z dodaniem produktu");
            }
        } catch (error) {
            console.error("Błąd: ", error);
            alert("Wystąpił błąd podczas wysyłania danych");
        }
    };

    return (
        <div className="userPanel">
            {isLoggedIn ? (
                <>
                    <SideNav />
                    <div id="addProductContent">
                        <h2>Dodawanie produktu</h2>
                        <form onSubmit={handleAddProduct}>
                            <input
                                type="text"
                                name="componenttype"
                                placeholder="rodzaj"
                                value={component.componenttype}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="manufacturer"
                                placeholder="producent"
                                value={component.manufacturer}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="model"
                                placeholder="model"
                                value={component.model}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="cena"
                                value={component.price}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="quantityavailable"
                                placeholder="ilość"
                                value={component.quantityavailable}
                                onChange={handleInputChange}
                            />
                            <input
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                            />
                            <button type="submit">Dodaj produkt</button>
                        </form>
                    </div>
                </>
            ) : (
                <div id="addProductContent">
                    <h2>Najpierw się zaloguj</h2>
                </div>
            )}
        </div>
    );
};

export default AddProduct;
