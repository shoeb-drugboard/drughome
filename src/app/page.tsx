"use client";
import React from "react";
// import { Button } from "@heroui/button";
// import BentoGrid from "@/components/BentoGrid";
// import BentoGridV2 from "@/components/Bentov2";
// import BentoGridV3 from "@/components/Bentov3";
import BentoGridV4 from "@/components/Bentov4";
import NavigationBar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative w-full">
      <NavigationBar />
      <BentoGridV4 />
    </div>
  );
}
