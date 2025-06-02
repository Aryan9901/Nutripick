import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import type { MenuAnalysisResult } from "@/types/eatery";

interface MenuAnalysisProps {
  analysis: MenuAnalysisResult;
}

export default function MenuAnalysis({ analysis }: MenuAnalysisProps) {
  // Group menu items by health score ranges
  const healthyItems = analysis.menu_items.filter(
    (item) => item.health_score >= 7
  );
  const moderateItems = analysis.menu_items.filter(
    (item) => item.health_score >= 5 && item.health_score < 7
  );
  const lessHealthyItems = analysis.menu_items.filter(
    (item) => item.health_score < 5
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Menu Health Analysis</h3>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
            Overall Health Score:
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              analysis.overall_health_score >= 7
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : analysis.overall_health_score >= 5
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {analysis.overall_health_score}/10
          </span>
        </div>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-6">
        <h4 className="font-medium mb-2 flex items-center">
          <Info className="w-5 h-5 text-blue-500 mr-2" />
          Summary
        </h4>
        <p className="text-gray-700 dark:text-gray-300">{analysis.summary}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            Healthy Options ({healthyItems.length})
          </h4>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 h-full">
            <ul className="space-y-2">
              {healthyItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className="px-2 py-0.5 bg-green-100 dark:bg-green-800/30 rounded-full text-xs font-medium text-green-800 dark:text-green-400">
                    {item.health_score}/10
                  </span>
                </li>
              ))}
              {healthyItems.length === 0 && (
                <li className="text-gray-500 dark:text-gray-400 italic">
                  No healthy options found
                </li>
              )}
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <Info className="w-5 h-5 text-yellow-500 mr-2" />
            Moderate Options ({moderateItems.length})
          </h4>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 h-full">
            <ul className="space-y-2">
              {moderateItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-800/30 rounded-full text-xs font-medium text-yellow-800 dark:text-yellow-400">
                    {item.health_score}/10
                  </span>
                </li>
              ))}
              {moderateItems.length === 0 && (
                <li className="text-gray-500 dark:text-gray-400 italic">
                  No moderate options found
                </li>
              )}
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            Less Healthy Options ({lessHealthyItems.length})
          </h4>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 h-full">
            <ul className="space-y-2">
              {lessHealthyItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className="px-2 py-0.5 bg-red-100 dark:bg-red-800/30 rounded-full text-xs font-medium text-red-800 dark:text-red-400">
                    {item.health_score}/10
                  </span>
                </li>
              ))}
              {lessHealthyItems.length === 0 && (
                <li className="text-gray-500 dark:text-gray-400 italic">
                  No less healthy options found
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
