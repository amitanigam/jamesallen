"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LoginModal from "@/component/ui/LoginModal";

const NAV_ITEMS = [
    "ENGAGEMENT",
    "DIAMONDS",
    "RINGS",
    "EARRINGS",
    "BRACELETS",
    "NECKLACES",
    "GEMSTONES",
    "GIFTS & COLLECTIONS",
];

const Header = () => {
    const [open, setOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const isLogged = localStorage.getItem("isLoggedIn") === "true";
        setLoggedIn(isLogged);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        setLoggedIn(false);
        alert("Logged out successfully!");
    };

    return (
        <>
            <header className="bg-white border-b border-gray-200 fixed top-0 left-0 w-full z-50">
                <div className="w-full mx-auto px-6">
                    <div className="flex justify-between h-20">
                        <Link href="/" className="flex items-center gap-3">
                            <span className="text-2xl font-semibold">James Allen</span>
                        </Link>

                        <nav className="hidden lg:flex lg:items-center lg:gap-8">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="text-[13px] uppercase tracking-wider text-gray-600 hover:text-gray-900"
                                >
                                    {item}
                                </Link>
                            ))}

                            {loggedIn ? (
                                <button
                                    className="text-sm font-medium text-gray-700"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    className="text-sm font-medium text-gray-700"
                                    onClick={() => setPopupOpen(true)}
                                >
                                    Login
                                </button>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            {popupOpen && <LoginModal open={popupOpen} onClose={() => setPopupOpen(false)} />}
        </>
    );
};

export default Header;










