"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Leaf,
  AlertCircle,
  CheckCircle,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import { indianFoodData } from "@/data/indian-food-data";
import { recommendFoodImage } from "@/lib/api";

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

type Restaurant = {
  id: string;
  name: string;
  location: string;
  healthScore: number;
  servesItem: string[];
};

type FoodAnalysis = {
  ingredients: string[];
  protein_sources: string[];
  health_level: number;
  benefits: string[];
  disadvantages: string[];
  personAvoid: string[];
  personPrefer: string[];
};

export default function DishRecommendation({
  selectedDish,
  setSelectedDish,
}: any) {
  const [searchQuery, setSearchQuery] = useState("");
  // const [selectedDish, setSelectedDish] = useState<FoodItem | null>(null);
  const [filteredDishes, setFilteredDishes] = useState<FoodItem[]>([]);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState<
    Restaurant[]
  >([]);
  const [foodAnalysis, setFoodAnalysis] = useState<FoodAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [healthyRecommendations, setHealthyRecommendations] = useState<
    FoodItem[]
  >([]);

  // Process food data with health scores
  useEffect(() => {
    const processedItems = indianFoodData.map((item) => {
      const healthScore = calculateHealthScore(item);
      const healthCategory = categorizeByHealth(healthScore);

      return {
        ...item,
        healthScore,
        healthCategory,
      };
    });

    setFilteredDishes(processedItems);

    // Get top 10 healthiest foods
    const topHealthyFoods = [...processedItems]
      .sort((a, b) => (b.healthScore || 0) - (a.healthScore || 0))
      .slice(0, 10);

    setHealthyRecommendations(topHealthyFoods);
  }, []);

  // Calculate health score based on ingredients and cooking method
  const calculateHealthScore = (item: FoodItem): number => {
    let score = 50; // Base score

    // Diet type adjustments
    if (item.diet.includes("vegan")) score += 15;
    else if (item.diet.includes("vegetarian")) score += 10;

    // Ingredient-based adjustments
    const ingredients = item.ingredients.toLowerCase();

    // Healthy ingredients boost score
    if (ingredients.includes("vegetables") || ingredients.includes("leafy"))
      score += 10;
    if (ingredients.includes("lentil") || ingredients.includes("dal"))
      score += 8;
    if (ingredients.includes("chickpea")) score += 7;
    if (ingredients.includes("rice") && !ingredients.includes("fried"))
      score += 5;
    if (ingredients.includes("yogurt") || ingredients.includes("curd"))
      score += 5;
    if (ingredients.includes("spinach") || ingredients.includes("palak"))
      score += 8;
    if (ingredients.includes("tomato")) score += 5;
    if (ingredients.includes("spices")) score += 3; // Anti-inflammatory properties

    // Unhealthy ingredients reduce score
    if (ingredients.includes("cream")) score -= 10;
    if (ingredients.includes("butter") || ingredients.includes("ghee"))
      score -= 8;
    if (ingredients.includes("sugar") || ingredients.includes("syrup"))
      score -= 12;
    if (ingredients.includes("deep") && ingredients.includes("fried"))
      score -= 15;
    if (ingredients.includes("fried")) score -= 10;

    // Cooking method adjustments
    if (item.name.toLowerCase().includes("tandoori")) score += 5; // Grilled
    if (item.name.toLowerCase().includes("steamed")) score += 8;

    // Course type adjustments
    if (item.course.includes("dessert")) score -= 5;
    if (item.course.includes("snack") && item.ingredients.includes("fried"))
      score -= 5;

    // Cap the score between 0 and 100
    return Math.max(0, Math.min(100, score));
  };

  // Categorize food by health score
  const categorizeByHealth = (
    score: number
  ): "healthy" | "moderate" | "less-healthy" => {
    if (score >= 70) return "healthy";
    if (score >= 50) return "moderate";
    return "less-healthy";
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredDishes(indianFoodData);
    } else {
      const filtered = indianFoodData.filter(
        (dish) =>
          dish.name.toLowerCase().includes(query.toLowerCase()) ||
          dish.ingredients.toLowerCase().includes(query.toLowerCase()) ||
          dish.region.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDishes(filtered);
    }
  };

  // Handle dish selection
  const handleDishSelect = (dish: FoodItem) => {
    setSelectedDish(dish);
    setFoodAnalysis(null); // Reset food analysis when selecting a new dish

    // Generate mock restaurants that serve this dish
    const mockRestaurants: Restaurant[] = [
      {
        id: "rest1",
        name: `${dish.region} Authentic Kitchen`,
        location: `${dish.state}, India`,
        healthScore: 85,
        servesItem: [dish.name, "Vegetable Biryani", "Dal Tadka"],
      },
      {
        id: "rest2",
        name: `Healthy ${dish.region} Cafe`,
        location: "Downtown",
        healthScore: 92,
        servesItem: [dish.name, "Idli Sambar", "Steamed Dosa"],
      },
      {
        id: "rest3",
        name: `${dish.state} Flavors`,
        location: "Westside",
        healthScore: 78,
        servesItem: [dish.name, "Tandoori Chicken", "Palak Paneer"],
      },
    ];

    setRecommendedRestaurants(mockRestaurants);
  };

  useEffect(() => {
    const foodAnalysis = async () => {
      if (!selectedDish || !selectedDish.url) return;

      try {
        setIsAnalyzing(true);
        // Fetch the image from the URL
        const response = await fetch(selectedDish.url);
        const blob = await response.blob();

        // Create a File object from the blob
        const fileName =
          selectedDish.name.toLowerCase().replace(/\s+/g, "-") + ".jpg";
        const imageFile = new File([blob], fileName, {
          type: blob.type || "image/jpeg",
        });

        // Pass the File object to the recommendFoodImage function
        const analyzedFood = await recommendFoodImage(imageFile);
        setFoodAnalysis(analyzedFood);
      } catch (error) {
        console.error("Error processing food image:", error);
      } finally {
        setIsAnalyzing(false);
      }
    };

    foodAnalysis();
  }, [selectedDish]);

  // Function to render health level indicator
  const renderHealthLevel = (level: number) => {
    const healthLevels = [
      { level: 1, color: "bg-red-500", text: "Low" },
      { level: 2, color: "bg-yellow-500", text: "Moderate" },
      { level: 3, color: "bg-green-500", text: "High" },
    ];

    const healthInfo =
      healthLevels.find((h) => h.level === level) || healthLevels[0];

    return (
      <div
        className={`px-3 py-1 rounded-full text-white text-sm font-medium ${healthInfo.color}`}
      >
        Health Level: {healthInfo.text}
      </div>
    );
  };

  // Handle selecting a recommended dish
  const handleRecommendedDishSelect = (dish: FoodItem) => {
    handleDishSelect(dish);
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Find Restaurants by Dish</h2>

      <div className="relative mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a dish (e.g., Dosa, Butter Chicken, Idli)..."
          className="input pr-12 w-full"
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {searchQuery && filteredDishes.length > 0 && !selectedDish && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Search Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredDishes.slice(0, 8).map((dish, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleDishSelect(dish)}
              >
                <div className="relative h-32 mb-2 rounded-md overflow-hidden">
                  <Image
                    src={dish.url || "/placeholder.svg"}
                    alt={dish.name}
                    fill
                    className="object-cover"
                  />
                  {dish.healthScore && (
                    <div
                      className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs text-white ${
                        dish.healthScore >= 70
                          ? "bg-green-500"
                          : dish.healthScore >= 50
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {dish.healthScore}
                    </div>
                  )}
                </div>
                <h4 className="font-medium text-sm">{dish.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {dish.region} Indian
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedDish && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Selected Dish</h3>
            <button
              onClick={() => setSelectedDish(null)}
              className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
            >
              Change Selection
            </button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={selectedDish.url || "/placeholder.svg"}
                  alt={selectedDish.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="flex justify-between items-start">
                <h4 className="text-xl font-semibold">{selectedDish.name}</h4>
                <div
                  className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                    selectedDish.healthScore && selectedDish.healthScore >= 70
                      ? "bg-green-500"
                      : selectedDish.healthScore &&
                        selectedDish.healthScore >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  Health Score: {selectedDish.healthScore}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {selectedDish.description || selectedDish.ingredients}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <span className="text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full">
                  {selectedDish.region} Region
                </span>
                <span className="text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 px-3 py-1 rounded-full">
                  {selectedDish.diet}
                </span>
                <span className="text-sm bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 px-3 py-1 rounded-full">
                  {selectedDish.course.split(",")[0]}
                </span>
              </div>
            </div>
          </div>

          {isAnalyzing && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mr-3"></div>
                <p>Analyzing dish nutritional profile...</p>
              </div>
            </div>
          )}

          {foodAnalysis && (
            <div className="mt-4 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">AI Food Analysis</h4>
                {renderHealthLevel(foodAnalysis.health_level)}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-2 flex items-center">
                    <Leaf className="w-4 h-4 text-green-500 mr-2" />
                    Ingredients
                  </h5>
                  <ul className="space-y-1">
                    {foodAnalysis.ingredients.map((ingredient, i) => (
                      <li key={i} className="text-sm flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>

                  {foodAnalysis.protein_sources.length > 0 && (
                    <div className="mt-4">
                      <h5 className="font-medium mb-2">Protein Sources</h5>
                      <ul className="space-y-1">
                        {foodAnalysis.protein_sources.map((source, i) => (
                          <li key={i} className="text-sm flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                            <span>{source}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <h5 className="font-medium mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Health Benefits
                  </h5>
                  <ul className="space-y-1">
                    {foodAnalysis.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <h5 className="font-medium mt-4 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                    Health Concerns
                  </h5>
                  <ul className="space-y-1">
                    {foodAnalysis.disadvantages.map((disadvantage, i) => (
                      <li key={i} className="text-sm flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>
                        <span>{disadvantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h5 className="font-medium mb-2 flex items-center text-red-700 dark:text-red-400">
                    <Users className="w-4 h-4 mr-2" />
                    Who Should Avoid
                  </h5>
                  <ul className="space-y-1">
                    {foodAnalysis.personAvoid.map((person, i) => (
                      <li
                        key={i}
                        className="text-sm flex items-center text-red-700 dark:text-red-400"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>
                        <span>{person}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h5 className="font-medium mb-2 flex items-center text-green-700 dark:text-green-400">
                    <Users className="w-4 h-4 mr-2" />
                    Recommended For
                  </h5>
                  <ul className="space-y-1">
                    {foodAnalysis.personPrefer.map((person, i) => (
                      <li
                        key={i}
                        className="text-sm flex items-center text-green-700 dark:text-green-400"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                        <span>{person}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedDish && recommendedRestaurants.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Restaurants Serving {selectedDish.name}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                href={`/eateries/${restaurant.id}`}
                className="block"
              >
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow h-full">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold">{restaurant.name}</h4>
                    <div
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        restaurant.healthScore >= 80
                          ? "bg-green-500"
                          : restaurant.healthScore >= 70
                          ? "bg-lime-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {restaurant.healthScore}
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{restaurant.location}</span>
                  </div>

                  <div>
                    <div className="text-sm font-medium flex items-center">
                      <Leaf className="w-4 h-4 text-green-500 mr-1" />
                      <span>Menu Highlights:</span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {restaurant.servesItem.map((item, i) => (
                        <li key={i} className="text-sm flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                          <span>{item}</span>
                          {item === selectedDish.name && (
                            <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-2 py-0.5 rounded-full">
                              Selected
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {selectedDish && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center">
              <Award className="w-5 h-5 text-green-500 mr-2" />
              Top 10 Healthiest Indian Dishes
            </h3>
            <Link
              href="/food-analysis"
              className="text-sm text-green-600 dark:text-green-400 hover:underline flex items-center"
            >
              View all healthy options <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {healthyRecommendations.map((dish, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleRecommendedDishSelect(dish)}
              >
                <div className="relative h-24 mb-2 rounded-md overflow-hidden">
                  <Image
                    src={dish.url || "/placeholder.svg"}
                    alt={dish.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-br-md">
                    #{index + 1}
                  </div>
                  {dish.healthScore && (
                    <div className="absolute bottom-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-tl-md">
                      {dish.healthScore}
                    </div>
                  )}
                </div>
                <h4 className="font-medium text-xs line-clamp-2">
                  {dish.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {dish.region}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
