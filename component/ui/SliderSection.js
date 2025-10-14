// app/components/SliderInfinite.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import HeadingCom from "./HeadingCom";
import { SliderRings } from "@/app/utils/data";

export default function SliderInfinite({ visible = 5, durationMs = 600 }) {
    // basic checks
    const originals = SliderRings || [];
    const count = originals.length;
    if (count === 0) return null;

    // number of clones on each side (use visible so sliding window never shows empty gap)
    const clones = visible;

    // build extended array: [lastClones..., ...originals..., firstClones...]
    const leftClones = originals.slice(-clones);
    const rightClones = originals.slice(0, clones);
    const extended = useMemo(() => [...leftClones, ...originals, ...rightClones], [leftClones, originals, rightClones]);

    // internal index (index into extended array). Start in the "real" first element
    const startIndex = clones; // points to originals[0]
    const [internalIndex, setInternalIndex] = useState(startIndex);

    // transition toggle (true -> CSS transition active)
    const [withTransition, setWithTransition] = useState(true);

    // prevent spamming while animating
    const [isAnimating, setIsAnimating] = useState(false);
    const animTimerRef = useRef(null);

    // width percent per item in the viewport
    const itemWidthPercent = 100 / visible;

    // center position in visible window (0-based)
    const centerPos = Math.floor(visible / 2);

    // Compute translate percent (negative)
    const translatePercent = useMemo(() => {
        // We want internalIndex to be centered, so shift = (internalIndex - centerPos) * itemWidthPercent,
        // but we must map using extended indices.
        const raw = (internalIndex - centerPos) * itemWidthPercent;
        // No clamping needed because we have clones to absorb edges
        return -raw;
    }, [internalIndex, centerPos, itemWidthPercent]);

    // Helpers to start/stop animation lock
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

    // on clicking an item -> center it
    const handleClickItem = (extIndex) => {
        if (isAnimating) return;
        setWithTransition(true);
        setInternalIndex(extIndex);
        startLock();
    };

    // on transition end, detect if we are in cloned area and jump without transition
    const onTransitionEnd = () => {
        // if internalIndex reached right clone region ( > clones + (count -1) )
        if (internalIndex >= clones + count) {
            // we jumped into right clones corresponding to originals[0..]
            // compute the index that maps to same logical item in originals
            const mapped = startIndex + (internalIndex - (clones + count));
            // disable transition, set index to mapped
            setWithTransition(false);
            setInternalIndex(mapped);
            // re-enable transition in next tick to preserve smoothness on next click
            setTimeout(() => setWithTransition(true), 20);
            return;
        }

        // if internalIndex reached left clone region ( < clones )
        if (internalIndex < clones) {
            // we've moved into left clones, map to corresponding original index at right side
            const offsetFromLeft = clones - internalIndex; // how many from the left boundary
            const mapped = startIndex + (count - offsetFromLeft);
            setWithTransition(false);
            setInternalIndex(mapped);
            setTimeout(() => setWithTransition(true), 20);
            return;
        }
    };

    // cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (animTimerRef.current) window.clearTimeout(animTimerRef.current);
        };
    }, []);

    // render
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
