import React, { useState, useEffect } from "react";
import "./BasketPanel.css";

const BasketPanel = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5046/api/cart/getcart", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleRemove = (componentId) => {
        fetch(`http://localhost:5046/api/cart/remove/${componentId}`, {
            method: "DELETE",
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                setProducts(
                    products.filter(
                        (product) =>
                            product.component.componentId !== componentId
                    )
                );
                alert("Usunięto produkt z koszyka");
            })
            .catch((error) => console.error("Error removing item:", error));
    };

    return (
        <div className="basket-panel">
            <h2>Koszyk</h2>
            {products.length === 0 ? (
                <p>Koszyk jest pusty</p>
            ) : (
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
                                <td>{product.component.componentType}</td>
                                <td>
                                    {product.component.manufacturer}{" "}
                                    {product.component.model}
                                </td>
                                <td>{product.component.price.toFixed(2)} zł</td>
                                <td>{product.quantity}</td>
                                <td>{product.value.toFixed(2)} zł</td>
                                <td>
                                    <button
                                        className="remove-button"
                                        onClick={() =>
                                            handleRemove(
                                                product.component.componentId
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
            )}
        </div>
    );
};

export default BasketPanel;
