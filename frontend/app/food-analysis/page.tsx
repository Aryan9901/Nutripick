"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import IndianFoodHealth from "@/components/food-analysis/indian-food-health";
import HealthGuide from "@/components/food-analysis/health-guide";
import DishRecommendation from "@/components/food-analysis/dish-recommendation";
import { useState } from "react";

type FoodItem = {
  name: string;
  ingredients: string;
  diet: string;
  prep_time: number;
  cook_time: number;
  flavor_profile: string;
  course: string;
  state: string;
  region: string;
  url: string;
  description?: string;
  healthScore?: number;
  healthCategory?: "healthy" | "moderate" | "less-healthy";
};

export default function FoodAnalysisPage() {
  const [selectedDish, setSelectedDish] = useState<FoodItem | null>(null);
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Indian Food Health Analysis</h1>

        {/* <HealthGuide /> */}
        <DishRecommendation
          setSelectedDish={setSelectedDish}
          selectedDish={selectedDish}
        />
        <IndianFoodHealth setSelectedDish={setSelectedDish} />
      </div>
      <Footer />
    </main>
  );
}
