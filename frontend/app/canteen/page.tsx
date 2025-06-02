import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CanteenDashboard from "@/components/canteen/canteen-dashboard";
import CanteenStats from "@/components/canteen/canteen-stats";
import CanteenRecommendations from "@/components/canteen/canteen-recommendations";

export default function CanteenPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Canteen Health Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <CanteenStats />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <CanteenDashboard />
          </div>
          <div>
            <CanteenRecommendations />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
