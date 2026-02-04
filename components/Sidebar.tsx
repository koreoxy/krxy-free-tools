"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calculator,
  DollarSign,
  Lock,
  Menu,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Info,
  ChevronDown,
  Wrench,
  FileText,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface ToolItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const toolItems: ToolItem[] = [
  {
    label: "Currency Converter",
    href: "/tools/currency-converter",
    icon: <DollarSign size={18} />,
  },
  {
    label: "BMI Calculator",
    href: "/tools/bmi-calculator",
    icon: <Calculator size={18} />,
  },
  {
    label: "Password Generator",
    href: "/tools/password-generator",
    icon: <Lock size={18} />,
  },
  {
    label: "PDF Converter",
    href: "/tools/pdf-converter",
    icon: <FileText size={18} />,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isToolActive = toolItems.some((tool) => pathname.startsWith(tool.href));

  return (
    <>
      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-sidebar border-b border-sidebar-border">
        <div className="px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.png"
                alt="Krxy Logo"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-sidebar-foreground text-sm">
              Krxy
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ================= OVERLAY ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        flex flex-col`}
      >
        {/* ===== TOP SECTION ===== */}
        <div className="flex-1 overflow-y-auto">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Krxy Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">
                  Krxy
                </h1>
                <p className="text-xs text-sidebar-foreground/60">Web Tools</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                pathname === "/"
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Home size={20} />
              Home
            </Link>

            <Collapsible defaultOpen={isToolActive}>
              <CollapsibleTrigger
                className={`flex w-full items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors ${
                  isToolActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Wrench size={20} />
                  Tools
                </div>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    isToolActive ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-2 space-y-1">
                {toolItems.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setIsOpen(false)}
                    className={`ml-6 flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                      pathname.startsWith(tool.href)
                        ? "bg-sidebar-accent font-medium"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
                    }`}
                  >
                    {tool.icon}
                    {tool.label}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                pathname.startsWith("/about")
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Info size={20} />
              About
            </Link>
          </nav>
        </div>

        {/* ===== BOTTOM SECTION ===== */}
        <div className="border-t border-sidebar-border">
          <div className="p-4">
            <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase mb-3">
              Socials
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg hover:bg-sidebar-accent">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-sidebar-accent">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-sidebar-accent">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-sidebar-accent">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div className="p-4 border-t border-sidebar-border text-center">
            <p className="text-xs text-sidebar-foreground/60">v1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Spacer */}
      <div className="hidden md:block w-64" />
    </>
  );
}
