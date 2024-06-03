import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductsPanel.css";
import ProductItem from "./ProductItem";
import CategoriesNav from "./SideNav/CategoriesNav";

const ProductsPanel = ({ isLoggedIn }) => {
    const host = process.env.REACT_APP_API_BASE_URL;

    const [productsList, setProductsList] = useState([]);
    const { productType } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const type = productType || "";
                const response = await fetch(
                    `${host}/component/getcomponentsbytype/${type}`,
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
    }, [productType]);

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
