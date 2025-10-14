
import Image from "next/image";
import ring from "@/public/images/ring.png"
import diamond from "@/public/images/Diamond_Sprite.png"

const RingAnimation = () => {
    return (
        <>
            <div className="w-[50%]  relative pt-10 ">
                <div className="inline-block h-full relative w-[1px]">
                    <div className="h-[800px] relative origin-top w-[1166px]">
                        <Image src={ring} alt="ring" className=" absolute z-[1] left-[-159px] top-[64px] mix-blend-darken border border-amber-50" />
                    </div>
                </div>
                <span>
                    {/* <Image src={diamond} className=" absolute mix-blend-darken top-[5%] left-[33%]" /> */}
                </span>

            </div>
        </>
    )
}

export default RingAnimation;