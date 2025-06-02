"use client";

import { useState } from "react";
import { Sliders, Search, Leaf } from "lucide-react";

export default function EateriesFilter() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    distance: 5,
    minHealthScore: 60,
    dietaryOptions: [] as string[],
    healthyOptionsOnly: false,
  });

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Organic",
    "Low-Carb",
    "Keto-Friendly",
  ];

  const toggleDietaryOption = (option: string) => {
    setFilters((prev) => {
      const newOptions = prev.dietaryOptions.includes(option)
        ? prev.dietaryOptions.filter((item) => item !== option)
        : [...prev.dietaryOptions, option];

      return {
        ...prev,
        dietaryOptions: newOptions,
      };
    });
  };

  const toggleHealthyOptionsOnly = () => {
    setFilters((prev) => ({
      ...prev,
      healthyOptionsOnly: !prev.healthyOptionsOnly,
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for eateries..."
            className="input pr-12"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="btn btn-outline flex items-center justify-center gap-2"
        >
          <Sliders className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {isFiltersOpen && (
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 animate-fade-in">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Distance (miles)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={filters.distance}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      distance: Number.parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <span className="text-sm font-medium">{filters.distance}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Minimum Health Score
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.minHealthScore}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minHealthScore: Number.parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <span className="text-sm font-medium">
                  {filters.minHealthScore}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Dietary Options
              </label>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleDietaryOption(option)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      filters.dietaryOptions.includes(option)
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={toggleHealthyOptionsOnly}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                filters.healthyOptionsOnly
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <Leaf className="w-4 h-4" />
              <span>Healthy Options Only</span>
            </button>

            <button className="btn btn-primary">Apply Filters</button>
          </div>
        </div>
      )}
    </div>
  );
}
