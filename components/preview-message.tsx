"use client"

import type { FormData } from "@/lib/store"
import { generateWhatsAppMessage } from "@/lib/generate-message"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

export default function PreviewMessage({ data }: { data: FormData }) {
  const [copied, setCopied] = useState(false)
  const message = generateWhatsAppMessage(data)

  const handleCopy = () => {
    navigator.clipboard.writeText(message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-[#f5a9a9]">Prévia da Mensagem</h3>
        <Button variant="outline" size="sm" onClick={handleCopy} className="text-xs">
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" />
              Copiar
            </>
          )}
        </Button>
      </div>
      <div className="bg-gray-800 p-3 rounded-md text-sm whitespace-pre-line overflow-auto max-h-60">{message}</div>
    </div>
  )
}

