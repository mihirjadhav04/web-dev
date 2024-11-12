// src/app/profile/[id]/page.tsx

import React from "react";

// Define your component function and export it as default
export default function ProfilePage({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1>Profile Page</h1>
            <p>Viewing profile for user ID: {params.id}</p>
        </div>
    );
}
