import HeroContent from "@/component/HeroContent";
import CategoryCard from "@/component/CategoryCard";
import Design_Engagement from "@/component/Design_Engagement";
import ShopTheLook from "@/component/ShopTheLook";
import SliderSection from '@/component/ui/SliderSection';
import DiamondInspection from "@/component/DiamondInspection"


const Home = () => {
  return (
    <>

      <HeroContent />
      <CategoryCard />
      <Design_Engagement />
      <ShopTheLook />
      <SliderSection />
      {/* <DiamondInspection imageSrc="/images/diamond.png" ctaHref="/book" /> */}

    </>


  )
}

export default Home;