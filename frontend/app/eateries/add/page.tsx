"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { MapPin, Phone, Globe, Clock, Tag, Save, X } from "lucide-react";
import type { Eatery } from "@/types/eatery";

export default function AddEateryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Eatery>>({
    name: "",
    type: "",
    description: "",
    image: "/placeholder.svg?height=500&width=1000",
    address: "",
    location: "",
    openingHours: "",
    phone: "",
    website: "",
    priceRange: "$",
    healthScore: 75,
    tags: [],
    menuItems: [],
  });

  const [tag, setTag] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const addTag = () => {
    if (tag.trim() && !formData.tags?.includes(tag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tag.trim()],
      }));
      setTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tagToRemove) || [],
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.type?.trim()) newErrors.type = "Type is required";
    if (!formData.description?.trim())
      newErrors.description = "Description is required";
    if (!formData.address?.trim()) newErrors.address = "Address is required";
    if (!formData.location?.trim()) newErrors.location = "Location is required";
    if (!formData.openingHours?.trim())
      newErrors.openingHours = "Opening hours are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Generate a unique ID
      const id = `custom-${Date.now()}`;

      // Create the complete eatery object
      const newEatery: Eatery = {
        id,
        ...(formData as Omit<Eatery, "id">),
        menuItems: [], // Start with empty menu items
      };

      // Get existing eateries from localStorage or initialize empty array
      const existingEateries = JSON.parse(
        localStorage.getItem("customEateries") || "[]"
      );

      // Add new eatery
      localStorage.setItem(
        "customEateries",
        JSON.stringify([...existingEateries, newEatery])
      );

      // Navigate to the eatery page
      router.push(`/eateries/${id}`);
    } catch (error) {
      console.error("Error saving eatery:", error);
      setErrors({ submit: "Failed to save eatery. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Add New Restaurant</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
              {errors.submit}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Restaurant Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input w-full ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-2">
                Restaurant Type*
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`input w-full ${
                  errors.type ? "border-red-500" : ""
                }`}
              >
                <option value="">Select a type</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Health Food">Health Food</option>
                <option value="Salad Bar">Salad Bar</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Cafe">Cafe</option>
                <option value="Fine Dining">Fine Dining</option>
                <option value="Casual Dining">Casual Dining</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-500">{errors.type}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`input w-full ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
              <div className="flex-grow">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium mb-2"
                >
                  Address*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`input w-full ${
                    errors.address ? "border-red-500" : ""
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
              <div className="flex-grow">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium mb-2"
                >
                  Neighborhood/Area*
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`input w-full ${
                    errors.location ? "border-red-500" : ""
                  }`}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-400 mr-2" />
              <div className="flex-grow">
                <label
                  htmlFor="openingHours"
                  className="block text-sm font-medium mb-2"
                >
                  Opening Hours*
                </label>
                <input
                  type="text"
                  id="openingHours"
                  name="openingHours"
                  value={formData.openingHours}
                  onChange={handleChange}
                  placeholder="e.g., Mon-Fri: 9am-9pm, Sat-Sun: 10am-8pm"
                  className={`input w-full ${
                    errors.openingHours ? "border-red-500" : ""
                  }`}
                />
                {errors.openingHours && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.openingHours}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-400 mr-2" />
              <div className="flex-grow">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
            </div>

            <div className="flex items-center">
              <Globe className="w-5 h-5 text-gray-400 mr-2" />
              <div className="flex-grow">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium mb-2"
                >
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="priceRange"
                className="block text-sm font-medium mb-2"
              >
                Price Range
              </label>
              <select
                id="priceRange"
                name="priceRange"
                value={formData.priceRange}
                onChange={handleChange}
                className="input w-full"
              >
                <option value="$">$ (Inexpensive)</option>
                <option value="$$">$$ (Moderate)</option>
                <option value="$$$">$$$ (Expensive)</option>
                <option value="$$$$">$$$$ (Very Expensive)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="healthScore"
                className="block text-sm font-medium mb-2"
              >
                Health Score (1-100)
              </label>
              <input
                type="range"
                id="healthScore"
                name="healthScore"
                min="1"
                max="100"
                value={formData.healthScore}
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1</span>
                <span>{formData.healthScore}</span>
                <span>100</span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags?.map((t) => (
                  <div
                    key={t}
                    className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full flex items-center"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(t)}
                      className="ml-1 text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Add a tag (e.g., Organic, Gluten-Free)"
                  className="input flex-grow"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="ml-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              {isSubmitting ? "Saving..." : "Save Restaurant"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </main>
  );
}
