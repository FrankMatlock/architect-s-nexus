import React from "react";
import HeroSection from "@/components/home/HeroSection";
import PulseDashboard from "@/components/home/PulseDashboard";
import HomePreview from "@/components/home/HomePreview";

const heroImage = "https://media.base44.com/images/public/6a3b81a1c21bbff4a843e422/2bb8fec1d_generated_a81c1660.png";

export default function Home() {
  return (
    <div>
      <HeroSection heroImage={heroImage} />
      <PulseDashboard />
      <HomePreview />
    </div>
  );
}