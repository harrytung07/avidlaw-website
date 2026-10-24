"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { RotateCcw } from "lucide-react";

interface SignaturePadProps {
  onChange: (dataUrl: string | null) => void;
  clearLabel?: string;
  placeholder?: string;
  required?: boolean;
}

export default function SignaturePad({
  onChange,
  clearLabel = "Clear Signature / 清除重签",
  placeholder = "Sign your legal signature above using your finger, stylus, or mouse / 请在此处使用手指、触控笔或鼠标签署您的法定签名",
  required = false,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Setup canvas with high DPI support
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Save existing image before resize if any
    const prevData = hasSignature ? canvas.toDataURL("image/png") : null;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = "#0F172A";

    if (prevData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = prevData;
    }
  }, [hasSignature]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const coords = getCoordinates(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isDrawingRef.current = true;
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawingRef.current) return;
    const coords = getCoordinates(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    if (!hasSignature) {
      setHasSignature(true);
    }
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    onChange(dataUrl);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    setHasSignature(false);
    onChange(null);
  };

  return (
    <div className="w-full space-y-2">
      <div className="relative border-2 border-dashed border-zinc-300 hover:border-[#FFC107] focus-within:border-[#FFC107] transition-colors rounded-xl bg-white overflow-hidden shadow-inner">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-44 sm:h-52 cursor-crosshair block touch-none select-none bg-zinc-50/50"
          style={{ touchAction: "none" }}
        />

        {/* Baseline guideline */}
        <div className="pointer-events-none absolute bottom-8 left-8 right-8 border-b border-zinc-200 flex items-center justify-between text-[11px] text-zinc-400 select-none pb-1">
          <span>✕ Sign above this line / 在横线上方签字</span>
          <span>Avid Law E-Sign</span>
        </div>

        {/* Placeholder helper when blank */}
        {!hasSignature && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 text-center">
            <p className="text-xs sm:text-sm text-zinc-400 font-medium">
              {placeholder}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Legally binding electronic signature under BC ETA</span>
          {required && <span className="text-red-500 font-bold">*</span>}
        </div>

        <button
          type="button"
          onClick={handleClear}
          disabled={!hasSignature}
          className="inline-flex items-center gap-1 px-3 py-1 rounded text-zinc-600 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:pointer-events-none font-medium text-xs cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{clearLabel}</span>
        </button>
      </div>
    </div>
  );
}
