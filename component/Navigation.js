"use client";
import { useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
    "ENGAGEMENT",
    "DIAMONDS",
    "RINGS",
    "EARRINGS",
    "BRACELETS",
    "NECKLACES",
    "GEMSTONES",
    "GIFTS & COLLECTIONS",
    "LOGIN",
];

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 fixed top-0 left-0 w-full z-50">
            <div className="w-full mx-auto px-6">
                <div className="flex justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <span className="sr-only">James Allen Home</span>
                        <span className="text-2xl tracking-tight font-semibold">
                            {/* SVG logo here */}
                            <svg
                                height="19"
                                viewBox="0 0 157 19"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#1B1B1B"
                            >
                                {/* svg path */}
                            </svg>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex lg:items-center lg:gap-8">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setOpen((prev) => !prev)}
                            aria-label="Toggle menu"
                            aria-expanded={open ? "true" : "false"}
                            className="p-2 text-gray-600 inline-flex items-center justify-center"
                        >
                            {open ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M6 6L18 18M6 18L18 6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M4 7h16M4 12h16M4 17h16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile dropdown */}
            <nav
                className={`lg:hidden transition-all duration-300 ${open ? "block" : "hidden"
                    } border-t border-gray-100 bg-white`}
            >
                <div className="max-w-[1200px] mx-auto px-4 py-3 space-y-2">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block text-sm uppercase tracking-wide py-2 text-gray-700"
                            onClick={() => setOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}
