import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useLoggedInStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const loggedIn = checkLoggedIn(".AspNetCore.Identity.Application");
        setIsLoggedIn(loggedIn);
    }, [location.pathname]);

    const checkLoggedIn = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);

        if (parts.length === 2) {
            const cookieValue = parts.pop().split(";").shift();
            return !!cookieValue;
        }
        return false;
    };

    return { isLoggedIn };
};
