import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductView.css";

const ModifyProduct = ({ isLoggedIn }) => {
    const { productID, manufacturer, model, price, quantity } = useParams();
    const host = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();

    const [Component, setComponent] = useState({
        ComponentType: "",
        Manufacturer: manufacturer || "",
        Model: model || "",
        Price: parseFloat(price) || 0,
        QuantityAvailable: parseInt(quantity) || 0,
    });

    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${host}/componenttype/gettypes`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
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
    }, [host]);

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

    const handleModifyProduct = async (e) => {
        e.preventDefault();

        const selectedCategory = categories.find(
            (category) => category.code === Component.ComponentType
        );

        const formData = new FormData();
        formData.append("Component.ComponentType.Code", selectedCategory.code);
        formData.append("Component.ComponentType.Name", selectedCategory.name);
        formData.append("Component.ComponentId", productID);
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
            const response = await fetch(`${host}/Component/UpsertComponent`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            if (response.status === 200) {
                alert("Zaktualizowano produkt pomyślnie");
                navigate("/produkty");
            } else if (response.status === 401) {
                alert("Błąd autoryzacji");
            } else {
                throw new Error("Wystąpił problem z aktualizacją produktu");
            }
        } catch (error) {
            console.error("Błąd: ", error);
            alert("Wystąpił błąd podczas wysyłania danych");
        }
    };

    return (
        <div className="modifyProductContent">
            {isLoggedIn ? (
                <>
                    <h2>Modyfikacja produktu</h2>
                    <form onSubmit={handleModifyProduct}>
                        <label htmlFor="ComponentType">Kategoria</label>
                        <select
                            id="ComponentType"
                            name="ComponentType"
                            value={Component.ComponentType}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>
                                Wybierz kategorię
                            </option>
                            {categories.map((category) => (
                                <option
                                    key={category.code}
                                    value={category.code}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="Manufacturer">Producent</label>
                        <input
                            type="text"
                            id="Manufacturer"
                            name="Manufacturer"
                            placeholder="Producent"
                            value={Component.Manufacturer}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="Model">Model</label>
                        <input
                            type="text"
                            id="Model"
                            name="Model"
                            placeholder="Model"
                            value={Component.Model}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="Price">Cena</label>
                        <input
                            type="number"
                            id="Price"
                            name="Price"
                            placeholder="Cena"
                            value={Component.Price}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="QuantityAvailable">Ilość</label>
                        <input
                            type="number"
                            id="QuantityAvailable"
                            name="QuantityAvailable"
                            placeholder="Ilość"
                            value={Component.QuantityAvailable}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="image">Zdjęcie</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                        />
                        <button
                            type="submit"
                            disabled={!Component.ComponentType}
                        >
                            Zaktualizuj produkt
                        </button>
                    </form>
                </>
            ) : (
                <div>
                    <h2>Najpierw się zaloguj</h2>
                </div>
            )}
        </div>
    );
};

export default ModifyProduct;
