import Image from "next/image";
import { Hand, Utensils } from "lucide-react";

export default function PortionGuide() {
  const portionGuides = [
    {
      title: "Protein",
      description: "A portion of protein should be about the size of your palm",
      image: "/placeholder.svg?height=200&width=200",
      examples: ["Chicken breast", "Fish fillet", "Tofu"],
    },
    {
      title: "Vegetables",
      description: "A portion of vegetables should be the size of your fist",
      image: "/placeholder.svg?height=200&width=200",
      examples: ["Broccoli", "Carrots", "Leafy greens"],
    },
    {
      title: "Carbohydrates",
      description: "A portion of carbs should be the size of your cupped hand",
      image: "/placeholder.svg?height=200&width=200",
      examples: ["Rice", "Pasta", "Potatoes"],
    },
    {
      title: "Fats",
      description: "A portion of fats should be the size of your thumb tip",
      image: "/placeholder.svg?height=200&width=200",
      examples: ["Oils", "Butter", "Nuts"],
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Hand className="w-6 h-6 text-green-500 mr-2" />
        <h2 className="text-2xl font-bold">Portion Size Guide</h2>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Use these simple hand measurements to estimate portion sizes for
        unpackaged foods.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {portionGuides.map((guide, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden"
          >
            <div className="relative h-40">
              <Image
                src={guide.image || "/placeholder.svg"}
                alt={guide.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{guide.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {guide.description}
              </p>

              <div className="mt-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Examples:
                </div>
                <div className="flex flex-wrap gap-2">
                  {guide.examples.map((example, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    >
                      <Utensils className="w-3 h-3 mr-1" />
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-700 dark:text-blue-400">
          Pro Tip
        </h4>
        <p className="mt-1 text-sm text-blue-600 dark:text-blue-300">
          Take a photo of your meal to get a more accurate nutritional analysis
          and portion size estimation.
        </p>
      </div>
    </div>
  );
}
