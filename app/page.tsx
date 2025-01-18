import HeroSection from "@/components/app/HeroSection";
import IntroductionSection from "@/components/app/IntroductionSection";
// import ExampleSection from "@/components/app/ExampleSection";
import HomeFooter from "@/components/app/HomeFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center relative">
      <HeroSection />

      <IntroductionSection />

      {/* <ExampleSection /> */}

      <HomeFooter />
    </div>
  );
}
