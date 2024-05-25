import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SideNav from "./SideNav/SideNav";
import { useNavigate } from "react-router-dom";
import "./UserPanel.css";

const EditPassword = () => {
    const { userId } = useParams();
    const [CurrentPassword, setCurrentPassword] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (NewPassword !== confirmPassword) {
            alert("Nowe hasło i potwierdzenie hasła muszą być takie same.");
            setError("Nowe hasło i potwierdzenie hasła muszą być takie same.");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5046/api/account/ChangePassword",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId,
                        CurrentPassword,
                        NewPassword,
                    }),
                }
            );

            console.log(userId, CurrentPassword, NewPassword);

            if (response.ok) {
                alert("Hasło zostało pomyślnie zmienione.");
                setSuccess("Hasło zostało pomyślnie zmienione.");
                setError("");
                navigate("/profil");
            } else {
                const errorData = await response.json();
                setError(
                    errorData.message || "Wystąpił błąd podczas zmiany hasła."
                );
                setSuccess("");
            }
        } catch (error) {
            console.error("Błąd:", error);
            setError("Wystąpił błąd podczas zmiany hasła.");
            setSuccess("");
        }
    };

    return (
        <div className="editPassPanel">
            <SideNav />
            <div id="editPasswordContent">
                <h2>Zmień hasło</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="CurrentPassword">Obecne hasło:</label>
                        <input
                            type="password"
                            id="CurrentPassword"
                            value={CurrentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="NewPassword">Nowe hasło:</label>
                        <input
                            type="password"
                            id="NewPassword"
                            value={NewPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">
                            Potwierdź nowe hasło:
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Zmień hasło</button>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    );
};

export default EditPassword;
