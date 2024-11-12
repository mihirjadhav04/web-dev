"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter(); // Next.js router for navigation
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    }); // State for storing form input values

    const [buttonDisabled, setButtonDisabled] = React.useState(true); // State to manage button enable/disable
    const [loading, setLoading] = React.useState(false); // State to manage loading status during signup

    // Function to handle signup when the button is clicked
    const onSignup = async () => {
        try {
            setLoading(true); // Set loading to true to indicate signup process is in progress
            const response = await axios.post("/api/users/signup", user); // Send POST request to signup API with user data
            console.log("Signup success", response.data);
            toast.success("Successfully Signed Up!");
            router.push("/login"); // Redirect to login page upon successful signup
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message); // Display error message if signup fails
        } finally {
            setLoading(false); // Set loading to false once signup process is complete
        }
    };

    // useEffect to monitor changes in the user input fields
    // Enable the signup button if all fields (email, password, username) have values
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false); // Enable button if all fields are filled
        } else {
            setButtonDisabled(true); // Disable button if any field is empty
        }
    }, [user]); // Dependencies: triggers effect on changes to `user` state

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    {loading ? "Processing..." : "Create an Account"}
                </h1>

                <div className="space-y-4">
                    {/* Username input */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-700"
                            id="username"
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })} // Update username in `user` state
                            placeholder="Enter your username"
                        />
                    </div>

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
                    {/* Password input */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-700"
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 top-5 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <AiFillEye size={24} /> : <AiFillEyeInvisible size={24} />}
                        </button>
                    </div>
                </div>

                {/* Signup button */}
                <button
                    onClick={onSignup}
                    disabled={buttonDisabled} // Disable button based on `buttonDisabled` state
                    className={`w-full py-3 mt-6 rounded-lg font-semibold text-white transition duration-300 ${
                        buttonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                >
                    {buttonDisabled ? "Complete the form" : "Sign Up"}
                </button>

                {/* Login link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-indigo-600 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
