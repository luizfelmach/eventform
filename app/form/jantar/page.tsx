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
  "Batata c/ requeijão e bacon",
  "Batata sauté",
  "Filé de frango grelhado",
  "Carne de porco assada",
  "Frango frito (Coxa e sobrecoxa)",
];

export default function Jantar() {
  const router = useRouter();
  const { data, setJantar, addJantarItem, removeJantarItem } = useFormStore();

  const handleNext = () => {
    router.push("/form/churrasco");
  };

  const toggleItem = (item: string) => {
    if (data.jantar.itens.includes(item)) {
      removeJantarItem(data.jantar.itens.indexOf(item));
    } else {
      addJantarItem(item);
    }
  };

  return (
    <FormLayout title="Haverá jantar?" step={5}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <SelectionButton
            selected={data.jantar.selecionado}
            onClick={() => setJantar(true)}
            className="h-16 text-lg"
          >
            Sim
          </SelectionButton>

          <SelectionButton
            selected={!data.jantar.selecionado}
            onClick={() => setJantar(false)}
            className="h-16 text-lg"
          >
            Não
          </SelectionButton>
        </div>

        {data.jantar.selecionado && (
          <>
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Selecione os itens:</h3>
              <div className="space-y-3">
                {ITENS_PREDEFINIDOS.map((item) => (
                  <SelectionButton
                    key={item}
                    selected={data.jantar.itens.includes(item)}
                    onClick={() => toggleItem(item)}
                  >
                    {item}
                  </SelectionButton>
                ))}
              </div>
            </div>

            <SelectedItemsList
              items={data.jantar.itens.filter(
                (item) => !ITENS_PREDEFINIDOS.includes(item)
              )}
              onRemove={removeJantarItem}
            />

            <CustomItemInput
              onAdd={addJantarItem}
              placeholder="Digite um item personalizado"
            />
          </>
        )}

        <NavigationButtons
          onBack={() => router.push("/form/almoco")}
          onNext={handleNext}
        />
      </div>
    </FormLayout>
  );
}
