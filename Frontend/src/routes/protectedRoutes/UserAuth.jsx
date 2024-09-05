import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import {  useLocation, useNavigate } from "react-router-dom";
import { checkUser } from "../../services/userApi";

export const UserAuth = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState();

    const checkUsers = async () =>{     
        try {
            // const response = await axiosInstance({
            //     url: "/user/check-user",
            //     method: "GET",
            //     withCredentials: true,
            // });
            const response = await checkUser()
            console.log('Check User Response:', response);

            if (response.data.success) {
                setUser(true); 
            } else {
                setUser(false); 
                navigate("/login");
            }
        } catch (error) {
            
            console.error('Check User Function Error:', error);
            setUser(false); 
            navigate("/login");
        }
    };

    useEffect(() => {
        checkUsers();
    }, [location.pathname]);

    return user ? children : null;
};
