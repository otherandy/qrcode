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
  const { toast } = useToast();

  const createQRCode = async () => {
    const canvas = canvasRef.current;
    const text = inputRef.current?.value || "";
    try {
      await QRCode.toCanvas(canvas, text, { errorCorrectionLevel: "H" });
    } catch (err) {
      console.error(err);
      toast({
        description: "Failed to create QR code",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="container h-screen">
      <div className="flex h-screen flex-col gap-4 py-16">
        <div className="flex gap-4">
          <Input ref={inputRef} placeholder="Enter text" />
          <Button onClick={createQRCode}>Create QR Code</Button>
        </div>
        <div className="grow place-self-center">
          <canvas ref={canvasRef}></canvas>
        </div>
        <div className="place-self-end">
          <ThemeToggle />
        </div>
      </div>
      <Toaster />
    </main>
  );
}
