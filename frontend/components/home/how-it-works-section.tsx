import Image from "next/image"

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Scan Product",
      description: "Use your phone's camera to scan the barcode on any packaged food product.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      number: "02",
      title: "View Ingredients",
      description: "Instantly see a detailed breakdown of all ingredients and nutritional information.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      number: "03",
      title: "Check Verification",
      description: "Our system compares the ingredients with our verified database for accuracy.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      number: "04",
      title: "Make Better Choices",
      description: "Get recommendations for healthier alternatives based on your scan results.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Four simple steps to make healthier food choices with TruthIn
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6 mx-auto w-40 h-40">
                <div className="absolute inset-0 bg-green-100 dark:bg-green-900/20 rounded-full"></div>
                <Image
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  width={300}
                  height={300}
                  className="relative z-10 rounded-full p-4"
                />
                <div className="absolute -right-2 -top-2 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
