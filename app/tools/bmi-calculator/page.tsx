"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  message: string;
}

const calculateBMI = (weight: number, height: number): BMIResult | null => {
  if (!weight || !height) return null;

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  let category = "";
  let color = "";
  let message = "";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "text-blue-600";
    message =
      "You may need to gain weight. Consider consulting a healthcare provider.";
  } else if (bmi < 25) {
    category = "Normal Weight";
    color = "text-green-600";
    message = "You are at a healthy weight. Keep up the good lifestyle!";
  } else if (bmi < 30) {
    category = "Overweight";
    color = "text-orange-600";
    message =
      "Consider increasing physical activity and consulting a nutritionist.";
  } else {
    category = "Obese";
    color = "text-red-600";
    message =
      "Please consult with a healthcare professional for personalized advice.";
  }

  return { bmi, category, color, message };
};

export default function BMICalculatorPage() {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [unit, setUnit] = useState("metric");

  const result = calculateBMI(parseFloat(weight) || 0, parseFloat(height) || 0);

  const heightLabel = unit === "metric" ? "Height (cm)" : "Height (inches)";
  const weightLabel = unit === "metric" ? "Weight (kg)" : "Weight (lbs)";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-4"
          >
            <ArrowLeft size={20} />
            Back
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            BMI Calculator
          </h1>
          <p className="text-muted-foreground">
            Calculate your Body Mass Index and get health insights
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
          {/* Unit Toggle */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setUnit("metric")}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                unit === "metric"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              Metric
            </button>
            <button
              onClick={() => setUnit("imperial")}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                unit === "imperial"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              Imperial
            </button>
          </div>

          {/* Input Fields */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                {heightLabel}
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                {weightLabel}
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="bg-secondary rounded-lg p-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
              <div className="text-5xl font-bold text-foreground mb-2">
                {result.bmi.toFixed(1)}
              </div>
              <div className={`text-xl font-semibold mb-4 ${result.color}`}>
                {result.category}
              </div>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                {result.message}
              </p>
            </div>
          )}

          {/* BMI Chart */}
          <div className="mt-8 p-6 bg-secondary rounded-lg">
            <h3 className="font-semibold text-foreground mb-4">
              BMI Categories
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Underweight
                </span>
                <span className="text-sm font-medium text-foreground">
                  {" < 18.5"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Normal Weight
                </span>
                <span className="text-sm font-medium text-foreground">
                  {"18.5 - 24.9"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Overweight
                </span>
                <span className="text-sm font-medium text-foreground">
                  {"25.0 - 29.9"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Obese</span>
                <span className="text-sm font-medium text-foreground">
                  {"≥ 30.0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">What is BMI?</h3>
            <p className="text-sm text-muted-foreground">
              Body Mass Index is a measure of body fat based on height and
              weight
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              For medical advice, please consult with a healthcare professional
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
