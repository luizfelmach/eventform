"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SelectedItemsList({
  items,
  onRemove,
}: {
  items: string[]
  onRemove: (index: number) => void
}) {
  if (items.length === 0) return null

  return (
    <div className="mt-4 mb-6">
      <h3 className="text-sm font-medium text-gray-300 mb-2">Itens selecionados:</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-md bg-gray-800">
            <span className="text-sm">{item}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
              onClick={() => onRemove(index)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remover</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

