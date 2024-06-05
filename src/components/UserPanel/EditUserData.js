import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SideNav from "./SideNav/SideNav";
import { useNavigate } from "react-router-dom";
import "./UserPanel.css";

const EditUserData = ({ isAdmin }) => {
    const host = process.env.REACT_APP_API_BASE_URL;
    const { userId, userName, email, phoneNumber } = useParams();
    const [newUserName, setNewUserName] = useState(userName);
    const [newEmail, setNewEmail] = useState(email);
    const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${host}/account/EditUser`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Id: userId,
                    UserName: newUserName,
                    Email: newEmail,
                    PhoneNumber: newPhoneNumber,
                }),
            });

            if (response.ok) {
                alert("Dane użytkownika zostały pomyślnie zmienione.");
                setSuccess("Dane użytkownika zostały pomyślnie zmienione.");
                setError("");
                navigate("/dane-uzytkownika");
            } else {
                const errorData = await response.json();
                setError(
                    errorData.message ||
                        "Wystąpił błąd podczas zmiany danych użytkownika."
                );
                setSuccess("");
            }
        } catch (error) {
            console.error("Błąd:", error);
            setError("Wystąpił błąd podczas zmiany danych użytkownika.");
            setSuccess("");
        }
    };

    return (
        <div className="editUserDataPanel">
            <SideNav isAdminStatus={isAdmin} />
            <div id="editUserDataContent">
                <h2>Edytuj dane użytkownika</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="newUserName">Nazwa użytkownika:</label>
                        <input
                            type="text"
                            id="newUserName"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newEmail">Adres email:</label>
                        <input
                            type="email"
                            id="newEmail"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPhoneNumber">Numer telefonu:</label>
                        <input
                            type="text"
                            id="newPhoneNumber"
                            value={newPhoneNumber}
                            onChange={(e) => setNewPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Zapisz zmiany</button>
                </form>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </div>
        </div>
    );
};

export default EditUserData;
