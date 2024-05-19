import React from "react";
import { useParams } from "react-router-dom";
import imgFile from "./placeholder.png";
import "./ProductView.css";

const ProductView = () => {
    const { model, manufacturer, price, productID, quantity } = useParams();
    const isOutOfStock = quantity === "0";

    const handleAddToCart = async () => {
        try {
            const response = await fetch(
                `http://localhost:5046/api/cart/buy/${productID}`,
                {
                    method: "PUT",
                    credentials: "include",
                }
            );

            if (response.ok) {
                alert("Dodano do koszyka");
            } else {
                throw new Error("Wystąpił problem z dodaniem produktu");
            }
        } catch (error) {
            console.error("Błąd: ", error);
            alert("Wystąpił błąd podczas wysyłania danych");
        }
    };

    return (
        <div class="productContainer">
            <div id="productView">
                <div id="productDetails">
                    <h2>
                        {manufacturer} {productID} {model}
                    </h2>
                    <img src={imgFile} alt={model} />
                </div>
                <div id="productInfo">
                    <p id="productPrice">cena: {price} zł</p>
                    <p id="productQuantity">dostępna ilość: {quantity}</p>
                    <button
                        id="addToCartButton"
                        disabled={isOutOfStock}
                        className={isOutOfStock ? "disabled" : ""}
                        onClick={handleAddToCart}
                    >
                        Dodaj do koszyka
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
