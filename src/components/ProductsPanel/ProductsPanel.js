import React, { useState, useEffect } from "react";
import "./ProductsPanel.css";
import ProductItem from "./ProductItem";
import CategoriesNav from "./SideNav/CategoriesNav";

const ProductsPanel = ({ isLoggedIn }) => {
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        // Fetch product data from API or use local data
    }, []);

    return (
        <div className="productListContent">
            <CategoriesNav />
            {productsList.length === 0 ? (
                <div id="productsList">
                    <p>Brak produktów</p>
                </div>
            ) : (
                <div id="productsList">
                    {productsList.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsPanel;
