"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
    const router = useRouter(); // Next.js router for navigation
    const [userData, setUserData] = useState(null); // State to store fetched user data
    const [loading, setLoading] = useState(false); // State to handle loading state during data fetching

    // Function to fetch user details from API
    const getUserDetails = async () => {
        try {
            setLoading(true); // Set loading to true while fetching user data
            const response = await axios.get("/api/users/profile"); // Request user data from API
            console.log("Fetched user data:", response.data.data); // Log response data for debugging
            setUserData(response.data.data); // Store fetched data in `userData` state
            toast.success("User data fetched successfully");
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            toast.error("Failed to fetch user data");
        } finally {
            setLoading(false); // Reset loading state after fetching is complete
        }
    };

    // Logout function to clear session and redirect to login page
    const logout = async () => {
        try {
            await axios.get("/api/users/logout"); // Endpoint to handle user logout (session clearing)
            toast.success("Logged out successfully");
            router.push("/login"); // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Failed to log out");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Profile Page
                </h1>

                {/* User details section */}
                {userData ? (
                    <div className="space-y-4 text-gray-700">
                        <div>
                            <span className="font-medium">User ID:</span>{" "}
                            <span className="text-gray-600">{userData._id}</span>
                        </div>
                        <div>
                            <span className="font-medium">Username:</span>{" "}
                            <span className="text-gray-600">{userData.username}</span>
                        </div>
                        <div>
                            <span className="font-medium">Email:</span>{" "}
                            <span className="text-gray-600">{userData.email}</span>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600 text-center mb-4">No user details available.</p>
                )}

                {/* Button to fetch user details */}
                <button
                    onClick={getUserDetails}
                    disabled={loading}
                    className={`w-full py-3 mt-6 rounded-lg font-semibold text-white transition duration-300 ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                >
                    {loading ? "Fetching Details..." : "Get User Details"}
                </button>

                {/* Logout button */}
                <button
                    onClick={logout}
                    className="w-full py-3 mt-4 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
