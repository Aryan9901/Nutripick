"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";

type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  healthScore: number;
  healthyDishes: string[];
  signature: string;
  dietaryOptions: string[];
  priceRange: string;
};

export default function RestaurantFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [selectedDiet, setSelectedDiet] = useState("all");

  // Mock restaurant data
  const restaurants: Restaurant[] = [
    {
      id: "1",
      name: "South Indian Health Kitchen",
      cuisine: "South Indian",
      location: "Chennai, Tamil Nadu",
      healthScore: 92,
      healthyDishes: ["Idli Sambar", "Rasam", "Steamed Dosa"],
      signature: "Traditional steamed dishes with minimal oil",
      dietaryOptions: ["vegetarian", "vegan options"],
      priceRange: "$$",
    },
    {
      id: "2",
      name: "Punjab Grill Healthy",
      cuisine: "North Indian",
      location: "Delhi, NCR",
      healthScore: 85,
      healthyDishes: ["Tandoori Chicken", "Dal Tadka", "Baingan Bharta"],
      signature: "Grilled specialties with reduced oil",
      dietaryOptions: ["vegetarian", "non-vegetarian"],
      priceRange: "$$$",
    },
    {
      id: "3",
      name: "Gujarat Thali House",
      cuisine: "West Indian",
      location: "Ahmedabad, Gujarat",
      healthScore: 88,
      healthyDishes: ["Steamed Dhokla", "Vegetable Undhiyu", "Khandvi"],
      signature: "Traditional Gujarati thali with less oil options",
      dietaryOptions: ["vegetarian", "jain options"],
      priceRange: "$$",
    },
    {
      id: "4",
      name: "Bengal Healthy Bites",
      cuisine: "East Indian",
      location: "Kolkata, West Bengal",
      healthScore: 82,
      healthyDishes: ["Steamed Fish", "Mixed Vegetable Curry", "Moong Dal"],
      signature: "Bengali cuisine with health-conscious preparation",
      dietaryOptions: ["vegetarian", "non-vegetarian", "fish options"],
      priceRange: "$$",
    },
    {
      id: "5",
      name: "Fusion Health Cafe",
      cuisine: "Indo-Chinese",
      location: "Mumbai, Maharashtra",
      healthScore: 80,
      healthyDishes: [
        "Steamed Hakka Noodles",
        "Stir-Fried Vegetables",
        "Clear Soup",
      ],
      signature: "Fusion dishes with minimal oil and sodium",
      dietaryOptions: ["vegetarian", "vegan options", "gluten-free options"],
      priceRange: "$$$",
    },
    {
      id: "6",
      name: "Traditional Punjab Dhaba",
      cuisine: "North Indian",
      location: "Amritsar, Punjab",
      healthScore: 65,
      healthyDishes: ["Tandoori Roti", "Dal Fry"],
      signature: "Authentic Punjabi flavors",
      dietaryOptions: ["vegetarian", "non-vegetarian"],
      priceRange: "$",
    },
    {
      id: "7",
      name: "South Spice Garden",
      cuisine: "South Indian",
      location: "Bangalore, Karnataka",
      healthScore: 75,
      healthyDishes: ["Masala Dosa", "Vegetable Upma", "Sambar"],
      signature: "Traditional South Indian breakfast items",
      dietaryOptions: ["vegetarian"],
      priceRange: "$$",
    },
    {
      id: "8",
      name: "Royal Indian Feast",
      cuisine: "North Indian",
      location: "Jaipur, Rajasthan",
      healthScore: 60,
      healthyDishes: ["Dal Tadka", "Tandoori Roti"],
      signature: "Rich and flavorful royal cuisine",
      dietaryOptions: ["vegetarian", "non-vegetarian"],
      priceRange: "$$$",
    },
  ];

  // Filter restaurants based on search and filters
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Apply search query
    if (
      searchQuery &&
      !restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !restaurant.healthyDishes.some((dish) =>
        dish.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }

    // Apply cuisine filter
    if (selectedCuisine !== "all" && restaurant.cuisine !== selectedCuisine) {
      return false;
    }

    // Apply dietary filter
    if (
      selectedDiet !== "all" &&
      !restaurant.dietaryOptions.includes(selectedDiet)
    ) {
      return false;
    }

    return true;
  });

  // Sort restaurants by health score
  const sortedRestaurants = [...filteredRestaurants].sort(
    (a, b) => b.healthScore - a.healthScore
  );

  // Get unique cuisines
  const cuisines = Array.from(new Set(restaurants.map((r) => r.cuisine)));

  // Get unique dietary options
  const dietaryOptions = Array.from(
    new Set(restaurants.flatMap((r) => r.dietaryOptions))
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">
        Find Healthy Indian Restaurants
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search restaurants, locations, or dishes..."
            className="input pr-12 w-full"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex gap-4">
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="input"
          >
            <option value="all">All Cuisines</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>

          <select
            value={selectedDiet}
            onChange={(e) => setSelectedDiet(e.target.value)}
            className="input"
          >
            <option value="all">All Dietary Options</option>
            {dietaryOptions.map((diet) => (
              <option key={diet} value={diet}>
                {diet}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sortedRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold">{restaurant.name}</h3>
              <div
                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                  restaurant.healthScore >= 80
                    ? "bg-green-500"
                    : restaurant.healthScore >= 70
                    ? "bg-lime-500"
                    : restaurant.healthScore >= 60
                    ? "bg-yellow-500"
                    : "bg-orange-500"
                }`}
              >
                Health Score: {restaurant.healthScore}
              </div>
            </div>

            <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{restaurant.location}</span>
            </div>

            <div className="mt-4">
              <div className="text-sm font-medium">
                Cuisine: {restaurant.cuisine}
              </div>
              <div className="text-sm mt-1">{restaurant.signature}</div>
            </div>

            <div className="mt-4">
              <div className="text-sm font-medium">Healthy Dishes:</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {restaurant.healthyDishes.map((dish, index) => (
                  <span
                    key={index}
                    className="text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-2 py-1 rounded-full"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="flex gap-2">
                {restaurant.dietaryOptions.map((option, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full"
                  >
                    {option}
                  </span>
                ))}
              </div>
              <div className="text-amber-600 dark:text-amber-400 font-medium">
                {restaurant.priceRange}
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedRestaurants.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>
            No restaurants found matching your criteria. Try adjusting your
            filters.
          </p>
        </div>
      )}
    </div>
  );
}
