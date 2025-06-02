import type { Product } from "@/types/types";
import type { Eatery, MenuAnalysisResult } from "@/types/eatery";
import type { CanteenStats } from "@/types/canteen";
import type { FoodAnalysisResult } from "@/types/food";
import { indianFoodData } from "@/data/indian-food-data";
import axios from "axios";

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:4000";

// Calculate health score for Indian dishes
const calculateHealthScore = (item: any): number => {
	let score = 50; // Base score

	// Diet type adjustments
	if (item.diet.includes("vegan")) score += 15;
	else if (item.diet.includes("vegetarian") && !item.diet.includes("non")) score += 10;

	// Ingredient-based adjustments
	const ingredients = item.ingredients.toLowerCase();

	// Healthy ingredients boost score
	if (ingredients.includes("vegetables") || ingredients.includes("leafy")) score += 10;
	if (ingredients.includes("lentil") || ingredients.includes("dal")) score += 8;
	if (ingredients.includes("chickpea")) score += 7;
	if (ingredients.includes("rice") && !ingredients.includes("fried")) score += 5;
	if (ingredients.includes("yogurt") || ingredients.includes("curd")) score += 5;
	if (ingredients.includes("spinach") || ingredients.includes("palak")) score += 8;
	if (ingredients.includes("tomato")) score += 5;
	if (ingredients.includes("spices")) score += 3; // Anti-inflammatory properties

	// Unhealthy ingredients reduce score
	if (ingredients.includes("cream")) score -= 10;
	if (ingredients.includes("butter") || ingredients.includes("ghee")) score -= 8;
	if (ingredients.includes("sugar") || ingredients.includes("syrup")) score -= 12;
	if (ingredients.includes("deep") && ingredients.includes("fried")) score -= 15;
	if (ingredients.includes("fried")) score -= 10;

	// Cooking method adjustments
	if (item.name.toLowerCase().includes("tandoori")) score += 5; // Grilled
	if (item.name.toLowerCase().includes("steamed")) score += 8;

	// Course type adjustments
	if (item.course.includes("dessert")) score -= 5;
	if (item.course.includes("snack") && item.ingredients.includes("fried")) score -= 5;

	// Cap the score between 0 and 100
	return Math.max(0, Math.min(100, score));
};

// Mock data for packaged products
const mockProducts: Product[] = [
	{
		id: "123456789",
		name: "Organic Granola Bar",
		brand: "Nature's Path",
		image: "/images/granola-bar.png",
		ingredients: [
			{ name: "Rolled Oats", harmful: false, description: "Whole grain cereal" },
			{ name: "Honey", harmful: false, description: "Natural sweetener" },
			{ name: "Palm Oil", harmful: true, description: "High in saturated fats" },
			{ name: "Natural Flavors", harmful: false, description: "Derived from natural sources" },
			{ name: "Soy Lecithin", harmful: false, description: "Emulsifier" },
		],
		nutritionalInfo: {
			calories: 180,
			fat: 8,
			carbs: 24,
			protein: 4,
			sugar: 12,
			sodium: 95,
		},
		healthScore: 68,
		alternatives: [
			{ id: "alt1", name: "KIND Bars", healthScore: 82 },
			{ id: "alt2", name: "RXBAR", healthScore: 88 },
		],
	},
	{
		id: "987654321",
		name: "Chocolate Chip Cookies",
		brand: "Sweet Treats",
		image: "/images/cookies.png",
		ingredients: [
			{ name: "Wheat Flour", harmful: false, description: "Refined grain" },
			{ name: "Sugar", harmful: true, description: "Added sweetener" },
			{ name: "Butter", harmful: false, description: "Dairy fat" },
			{ name: "Chocolate Chips", harmful: false, description: "Contains cocoa and sugar" },
			{ name: "Artificial Flavors", harmful: true, description: "Synthetic flavor compounds" },
			{ name: "High Fructose Corn Syrup", harmful: true, description: "Processed sweetener" },
		],
		nutritionalInfo: {
			calories: 240,
			fat: 12,
			carbs: 32,
			protein: 2,
			sugar: 20,
			sodium: 120,
		},
		healthScore: 35,
		alternatives: [
			{ id: "alt3", name: "Oatmeal Cookies", healthScore: 55 },
			{ id: "alt4", name: "Protein Cookies", healthScore: 65 },
		],
	},
	{
		id: "456789123",
		name: "Veggie Chips",
		brand: "Garden Snacks",
		image: "/images/veggie-chips.png",
		ingredients: [
			{ name: "Potato Flour", harmful: false, description: "Processed vegetable starch" },
			{ name: "Vegetable Oil", harmful: false, description: "Plant-based oil" },
			{ name: "Spinach Powder", harmful: false, description: "Dehydrated vegetable" },
			{ name: "Salt", harmful: false, description: "Flavor enhancer" },
			{ name: "Natural Colors", harmful: false, description: "Plant-based colorings" },
		],
		nutritionalInfo: {
			calories: 150,
			fat: 9,
			carbs: 16,
			protein: 1,
			sugar: 2,
			sodium: 180,
		},
		healthScore: 62,
		alternatives: [
			{ id: "alt5", name: "Air-popped Popcorn", healthScore: 78 },
			{ id: "alt6", name: "Kale Chips", healthScore: 85 },
		],
	},
];

// Get healthy and less healthy dishes from Indian food data
const getHealthyDishes = () => {
	return indianFoodData
		.map((dish) => ({
			...dish,
			healthScore: calculateHealthScore(dish),
		}))
		.filter((dish) => dish.healthScore >= 70)
		.map((dish) => dish.name);
};

const getLessHealthyDishes = () => {
	return indianFoodData
		.map((dish) => ({
			...dish,
			healthScore: calculateHealthScore(dish),
		}))
		.filter((dish) => dish.healthScore < 50)
		.map((dish) => dish.name);
};

// Mock data for eateries
const mockEateries: Eatery[] = [
	{
		id: "1",
		name: "Green Leaf Cafe",
		type: "Vegetarian",
		description: "A cozy cafe specializing in fresh, locally-sourced vegetarian and vegan dishes with a focus on nutritional balance.",
		image: "/placeholder.svg?height=500&width=1000",
		address: "123 Healthy St, Wellness District",
		location: "Downtown",
		distance: "0.8 miles",
		openingHours: "Mon-Fri: 7am-8pm, Sat-Sun: 8am-6pm",
		phone: "(555) 123-4567",
		website: "https://greenleafcafe.example.com",
		priceRange: "$",
		healthScore: 92,
		tags: ["Vegetarian", "Vegan", "Organic", "Gluten-Free Options"],
		healthyOptions: ["Idli Sambar", "Steamed Dosa", "Rasam", "Dhokla", "Vegetable Upma"],
		lessHealthyOptions: ["Butter Naan", "Gulab Jamun"],
		menuItems: [
			{
				id: "gl1",
				name: "Superfood Salad Bowl",
				description: "Mixed greens, quinoa, avocado, chickpeas, hemp seeds, and lemon tahini dressing",
				price: 12.99,
				healthScore: 95,
				category: "Salads",
				image: "/placeholder.svg?height=200&width=300",
				allergens: ["Sesame"],
				dietaryInfo: ["Vegan", "Gluten-Free", "High Protein"],
				isHealthyOption: true,
			},
			{
				id: "gl2",
				name: "Mediterranean Wrap",
				description: "Hummus, falafel, cucumber, tomato, and tzatziki in a whole grain wrap",
				price: 10.99,
				healthScore: 88,
				category: "Wraps",
				image: "/placeholder.svg?height=200&width=300",
				allergens: ["Gluten", "Dairy"],
				dietaryInfo: ["Vegetarian", "High Fiber"],
				isHealthyOption: true,
			},
			{
				id: "gl3",
				name: "Berry Smoothie Bowl",
				description: "Blended acai, mixed berries, banana topped with granola, coconut flakes, and fresh fruit",
				price: 9.99,
				healthScore: 85,
				category: "Breakfast",
				image: "/placeholder.svg?height=200&width=300",
				allergens: ["Tree Nuts"],
				dietaryInfo: ["Vegetarian", "Antioxidant-Rich"],
				isHealthyOption: true,
			},
			{
				id: "gl4",
				name: "Chocolate Avocado Mousse",
				description: "Rich chocolate mousse made with avocado, cacao, and sweetened with dates",
				price: 7.99,
				healthScore: 75,
				category: "Desserts",
				image: "/placeholder.svg?height=200&width=300",
				allergens: [],
				dietaryInfo: ["Vegan", "Gluten-Free", "Refined Sugar-Free"],
				isHealthyOption: true,
			},
		],
	},
	{
		id: "2",
		name: "Fresh & Fit",
		type: "Health Food",
		description: "A modern eatery offering nutritionally balanced meals designed for fitness enthusiasts and health-conscious diners.",
		image: "/placeholder.svg?height=500&width=1000",
		address: "456 Fitness Ave, Westside",
		location: "Westside",
		distance: "1.2 miles",
		openingHours: "Daily: 6am-9pm",
		phone: "(555) 987-6543",
		website: "https://freshandfit.example.com",
		priceRange: "$$",
		healthScore: 88,
		tags: ["High Protein", "Meal Prep", "Keto-Friendly", "Paleo"],
		healthyOptions: ["Tandoori Chicken", "Dal Tadka", "Baingan Bharta", "Vegetable Biryani"],
		lessHealthyOptions: ["Butter Chicken", "Malai Kofta"],
		menuItems: [
			{
				id: "ff1",
				name: "Protein Power Bowl",
				description: "Grilled chicken breast, quinoa, roasted vegetables, and avocado with lemon herb dressing",
				price: 14.99,
				healthScore: 92,
				category: "Bowls",
				image: "/placeholder.svg?height=200&width=300",
				allergens: [],
				dietaryInfo: ["High Protein", "Gluten-Free", "Dairy-Free"],
				isHealthyOption: true,
			},
			{
				id: "ff2",
				name: "Keto Plate",
				description: "Grass-fed beef patty, avocado, sautéed greens, and cauliflower rice",
				price: 16.99,
				healthScore: 85,
				category: "Mains",
				image: "/placeholder.svg?height=200&width=300",
				allergens: [],
				dietaryInfo: ["Keto", "Low Carb", "High Fat"],
				isHealthyOption: true,
			},
			{
				id: "ff3",
				name: "Recovery Smoothie",
				description: "Whey protein, banana, almond butter, spinach, and almond milk",
				price: 8.99,
				healthScore: 90,
				category: "Drinks",
				image: "/placeholder.svg?height=200&width=300",
				allergens: ["Tree Nuts", "Dairy"],
				dietaryInfo: ["High Protein", "Post-Workout"],
				isHealthyOption: true,
			},
			{
				id: "ff4",
				name: "Protein Pancakes",
				description: "Oat and protein pancakes topped with Greek yogurt and fresh berries",
				price: 11.99,
				healthScore: 80,
				category: "Breakfast",
				image: "/placeholder.svg?height=200&width=300",
				allergens: ["Gluten", "Dairy", "Eggs"],
				dietaryInfo: ["High Protein", "Low Sugar"],
				isHealthyOption: true,
			},
		],
	},
	{
		id: "3",
		name: "Nutri Bowl",
		type: "Salad Bar",
		description:
			"A customizable salad bar concept where customers can build their own nutritious bowls from a wide selection of fresh ingredients.",
		image: "/placeholder.svg?height=500&width=1000",
		address: "789 Greens Blvd, Midtown",
		location: "Midtown",
		distance: "0.5 miles",
		openingHours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm",
		phone: "(555) 456-7890",
		website: "https://nutribowl.example.com",
		priceRange: "$",
		healthScore: 95,
		tags: ["Build Your Own", "Fresh", "Locally Sourced", "Sustainable"],
		healthyOptions: ["Steamed Dhokla", "Vegetable Upma", "Khandvi", "Rasam", "Sambar"],
		lessHealthyOptions: ["Jalebi", "Samosa"],
		menuItems: [
			{
				id: "nb1",
				name: "Build Your Own Bowl",
				description: "Choose your base, proteins, toppings, and dressing for a custom salad experience",
				price: 12.99,
				healthScore: 90,
				category: "Custom",
				image: "/placeholder.svg?height=200&width=300",
				allergens: ["Various - Depends on Selection"],
				dietaryInfo: ["Customizable for All Diets"],
				isHealthyOption: true,
			},
			{
				id: "nb2",
				name: "Harvest Bowl",
				description: "Mixed greens, roasted sweet potatoes, apples, cranberries, pecans, and maple vinaigrette",
				price: 13.99,
				healthScore: 88,
				category: "Signature Bowls",
				image: "/placeholder.svg?height=200&width=300",
				allergens: ["Tree Nuts"],
				dietaryInfo: ["Vegetarian", "Seasonal", "High Fiber"],
				isHealthyOption: true,
			},
			{
				id: "nb3",
				name: "Mediterranean Bowl",
				description: "Romaine, cucumber, tomato, red onion, olives, feta, chickpeas, and lemon herb dressing",
				price: 13.99,
				healthScore: 92,
				category: "Signature Bowls",
				image: "/placeholder.svg?height=200&width=300",
				allergens: ["Dairy"],
				dietaryInfo: ["Vegetarian", "Mediterranean Diet"],
				isHealthyOption: true,
			},
			{
				id: "nb4",
				name: "Green Detox Juice",
				description: "Kale, cucumber, celery, apple, lemon, and ginger",
				price: 7.99,
				healthScore: 95,
				category: "Drinks",
				image: "/placeholder.svg?height=200&width=300",
				allergens: [],
				dietaryInfo: ["Raw", "Cold-Pressed", "Detoxifying"],
				isHealthyOption: true,
			},
		],
	},
];

// Add healthy and less healthy options to all eateries
for (const eatery of mockEateries) {
	if (!eatery.healthyOptions) {
		const healthyDishes = getHealthyDishes();
		eatery.healthyOptions = healthyDishes.slice(0, Math.floor(Math.random() * 5) + 2);
	}

	if (!eatery.lessHealthyOptions) {
		const lessHealthyDishes = getLessHealthyDishes();
		eatery.lessHealthyOptions = lessHealthyDishes.slice(0, Math.floor(Math.random() * 3) + 1);
	}
}

// Simulated API functions for packaged products
export async function getProductById(id: string): Promise<Product> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const product = mockProducts.find((p) => p.id === id);
			if (product) {
				resolve(product);
			} else {
				reject(new Error("Product not found"));
			}
		}, 800);
	});
}

export async function searchProducts(query: string): Promise<Product[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			const results = mockProducts.filter(
				(p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase())
			);
			resolve(results);
		}, 800);
	});
}

export async function scanProduct(barcode: string): Promise<Product | null> {
	return new Promise((resolve) => {
		setTimeout(() => {
			// For demo purposes, just return the first product
			resolve(mockProducts[0]);
		}, 1500);
	});
}

// Simulated API functions for eateries
export async function getEateries(): Promise<Eatery[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			// Get custom eateries from localStorage
			let customEateries: Eatery[] = [];
			try {
				const storedEateries = localStorage.getItem("customEateries");
				if (storedEateries) {
					customEateries = JSON.parse(storedEateries);
				}
			} catch (error) {
				console.error("Error loading custom eateries:", error);
			}

			// Combine with mock eateries
			resolve([...mockEateries, ...customEateries]);
		}, 800);
	});
}

export async function getEateryById(id: string): Promise<Eatery> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// Check mock eateries first
			let eatery = mockEateries.find((e) => e.id === id);

			// If not found, check custom eateries
			if (!eatery) {
				try {
					const storedEateries = localStorage.getItem("customEateries");
					if (storedEateries) {
						const customEateries = JSON.parse(storedEateries);
						eatery = customEateries.find((e: Eatery) => e.id === id);
					}
				} catch (error) {
					console.error("Error loading custom eateries:", error);
				}
			}

			if (eatery) {
				resolve(eatery);
			} else {
				reject(new Error("Eatery not found"));
			}
		}, 800);
	});
}

export async function searchEateries(query: string, filters?: any): Promise<Eatery[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			// Get all eateries (mock + custom)
			let allEateries: Eatery[] = [...mockEateries];

			try {
				const storedEateries = localStorage.getItem("customEateries");
				if (storedEateries) {
					const customEateries = JSON.parse(storedEateries);
					allEateries = [...allEateries, ...customEateries];
				}
			} catch (error) {
				console.error("Error loading custom eateries:", error);
			}

			let results = allEateries;

			// Apply search query
			if (query) {
				results = results.filter(
					(e) =>
						e.name.toLowerCase().includes(query.toLowerCase()) ||
						e.type.toLowerCase().includes(query.toLowerCase()) ||
						e.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
				);
			}

			// Apply filters if provided
			if (filters) {
				// Filter by minimum health score
				if (filters.minHealthScore) {
					results = results.filter((e) => e.healthScore >= filters.minHealthScore);
				}

				// Filter by dietary options
				if (filters.dietaryOptions && filters.dietaryOptions.length > 0) {
					results = results.filter((e) => filters.dietaryOptions.some((option: string) => e.tags.includes(option)));
				}

				// Filter by healthy options only
				if (filters.healthyOptionsOnly) {
					results = results.filter((e) => e.healthyOptions && e.healthyOptions.length > 0);
				}
			}

			resolve(results);
		}, 800);
	});
}

// Simulated API functions for canteen
export async function getCanteenStats(): Promise<CanteenStats> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				averageHealthScore: 82,
				healthyChoicesPercentage: 68,
				nutritionalQualityGrade: "A",
				improvementAreas: ["Reduce added sugars in desserts", "Increase plant-based protein options", "Add more whole grain alternatives"],
			});
		}, 800);
	});
}

export async function getRestaurantsServingDish(dishName: string): Promise<Eatery[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			const restaurants = mockEateries.filter((eatery) => {
				// Check if the dish is in healthyOptions or lessHealthyOptions
				return (
					(eatery.healthyOptions && eatery.healthyOptions.includes(dishName)) ||
					(eatery.lessHealthyOptions && eatery.lessHealthyOptions.includes(dishName)) ||
					eatery.menuItems.some((item) => item.name === dishName)
				);
			});

			resolve(restaurants);
		}, 800);
	});
}

// backend api calls

// Simulated API function for menu analysis
export async function analyzeMenuImage(file: File): Promise<MenuAnalysisResult> {
	const formData = new FormData();
	formData.append("image", file);

	const response = await axios.post(`/menu`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return response.data;
}

export async function analyzeFoodImage(file: File): Promise<FoodAnalysisResult> {
	const formData = new FormData();
	formData.append("image", file);

	const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return response.data;
}

export async function recommendFoodImage(file: File): Promise<FoodAnalysisResult> {
	const formData = new FormData();
	formData.append("image", file);

	const response = await axios.post(`${API_BASE_URL}/recommend`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return response.data;
}
