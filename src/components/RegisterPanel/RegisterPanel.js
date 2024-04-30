import React, { useState } from "react";
import "./RegisterPanel.css";
import { useNavigate } from "react-router-dom";

const RegisterPanel = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        UserName: "",
        Email: "",
        PhoneNumber: "",
        Email: "",
        Password: "",
    });

    const handleChange = (event) => {
        const selectedValue = event.target.value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            role: [selectedValue],
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5046/api/Account/SignUp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.status === 200) {
                alert("Rejestracja pomyślna");
                navigate("/login");
            } else if (response.status === 401) {
                alert("Błąd autoryzacji");
            } else if (response.status === 400) {
                alert("Uzytkownik o podanym adresie e-mail juz istnieje");
            } else {
                throw new Error("Wystąpił problem z rejestracją");
            }
        } catch (error) {
            console.error("Błąd: ", error);
            alert("Wystąpił błąd podczas wysyłania danych");
        }
    };

    const onLoginClick = () => {
        navigate("/login");
    };

    return (
        <div className="register-background">
            <div className="register-panel">
                <h2>Rejestracja</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="UserName"
                        placeholder="Login"
                        value={formData.UserName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="Email"
                        placeholder="Email"
                        value={formData.Email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="PhoneNumber"
                        placeholder="Nr telefonu"
                        value={formData.PhoneNumber}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="Password"
                        placeholder="Hasło"
                        value={formData.Password}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Zarejestruj się</button>
                </form>
                <div className="line-container">
                    <div className="line"></div>
                    <div className="text">Masz już konto?</div>
                    <div className="line"></div>
                </div>
                <button id="login" onClick={onLoginClick}>
                    Zaloguj się
                </button>
            </div>
        </div>
    );
};

export default RegisterPanel;
