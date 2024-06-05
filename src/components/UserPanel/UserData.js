import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserPanel.css";
import SideNav from "./SideNav/SideNav";

const UserData = ({ isLoggedIn, isAdmin }) => {
    const host = process.env.REACT_APP_API_BASE_URL;
    const [userData, setUserData] = useState({});
    const [loadingData, setLoadingData] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${host}/Account/GetLoggedUser`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    setLoadingData(false);
                } else if (response.status === 401) {
                    setUserData({});
                    alert("Błędy login lub hasło");
                } else {
                    setUserData({});
                    throw new Error("Wystąpił problem z logowaniem");
                }
            } catch (error) {
                console.error("Błąd", error);
                setUserData({});
                alert("Wystąpił błąd logowania. Spróbuj ponownie.");
            }
        };
        fetchData();
    }, []);

    const handleEditPassword = () => {
        navigate(`/edit-password/${userData.id}`);
    };

    const handleEditUserData = () => {
        navigate(
            `/edit-user-data/${userData.id}/${userData.userName}/${userData.email}/${userData.phoneNumber}`
        );
    };

    return (
        <div className="userPanel">
            {isLoggedIn ? (
                <>
                    <SideNav isAdminStatus={isAdmin} />
                    <div id="userDataContent">
                        <h2>Twoje dane</h2>
                        {loadingData ? (
                            <p>Wczytywanie...</p>
                        ) : !userData.id ? (
                            <div id="error">
                                <p>Błąd wczytywania danych</p>
                            </div>
                        ) : (
                            <div id="userData">
                                <p>Nazwa uzytkownika: {userData.userName}</p>
                                <p>Email: {userData.email}</p>
                                <p>Numer telefonu: {userData.phoneNumber}</p>
                                <p>Nadana rola: {userData.role}</p>
                                <button onClick={handleEditPassword}>
                                    Zmień hasło
                                </button>
                                <button onClick={handleEditUserData}>
                                    Zmień dane
                                </button>
                            </div>
                        )}
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

export default UserData;
