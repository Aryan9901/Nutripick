import { Lightbulb, Check } from "lucide-react";

interface NutritionTipsProps {
  eateryType: string;
}

export default function NutritionTips({ eateryType }: NutritionTipsProps) {
  // Tips based on eatery type
  const getTips = () => {
    switch (eateryType.toLowerCase()) {
      case "fast food":
        return [
          "Choose grilled items instead of fried",
          "Skip sugary drinks and opt for water",
          "Ask for dressings and sauces on the side",
          "Look for menu items marked as healthier options",
          "Consider a side salad instead of fries",
        ];
      case "cafe":
        return [
          "Choose whole grain options when available",
          "Be mindful of hidden sugars in coffee drinks",
          "Opt for low-fat milk or plant-based alternatives",
          "Consider fruit or yogurt instead of pastries",
          "Check if nutrition information is available",
        ];
      case "vegetarian":
      case "vegan":
        return [
          "Not all plant-based foods are equally nutritious",
          "Look for dishes with a variety of vegetables",
          "Be mindful of highly processed meat alternatives",
          "Check for adequate protein sources",
          "Watch out for excess oils in preparation",
        ];
      default:
        return [
          "Look for dishes with plenty of vegetables",
          "Choose lean protein sources when available",
          "Be mindful of portion sizes",
          "Ask about cooking methods and ingredients",
          "Consider sharing dishes to try more variety",
        ];
    }
  };

  const tips = getTips();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-24">
      <div className="flex items-center mb-4">
        <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
        <h3 className="text-xl font-semibold">Healthy Eating Tips</h3>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Make the most nutritious choices at {eateryType.toLowerCase()}{" "}
        establishments with these tips:
      </p>

      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex">
            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
