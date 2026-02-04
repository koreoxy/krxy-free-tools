"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, RotateCw } from "lucide-react";

const generatePassword = (
  length: number,
  uppercase: boolean,
  lowercase: boolean,
  numbers: boolean,
  symbols: boolean,
): string => {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let availableChars = "";
  if (uppercase) availableChars += uppercaseChars;
  if (lowercase) availableChars += lowercaseChars;
  if (numbers) availableChars += numberChars;
  if (symbols) availableChars += symbolChars;

  if (!availableChars) return "";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += availableChars.charAt(
      Math.floor(Math.random() * availableChars.length),
    );
  }

  return password;
};

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newPassword = generatePassword(
      length,
      uppercase,
      lowercase,
      numbers,
      symbols,
    );
    setPassword(newPassword);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPasswordStrength = (): { label: string; color: string } => {
    if (!password) return { label: "", color: "" };

    let strength = 0;
    if (uppercase && /[A-Z]/.test(password)) strength++;
    if (lowercase && /[a-z]/.test(password)) strength++;
    if (numbers && /[0-9]/.test(password)) strength++;
    if (symbols && /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) strength++;

    if (password.length < 8) strength--;
    if (password.length > 20) strength++;

    if (strength <= 1)
      return { label: "Weak", color: "text-red-600 bg-red-50" };
    if (strength <= 2)
      return { label: "Fair", color: "text-orange-600 bg-orange-50" };
    if (strength <= 3)
      return { label: "Good", color: "text-yellow-600 bg-yellow-50" };
    return { label: "Strong", color: "text-green-600 bg-green-50" };
  };

  const strength = getPasswordStrength();

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
            Password Generator
          </h1>
          <p className="text-muted-foreground">
            Generate strong, secure passwords for your accounts
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
          {/* Password Display */}
          <div className="mb-8">
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={password}
                readOnly
                placeholder="Your password will appear here"
                className="flex-1 px-4 py-4 rounded-lg border border-border bg-background text-foreground font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleCopy}
                disabled={!password}
                className="p-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {copied ? "Copied!" : <Copy size={20} />}
              </button>
            </div>

            {password && (
              <div
                className={`text-sm font-semibold px-3 py-2 rounded-lg ${strength.color}`}
              >
                Strength: {strength.label}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-6 mb-8">
            {/* Length Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-foreground">
                  Password Length
                </label>
                <span className="text-lg font-bold text-primary">{length}</span>
              </div>
              <input
                type="range"
                min="4"
                max="32"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>4</span>
                <span>32</span>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
                <span className="text-sm font-medium text-foreground">
                  Uppercase (A-Z)
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
                <span className="text-sm font-medium text-foreground">
                  Lowercase (a-z)
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={numbers}
                  onChange={(e) => setNumbers(e.target.checked)}
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
                <span className="text-sm font-medium text-foreground">
                  Numbers (0-9)
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={symbols}
                  onChange={(e) => setSymbols(e.target.checked)}
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
                <span className="text-sm font-medium text-foreground">
                  Symbols (!@#$%)
                </span>
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <RotateCw size={20} />
            Generate Password
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">
              Why Strong Passwords?
            </h3>
            <p className="text-sm text-muted-foreground">
              Strong passwords protect your accounts from unauthorized access
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">
              Password Tips
            </h3>
            <p className="text-sm text-muted-foreground">
              Use unique passwords for different accounts and change them
              regularly
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
