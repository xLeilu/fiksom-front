import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useLoggedInStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const loggedIn = checkLoggedIn();
        setIsLoggedIn(loggedIn);
    }, [location.pathname]);

    const checkLoggedIn = () => {
        const cookieValue = document.cookie
            .split("; ")
            .find((row) => row.startsWith(".AspNetCore.Identity.Application="))
            ?.split("=")[1];

        return !!cookieValue;
    };

    return { isLoggedIn };
};
