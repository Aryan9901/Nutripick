import Image from "next/image";
import { AlertTriangle, Info } from "lucide-react";
import type { CanteenMeal } from "@/types/canteen";

interface CanteenMealCardProps {
  meal: CanteenMeal;
}

export default function CanteenMealCard({ meal }: CanteenMealCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <Image
          src={meal.image || "/placeholder.svg?height=200&width=300"}
          alt={meal.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 text-xs font-medium">
          {meal.mealType}
        </div>
        <div
          className={`absolute bottom-2 left-2 rounded-full px-3 py-1.5 text-sm font-medium ${
            meal.healthScore >= 80
              ? "bg-green-500 text-white"
              : meal.healthScore >= 60
              ? "bg-yellow-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          Health Score: {meal.healthScore}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{meal.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
          {meal.description}
        </p>

        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
          <div className="bg-white dark:bg-gray-800 p-2 rounded">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Calories
            </div>
            <div className="font-medium">{meal.nutritionalInfo.calories}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Protein
            </div>
            <div className="font-medium">{meal.nutritionalInfo.protein}g</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Carbs
            </div>
            <div className="font-medium">{meal.nutritionalInfo.carbs}g</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded">
            <div className="text-xs text-gray-500 dark:text-gray-400">Fat</div>
            <div className="font-medium">{meal.nutritionalInfo.fat}g</div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {meal.dietaryInfo.map((info, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
            >
              <Info className="w-3 h-3 mr-1" />
              {info}
            </span>
          ))}

          {meal.allergens.map((allergen, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
            >
              <AlertTriangle className="w-3 h-3 mr-1" />
              {allergen}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
