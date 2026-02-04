"use client";

import { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Tool {
  id: number;
  name: string;
  description: string;
  category: string[];
  imageUrl?: string;
  fallbackGradient: string;
  cta: string;
  href: string;
}

const tools: Tool[] = [
  {
    id: 1,
    name: "Currency Converter",
    description:
      "Instantly convert between multiple currencies with real-time exchange rates. Fast, accurate, and easy to use.",
    category: ["Finance"],
    imageUrl: "/images/currency-converter.jpg",
    fallbackGradient: "bg-gradient-to-br from-blue-400 to-cyan-500",
    cta: "Convert Now",
    href: "/tools/currency-converter",
  },
  {
    id: 2,
    name: "BMI Calculator",
    description:
      "Calculate your Body Mass Index quickly and get health insights. Includes personalized recommendations and tracking.",
    category: ["Health"],
    imageUrl: "/images/bmi-calculator.jpg",
    fallbackGradient: "bg-gradient-to-br from-green-400 to-emerald-500",
    cta: "Calculate",
    href: "/tools/bmi-calculator",
  },
  {
    id: 3,
    name: "Password Generator",
    description:
      "Generate strong, secure passwords with customizable options. Protect your accounts with cryptographically secure passwords.",
    category: ["Security"],
    imageUrl: "/images/password-generator.jpg",
    fallbackGradient: "bg-gradient-to-br from-purple-400 to-pink-500",
    cta: "Generate",
    href: "/tools/password-generator",
  },
  {
    id: 4,
    name: "PDF Converter",
    description:
      "Convert documents to PDF format or convert PDFs to other formats. Simple, fast, and secure conversion.",
    category: ["Documents"],
    imageUrl: "/images/pdf-converter.jpg",
    fallbackGradient: "bg-gradient-to-br from-orange-400 to-red-500",
    cta: "Convert",
    href: "/tools/pdf-converter",
  },
];

export default function Showcase() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    if (!selectedCategory) return tools;
    return tools.filter((tool) => tool.category.includes(selectedCategory));
  }, [selectedCategory]);

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Explore
          </h1>
          <p className="text-lg text-muted-foreground">
            Simple, fast, and free tools for everyday use
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  className="group border border-border overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30"
                >
                  {/* Image */}
                  <Link href={tool.href}>
                    <div
                      className={`relative h-48 overflow-hidden ${tool.fallbackGradient}`}
                    >
                      {tool.imageUrl ? (
                        <Image
                          src={tool.imageUrl}
                          alt={tool.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                          priority={tool.id === 1}
                        />
                      ) : (
                        <div className="w-full h-full" />
                      )}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6 bg-card border-t border-border">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>

                    <div className="flex gap-2 flex-wrap mb-3">
                      {tool.category.map((cat) => (
                        <span
                          key={cat}
                          className="text-xs font-medium px-2.5 py-1 bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {tool.description}
                    </p>

                    <Link
                      href={tool.href}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-white text-white font-medium hover:bg-white hover:text-foreground transition-all group-hover:border-primary group-hover:hover:bg-primary group-hover:hover:text-primary-foreground"
                    >
                      {tool.cta}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
