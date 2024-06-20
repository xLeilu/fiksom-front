import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserPanel.css";
import SideNav from "./SideNav/SideNav";

const ShoppingList = ({ isLoggedIn, isAdmin }) => {
    const host = process.env.REACT_APP_API_BASE_URL;
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${host}/order/GetMyOrders`, {
                    method: "GET",
                    credentials: "include",
                });
                if (!response.ok) {
                    console.error("Wystąpił błąd pobierania danych");
                }
                const data = await response.json();
                // Sortowanie zamówień od najnowszych do najstarszych
                const sortedData = data.sort(
                    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
                );
                setOrders(sortedData);
            } catch (error) {
                console.error(error.Message);
            }
        };

        fetchOrders();
    }, [host]);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="userPanel">
            {isLoggedIn ? (
                <>
                    <SideNav isAdminStatus={isAdmin} />
                    <div id="shoppingListContent">
                        <h2>Historia zakupów</h2>
                        <p>Mozesz tutaj znaleźć historię swoich zakupów.</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Data zamówienia</th>
                                    <th>Cena</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((order) => (
                                    <tr key={order.orderId}>
                                        <td>
                                            {new Date(
                                                order.orderDate
                                            ).toLocaleString()}
                                        </td>
                                        <td>{order.totalPrice.toFixed(2)}zł</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <Link
                                                to={`/order/${order.orderId}/${order.status}`}
                                            >
                                                Szczegóły
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            ordersPerPage={ordersPerPage}
                            totalOrders={orders.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                </>
            ) : (
                <div id="userPanelContent">
                    <h2>Najpierw się zaloguj</h2>
                </div>
            )}
        </div>
    );
};

const Pagination = ({ ordersPerPage, totalOrders, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`page-item ${
                            number === currentPage ? "active" : ""
                        }`}
                    >
                        <a
                            onClick={() => paginate(number)}
                            href="#"
                            className="page-link"
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default ShoppingList;
