"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FoodRecognition from "@/components/unpackaged/food-recognition";
import NutritionalEstimation from "@/components/unpackaged/nutritional-estimation";
import PortionGuide from "@/components/unpackaged/portion-guide";
import type { UnpackagedFood } from "@/types/food";

export default function UnpackagedPage() {
  const [recognizedFood, setRecognizedFood] = useState<UnpackagedFood | null>(
    null
  );

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Unpackaged Food Analysis</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <FoodRecognition onFoodRecognized={setRecognizedFood} />
          </div>
          <div>
            {recognizedFood ? (
              <NutritionalEstimation food={recognizedFood} />
            ) : (
              <PortionGuide />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
