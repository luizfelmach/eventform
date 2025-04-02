"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import FormLayout from "@/components/form-layout"
import NavigationButtons from "@/components/navigation-buttons"
import { Input } from "@/components/ui/input"
import { useFormStore } from "@/lib/store"

export default function QuantidadePessoas() {
  const router = useRouter()
  const { data, setQuantidadePessoas } = useFormStore()
  const [quantidade, setQuantidade] = useState<string>(
    data.quantidadePessoas > 0 ? data.quantidadePessoas.toString() : "",
  )

  const handleNext = () => {
    if (quantidade) {
      setQuantidadePessoas(Number.parseInt(quantidade))
      router.push("/form/entrada")
    }
  }

  return (
    <FormLayout title="Qual a quantidade de pessoas para o evento?" step={1}>
      <div className="space-y-6">
        <Input
          type="number"
          min="1"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder="Digite a quantidade de pessoas"
          className="text-xl p-6 h-auto bg-transparent border-gray-700 focus-visible:ring-[#f5a9a9]"
        />

        <NavigationButtons
          onBack={() => router.push("/")}
          onNext={handleNext}
          nextDisabled={!quantidade || Number.parseInt(quantidade) < 1}
        />
      </div>
    </FormLayout>
  )
}

