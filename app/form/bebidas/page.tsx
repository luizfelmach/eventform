"use client";

import { useRouter } from "next/navigation";
import FormLayout from "@/components/form-layout";
import NavigationButtons from "@/components/navigation-buttons";
import SelectionButton from "@/components/selection-button";
import CustomItemInput from "@/components/custom-item-input";
import SelectedItemsList from "@/components/selected-items-list";
import { useFormStore } from "@/lib/store";

const ITENS_PREDEFINIDOS = [
  "Água",
  "Coca-Cola",
  "Guaraná",
  "Suco 2 sabores",
  "Cerveja",
  "Chopp",
  "Vinho",
  "Drinks alcoólicos",
  "Drinks s/ álcool",
];

export default function Bebidas() {
  const router = useRouter();
  const { data, setBebidas, addBebidasItem, removeBebidasItem } =
    useFormStore();

  const handleNext = () => {
    router.push("/form/espaco");
  };

  const toggleItem = (item: string) => {
    if (data.bebidas.itens.includes(item)) {
      removeBebidasItem(data.bebidas.itens.indexOf(item));
    } else {
      addBebidasItem(item);
    }
  };

  return (
    <FormLayout title="Haverá bebidas?" step={6}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <SelectionButton
            selected={data.bebidas.selecionado}
            onClick={() => setBebidas(true)}
            className="h-16 text-lg"
          >
            Sim
          </SelectionButton>

          <SelectionButton
            selected={!data.bebidas.selecionado}
            onClick={() => setBebidas(false)}
            className="h-16 text-lg"
          >
            Não
          </SelectionButton>
        </div>

        {data.bebidas.selecionado && (
          <>
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">
                Selecione as bebidas:
              </h3>
              <div className="space-y-3">
                {ITENS_PREDEFINIDOS.map((item) => (
                  <SelectionButton
                    key={item}
                    selected={data.bebidas.itens.includes(item)}
                    onClick={() => toggleItem(item)}
                  >
                    {item}
                  </SelectionButton>
                ))}
              </div>
            </div>

            <SelectedItemsList
              items={data.bebidas.itens.filter(
                (item) => !ITENS_PREDEFINIDOS.includes(item)
              )}
              onRemove={removeBebidasItem}
            />

            <CustomItemInput
              onAdd={addBebidasItem}
              placeholder="Digite uma bebida personalizada"
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
