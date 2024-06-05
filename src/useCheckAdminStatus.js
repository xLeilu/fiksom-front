import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useCheckAdminStatus = () => {
    const host = process.env.REACT_APP_API_BASE_URL;
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${host}/Account/GetLoggedUser`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const userData = await response.json();
                setIsAdmin(userData.role === "Administrator");
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [location.pathname]);

    return { isAdmin };
};
