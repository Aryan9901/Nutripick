import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Healthy Food <span className="text-green-500">Everywhere</span>{" "}
              You Go
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Make informed food choices at grocery stores, restaurants, cafes,
              and canteens with our comprehensive food analysis platform. Scan
              packaged products, analyze restaurant menus, or identify
              unpackaged foods.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/scan"
                className="btn btn-primary text-center px-6 py-3 rounded-full"
              >
                Scan Products
              </Link>
              <Link
                href="/eateries"
                className="btn btn-secondary text-center px-6 py-3 rounded-full"
              >
                Find Healthy Eateries
              </Link>
              <Link
                href="/unpackaged"
                className="btn btn-outline text-center px-6 py-3 rounded-full"
              >
                Analyze Unpackaged Food
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="grid grid-cols-2 gap-2 p-2">
                  <div className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src="/scanme.jpg"
                      alt="Packaged food scanning"
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src="/hero4.jpg"
                      alt="Restaurant menu analysis"
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src="/hero2.jpg"
                      alt="Unpackaged food recognition"
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src="/hero3.jpg"
                      alt="Canteen dashboard"
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
