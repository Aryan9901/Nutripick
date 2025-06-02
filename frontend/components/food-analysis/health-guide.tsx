import { Leaf, AlertTriangle, Info } from "lucide-react";

export default function HealthGuide() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Leaf className="w-6 h-6 text-green-500 mr-2" />
        Indian Cuisine Health Guide
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg">
          <h3 className="font-semibold text-lg text-green-700 dark:text-green-400 mb-3">
            Healthiest Options
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>
                Idli Sambar - Steamed rice cakes with vegetable lentil stew
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Dhokla - Steamed fermented gram flour cake</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Rasam - Tangy, spiced tamarind broth</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Baingan Bharta - Roasted eggplant mash</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Tandoori dishes - Grilled rather than fried</span>
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg">
          <h3 className="font-semibold text-lg text-yellow-700 dark:text-yellow-400 mb-3">
            Moderate Choices
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>
                Dal dishes - Protein-rich but watch for added cream/butter
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Vegetable Biryani - Rice with vegetables and spices</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Chana Masala - Chickpea curry with moderate oil</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Aloo Gobi - Potato and cauliflower curry</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Dosa - Fermented rice pancake (plain version)</span>
            </li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg">
          <h3 className="font-semibold text-lg text-red-700 dark:text-red-400 mb-3">
            Occasional Treats
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Butter Chicken - High in cream and butter</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Samosas - Deep-fried pastry</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Jalebi - Deep-fried and soaked in sugar syrup</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Malai Kofta - Fried dumplings in cream sauce</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Gobi Manchurian - Deep-fried cauliflower</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-400 mb-3 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Healthy Eating Tips
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Choose dishes with plenty of vegetables and legumes</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Opt for steamed, grilled, or roasted items over fried</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Request less oil, ghee, or cream in your dishes</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>
                Choose whole grain options like brown rice or whole wheat roti
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>
                Balance your meal with protein, vegetables, and carbohydrates
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-lg">
          <h3 className="font-semibold text-lg text-amber-700 dark:text-amber-400 mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Watch Out For
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Dishes described as "creamy," "buttery," or "rich"</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Deep-fried items like pakoras, samosas, and bhajis</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Dishes with heavy cream or coconut cream bases</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Sweet desserts with high sugar content</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-2 flex-shrink-0"></span>
              <span>Excessive portions of rice or bread</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
