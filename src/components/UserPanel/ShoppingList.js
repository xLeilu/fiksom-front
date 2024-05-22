import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserPanel.css";
import SideNav from "./SideNav/SideNav";

const ShoppingList = ({ isLoggedIn }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5046/api/order/GetMyOrders",
                    { method: "GET", credentials: "include" }
                );
                if (!response.ok) {
                    console.error("Wystąpił błąd pobierania danych");
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error(error.Message);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="userPanel">
            {isLoggedIn ? (
                <>
                    <SideNav />
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
                                {orders.map((order) => (
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
                                                to={`/order/${order.orderId}`}
                                            >
                                                Szczegóły
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

export default ShoppingList;
