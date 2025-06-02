import { Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CanteenRecommendations() {
  const recommendations = [
    {
      title: "Increase Plant-Based Options",
      description:
        "Adding more plant-based meals can improve overall nutritional quality and sustainability.",
      link: "/resources/plant-based",
    },
    {
      title: "Reduce Added Sugars",
      description:
        "Consider alternatives to high-sugar desserts and beverages to improve health scores.",
      link: "/resources/reduce-sugar",
    },
    {
      title: "Portion Control Strategies",
      description:
        "Implement visual guides for appropriate portion sizes to help with calorie management.",
      link: "/resources/portions",
    },
    {
      title: "Transparent Nutritional Information",
      description:
        "Display comprehensive nutritional information for all menu items to help informed choices.",
      link: "/resources/transparency",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-24">
      <div className="flex items-center mb-6">
        <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
        <h3 className="text-xl font-semibold">Improvement Recommendations</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <h4 className="font-medium">{rec.title}</h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {rec.description}
            </p>
            <Link
              href={rec.link}
              className="mt-2 inline-flex items-center text-sm text-green-500 hover:text-green-600 transition-colors"
            >
              Learn more
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
        <h4 className="font-medium mb-2">Need personalized guidance?</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Our nutrition experts can help you optimize your canteen menu for
          better health outcomes.
        </p>
        <button className="w-full btn btn-primary">
          Schedule Consultation
        </button>
      </div>
    </div>
  );
}
