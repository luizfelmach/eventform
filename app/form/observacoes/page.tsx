"use client";

import { useRouter } from "next/navigation";
import FormLayout from "@/components/form-layout";
import NavigationButtons from "@/components/navigation-buttons";
import SelectionButton from "@/components/selection-button";
import CustomItemInput from "@/components/custom-item-input";
import SelectedItemsList from "@/components/selected-items-list";
import { useFormStore } from "@/lib/store";

const OBSERVACOES_PREDEFINIDAS = [
  "Evento com crianças",
  "Necessário garçons",
  "Necessário equipe de limpeza",
  "Necessário estacionamento",
  "Necessário segurança",
  "Necessário DJ",
];

export default function Observacoes() {
  const router = useRouter();
  const { data, addObservacao, removeObservacao } = useFormStore();

  const handleNext = () => {
    router.push("/form/resumo");
  };

  const toggleItem = (item: string) => {
    if (data.observacoes.includes(item)) {
      removeObservacao(data.observacoes.indexOf(item));
    } else {
      addObservacao(item);
    }
  };

  return (
    <FormLayout title="Observações adicionais" step={11}>
      <div className="space-y-6">
        <div className="mt-2">
          <h3 className="text-lg font-medium mb-3">
            Selecione as observações:
          </h3>
          <div className="space-y-3">
            {OBSERVACOES_PREDEFINIDAS.map((item) => (
              <SelectionButton
                key={item}
                selected={data.observacoes.includes(item)}
                onClick={() => toggleItem(item)}
              >
                {item}
              </SelectionButton>
            ))}
          </div>
        </div>

        <SelectedItemsList
          items={data.observacoes.filter(
            (item) => !OBSERVACOES_PREDEFINIDAS.includes(item)
          )}
          onRemove={removeObservacao}
        />

        <CustomItemInput
          onAdd={addObservacao}
          placeholder="Digite uma observação personalizada"
        />

        <NavigationButtons
          onBack={() => router.push("/form/preco")}
          onNext={handleNext}
        />
      </div>
    </FormLayout>
  );
}
