import React from "react";
import { useLocation } from "react-router-dom";

const EditUserData = () => {
    const location = useLocation();
    const { userId, userName, email, phoneNumber } = location.state;

    return (
        <div>
            <h2>Zmień dane</h2>
            <p>User ID: {userId}</p>
            <p>User Name: {userName}</p>
            <p>Email: {email}</p>
            <p>Phone Number: {phoneNumber}</p>
            {/* Formularz do zmiany danych użytkownika */}
        </div>
    );
};

export default EditUserData;
