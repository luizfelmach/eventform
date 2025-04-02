"use client";

import { useRouter } from "next/navigation";
import FormLayout from "@/components/form-layout";
import NavigationButtons from "@/components/navigation-buttons";
import SelectionButton from "@/components/selection-button";
import CustomItemInput from "@/components/custom-item-input";
import SelectedItemsList from "@/components/selected-items-list";
import { useFormStore } from "@/lib/store";

const ITENS_PREDEFINIDOS = [
  "Batata frita",
  "Torresmo",
  "Aipim frito",
  "Polenta frita",
  "Linguiça caseira",
  "Tilápia frita",
  "Batata bolinha",
  "Salgados",
  "Anel de cebola",
  "Tábua de frios (queijo, salaminho, azeitona, lombo canadense, copa lombo, presuntos, frutas)",
  "Mandioquita",
];

export default function RodaButeco() {
  const router = useRouter();
  const { data, setRodaButeco, addRodaBudecoItem, removeRodaBudecoItem } =
    useFormStore();

  const handleNext = () => {
    router.push("/form/almoco");
  };

  const toggleItem = (item: string) => {
    if (data.rodaButeco.itens.includes(item)) {
      removeRodaBudecoItem(data.rodaButeco.itens.indexOf(item));
    } else {
      addRodaBudecoItem(item);
    }
  };

  return (
    <FormLayout title="Haverá roda de buteco?" step={3}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <SelectionButton
            selected={data.rodaButeco.selecionado}
            onClick={() => setRodaButeco(true)}
            className="h-16 text-lg"
          >
            Sim
          </SelectionButton>

          <SelectionButton
            selected={!data.rodaButeco.selecionado}
            onClick={() => setRodaButeco(false)}
            className="h-16 text-lg"
          >
            Não
          </SelectionButton>
        </div>

        {data.rodaButeco.selecionado && (
          <>
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Selecione os itens:</h3>
              <div className="space-y-3">
                {ITENS_PREDEFINIDOS.map((item) => (
                  <SelectionButton
                    key={item}
                    selected={data.rodaButeco.itens.includes(item)}
                    onClick={() => toggleItem(item)}
                  >
                    {item}
                  </SelectionButton>
                ))}
              </div>
            </div>

            <SelectedItemsList
              items={data.rodaButeco.itens.filter(
                (item) => !ITENS_PREDEFINIDOS.includes(item)
              )}
              onRemove={removeRodaBudecoItem}
            />

            <CustomItemInput
              onAdd={addRodaBudecoItem}
              placeholder="Digite um item personalizado"
            />
          </>
        )}

        <NavigationButtons
          onBack={() => router.push("/form/entrada")}
          onNext={handleNext}
        />
      </div>
    </FormLayout>
  );
}
