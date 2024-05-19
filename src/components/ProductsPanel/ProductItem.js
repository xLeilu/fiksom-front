import React from "react";
import "./ProductsPanel.css";
import imgFile from "./placeholder.png";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
    return (
        <Link
            to={`/produkt/${product.componentId}/${product.model}/${product.manufacturer}/${product.price}/${product.quantityAvailable}`}
            title={product.model}
        >
            <div id="product-item">
                <img src={imgFile} alt={product.model} />
                <h3>{product.manufacturer + " " + product.model}</h3>
                <p>{product.price.toFixed(2)} zł</p>
            </div>
        </Link>
    );
};

export default ProductItem;
