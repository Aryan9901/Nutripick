"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Clock, Leaf } from "lucide-react";
import { useState, useEffect } from "react";
import { getEateries } from "@/lib/api";
import type { Eatery } from "@/types/eatery";
import Loading from "@/components/ui/loading";

export default function EateriesList() {
  const [eateries, setEateries] = useState<Eatery[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEateries = async () => {
      try {
        setIsLoading(true);
        const data = await getEateries();
        setEateries(data);
      } catch (error) {
        console.error("Error fetching eateries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEateries();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {eateries.map((eatery) => (
        <Link
          key={eatery.id}
          href={`/eateries/${eatery.id}`}
          className="block group"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row">
            <div className="relative h-48 md:h-auto md:w-1/3">
              <Image
                src={eatery.image || "/placeholder.svg?height=300&width=300"}
                alt={eatery.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center shadow-md">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="font-medium">{eatery.healthScore}</span>
              </div>
              {eatery.healthyOptions && eatery.healthyOptions.length > 0 && (
                <div className="absolute bottom-4 left-4 bg-green-500 text-white rounded-full px-3 py-1 flex items-center text-xs shadow-md">
                  <Leaf className="w-3 h-3 mr-1" />
                  <span>{eatery.healthyOptions.length} Healthy Options</span>
                </div>
              )}
            </div>
            <div className="p-6 md:w-2/3">
              <h3 className="text-xl font-semibold group-hover:text-green-500 transition-colors">
                {eatery.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {eatery.type}
              </p>
              <p className="mt-2 text-sm line-clamp-2">{eatery.description}</p>
              <div className="flex flex-wrap items-center mt-4 text-sm text-gray-500 dark:text-gray-400 gap-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{eatery.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{eatery.openingHours}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {eatery.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {eatery.healthyOptions && eatery.healthyOptions.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    Healthy Options:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {eatery.healthyOptions.slice(0, 3).map((dish, index) => (
                      <span
                        key={index}
                        className="text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-2 py-1 rounded-full"
                      >
                        {dish}
                      </span>
                    ))}
                    {eatery.healthyOptions.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{eatery.healthyOptions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
