import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductView.css";

const ModifyProduct = ({ isLoggedIn }) => {
    const { productID } = useParams();
    const host = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();

    const [Component, setComponent] = useState({
        ComponentType: "",
        Manufacturer: "",
        Model: "",
        Price: 0,
        QuantityAvailable: 0,
        Image: "",
    });

    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `${host}/component/getcomponentbyid/${productID}`,
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
                    setComponent({
                        ComponentType: data.componentType.code || "",
                        Manufacturer: data.manufacturer || "",
                        Model: data.model || "",
                        Price: parseFloat(data.price) || 0,
                        QuantityAvailable:
                            parseInt(data.quantityAvailable) || 0,
                        Image: data.image || "",
                    });
                    setImage(null); // Ensure the image state is reset
                } else {
                    console.error("Failed to fetch product data");
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
            } finally {
                setIsLoading(false);
            }
        };

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
        fetchProduct();
    }, [host, productID]);

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
        formData.append(
            "Component.ComponentType.Code",
            selectedCategory ? selectedCategory.code : ""
        );
        formData.append(
            "Component.ComponentType.Name",
            selectedCategory ? selectedCategory.name : ""
        );
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
        } else {
            formData.append("Component.Image", Component.Image);
        }

        try {
            const response = await fetch(`${host}/Component/UpsertComponent`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            if (response.status === 200) {
                alert("Produkt został zaktualizowany");
                navigate("/produkty");
            } else if (response.status === 401) {
                alert("Authorization error");
            } else {
                throw new Error("Problem updating product");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("Error submitting data");
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="modifyProductContent">
            {isLoggedIn ? (
                <>
                    <h2>Modyfikowanie produktu</h2>
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
                            placeholder="Manufacturer"
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
                            placeholder="Price"
                            value={Component.Price}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="QuantityAvailable">Ilość</label>
                        <input
                            type="number"
                            id="QuantityAvailable"
                            name="QuantityAvailable"
                            placeholder="Quantity"
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
                        {Component.Image && (
                            <p>Obecne zdjęcie: {Component.Image}</p>
                        )}
                        <button
                            type="submit"
                            disabled={!Component.ComponentType}
                        >
                            Aktualizuj
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
