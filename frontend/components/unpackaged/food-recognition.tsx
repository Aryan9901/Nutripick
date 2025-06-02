"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Camera, ImageIcon, RefreshCw } from "lucide-react";
import Image from "next/image";
import type { UnpackagedFood } from "@/types/food";
import { analyzeFoodImage } from "@/lib/api";

interface FoodRecognitionProps {
  onFoodRecognized: (food: UnpackagedFood) => void;
}

export default function FoodRecognition({
  onFoodRecognized,
}: FoodRecognitionProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeFood = async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // In a real app, this would upload the image to the API
      // For now, we'll use our mock API function that simulates the response
      const fileInput = fileInputRef.current;
      const file = fileInput?.files?.[0];

      if (file) {
        const analyzedFood = await analyzeFoodImage(file);

        console.log(analyzedFood);

        // Convert API response to our UnpackagedFood type
        const recognizedFood: UnpackagedFood = {
          name: file.name.split(".")[0] || "Food Item",
          confidence: 90,
          image: capturedImage,
          nutritionalInfo: {
            calories: 300, // Estimated
            protein: analyzedFood?.protein_sources?.length * 5,
            carbs: 30, // Estimated
            fat: analyzedFood.health_level < 5 ? 15 : 8, // Estimated based on health level
            fiber: 4, // Estimated
            sugar: 5, // Estimated
          },
          ingredients: analyzedFood.ingredients.map((ingredient) => ({
            name: ingredient,
            amount: "Unknown",
            calories: 0,
          })),
          healthScore: analyzedFood.health_level, // Convert 1-10 scale to our 1-100 scale
          portionSize: "Medium (1 serving)",
          dietaryInfo: [...analyzedFood.benefits],
          healthAnalysis: {
            benefits: analyzedFood.benefits,
            disadvantages: analyzedFood.disadvantages,
            personAvoid: analyzedFood.personAvoid,
            personPrefer: analyzedFood.personPrefer,
          },
        };

        onFoodRecognized(recognizedFood);
      } else {
        throw new Error("No file selected");
      }
    } catch (err) {
      console.error("Error analyzing food:", err);
      setError("Failed to analyze the food image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Food Recognition</h2>

      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Take a photo of your unpackaged food to get nutritional information
          and health insights.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <div className="relative aspect-video rounded-[1rem] bg-gray-100 dark:bg-gray-700 overflow-hidden mb-6">
        {capturedImage ? (
          <Image
            src={capturedImage || "/placeholder.svg"}
            alt="Captured food"
            fill
            className="object-cover rounded-[1rem]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Camera className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No image captured
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        {!capturedImage ? (
          <>
            <button
              onClick={handleCapture}
              className="btn btn-primary flex items-center"
            >
              <Camera className="w-5 h-5 mr-2" />
              Take Photo
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-outline flex items-center"
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Upload Image
            </button>
          </>
        ) : (
          <>
            <button
              onClick={analyzeFood}
              disabled={isAnalyzing}
              className="btn btn-primary flex items-center"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Analyze Food
                </>
              )}
            </button>
            <button
              onClick={resetCapture}
              className="btn btn-outline flex items-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}
