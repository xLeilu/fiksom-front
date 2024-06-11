import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductsPanel.css";
import ProductItem from "./ProductItem";
import CategoriesNav from "./SideNav/CategoriesNav";

const ProductsPanel = ({ isLoggedIn }) => {
    const host = process.env.REACT_APP_API_BASE_URL;
    const [productsList, setProductsList] = useState([]);
    const { productType } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

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
                    setCurrentPage(1);
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

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productsList.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(productsList.length / productsPerPage);

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
                        {currentProducts.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                    <div id="pagination">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Poprzednia
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={
                                    currentPage === index + 1 ? "active" : ""
                                }
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Następna
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPanel;
