"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Filter, ChevronDown, Check } from "lucide-react";
import { indianFoodData } from "@/data/indian-food-data";

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
  cuisine: string;
  healthScore: number;
  specialties: string[];
  healthyOptions: string[];
  lessHealthyOptions: string[];
};

export default function IndianFoodHealth({ setSelectedDish }: any) {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiet, setSelectedDiet] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [selectedHealthCategory, setSelectedHealthCategory] =
    useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Initialize data with health scores
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

    setFoodItems(processedItems);
    setFilteredItems(processedItems);

    // Generate restaurant data based on food items
    generateRestaurants(processedItems);
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

  // Generate mock restaurant data based on food items
  const generateRestaurants = (items: FoodItem[]) => {
    const regions = Array.from(new Set(items.map((item) => item.region)));
    const mockRestaurants: Restaurant[] = [];

    regions.forEach((region) => {
      const regionalItems = items.filter((item) => item.region === region);
      const healthyItems = regionalItems.filter(
        (item) => item.healthScore && item.healthScore >= 70
      );
      const lessHealthyItems = regionalItems.filter(
        (item) => item.healthScore && item.healthScore < 50
      );

      // Create 2 restaurants per region
      for (let i = 0; i < 2; i++) {
        const isHealthFocused = i === 0;
        const healthScore = isHealthFocused
          ? Math.floor(Math.random() * 15) + 75
          : // 75-90
            Math.floor(Math.random() * 25) + 50; // 50-75

        const healthyOptions = healthyItems
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 3)
          .map((item) => item.name);

        const lessHealthyOptions = lessHealthyItems
          .sort(() => 0.5 - Math.random())
          .slice(0, isHealthFocused ? 2 : 5)
          .map((item) => item.name);

        mockRestaurants.push({
          id: `rest-${region.toLowerCase()}-${i}`,
          name: `${isHealthFocused ? "Healthy" : "Traditional"} ${region} ${
            i === 0 ? "Kitchen" : "Flavors"
          }`,
          location: `${region} District, India`,
          cuisine: `${region} Indian`,
          healthScore: healthScore,
          specialties: [...healthyOptions, ...lessHealthyOptions].slice(0, 3),
          healthyOptions,
          lessHealthyOptions,
        });
      }
    });

    setRestaurants(mockRestaurants);
  };

  const handleSelectDish = (dish: any) => {
    setSelectedDish(dish);
    window.scrollTo(0, 0);
  };

  // Apply filters to food items
  useEffect(() => {
    let results = [...foodItems];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.ingredients.toLowerCase().includes(query) ||
          item.state.toLowerCase().includes(query)
      );
    }

    // Apply diet filter
    if (selectedDiet !== "all") {
      results = results.filter((item) => item.diet.includes(selectedDiet));
    }

    // Apply region filter
    if (selectedRegion !== "all") {
      results = results.filter((item) => item.region === selectedRegion);
    }

    // Apply course filter
    if (selectedCourse !== "all") {
      results = results.filter((item) => item.course.includes(selectedCourse));
    }

    // Apply health category filter
    if (selectedHealthCategory !== "all") {
      results = results.filter(
        (item) => item.healthCategory === selectedHealthCategory
      );
    }

    setFilteredItems(results);
  }, [
    searchQuery,
    selectedDiet,
    selectedRegion,
    selectedCourse,
    selectedHealthCategory,
    foodItems,
  ]);

  // Get unique regions
  const regions = Array.from(new Set(foodItems.map((item) => item.region)));

  // Get unique courses
  const courses = Array.from(
    new Set(
      foodItems.flatMap((item) => item.course.split(", ").map((c) => c.trim()))
    )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Indian Cuisine Health Analysis
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for dishes, ingredients, or regions..."
              className="input pr-12 w-full"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline flex items-center justify-center gap-2"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {showFilters && (
          <div className="grid md:grid-cols-4 gap-4 mb-6 animate-fade-in">
            <div>
              <label className="block text-sm font-medium mb-2">
                Diet Type
              </label>
              <select
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
                className="input w-full"
              >
                <option value="all">All Diets</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="input w-full"
              >
                <option value="all">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="input w-full"
              >
                <option value="all">All Courses</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Health Category
              </label>
              <select
                value={selectedHealthCategory}
                onChange={(e) => setSelectedHealthCategory(e.target.value)}
                className="input w-full"
              >
                <option value="all">All Categories</option>
                <option value="healthy">Healthy</option>
                <option value="moderate">Moderate</option>
                <option value="less-healthy">Less Healthy</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Food Items ({filteredItems.length})
          </h2>
          <div className="text-sm text-gray-500">
            Showing {filteredItems.length} of {foodItems.length} items
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectDish(item)}
              className="bg-gray-50 cursor-pointer dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={item.url || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <div
                  className={`absolute top-2 right-2 px-3 py-1 rounded-full text-white text-sm font-medium ${
                    item.healthCategory === "healthy"
                      ? "bg-green-500"
                      : item.healthCategory === "moderate"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {item.healthScore}/100
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.diet.includes("vegetarian") &&
                      !item.diet.includes("non")
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : item.diet.includes("vegan")
                        ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {item.diet}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                  {item.ingredients}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full">
                    {item.region}
                  </span>
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 px-2 py-1 rounded-full">
                    {item.course.split(",")[0]}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Prep: {item.prep_time} min
                      </span>
                      <span className="mx-2">•</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        Cook: {item.cook_time} min
                      </span>
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        item.healthCategory === "healthy"
                          ? "text-green-500"
                          : item.healthCategory === "moderate"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.healthCategory === "healthy"
                        ? "Healthy Choice"
                        : item.healthCategory === "moderate"
                        ? "Moderately Healthy"
                        : "Less Healthy"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Restaurant Recommendations</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {restaurants
          .sort((a, b) => b.healthScore - a.healthScore)
          .map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <div
                  className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                    restaurant.healthScore >= 70
                      ? "bg-green-500"
                      : restaurant.healthScore >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  Health Score: {restaurant.healthScore}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {restaurant.cuisine} cuisine in {restaurant.location}
              </p>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Specialties:</h4>
                <div className="flex flex-wrap gap-2">
                  {restaurant.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center text-green-600 dark:text-green-400">
                    <Check className="w-4 h-4 mr-1" />
                    Healthy Options
                  </h4>
                  <ul className="text-sm space-y-1">
                    {restaurant.healthyOptions.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center text-amber-600 dark:text-amber-400">
                    <Check className="w-4 h-4 mr-1" />
                    Occasional Treats
                  </h4>
                  <ul className="text-sm space-y-1">
                    {restaurant.lessHealthyOptions
                      .slice(0, 3)
                      .map((item, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
