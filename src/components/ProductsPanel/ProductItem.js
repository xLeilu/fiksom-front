import React from "react";
import "./ProductsPanel.css";
import imgFile from "./placeholder.png";

const ProductItem = ({ product }) => {
    return (
        <div id="product-item">
            <img src={imgFile} alt={product.title} />
            <h3>{product.manufacturer + " " + product.model}</h3>
            <p>${product.price}</p>
        </div>
    );
};

export default ProductItem;
