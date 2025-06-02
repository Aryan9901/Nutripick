"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import EateryDetails from "@/components/eateries/eatery-details";
import MenuList from "@/components/eateries/menu-list";
import MenuUpload from "@/components/eateries/menu-upload";
import MenuAnalysis from "@/components/eateries/menu-analysis";
import NutritionTips from "@/components/eateries/nutrition-tips";
import Loading from "@/components/ui/loading";
import { getEateryById } from "@/lib/api";
import type { Eatery, MenuAnalysisResult } from "@/types/eatery";

export default function EateryPage() {
  const params = useParams();
  const eateryId = params.id as string;

  const [eatery, setEatery] = useState<Eatery | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuAnalysis, setMenuAnalysis] = useState<MenuAnalysisResult | null>(
    null
  );

  useEffect(() => {
    const fetchEatery = async () => {
      try {
        setIsLoading(true);
        const data = await getEateryById(eateryId);
        setEatery(data);
      } catch (err) {
        setError("Failed to load eatery information");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (eateryId) {
      fetchEatery();
    }
  }, [eateryId]);

  const handleMenuAnalyzed = (result: MenuAnalysisResult) => {
    setMenuAnalysis(result);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-500">{error}</h2>
            <p className="mt-4">Please try again later.</p>
          </div>
        ) : eatery ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <EateryDetails eatery={eatery} />

              <div className="mt-8">
                <MenuUpload
                  eateryId={eateryId}
                  onMenuAnalyzed={handleMenuAnalyzed}
                />

                {menuAnalysis && <MenuAnalysis analysis={menuAnalysis} />}

                <MenuList menuItems={eatery.menuItems} />
              </div>
            </div>
            <div>
              <NutritionTips eateryType={eatery.type} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Eatery not found</h2>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
