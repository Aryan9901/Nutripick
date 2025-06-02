import Image from "next/image"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "This app has completely changed how I shop for groceries. I can now make informed decisions about what I'm feeding my family.",
      author: "Sarah Johnson",
      role: "Health-conscious parent",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "As someone with food allergies, TruthIn has been a lifesaver. I can quickly check if a product contains ingredients I need to avoid.",
      author: "Michael Chen",
      role: "Food allergy sufferer",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "The comparison feature is brilliant! I've discovered so many healthier alternatives to my favorite snacks.",
      author: "Emma Rodriguez",
      role: "Fitness enthusiast",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">What Our Users Say</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Join thousands of people making healthier food choices with TruthIn
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
