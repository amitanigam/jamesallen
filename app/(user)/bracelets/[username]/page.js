// /app/(user)/bracelets/[username]/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BraceletsPersonal({ params }) {
    const router = useRouter();
    const [checking, setChecking] = useState(true);
    const [userEmail, setUserEmail] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        Promise.resolve(params)
            .then((p) => {
                const uname = p?.username ?? null;
                setUsername(uname);

                const logged = localStorage.getItem("isLoggedIn") === "true";
                const email = localStorage.getItem("userEmail");

                if (logged && email) {
                    setUserEmail(email);
                    setChecking(false);
                } else {

                    router.push("/bracelets");
                }
            })
            .catch(() => router.push("/bracelets"));
    }, [params, router]);

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div>Checking session...</div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 flex items-start justify-center p-6 mt-[76px]">
            <h1 className="text-3xl font-bold text-pink-600 mb-4">Dear {username}, Welcome 💎</h1>
            <p className="text-gray-700 mb-6">Personalised bracelets for <strong>{userEmail}</strong>.</p>
        </main>
    );
}
