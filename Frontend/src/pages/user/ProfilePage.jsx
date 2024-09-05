import { LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../services/userApi";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const handleLogOut = async () => {
        const response = await userLogout();
        if (response?.success) {
            navigate("/");
        }
    };

    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance({
                url: "/user/profile",
                method: "GET",
            });
            setUser(response?.data?.data);
            console.log(response, "====response");

            // return response?.data;
        } catch (error) {
            console.log(error);
            toast.error("error fetching user data");
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <div className="flex flex-col items-center">
                  <div className="avatar mb-4">
                      <div className="w-24 rounded-full">
                          <img src={user?.profilePic} alt="Profile" />
                      </div>
                  </div>
                  <h1 className="text-2xl font-semibold text-gray-800">Welcome, {user?.name}</h1>
                  <p className="text-gray-600">Email: {user?.email}</p>
                  <p className="text-gray-600">Phone: {user?.mobile}</p>
                  <p className="text-gray-600 text-center mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, sit? Est modi deserunt et ducimus exercitationem sapiente.
                  </p>
                  <button className="btn btn-secondary mt-6 w-full">Edit Profile</button>
                  <button
                      onClick={handleLogOut}
                      className="btn btn-sm btn-error mt-4 w-full flex items-center justify-center gap-2"
                  >
                      <span>Log-out</span>
                      <LogOut />
                  </button>
              </div>
          </div>
      </div>
  );
};