"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password));
    }, [user]);

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
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Enter your email"
                        />
                    </div>

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

                {/* Login button */}
                <button
                    onClick={onLogin}
                    disabled={buttonDisabled}
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
