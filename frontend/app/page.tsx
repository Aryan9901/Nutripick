import { Suspense } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import EateriesSection from "@/components/home/eateries-section";
import Loading from "@/components/ui/loading";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Suspense fallback={<Loading />}>
          <HeroSection />
          <FeaturesSection />
          <EateriesSection />
          <HowItWorksSection />
          <TestimonialsSection />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
