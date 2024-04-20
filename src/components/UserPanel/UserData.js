import React, { useState, useEffect } from "react";
import "./UserPanel.css";
import SideNav from "./SideNav/SideNav"

const UserData = ({ isLoggedIn }) => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("test");
            try{
                const response = await fetch(
                    "http://localhost:5046/api/Account/GetLoggedUser",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if(response.ok) {
                    const data = await response.json();

                    console.log(data);

                    setUserData(data || []);
                } else if (response.status === 401){
                    setUserData([]);
                    alert("Błędy login lub hasło");
                } else {
                    setUserData([]);
                    throw new Error("Wystąpił problem z logowaniem");
                }
            } catch (error) {
                console.error("Błąd",error);
                setUserData([]);
                alert("Wystąpił błąd logowania. Spróbuj ponownie.")
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
                        {userData.length > 0 ?(
                            <div id="userData">
                                <p>Nazwa uzytkownika: {userData.userName}</p>
                                <p>Email: {userData.email}</p>
                                <p>Numer telefonu: {userData.phoneNumber}</p>
                                <p>Nadana rola: {userData.role}</p>
                            </div>
                        ): (
                            <div id="error">
                                <p>Błąd wczytywania danych</p>
                            </div>    
                            
                        )}
                    </div>
                </>
                
            ):(
                <div id="userPanelContent">
                    <h2>Najpierw się zaloguj</h2>
                </div>
            )}
        </div>
    );
};

export default UserData;