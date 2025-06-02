import Image from "next/image";
import {
  Leaf,
  Info,
  ThumbsUp,
  ThumbsDown,
  UserX,
  UserCheck,
} from "lucide-react";
import type { UnpackagedFood } from "@/types/food";

interface NutritionalEstimationProps {
  food: UnpackagedFood;
}

export default function NutritionalEstimation({
  food,
}: NutritionalEstimationProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Nutritional Analysis</h2>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
            Confidence:
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              food.confidence > 80
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
            }`}
          >
            {food.confidence}%
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
            <Image
              src={food.image || "/placeholder.svg?height=300&width=300"}
              alt={food.name}
              fill
              className="object-cover"
            />
          </div>

          <h3 className="text-xl font-semibold">{food.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Portion Size: {food.portionSize}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {food.dietaryInfo.map((info, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
              >
                <Info className="w-3 h-3 mr-1" />
                {info}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center">
            <Leaf className="w-5 h-5 text-green-500 mr-2" />
            <span className="font-medium">
              Health Score: {food.healthScore}
            </span>
          </div>
        </div>

        <div className="md:w-2/3">
          {food.healthAnalysis && (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <ThumbsUp className="w-5 h-5 text-green-500 mr-2" />
                  Benefits
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  {food.healthAnalysis.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <ThumbsDown className="w-5 h-5 text-amber-500 mr-2" />
                  Disadvantages
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  {food.healthAnalysis.disadvantages.map(
                    (disadvantage, index) => (
                      <li
                        key={index}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {disadvantage}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <UserX className="w-5 h-5 text-red-500 mr-2" />
                    Who Should Avoid
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {food.healthAnalysis.personAvoid.map((person, index) => (
                      <li
                        key={index}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {person}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <UserCheck className="w-5 h-5 text-green-500 mr-2" />
                    Who Should Prefer
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {food.healthAnalysis.personPrefer.map((person, index) => (
                      <li
                        key={index}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {person}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <h4 className="font-semibold mt-6 mb-3">Ingredients</h4>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex flex-wrap gap-2">
              {food.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-sm"
                >
                  {ingredient.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
