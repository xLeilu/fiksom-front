import React, { useState, useEffect } from "react";
import "./UserPanel.css";
import SideNav from "./SideNav/SideNav";

const ManageUsers = ({ isLoggedIn, isAdmin }) => {
    const host = process.env.REACT_APP_API_BASE_URL;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${host}/account/GetUsers`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                    setLoading(false);
                } else if (response.status === 401) {
                    setUsers([]);
                    alert("Błędy login lub hasło");
                } else {
                    setUsers([]);
                    throw new Error(
                        "Wystąpił problem z pobieraniem danych użytkowników"
                    );
                }
            } catch (error) {
                console.error("Błąd", error);
                setUsers([]);
                alert(
                    "Wystąpił błąd podczas pobierania danych użytkowników. Spróbuj ponownie."
                );
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleLockout = async (id, lockoutEnabled) => {
        try {
            const response = await fetch(
                `${host}/account/lockoutuser?id=${id}`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ lockoutEnabled: !lockoutEnabled }),
                }
            );

            if (response.ok) {
                setUsers(
                    users.map((user) =>
                        user.id === id
                            ? { ...user, lockoutEnabled: !lockoutEnabled }
                            : user
                    )
                );
            } else {
                throw new Error(
                    "Wystąpił problem z aktualizacją statusu blokady"
                );
            }
        } catch (error) {
            console.error("Błąd", error);
            alert(
                "Wystąpił błąd podczas aktualizacji statusu blokady. Spróbuj ponownie."
            );
        }
    };

    return (
        <div className="userPanel">
            {isLoggedIn ? (
                <>
                    <SideNav isAdminStatus={isAdmin} />
                    <div id="manageUserContent">
                        <h2>Manage Users</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : !users.length ? (
                            <div id="error">
                                <p>Błąd wczytywania danych</p>
                            </div>
                        ) : (
                            <div id="manageUsersData">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nazwa uzytkownika</th>
                                            <th>Email</th>
                                            <th>Numer telefonu</th>
                                            <th>Status Konta</th>
                                            <th>Akcja</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.userName}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phoneNumber}</td>
                                                <td>
                                                    {user.lockoutEnabled
                                                        ? "Zablokowane"
                                                        : "Odblokowane"}
                                                </td>
                                                <td>
                                                    <button
                                                        className={
                                                            user.lockoutEnabled
                                                                ? "unlock"
                                                                : "lock"
                                                        }
                                                        onClick={() =>
                                                            toggleLockout(
                                                                user.id,
                                                                user.lockoutEnabled
                                                            )
                                                        }
                                                    >
                                                        {user.lockoutEnabled
                                                            ? "Odblokuj"
                                                            : "Zablokuj"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div id="manageUserContent">
                    <h2>Najpierw się zaloguj</h2>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
