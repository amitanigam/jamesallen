const HeadingCom = (props) => {

    const { heading, subheading } = props;

    console.log(heading, subheading)

    return (
        <>
            <div className=" bg-[#fbf7f3]  h-[102px] mb-[-64px]">

            </div>
            <h3 className="uppercase text-[24px] tracking-widest text-gray-700 font-medium mt-3">{heading}</h3>
            <h1 className="text-[42px] md:text-[44px] font-serif   text-black mb-[53px]">{subheading}</h1>
        </>
    )
}

export default HeadingCom;