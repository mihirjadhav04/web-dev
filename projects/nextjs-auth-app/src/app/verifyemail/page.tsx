"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function VerifyEmailPage() {
    // State variables to manage verification status and error state
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    // Function to verify the user's email with the token
    const verifyUserEmail = async (token: string) => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.error(error.response?.data || error.message);
        }
    };

    // Extract the token from the URL and verify email on component mount
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        if (urlToken) verifyUserEmail(urlToken);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
                {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">Email Verification</h1> */}

                {/* Show success message with check icon if verified */}
                {verified && (
                    <div className="flex flex-col items-center">
                        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                        <p className="text-2xl text-green-600 font-semibold mb-5">Email Verified Successfully!</p>
                        <Link href="/login">
                            <span className="mt-6 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-700 transition cursor-pointer">
                                Go to Login
                            </span>
                        </Link>
                    </div>
                )}

                {/* Show error message with cross icon if verification fails */}
                {error && (
                    <div className="flex flex-col items-center">
                        <FaTimesCircle className="text-red-500 text-6xl mb-4" />
                        <p className="text-2xl text-red-600 font-semibold">Verification Failed</p>
                        <p className="text-gray-600 mt-2">Please try again or contact support.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
