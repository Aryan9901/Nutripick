"use client";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import EateriesList from "@/components/eateries/eateries-list";
import EateriesMap from "@/components/eateries/eateries-map";
import EateriesFilter from "@/components/eateries/eateries-filter";
import { PlusCircle } from "lucide-react";

export default function EateriesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Healthy Eateries Near You</h1>
          <Link
            href="/eateries/add"
            className="btn btn-primary flex items-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Restaurant
          </Link>
        </div>

        <div className="mb-8">
          <EateriesFilter />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <EateriesList />
          </div>
          <div className="hidden md:block">
            <EateriesMap />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
