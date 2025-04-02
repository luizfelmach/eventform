"use client";

import { useRouter } from "next/navigation";
import FormLayout from "@/components/form-layout";
import NavigationButtons from "@/components/navigation-buttons";
import SelectionButton from "@/components/selection-button";
import CustomItemInput from "@/components/custom-item-input";
import SelectedItemsList from "@/components/selected-items-list";
import { useFormStore } from "@/lib/store";

const ITENS_PREDEFINIDOS = [
  "Arroz branco",
  "Feijão",
  "Feijão tropeiro",
  "Macarrão ao molho branco",
  "Carne de boi ao molho madeira",
  "Salada de folhas e legumes",
  "Farofa",
  "Vinagrete",
  "Salpicão",
  "Frango frito (Coxa e sobrecoxa)",
];

export default function CoffeeBreak() {
  const router = useRouter();
  const { data, setCoffeeBreak, addCoffeeBreakItem, removeCoffeeBreakItem } =
    useFormStore();

  const handleNext = () => {
    router.push("/form/bebidas");
  };

  const toggleItem = (item: string) => {
    if (data.coffeeBreak.itens.includes(item)) {
      removeCoffeeBreakItem(data.coffeeBreak.itens.indexOf(item));
    } else {
      addCoffeeBreakItem(item);
    }
  };

  return (
    <FormLayout title="Haverá CoffeeBreak?" step={7}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <SelectionButton
            selected={data.coffeeBreak.selecionado}
            onClick={() => setCoffeeBreak(true)}
            className="h-16 text-lg"
          >
            Sim
          </SelectionButton>

          <SelectionButton
            selected={!data.coffeeBreak.selecionado}
            onClick={() => setCoffeeBreak(false)}
            className="h-16 text-lg"
          >
            Não
          </SelectionButton>
        </div>

        {data.coffeeBreak.selecionado && (
          <>
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Selecione os itens:</h3>
              <div className="space-y-3">
                {ITENS_PREDEFINIDOS.map((item) => (
                  <SelectionButton
                    key={item}
                    selected={data.coffeeBreak.itens.includes(item)}
                    onClick={() => toggleItem(item)}
                  >
                    {item}
                  </SelectionButton>
                ))}
              </div>
            </div>

            <SelectedItemsList
              items={data.coffeeBreak.itens.filter(
                (item) => !ITENS_PREDEFINIDOS.includes(item)
              )}
              onRemove={removeCoffeeBreakItem}
            />

            <CustomItemInput
              onAdd={addCoffeeBreakItem}
              placeholder="Digite um item personalizado"
            />
          </>
        )}

        <NavigationButtons
          onBack={() => router.push("/form/churrasco")}
          onNext={handleNext}
        />
      </div>
    </FormLayout>
  );
}
