
import Image from "next/image";
import HPSecondaryBanner from "@/public/images/HPSecondaryBanner.jpg"
import ShopLogo from "./ui/ShopLogo";

const ShopTheLook = () => {
    return (
        <>
            <ShopLogo />
            <div className="relative max-w-[1590px] min-w-[980px] m-auto h-[523px]">

                <Image src={HPSecondaryBanner} fill className="object-cover object-top" priority alt="text will come here ..." />
            </div>
        </>
    )
}

export default ShopTheLook;