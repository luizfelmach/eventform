"use client";

import { useRouter } from "next/navigation";
import FormLayout from "@/components/form-layout";
import NavigationButtons from "@/components/navigation-buttons";
import SelectionButton from "@/components/selection-button";
import CustomItemInput from "@/components/custom-item-input";
import SelectedItemsList from "@/components/selected-items-list";
import { useFormStore } from "@/lib/store";

const ENTRADAS_PREDEFINIDAS = [
  "Salgados fritos",
  "Torta salgada",
  "Tábua de frios",
  "Mini quiches",
  "Bolinhos de bacalhau",
];

export default function Entrada() {
  const router = useRouter();
  const { data, setEntrada, addEntradaItem, removeEntradaItem } =
    useFormStore();

  const handleNext = () => {
    router.push("/form/roda-buteco");
  };

  const toggleItem = (item: string) => {
    if (data.entrada.itens.includes(item)) {
      removeEntradaItem(data.entrada.itens.indexOf(item));
    } else {
      addEntradaItem(item);
    }
  };

  return (
    <FormLayout title="Haverá entrada?" step={2}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <SelectionButton
            selected={data.entrada.selecionado}
            onClick={() => setEntrada(true)}
            className="h-16 text-lg"
          >
            Sim
          </SelectionButton>

          <SelectionButton
            selected={!data.entrada.selecionado}
            onClick={() => setEntrada(false)}
            className="h-16 text-lg"
          >
            Não
          </SelectionButton>
        </div>

        {data.entrada.selecionado && (
          <>
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">
                Selecione as entradas:
              </h3>
              <div className="space-y-3">
                {ENTRADAS_PREDEFINIDAS.map((item) => (
                  <SelectionButton
                    key={item}
                    selected={data.entrada.itens.includes(item)}
                    onClick={() => toggleItem(item)}
                  >
                    {item}
                  </SelectionButton>
                ))}
              </div>
            </div>

            <SelectedItemsList
              items={data.entrada.itens.filter(
                (item) => !ENTRADAS_PREDEFINIDAS.includes(item)
              )}
              onRemove={removeEntradaItem}
            />

            <CustomItemInput
              onAdd={addEntradaItem}
              placeholder="Digite uma entrada personalizada"
            />
          </>
        )}

        <NavigationButtons
          onBack={() => router.push("/form/pessoas")}
          onNext={handleNext}
        />
      </div>
    </FormLayout>
  );
}
