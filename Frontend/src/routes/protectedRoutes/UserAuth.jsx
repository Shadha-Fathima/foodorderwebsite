import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import {  useLocation, useNavigate } from "react-router-dom";

export const UserAuth = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState();

    const checkUser = async () =>{     
        try {
            const response = await axiosInstance({
                url: "/user/check-user",
                method: "GET",
                withCredentials: true,
            });
            console.log('Check User Response:', response);

            if (response.data.success) {
                setUser(true); 
            } else {
                setUser(false); 
                navigate("/login");
            }
        } catch (error) {
            
            console.error('Check User Function Error:', error.response || error.message);
            setUser(false); 
            navigate("/login");
        }
    };

    useEffect(() => {
        checkUser();
    }, [location.pathname]);

    return user ? children : null;
};
