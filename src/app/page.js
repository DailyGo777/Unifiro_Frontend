'use client'

import CategorySection from "@/components/CategorySection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HostEventCTA from "@/components/HostEventCTA";
import Navbar from "@/components/Navbar";
import UpcomingEvents from "@/components/UpcomingEvents";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <Navbar />
      <Hero />
      <CategorySection />
      <UpcomingEvents />
      <WhyChooseUs />
      <HostEventCTA />
      <Footer />
    </main>
  );
}
