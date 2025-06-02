import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, ArrowRight, Leaf } from "lucide-react";

export default function EateriesSection() {
  const eateries = [
    {
      id: "1",
      name: "Green Leaf Cafe",
      type: "Vegetarian",
      healthScore: 92,
      image: "/placeholder.svg?height=300&width=300",
      location: "Downtown",
      distance: "0.8 miles",
      healthyOptions: ["Idli Sambar", "Steamed Dosa", "Rasam"],
    },
    {
      id: "2",
      name: "Fresh & Fit",
      type: "Health Food",
      healthScore: 88,
      image: "/placeholder.svg?height=300&width=300",
      location: "Westside",
      distance: "1.2 miles",
      healthyOptions: ["Tandoori Chicken", "Dal Tadka", "Vegetable Biryani"],
    },
    {
      id: "3",
      name: "Nutri Bowl",
      type: "Salad Bar",
      healthScore: 95,
      image: "/placeholder.svg?height=300&width=300",
      location: "Midtown",
      distance: "0.5 miles",
      healthyOptions: ["Steamed Dhokla", "Vegetable Upma", "Khandvi"],
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Healthy Eateries Near You
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Discover restaurants and cafes that prioritize nutritious options
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              href="/food-analysis"
              className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
            >
              Food Analysis
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/eateries"
              className="flex items-center text-green-500 hover:text-green-600 transition-colors"
            >
              View all eateries
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {eateries.map((eatery) => (
            <Link
              key={eatery.id}
              href={`/eateries/${eatery.id}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative h-48">
                  <Image
                    src={eatery.image || "/placeholder.svg"}
                    alt={eatery.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center shadow-md">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{eatery.healthScore}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-green-500 text-white rounded-full px-3 py-1 flex items-center text-xs shadow-md">
                    <Leaf className="w-3 h-3 mr-1" />
                    <span>{eatery.healthyOptions.length} Healthy Options</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold group-hover:text-green-500 transition-colors">
                    {eatery.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {eatery.type}
                  </p>
                  <div className="flex items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{eatery.location}</span>
                    <span className="mx-2">•</span>
                    <span>{eatery.distance}</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Healthy Options:
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {eatery.healthyOptions.map((option, index) => (
                        <span
                          key={index}
                          className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full"
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
