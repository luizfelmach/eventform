"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function SelectionButton({
  selected,
  onClick,
  children,
  className = "",
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className={`relative w-full justify-start text-left p-4 mb-3 border-2 hover:bg-transparent hover:text-white ${
        selected
          ? "border-[#f5a9a9] bg-[#f5a9a9]/10"
          : "border-gray-700 hover:border-[#f5a9a9]/50"
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex-1">{children}</div>
      {selected && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Check className="h-5 w-5 text-[#f5a9a9]" />
        </div>
      )}
    </Button>
  );
}
