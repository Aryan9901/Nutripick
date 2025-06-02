import type React from "react"
interface HealthScoreProps {
  score: number
}

export default function HealthScore({ score }: HealthScoreProps) {
  // Determine color based on score
  const getColor = () => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="flex flex-col items-center">
      <div className="health-score-gauge" style={{ "--percentage": `${score}%` } as React.CSSProperties}>
        <div className="text-2xl font-bold">{score}</div>
      </div>
      <div className={`text-sm font-medium mt-1 ${getColor()}`}>
        {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Poor"}
      </div>
    </div>
  )
}
