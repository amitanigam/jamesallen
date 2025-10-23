"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BraceletBanner({ params }) {
    console.log(params)
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

    const originalPrice = 2590;
    const discount = 20;
    const discountedPrice = originalPrice - (originalPrice * discount) / 100;

    return (
        <section className="relative w-[100%] flex flex-col lg:flex-row items-center justify-between bg-[#fdf4ec] px-8 md:px-16 py-12 overflow-hidden">
            {/* Left side image */}
            <div className="flex justify-center lg:w-1/2">
                <Image
                    src="/images/banner_image.png" // replace with your actual image path
                    alt="Bracelet"
                    width={500}
                    height={500}
                    className="object-contain "
                    priority
                />
            </div>

            {/* Right side content */}
            <div className="lg:w-1/2 text-center lg:text-left mt-8 lg:mt-0">
                <h1 className="text-5xl font-extrabold tracking-wider text-[#6b0f0f] mb-4">
                    BRACELETS
                </h1>
                <p className="text-lg text-[#6b0f0f] mb-6 max-w-md mx-auto lg:mx-0">
                    Wrap your wrists in diamond and gemstone bracelets set in rose gold, white gold,
                    yellow gold, and platinum.
                </p>

                <h1 className="text-3xl font-bold text-[#6b0f0f] mb-4">Dear {username}, Welcome 💎</h1>
                <p className="text-gray-700 mb-6">Personalised bracelets for <strong>{userEmail}</strong>.</p>

                <div className="flex flex-col items-center lg:items-start space-y-2 mb-6">
                    <p className="text-lg text-gray-700">
                        <span className="line-through">${originalPrice.toLocaleString()}</span>{" "}
                        <span className="text-2xl font-bold text-[#6b0f0f]">
                            ${discountedPrice.toLocaleString()}
                        </span>
                    </p>
                    <span className="bg-[#6b0f0f] text-white text-sm font-semibold px-4 py-1 rounded-full">
                        {discount}% OFF
                    </span>
                </div>

                <button className="bg-[#6b0f0f] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#4e0b0b] transition">
                    SHOP BRACELETS
                </button>
            </div>
        </section>
    );
}
