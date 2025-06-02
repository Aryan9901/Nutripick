"use client";

import { useState } from "react";
import { Leaf, AlertTriangle, ExternalLink } from "lucide-react";
import type { MenuItem } from "@/types/eatery";
import Link from "next/link";

interface MenuListProps {
  menuItems: MenuItem[];
}

export default function MenuList({ menuItems }: MenuListProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Get unique categories
  const categories = [
    "All",
    ...Array.from(new Set(menuItems.map((item) => item.category))),
  ];

  // Filter items by active category
  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  // Count healthy options
  const healthyOptionsCount = menuItems.filter(
    (item) => item.healthScore >= 80
  ).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Menu</h2>
        <Link
          href="/food-analysis"
          className="text-sm text-green-600 dark:text-green-400 flex items-center hover:underline"
        >
          <span>Learn about healthy Indian food</span>
          <ExternalLink className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="flex overflow-x-auto pb-2 mb-6 gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeCategory === category
                ? "bg-green-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {healthyOptionsCount > 0 && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center">
          <Leaf className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
          <p className="text-sm text-green-700 dark:text-green-400">
            This restaurant offers{" "}
            <span className="font-bold">
              {healthyOptionsCount} healthy options
            </span>{" "}
            with a health score of 80 or above.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">{item.name}</h3>
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    item.healthScore >= 80
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : item.healthScore >= 50
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {item.healthScore}/100
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {item.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {item.dietaryInfo.map((info, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                >
                  {info}
                </span>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="font-medium">${item.price.toFixed(2)}</span>

              <div className="flex items-center">
                {item.isHealthyOption && (
                  <div className="flex items-center text-green-500 mr-3">
                    <Leaf className="w-4 h-4 mr-1" />
                    <span className="text-xs">Healthy Choice</span>
                  </div>
                )}

                {item.allergens.length > 0 && (
                  <div className="flex items-center text-amber-500">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    <span className="text-xs">Contains Allergens</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
