"use client";

import { useEffect, useRef } from "react";

export default function EateriesMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real application, this would initialize a map library like Google Maps or Mapbox
    if (mapRef.current) {
      // Mock map initialization
      const mockMap = document.createElement("div");
      mockMap.className =
        "w-full h-full bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center";
      mockMap.innerHTML =
        '<p class="text-gray-500 dark:text-gray-400">Interactive Map Would Load Here</p>';

      // Clear previous content and append mock map
      mapRef.current.innerHTML = "";
      mapRef.current.appendChild(mockMap);
    }
  }, []);

  return (
    <div className="sticky top-24 h-[calc(100vh-12rem)] rounded-xl overflow-hidden shadow-md">
      <div
        ref={mapRef}
        className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-xl"
      ></div>
    </div>
  );
}
