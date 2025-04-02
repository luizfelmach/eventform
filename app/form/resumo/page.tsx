"use client"

import { useRouter } from "next/navigation"
import FormLayout from "@/components/form-layout"
import NavigationButtons from "@/components/navigation-buttons"
import { useFormStore } from "@/lib/store"
import { Share2 } from "lucide-react"
import { shareViaWhatsApp } from "@/lib/generate-message"
import PreviewMessage from "@/components/preview-message"

export default function Resumo() {
  const router = useRouter()
  const { data, resetForm } = useFormStore()

  const handleShare = () => {
    // Share via WhatsApp
    shareViaWhatsApp(data)
  }

  const renderSection = (title: string, selected: boolean, items: string[]) => {
    if (!selected) return null

    return (
      <div className="mb-4">
        <h3 className="text-lg font-medium text-[#f5a9a9] mb-2">{title}</h3>
        {items.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhum item selecionado</p>
        )}
      </div>
    )
  }

  return (
    <FormLayout title="Resumo do Orçamento" step={9}>
      <div className="space-y-6">
        <div className="p-4 bg-gray-900 rounded-lg">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-[#f5a9a9] mb-2">Quantidade de Pessoas</h3>
            <p>{data.quantidadePessoas}</p>
          </div>

          {renderSection("Entrada", data.entrada.selecionado, data.entrada.itens)}
          {renderSection("Roda de Buteco", data.rodaButeco.selecionado, data.rodaButeco.itens)}
          {renderSection("Almoço", data.almoco.selecionado, data.almoco.itens)}
          {renderSection("Jantar", data.jantar.selecionado, data.jantar.itens)}
          {renderSection("Bebidas", data.bebidas.selecionado, data.bebidas.itens)}
          {renderSection("Espaço", data.espaco.selecionado, data.espaco.itens)}

          <div className="mb-4">
            <h3 className="text-lg font-medium text-[#f5a9a9] mb-2">Preço</h3>
            <p className="text-xl font-bold">{data.preco}</p>
          </div>

          {data.observacoes.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-medium text-[#f5a9a9] mb-2">Observações</h3>
              <ul className="list-disc pl-5 space-y-1">
                {data.observacoes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <PreviewMessage data={data} />

        <NavigationButtons
          onBack={() => router.push("/form/observacoes")}
          onNext={handleShare}
          nextLabel={
            <div className="flex items-center">
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar
            </div>
          }
          isLastStep={true}
        />
      </div>
    </FormLayout>
  )
}

