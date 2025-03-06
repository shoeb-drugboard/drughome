"use client";
import React from "react";
import { Button } from "@heroui/button";
import BentoGrid from "@/components/BentoGrid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-12">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto py-12 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Drugboard</h1>
        <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-3xl">
          Your comprehensive platform for pharmaceutical information and services.
        </p>
        <Button variant="bordered" className="px-8 py-3 rounded-md font-medium transition-colors">
          Get Started
        </Button>
      </section>
      <div className="relative w-full">
        <BentoGrid />
      </div>
      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-300">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Feature {i}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                A short description of this feature and how it can benefit users.
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <div className="w-full bg-gray-100 dark:bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-500">© {new Date().getFullYear()} Drugboard.AI <br /> All rights reserved</p>
        </div>
      </div>
    </main>
  );
}
