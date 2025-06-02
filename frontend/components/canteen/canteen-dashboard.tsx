"use client";

import { useState } from "react";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import CanteenMealCard from "./canteen-meal-card";
import type { CanteenMeal } from "@/types/canteen";

export default function CanteenDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock data - in a real app this would come from an API
  const meals: CanteenMeal[] = [
    {
      id: "1",
      name: "Grilled Chicken Salad",
      description:
        "Fresh mixed greens with grilled chicken breast, cherry tomatoes, cucumber, and balsamic vinaigrette",
      image: "/placeholder.svg?height=200&width=300",
      healthScore: 85,
      nutritionalInfo: {
        calories: 320,
        protein: 28,
        carbs: 12,
        fat: 18,
      },
      allergens: ["Nuts"],
      dietaryInfo: ["High Protein", "Low Carb"],
      mealType: "Lunch",
    },
    {
      id: "2",
      name: "Vegetable Stir Fry with Brown Rice",
      description:
        "Seasonal vegetables stir-fried with ginger and garlic, served over brown rice",
      image: "/placeholder.svg?height=200&width=300",
      healthScore: 92,
      nutritionalInfo: {
        calories: 380,
        protein: 10,
        carbs: 65,
        fat: 8,
      },
      allergens: ["Soy"],
      dietaryInfo: ["Vegan", "High Fiber"],
      mealType: "Dinner",
    },
    {
      id: "3",
      name: "Greek Yogurt Parfait",
      description:
        "Greek yogurt layered with fresh berries, honey, and granola",
      image: "/placeholder.svg?height=200&width=300",
      healthScore: 78,
      nutritionalInfo: {
        calories: 240,
        protein: 15,
        carbs: 30,
        fat: 6,
      },
      allergens: ["Dairy", "Gluten"],
      dietaryInfo: ["High Protein", "Vegetarian"],
      mealType: "Breakfast",
    },
    {
      id: "4",
      name: "Lentil Soup with Whole Grain Bread",
      description:
        "Hearty lentil soup with vegetables and herbs, served with a slice of whole grain bread",
      image: "/placeholder.svg?height=200&width=300",
      healthScore: 88,
      nutritionalInfo: {
        calories: 310,
        protein: 18,
        carbs: 45,
        fat: 7,
      },
      allergens: ["Gluten"],
      dietaryInfo: ["Vegetarian", "High Fiber"],
      mealType: "Lunch",
    },
  ];

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  // Navigate to previous/next day
  const navigateDay = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Today's Menu</h2>

        <div className="flex items-center">
          <button
            onClick={() => navigateDay("prev")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center mx-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">
              {formatDate(currentDate)}
            </span>
          </div>

          <button
            onClick={() => navigateDay("next")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meals.map((meal) => (
          <CanteenMealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}
