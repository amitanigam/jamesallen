
import Image from "next/image";
import ring from "@/public/images/ring.png"
import diamond from "@/public/images/Diamond_Sprite.png"

const RingAnimation = () => {
    return (
        <>
            <div className="w-[70%]  relative pt-10 ">
                <span>
                    <Image src={diamond} className=" absolute mix-blend-darken top-[5%] left-[33%]" />
                </span>
                <Image src={ring} alt="ring" className=" mix-blend-darken relative top-[50%] " sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
        </>
    )
}

export default RingAnimation;