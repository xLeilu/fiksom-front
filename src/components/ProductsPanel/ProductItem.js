import React from "react";
import "./ProductsPanel.css";
import imgFile from "./placeholder.png";
import { Link } from "react-router-dom";
import ImageWithPlaceholder from "../ImageWithPlaceholder/ImageWithPlaceholder";

const ProductItem = ({ product }) => {
    const host = process.env.REACT_APP_API_BASE_URL;
    const imgPath = `${host}/component/GetComponentImage/${product.componentId}`
    return (
        <Link
            to={`/produkt/${product.componentId}/${product.model}/${product.manufacturer}/${product.price}/${product.quantityAvailable}`}
            title={product.model}
        >
            <div id="product-item">
                <ImageWithPlaceholder src={imgPath} alt={product.model} />
                <h3>{product.manufacturer + " " + product.model}</h3>
                <p>{product.price.toFixed(2)} zł</p>
            </div>
        </Link>
    );
};

export default ProductItem;
