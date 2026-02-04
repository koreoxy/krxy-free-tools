"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, FileText, Download } from "lucide-react";

type ConvertedFile = {
  blob: Blob;
  name: string;
};

export default function PDFConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [message, setMessage] = useState("");
  const [convertedFile, setConvertedFile] = useState<ConvertedFile | null>(
    null,
  );
  const [conversionType, setConversionType] = useState<"to-pdf" | "from-pdf">(
    "to-pdf",
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setConvertedFile(null);
      setMessage("");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      setConvertedFile(null);
      setMessage("");
    }
  };

  /* ================= TXT → PDF ================= */
  const convertTextToPDF = async (file: File): Promise<ConvertedFile> => {
    const { default: jsPDF } = await import("jspdf");
    const text = await file.text();

    const doc = new jsPDF();
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
    let y = margin;

    lines.forEach((line: string) => {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 7;
    });

    return {
      blob: doc.output("blob"),
      name: file.name.replace(/\.[^.]+$/, ".pdf"),
    };
  };

  /* ================= IMAGE → PDF ================= */
  const convertImageToPDF = async (file: File): Promise<ConvertedFile> => {
    const { default: jsPDF } = await import("jspdf");

    const imgData = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const doc = new jsPDF();
    const img = new Image();
    img.src = imgData;

    await new Promise((res) => (img.onload = res));

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);

    const width = img.width * ratio;
    const height = img.height * ratio;

    doc.addImage(
      imgData,
      "JPEG",
      (pageWidth - width) / 2,
      (pageHeight - height) / 2,
      width,
      height,
    );

    return {
      blob: doc.output("blob"),
      name: file.name.replace(/\.[^.]+$/, ".pdf"),
    };
  };

  /* ================= CONVERT ================= */
  const handleConvert = async () => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    setConverting(true);
    setMessage("Processing your file...");

    try {
      const ext = file.name.split(".").pop()?.toLowerCase();

      let result: ConvertedFile;

      if (conversionType === "to-pdf") {
        if (ext === "txt") {
          result = await convertTextToPDF(file);
        } else if (ext === "jpg" || ext === "jpeg" || ext === "png") {
          result = await convertImageToPDF(file);
        } else {
          throw new Error("This file type requires server-side conversion");
        }
      } else {
        throw new Error("PDF to other formats not supported yet");
      }

      setConvertedFile(result);
      setMessage(`✓ Successfully converted to ${result.name}`);
    } catch (err: unknown) {
      setConvertedFile(null);

      if (err instanceof Error) {
        setMessage(
          err.message ||
            "Conversion failed. This format needs server-side processing.",
        );
      } else {
        setMessage("Conversion failed. An unexpected error occurred.");
      }
    } finally {
      setConverting(false);
    }
  };

  /* ================= DOWNLOAD ================= */
  const handleDownload = () => {
    if (!convertedFile) return;

    const url = URL.createObjectURL(convertedFile.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = convertedFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

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
            PDF Converter
          </h1>
          <p className="text-muted-foreground">
            Convert documents to PDF or convert PDFs to other formats
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
          {/* Conversion Type */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-3">
              Conversion Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setConversionType("to-pdf");
                  setFile(null);
                  setConvertedFile(null);
                  setMessage("");
                }}
                className={`p-3 rounded-lg font-medium text-sm transition-colors ${
                  conversionType === "to-pdf"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                To PDF
              </button>
              <button
                onClick={() => {
                  setConversionType("from-pdf");
                  setFile(null);
                  setConvertedFile(null);
                  setMessage("");
                }}
                className={`p-3 rounded-lg font-medium text-sm transition-colors ${
                  conversionType === "from-pdf"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                From PDF
              </button>
            </div>
          </div>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors mb-8"
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
              accept={
                conversionType === "to-pdf"
                  ? ".pdf,.doc,.docx,.txt,.jpg,.png"
                  : ".pdf"
              }
            />
            <label htmlFor="file-input" className="cursor-pointer block">
              <Upload
                className="mx-auto mb-3 text-muted-foreground"
                size={32}
              />
              <p className="text-sm font-medium text-foreground mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                Supported: PDF, Word, Text, Images
              </p>
            </label>
          </div>

          {/* Selected File */}
          {file && (
            <div className="bg-secondary rounded-lg p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="text-primary" size={20} />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-xs px-3 py-1 rounded bg-background hover:bg-border"
              >
                Remove
              </button>
            </div>
          )}

          {/* Message */}
          {message && (
            <div className="p-4 rounded-lg mb-6 text-sm font-medium bg-secondary">
              {message}
            </div>
          )}

          {/* Converted */}
          {convertedFile && (
            <div className="bg-secondary rounded-lg p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="text-primary" size={20} />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {convertedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Ready to download
                  </p>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          )}

          {!convertedFile ? (
            <button
              onClick={handleConvert}
              disabled={!file || converting}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold disabled:opacity-50"
            >
              {converting ? "Converting..." : "Convert Now"}
            </button>
          ) : (
            <button
              onClick={() => {
                setFile(null);
                setConvertedFile(null);
                setMessage("");
              }}
              className="w-full py-3 rounded-lg bg-secondary font-semibold"
            >
              Convert Another File
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
