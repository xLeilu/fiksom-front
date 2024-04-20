import React, {useState} from "react";
import "./LoginPanel.css";
import { useNavigate } from "react-router-dom";

const LoginPanel = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        UserName: "",
        Password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch(
                "http://localhost:5046/api/account/SignIn",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if(response.status === 200){
                //po ewentualny cookies
                const responseJson = await response.json();
                const cookie = responseJson.cookie[0];
                const username = responseJson.userName;
                console.log(cookie);

                const cookieAttributes = cookie
                    .split("; ")
                    .reduce((acc, attribute) => {
                        const [key, value] = attribute.split("=");
                        acc[key] = value;
                        return acc;
                    }, {});

                document.cookie = `.AspNetCore.Identity.Application=${cookieAttributes[".AspNetCore.Identity.Application"]}`;
                document.cookie = `fikscomUser=${username}`

                alert("POMYŚLNIE");

                navigate("/");

            } else if (response.status === 401){
                alert("Błędy login lub hasło");
            } else {
                throw new Error("Wystąpił problem z logowaniem");
            }

        } catch (error) {
            console.error("Błąd",error);
            alert("Wystąpił błąd logowania. Spróbuj ponownie.")
        }
    }

    const onRegisterClick = () => {
        navigate("/rejestracja");
    };

    return (
        <div className="login-background">
            <div className="login-panel">
                <h2>Logowanie</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        name="UserName" 
                        placeholder="login" 
                        value={formData.UserName} 
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="Password"
                        placeholder="Hasło"
                        value={formData.Password}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Zaloguj</button>
                </form>
                <div className="line-container">
                    <div className="line"></div>
                    <div className="text">Nie masz konta?</div>
                    <div className="line"></div>
                </div>
                <button id="register" onClick={onRegisterClick}>Zarejestruj się</button>
            </div>
        </div>
            
    );
};

export default LoginPanel;