import React, { useState, useEffect } from "react";
import "./UserPanel.css";
import SideNav from "./SideNav/SideNav";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    const [Component, setComponent] = useState({
        ComponentType: "",
        Manufacturer: "",
        Model: "",
        Price: 10.0,
        QuantityAvailable: 1,
    });

    const [image, setImage] = useState(null);

    const [categories, setCategories] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5046/api/component/gettypes",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    setCategories([]);
                }
            } catch (error) {
                setCategories([]);
                console.error("Błąd podczas pobierania danych z API:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setComponent({
            ...Component,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("Component.ComponentType", Component.ComponentType);
        formData.append("Component.Manufacturer", Component.Manufacturer);
        formData.append("Component.Model", Component.Model);
        formData.append("Component.Price", Component.Price);
        formData.append(
            "Component.QuantityAvailable",
            Component.QuantityAvailable
        );

        if (image != null) {
            formData.append("Image", image);
        }

        try {
            const response = await fetch(
                "http://localhost:5046/api/Component/UpsertComponent",
                {
                    method: "POST",
                    credentials: "include",
                    body: formData,
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
                            <select
                                id="ComponentType"
                                name="ComponentType"
                                value={Component.ComponentType}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>
                                    Wybierz kategorię
                                </option>
                                {Object.keys(categories).map((key) => (
                                    <option key={key} value={key}>
                                        {categories[key]}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                name="Manufacturer"
                                placeholder="Producent"
                                value={Component.Manufacturer}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="Model"
                                placeholder="Model"
                                value={Component.Model}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="Price"
                                placeholder="cena"
                                value={Component.Price}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="QuantityAvailable"
                                placeholder="ilość"
                                value={Component.QuantityAvailable}
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
