import React, { useState, useEffect } from "react";
import "./ProductsPanel.css";
import ProductItem from "./ProductItem";
import CategoriesNav from "./SideNav/CategoriesNav";

const ProductsPanel = ({ isLoggedIn }) => {
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        //http://localhost:5046/api/component/getcomponentsbytype/Procesor

        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5046/api/component/getcomponentsbytype/ram",
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
                    console.log(data);
                    setProductsList(data || []);
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
                <div id="productsListError">
                    <p>Brak produktów</p>
                </div>
            ) : (
                <div id="productsListContainer">
                    <div id="productsList">
                        {productsList.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPanel;
