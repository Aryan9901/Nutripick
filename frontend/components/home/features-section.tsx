import {
  Leaf,
  Search,
  BarChart3,
  Zap,
  MapPin,
  Camera,
  Utensils,
  Building,
} from "lucide-react";
import Link from "next/link";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Search className="w-10 h-10 text-green-500" />,
      title: "Packaged Food Scanner",
      description:
        "Scan barcodes to get detailed ingredient information and health scores for packaged products.",
      link: "/scan",
    },
    {
      icon: <Camera className="w-10 h-10 text-blue-500" />,
      title: "Visual Food Recognition",
      description:
        "Take a photo of unpackaged food to identify it and get nutritional information.",
      link: "/unpackaged",
    },
    {
      icon: <Utensils className="w-10 h-10 text-green-500" />,
      title: "Restaurant Menu Analysis",
      description:
        "Browse restaurant menus with health ratings and find the most nutritious options.",
      link: "/eateries",
    },
    {
      icon: <Building className="w-10 h-10 text-blue-500" />,
      title: "Canteen Dashboard",
      description:
        "Track nutritional quality of meals in institutional canteens and cafeterias.",
      link: "/canteen",
    },
    {
      icon: <MapPin className="w-10 h-10 text-green-500" />,
      title: "Healthy Eatery Finder",
      description:
        "Discover restaurants and cafes that offer nutritious menu options near you.",
      link: "/eateries",
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-blue-500" />,
      title: "Nutritional Analysis",
      description:
        "Get detailed breakdown of nutrients, calories, and health impact of your food choices.",
      link: "/food-analysis",
    },
    {
      icon: <Leaf className="w-10 h-10 text-green-500" />,
      title: "Personalized Recommendations",
      description:
        "Receive suggestions for healthier alternatives based on your preferences and dietary needs.",
      link: "/food-analysis",
    },
    {
      icon: <Zap className="w-10 h-10 text-blue-500" />,
      title: "Health Score System",
      description:
        "Understand the nutritional quality of food with our comprehensive health scoring system.",
      link: "/food-analysis",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Comprehensive Food Analysis
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Our platform helps you make informed food choices everywhere - from
            grocery stores to restaurants and canteens.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.link}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-green-500 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
