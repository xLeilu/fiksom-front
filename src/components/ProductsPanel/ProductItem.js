import React from "react";
import "./ProductsPanel.css";

const ProductItem = ({ product }) => {
    return (
        <div className="product-item">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
        </div>
    );
};

export default ProductItem;
