"use client";

import { useRouter } from "next/navigation";
import FormLayout from "@/components/form-layout";
import NavigationButtons from "@/components/navigation-buttons";
import { FormData, useFormStore } from "@/lib/store";
import { Share2 } from "lucide-react";
import { shareViaWhatsApp } from "@/lib/generate-message";
import PreviewMessage from "@/components/preview-message";
import { pdf } from "@react-pdf/renderer";
import { EventQuote } from "@/components/event-quote";
import { saveAs } from "file-saver";

export default function Resumo() {
  const router = useRouter();
  const { data, resetForm } = useFormStore();

  const handleShare = async () => {
    const document = <EventQuote formData={data} />;

    pdf(document)
      .toBlob()
      .then((blob) => {
        saveAs(blob, `orçamento.pdf`);
      })
      .catch((err) => alert(err));
  };

  const renderSection = (title: string, selected: boolean, items: string[]) => {
    if (!selected) return null;

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
    );
  };

  return (
    <FormLayout title="Resumo do Orçamento" step={12}>
      <div className="space-y-6">
        <div className="p-4 bg-gray-900 rounded-lg">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-[#f5a9a9] mb-2">
              Quantidade de Pessoas
            </h3>
            <p>{data.quantidadePessoas}</p>
          </div>

          {renderSection(
            "Entrada",
            data.entrada.selecionado,
            data.entrada.itens
          )}
          {renderSection(
            "Roda de Buteco",
            data.rodaButeco.selecionado,
            data.rodaButeco.itens
          )}
          {renderSection("Almoço", data.almoco.selecionado, data.almoco.itens)}
          {renderSection("Jantar", data.jantar.selecionado, data.jantar.itens)}
          {renderSection(
            "Churrasco",
            data.churrasco.selecionado,
            data.churrasco.itens
          )}
          {renderSection(
            "Coffee Break",
            data.coffeeBreak.selecionado,
            data.coffeeBreak.itens
          )}
          {renderSection(
            "Bebidas",
            data.bebidas.selecionado,
            data.bebidas.itens
          )}
          {renderSection("Espaço", data.espaco.selecionado, data.espaco.itens)}

          <div className="mb-4">
            <h3 className="text-lg font-medium text-[#f5a9a9] mb-2">Preço</h3>
            <p className="text-xl font-bold">{data.preco}</p>
          </div>

          {data.observacoes.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-medium text-[#f5a9a9] mb-2">
                Observações
              </h3>
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
  );
}

export function shareViaWhatsAppPdf(formData: FormData) {
  const blob = pdf(<EventQuote formData={formData} />)
    .toBlob()
    .then((blob) => {
      // 2. Criar um link temporário
      const url = URL.createObjectURL(blob);

      // 3. Criar um elemento <a> invisível para download
      const link = document.createElement("a");
      link.href = url;
      link.download = "meu-pdf.pdf"; // Nome do arquivo
      document.body.appendChild(link);

      // 4. Disparar o download
      link.click();

      // 5. Limpar
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    });
}
