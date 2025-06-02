import Image from "next/image";
import {
  MapPin,
  Clock,
  Phone,
  Globe,
  Star,
  Users,
  Leaf,
  AlertTriangle,
} from "lucide-react";
import type { Eatery } from "@/types/eatery";
import Link from "next/link";

interface EateryDetailsProps {
  eatery: Eatery;
}

export default function EateryDetails({ eatery }: EateryDetailsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="relative h-64 w-full">
        <Image
          src={eatery.image || "/placeholder.svg?height=500&width=1000"}
          alt={eatery.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl font-bold">{eatery.name}</h1>
          <p className="mt-2">{eatery.type}</p>
        </div>
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 flex items-center shadow-md">
          <Star className="w-5 h-5 text-yellow-400 mr-2" />
          <span className="font-medium text-gray-900 dark:text-white">
            Health Score: {eatery.healthScore}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          {eatery.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {eatery.description}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <MapPin className="w-5 h-5 mr-2 text-green-500" />
            <span>{eatery.address}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Clock className="w-5 h-5 mr-2 text-green-500" />
            <span>{eatery.openingHours}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Phone className="w-5 h-5 mr-2 text-green-500" />
            <span>{eatery.phone}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Globe className="w-5 h-5 mr-2 text-green-500" />
            <a
              href={eatery.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition-colors"
            >
              Visit Website
            </a>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Users className="w-5 h-5 mr-2 text-green-500" />
            <span>{eatery.priceRange}</span>
          </div>
        </div>

        {eatery.healthyOptions && eatery.healthyOptions.length > 0 && (
          <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="font-semibold text-lg flex items-center text-green-700 dark:text-green-400 mb-3">
              <Leaf className="w-5 h-5 mr-2" />
              Healthy Options
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {eatery.healthyOptions.map((dish, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 p-2 rounded-lg flex items-center text-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <span>{dish}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm">
              <Link
                href="/food-analysis"
                className="text-green-600 dark:text-green-400 hover:underline"
              >
                Learn more about healthy Indian food options →
              </Link>
            </div>
          </div>
        )}

        {eatery.lessHealthyOptions && eatery.lessHealthyOptions.length > 0 && (
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <h3 className="font-semibold text-lg flex items-center text-amber-700 dark:text-amber-400 mb-3">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Occasional Treats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {eatery.lessHealthyOptions.slice(0, 6).map((dish, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 p-2 rounded-lg flex items-center text-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                  <span>{dish}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
