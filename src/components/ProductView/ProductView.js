import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductView.css";
import ImageWithPlaceholder from "../ImageWithPlaceholder/ImageWithPlaceholder";

const ProductView = ({ isAdmin }) => {
    const host = process.env.REACT_APP_API_BASE_URL;
    const { model, manufacturer, price, productID, quantity } = useParams();
    const isOutOfStock = quantity === "0";
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        try {
            const response = await fetch(`${host}/cart/buy/${productID}`, {
                method: "PUT",
                credentials: "include",
            });

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

    const handleEditProduct = () => {
        navigate(`/modyfikuj/${productID}`);
    };

    const imgEx = `${host}/component/GetComponentImage/${productID}`;

    return (
        <div className="productContainer">
            <div id="productView">
                <div id="productDetails">
                    <h2>
                        {manufacturer} {model}
                    </h2>
                    <ImageWithPlaceholder src={imgEx} alt={model} />
                </div>
                <div id="productInfo">
                    {isAdmin && (
                        <button
                            id="editProductButton"
                            onClick={handleEditProduct}
                        >
                            Edytuj Produkt
                        </button>
                    )}
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
