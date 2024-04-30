import React, { useState, useEffect } from "react";
import "./UserPanel.css";
import SideNav from "./SideNav/SideNav";

const UserData = ({ isLoggedIn }) => {
    const [userData, setUserData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5046/api/Account/GetLoggedUser",
                    {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();

                    setUserData(data);

                    setLoadingData(false);
                } else if (response.status === 401) {
                    setUserData([]);
                    alert("Błędy login lub hasło");
                } else {
                    setUserData([]);
                    throw new Error("Wystąpił problem z logowaniem");
                }
            } catch (error) {
                console.error("Błąd", error);
                setUserData([]);
                alert("Wystąpił błąd logowania. Spróbuj ponownie.");
            }
        };
        fetchData();
    }, []);

    return (
        <div className="userPanel">
            {isLoggedIn ? (
                <>
                    <SideNav />
                    <div id="userDataContent">
                        <h2>Twoje dane</h2>
                        {loadingData ? (
                            <p>Wczytywanie...</p>
                        ) : userData.length === 0 ? (
                            <div id="error">
                                <p>Błąd wczytywania danych</p>
                            </div>
                        ) : (
                            <div id="userData">
                                <p>Nazwa uzytkownika: {userData.userName}</p>
                                <p>Email: {userData.email}</p>
                                <p>Numer telefonu: {userData.phoneNumber}</p>
                                <p>Nadana rola: {userData.role}</p>
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
