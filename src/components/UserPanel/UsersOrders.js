import React, { useState, useEffect } from "react";
import "./UserPanel.css";
import SideNav from "./SideNav/SideNav";
import { useNavigate } from "react-router-dom";

const UsersOrders = ({ isLoggedIn, isAdmin }) => {
    const host = process.env.REACT_APP_API_BASE_URL;
    const [ordersData, setOrdersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${host}/account/getusers`, {
                    method: "GET",
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch orders data");
                }
                const data = await response.json();
                const allOrders = data.flatMap((user) =>
                    user.orders.map((order) => ({
                        ...order,
                        userName: user.userName,
                    }))
                );
                allOrders.sort(
                    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
                );
                setOrdersData(allOrders);
            } catch (error) {
                console.error("Error fetching orders data:", error);
            }
        };

        if (isLoggedIn) {
            fetchData();
        }
    }, [isLoggedIn, host]);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const navigateToOrderDetails = (orderId, orderStatus) => {
        navigate(`/order/${orderId}/${orderStatus}`);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${host}/order/ChangeOrderStatus`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderId,
                    orderStatus: newStatus,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to update order status");
            }
            setOrdersData((prevOrders) =>
                prevOrders.map((order) =>
                    order.orderId === orderId
                        ? { ...order, status: newStatus }
                        : order
                )
            );
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = ordersData.slice(indexOfFirstOrder, indexOfLastOrder);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(ordersData.length / ordersPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="usersOrdersPanel">
            {isLoggedIn ? (
                <>
                    <SideNav isAdminStatus={isAdmin} />
                    <div id="usersOrdersContent">
                        <h2>Zamówienia użytkowników</h2>
                        <table className="ordersTable">
                            <thead>
                                <tr>
                                    <th>Data zamówienia</th>
                                    <th>Status</th>
                                    <th>Cena całkowita</th>
                                    <th>Użytkownik</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((order) => (
                                    <tr key={order.orderId}>
                                        <td
                                            onClick={() =>
                                                navigateToOrderDetails(
                                                    order.orderId,
                                                    order.status
                                                )
                                            }
                                        >
                                            {formatDate(order.orderDate)}
                                        </td>
                                        <td>
                                            <select
                                                value={order.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        order.orderId,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="opłacone">
                                                    Opłacone
                                                </option>
                                                <option value="dostarczone">
                                                    Dostarczone
                                                </option>
                                                <option value="anulowane">
                                                    Anulowane
                                                </option>
                                            </select>
                                        </td>
                                        <td
                                            onClick={() =>
                                                navigateToOrderDetails(
                                                    order.orderId,
                                                    order.status
                                                )
                                            }
                                        >
                                            {order.totalPrice}
                                        </td>
                                        <td
                                            onClick={() =>
                                                navigateToOrderDetails(
                                                    order.orderId,
                                                    order.status
                                                )
                                            }
                                        >
                                            {order.userName}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="paginationUsersOrders">
                            {pageNumbers.map((number) => (
                                <button
                                    key={number}
                                    className={
                                        currentPage === number ? "active" : ""
                                    }
                                    onClick={() => paginate(number)}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div id="usersOrdersContent">
                    <h2>Najpierw się zaloguj</h2>
                </div>
            )}
        </div>
    );
};

export default UsersOrders;
