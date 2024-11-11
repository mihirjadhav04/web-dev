"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter(); // Next.js router for navigation
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    }); // State for storing form input values

    const [buttonDisabled, setButtonDisabled] = React.useState(true); // State to manage button enable/disable
    const [loading, setLoading] = React.useState(false); // State to manage loading status during login

    // Function to handle login when the button is clicked
    const onLogin = async () => {
        try {
            setLoading(true); // Set loading to true to indicate login process is in progress
            const response = await axios.post("/api/users/login", user); // Send POST request to login API with user data
            console.log("Login success", response.data);
            toast.success("Login success"); // Display success message
            router.push("/profile"); // Redirect to profile page upon successful login
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message); // Display error message if login fails
        } finally {
            setLoading(false); // Set loading to false once login process is complete
        }
    };

    // useEffect to monitor changes in the user input fields
    // Enable the login button if both fields (email, password) have values
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false); // Enable button if all fields are filled
        } else {
            setButtonDisabled(true); // Disable button if any field is empty
        }
    }, [user]); // Dependencies: triggers effect on changes to `user` state

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    {loading ? "Processing..." : "Login"}
                </h1>

                <div className="space-y-4">
                    {/* Email input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-700"
                            id="email"
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })} // Update email in `user` state
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-700"
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })} // Update password in `user` state
                            placeholder="Enter your password"
                        />
                    </div>
                </div>

                {/* Login button */}
                <button
                    onClick={onLogin}
                    disabled={buttonDisabled} // Disable button based on `buttonDisabled` state
                    className={`w-full py-3 mt-6 rounded-lg font-semibold text-white transition duration-300 ${
                        buttonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                >
                    {buttonDisabled ? "Complete the form" : "Login"}
                </button>

                {/* Signup link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-indigo-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
