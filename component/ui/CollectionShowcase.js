// components/CollectionShowcase.jsx
"use client";

import Image from "next/image";
import { defaultItems } from "@/app/utils/data";

export default function CollectionShowcase({ items = null }) {
    // default demo items (replace with your own public images or pass items prop)


    const list = items && items.length ? items : defaultItems;

    return (
        <section className="relative bg-[#fbf7f3] py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-15">
                <div className="space-y-28">
                    {list.map((item, i) => {
                        const isOdd = i % 2 === 1;
                        return (
                            <div
                                key={item.id || i}
                                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 ${isOdd ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* faded background word (desktop only) */}
                                {/* <div
                                    aria-hidden
                                    className={`hidden md:block absolute top-[10%] transform -translate-y-1/2 pointer-events-none select-none text-[110px] lg:text-[140px] font-serif tracking-wide text-pink-100 opacity-10 ${isOdd ? "right-0 text-right" : "left-0 text-left"
                                        }`}
                                    style={{ lineHeight: 0.9 }}
                                >
                                    {item.bgText || ""}
                                </div> */}

                                {/* IMAGE WRAPPER */}
                                <div className="relative w-full md:w-1/2 lg:w-[46%]">
                                    <div className="relative boxshad">
                                        <div className="w-full h-[260px] md:h-[360px] lg:h-[440px]">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                                                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 46vw"
                                                priority={false}
                                            />
                                        </div>

                                        {/* OVERLAY: absolute on md+, static on mobile */}
                                        <div
                                            className={`collection-overlay md:top-[10%] lg:left-10" "
                                                }`}
                                        >
                                            <h4 className="text-[23px] uppercase tracking-widest text-block mb-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                                {item.desc}
                                            </p>
                                            <a
                                                href={item.link || "#"}
                                                className="inline-block text-sm font-semibold text-pink-600 hover:text-pink-700 border-b-2 border-pink-300 hover:border-pink-500 transition-colors"
                                            >
                                                EXPLORE
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* right side blank when the image is left (we keep layout balanced) */}
                                {/* <div className="w-full md:w-1/2 lg:w-[46%]"></div> */}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
