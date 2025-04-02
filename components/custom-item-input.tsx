"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

export default function CustomItemInput({
  onAdd,
  placeholder = "Digite um item personalizado",
}: {
  onAdd: (item: string) => void
  placeholder?: string
}) {
  const [customItem, setCustomItem] = useState("")

  const handleAdd = () => {
    if (customItem.trim()) {
      onAdd(customItem.trim())
      setCustomItem("")
    }
  }

  return (
    <div className="flex flex-col gap-2 mt-4 mb-6">
      <Input
        value={customItem}
        onChange={(e) => setCustomItem(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent border-gray-700 focus-visible:ring-[#f5a9a9]"
      />
      <Button
        type="button"
        variant="outline"
        className="border-[#f5a9a9] text-[#f5a9a9] hover:bg-[#f5a9a9]/10"
        onClick={handleAdd}
        disabled={!customItem.trim()}
      >
        <Plus className="mr-2 h-4 w-4" />
        Adicionar item personalizado
      </Button>
    </div>
  )
}

