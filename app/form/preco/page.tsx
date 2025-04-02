"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import FormLayout from "@/components/form-layout"
import NavigationButtons from "@/components/navigation-buttons"
import { Input } from "@/components/ui/input"
import { useFormStore } from "@/lib/store"

export default function Preco() {
  const router = useRouter()
  const { data, setPreco } = useFormStore()
  const [precoInput, setPrecoInput] = useState(data.preco || "")

  // Format the price as currency
  const formatCurrency = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "")

    // Convert to number and format
    const numberValue = Number(numericValue) / 100

    return numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    })
  }

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // If it's empty or just "R$", set empty string
    if (value === "" || value === "R$") {
      setPrecoInput("")
      return
    }

    // Remove non-numeric characters and format
    const numericValue = value.replace(/\D/g, "")

    if (numericValue) {
      setPrecoInput(formatCurrency(numericValue))
    } else {
      setPrecoInput("")
    }
  }

  const handleNext = () => {
    setPreco(precoInput)
    router.push("/form/observacoes")
  }

  return (
    <FormLayout title="Qual o preço do orçamento?" step={8}>
      <div className="space-y-6">
        <Input
          type="text"
          value={precoInput}
          onChange={handleChange}
          placeholder="R$ 0,00"
          className="text-xl p-6 h-auto bg-transparent border-gray-700 focus-visible:ring-[#f5a9a9]"
        />

        <NavigationButtons onBack={() => router.push("/form/espaco")} onNext={handleNext} nextDisabled={!precoInput} />
      </div>
    </FormLayout>
  )
}

