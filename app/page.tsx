import HeroSection from "@/components/app/HeroSection";
import IntroductionSection from "@/components/app/IntroductionSection";
// import ExampleSection from "@/components/app/ExampleSection";
import HomeFooter from "@/components/app/HomeFooter";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen relative pt-8 md:pt-16 pb-32">
      <main className="flex-1 flex flex-col items-center justify-center relative">
        <HeroSection />

        <IntroductionSection />

        {/* <ExampleSection /> */}
      </main>
      <HomeFooter />
    </div>
  );
}
