import { LogoData } from "@/app/utils/data"
import Image from "next/image"
import Link from "next/link"

const ShopLogo = () => {
    return (
        <>

            <ui className="flex justify-start  max-w-[1590px] min-w-[980px] m-auto list-none  relative z-20">
                {LogoData.map((item, index) => {
                    return <li key={index}> <Link href='/'> <Image src={item.image} alt="Lgog Images" /> </Link> </li>
                })}
            </ui>

        </>
    )
}

export default ShopLogo;