import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserPanel.css";
import SideNav from "./SideNav/SideNav";

const OrderDetails = ({ isAdmin }) => {
    const host = process.env.REACT_APP_API_BASE_URL;
    const { orderId, orderStatus } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [invoiceGuid, setInvoiceGuid] = useState("");

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(
                    `${host}/order/GetOrderDetails/${orderId}`,
                    { method: "GET", credentials: "include" }
                );
                if (!response.ok) {
                    console.error("Wystąpił błąd pobierania danych");
                }
                const data = await response.json();
                setOrderDetails(data.orderDetails);
                setInvoiceGuid(data.invoiceGuid);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchOrderDetails();
    }, [host, orderId]);

    const handleDownloadInvoice = () => {
        window.open(
            `${host}/InvoiceDocument/GetInvoice/${invoiceGuid}`,
            "_blank"
        );
    };

    return (
        <div className="orderDetails">
            <SideNav isAdminStatus={isAdmin} />
            <div id="orderDetailsContent">
                <h2>Szczegóły zamówienia</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nazwa produktu</th>
                            <th>Ilość</th>
                            <th>Cena za sztukę</th>
                            <th>Łączna cena</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map((detail) => (
                            <tr key={detail.orderDetailId}>
                                <td>{`${detail.component.manufacturer} ${detail.component.model}`}</td>
                                <td>{detail.quantity}</td>
                                <td>{detail.pricePerUnit.toFixed(2)}zł</td>
                                <td>
                                    {(
                                        detail.quantity * detail.pricePerUnit
                                    ).toFixed(2)}
                                    zł
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orderStatus !== "anulowane" && (
                    <button
                        id="downloadInvoiceButton"
                        onClick={handleDownloadInvoice}
                    >
                        Pobierz fakturę
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderDetails;
