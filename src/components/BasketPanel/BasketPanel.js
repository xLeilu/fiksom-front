import React, { useState, useEffect } from "react";
import "./BasketPanel.css";
import { useNavigate } from "react-router-dom";

const BasketPanel = ({ isLoggedIn }) => {
    const host = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${host}/cart/getcart`, {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Wystąpił problem");
                }
                return response.json();
            })
            .then((data) => setProducts(data))
            .catch((error) => console.error("Błąd pobierania danych", error));
    }, []);

    const handleRemove = (componentId) => {
        fetch(`${host}/cart/remove/${componentId}`, {
            method: "DELETE",
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Wystąpił problem");
                }
                setProducts(
                    products.filter(
                        (product) =>
                            product.component.componentId !== componentId
                    )
                );
                alert("Usunięto produkt z koszyka");
            })
            .catch((error) =>
                console.error("Błąd podczas usuwania produktu:", error)
            );
    };

    const handleOrder = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${host}/order/placeorder`, {
                method: "POST",
                credentials: "include",
            });

            if (response.status === 200) {
                alert("Złozono zamówienie");
                navigate("/");
            } else {
                throw new Error("Wystąpił problem");
            }
        } catch (error) {
            console.error("Błąd: ", error);
            alert("Wystąpił błąd podczas wysyłania danych");
        }
    };

    return (
        <div className="basket-panel">
            <h2>Koszyk</h2>
            {products.length === 0 ? (
                <p>Koszyk jest pusty</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Typ Komponentu</th>
                                <th>Producent i Model</th>
                                <th>Cena za sztukę</th>
                                <th>Ilość</th>
                                <th>Cena za całą pozycję</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>
                                        {product.component.componentType.name}
                                    </td>
                                    <td>
                                        {product.component.manufacturer}{" "}
                                        {product.component.model}
                                    </td>
                                    <td>
                                        {product.component.price.toFixed(2)} zł
                                    </td>
                                    <td>{product.quantity}</td>
                                    <td>{product.value.toFixed(2)} zł</td>
                                    <td>
                                        <button
                                            className="remove-button"
                                            onClick={() =>
                                                handleRemove(
                                                    product.component
                                                        .componentId
                                                )
                                            }
                                        >
                                            x
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="order-button" onClick={handleOrder}>
                        Złóż zamówienie
                    </button>
                </>
            )}
        </div>
    );
};

export default BasketPanel;
