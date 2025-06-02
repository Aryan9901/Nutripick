import { TrendingUp, Users, Award } from "lucide-react";

export default function CanteenStats() {
  const stats = [
    {
      title: "Average Health Score",
      value: "82",
      change: "+5%",
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      description: "Compared to last month",
    },
    {
      title: "Daily Healthy Choices",
      value: "68%",
      change: "+12%",
      icon: <Users className="w-8 h-8 text-blue-500" />,
      description: "Of all meals served",
    },
    {
      title: "Nutritional Quality",
      value: "A",
      change: "Excellent",
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      description: "Based on dietary guidelines",
    },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold">{stat.value}</p>
                <p className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">
                  {stat.change}
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {stat.description}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-full">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
