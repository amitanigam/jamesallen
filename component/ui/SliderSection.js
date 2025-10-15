
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import HeadingCom from "./HeadingCom";
import { SliderRings } from "@/app/utils/data";

export default function SliderInfinite({ visible = 5, durationMs = 600 }) {

    const originals = SliderRings || [];
    const count = originals.length;
    if (count === 0) return null;


    const clones = visible;


    const leftClones = originals.slice(-clones);
    const rightClones = originals.slice(0, clones);
    const extended = useMemo(() => [...leftClones, ...originals, ...rightClones], [leftClones, originals, rightClones]);


    const startIndex = clones;
    const [internalIndex, setInternalIndex] = useState(startIndex);


    const [withTransition, setWithTransition] = useState(true);


    const [isAnimating, setIsAnimating] = useState(false);
    const animTimerRef = useRef(null);


    const itemWidthPercent = 100 / visible;


    const centerPos = Math.floor(visible / 2);


    const translatePercent = useMemo(() => {

        const raw = (internalIndex - centerPos) * itemWidthPercent;

        return -raw;
    }, [internalIndex, centerPos, itemWidthPercent]);


    const startLock = () => {
        setIsAnimating(true);
        if (animTimerRef.current) window.clearTimeout(animTimerRef.current);
        animTimerRef.current = window.setTimeout(() => {
            setIsAnimating(false);
            animTimerRef.current = null;
        }, durationMs + 20);
    };

    const handleNext = () => {
        if (isAnimating) return;
        setWithTransition(true);
        setInternalIndex((i) => i + 1);
        startLock();
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setWithTransition(true);
        setInternalIndex((i) => i - 1);
        startLock();
    };


    const handleClickItem = (extIndex) => {
        if (isAnimating) return;
        setWithTransition(true);
        setInternalIndex(extIndex);
        startLock();
    };


    const onTransitionEnd = () => {

        if (internalIndex >= clones + count) {

            const mapped = startIndex + (internalIndex - (clones + count));

            setWithTransition(false);
            setInternalIndex(mapped);

            setTimeout(() => setWithTransition(true), 20);
            return;
        }


        if (internalIndex < clones) {

            const offsetFromLeft = clones - internalIndex;
            const mapped = startIndex + (count - offsetFromLeft);
            setWithTransition(false);
            setInternalIndex(mapped);
            setTimeout(() => setWithTransition(true), 20);
            return;
        }
    };


    useEffect(() => {
        return () => {
            if (animTimerRef.current) window.clearTimeout(animTimerRef.current);
        };
    }, []);


    return (
        <section className="w-full mx-auto py-16 relative overflow-hidden">
            <div className="text-center mb-10">
                <HeadingCom heading="JAMES ALLEN'S BEST SELLING" subheading="Engagement Rings" />
            </div>

            {/* Prev */}
            <button
                aria-label="Prev"
                onClick={handlePrev}
                disabled={isAnimating}
                className={`absolute left-4 top-1/2 -translate-y-1/2 z-50 rounded-full p-3 shadow-md bg-white ${isAnimating ? "opacity-60 cursor-wait" : "hover:bg-gray-100"
                    }`}
            >
                ←
            </button>

            {/* Next */}
            <button
                aria-label="Next"
                onClick={handleNext}
                disabled={isAnimating}
                className={`absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full p-3 shadow-md bg-white ${isAnimating ? "opacity-60 cursor-wait" : "hover:bg-gray-100"
                    }`}
            >
                →
            </button>

            {/* viewport */}
            <div className="w-full">
                <div
                    // TRACK
                    className="flex items-center gap-8"
                    onTransitionEnd={onTransitionEnd}
                    style={{
                        transform: `translate3d(${translatePercent}%, 0, 0)`,
                        transition: withTransition ? `transform ${durationMs}ms cubic-bezier(.22,.9,.3,1)` : "none",
                        willChange: "transform",
                    }}
                >
                    {extended.map((item, extIndex) => {
                        // isActive = whether this extIndex is currently centered
                        const isActive = extIndex === internalIndex;
                        return (
                            <div
                                key={`${item.id}-${extIndex}`} // extIndex makes clones unique
                                role="button"
                                onClick={() => handleClickItem(extIndex)}
                                className={`flex-shrink-0 px-4 transition-all duration-500 ease-in-out cursor-pointer select-none ${isActive ? "scale-110 z-30 opacity-100" : "scale-95 z-10 opacity-60"
                                    }`}
                                style={{ width: `${itemWidthPercent}%` }}
                            >
                                <div className="w-full h-[320px] relative">
                                    <Image src={item.image} alt={item.title} fill className="object-contain" priority={isActive} />
                                </div>
                                <p className={`mt-4 text-center text-sm ${isActive ? "font-semibold text-black" : "text-gray-400"}`}>
                                    {item.title}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
