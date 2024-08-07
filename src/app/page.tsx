"use client";

import { useRef } from "react";
import QRCode from "qrcode";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const { toast } = useToast();

  const createQRCode = async () => {
    const canvas = canvasRef.current;
    const text = inputRef.current?.value || "";
    try {
      await QRCode.toCanvas(canvas, text, { errorCorrectionLevel: "H" });
    } catch (err) {
      console.error(err);
      toast({
        description: "Failed to create QR code.",
        variant: "destructive",
      });
      return;
    }
    pRef.current!.textContent = text;
  };

  return (
    <main className="container">
      <div className="flex h-screen flex-col gap-7 py-16">
        <form className="flex gap-4" onSubmit={(e) => e.preventDefault()}>
          <Input ref={inputRef} placeholder="Enter text" />
          <Button onClick={createQRCode}>Create QR Code</Button>
        </form>
        <div className="grow place-self-center">
          <div className="flex flex-col place-items-center text-center">
            <canvas ref={canvasRef}></canvas>
            <p ref={pRef} className="leading-7 [&:not(:first-child)]:mt-6" />
          </div>
        </div>
        <div className="place-self-end">
          <ThemeToggle />
        </div>
      </div>
      <Toaster />
    </main>
  );
}
