"use client";

import { useRouter } from "next/navigation";
import FormLayout from "@/components/form-layout";
import NavigationButtons from "@/components/navigation-buttons";
import SelectionButton from "@/components/selection-button";
import CustomItemInput from "@/components/custom-item-input";
import SelectedItemsList from "@/components/selected-items-list";
import { useFormStore } from "@/lib/store";

const ITENS_PREDEFINIDOS = [
  "Carne de boi",
  "Carne de porco",
  "Frango",
  "Linguiça",
  "Pão de alho",
  "Coração de frango",
  "Feijão tropeiro",
  "Arroz branco",
  "Vinagrete",
  "Frutas",
];

export default function Churrasco() {
  const router = useRouter();
  const { data, setChurrasco, addChurrascoItem, removeChurrascoItem } =
    useFormStore();

  const handleNext = () => {
    router.push("/form/coffeeBreak");
  };

  const toggleItem = (item: string) => {
    if (data.churrasco.itens.includes(item)) {
      removeChurrascoItem(data.churrasco.itens.indexOf(item));
    } else {
      addChurrascoItem(item);
    }
  };

  return (
    <FormLayout title="Haverá churrasco?" step={6}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <SelectionButton
            selected={data.churrasco.selecionado}
            onClick={() => setChurrasco(true)}
            className="h-16 text-lg"
          >
            Sim
          </SelectionButton>

          <SelectionButton
            selected={!data.churrasco.selecionado}
            onClick={() => setChurrasco(false)}
            className="h-16 text-lg"
          >
            Não
          </SelectionButton>
        </div>

        {data.churrasco.selecionado && (
          <>
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Selecione os itens:</h3>
              <div className="space-y-3">
                {ITENS_PREDEFINIDOS.map((item) => (
                  <SelectionButton
                    key={item}
                    selected={data.churrasco.itens.includes(item)}
                    onClick={() => toggleItem(item)}
                  >
                    {item}
                  </SelectionButton>
                ))}
              </div>
            </div>

            <SelectedItemsList
              items={data.churrasco.itens.filter(
                (item) => !ITENS_PREDEFINIDOS.includes(item)
              )}
              onRemove={removeChurrascoItem}
            />

            <CustomItemInput
              onAdd={addChurrascoItem}
              placeholder="Digite um item personalizado"
            />
          </>
        )}

        <NavigationButtons
          onBack={() => router.push("/form/jantar")}
          onNext={handleNext}
        />
      </div>
    </FormLayout>
  );
}
