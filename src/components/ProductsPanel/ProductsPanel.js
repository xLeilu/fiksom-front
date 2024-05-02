import React, { useState, useEffect } from "react";
import "./ProductsPanel.css";
import ProductItem from "./ProductItem";
import CategoriesNav from "./SideNav/CategoriesNav";

const ProductsPanel = ({ isLoggedIn }) => {
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        //http://localhost:5046/api/component/getcomponentbytype/Procesor

        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5046/api/component/getcomponentbytype/ram",
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
                    setProductsList(data.content || []);
                } else if (response.status === 401) {
                    setProductsList([]);
                } else {
                    setProductsList([]);
                }
            } catch (error) {
                setProductsList([]);
            }
        };

        fetchData();
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
