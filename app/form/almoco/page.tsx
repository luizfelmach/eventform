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

export default function Almoco() {
  const router = useRouter();
  const { data, setAlmoco, addAlmocoItem, removeAlmocoItem } = useFormStore();

  const handleNext = () => {
    router.push("/form/jantar");
  };

  const toggleItem = (item: string) => {
    if (data.almoco.itens.includes(item)) {
      removeAlmocoItem(data.almoco.itens.indexOf(item));
    } else {
      addAlmocoItem(item);
    }
  };

  return (
    <FormLayout title="Haverá almoço?" step={4}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <SelectionButton
            selected={data.almoco.selecionado}
            onClick={() => setAlmoco(true)}
            className="h-16 text-lg"
          >
            Sim
          </SelectionButton>

          <SelectionButton
            selected={!data.almoco.selecionado}
            onClick={() => setAlmoco(false)}
            className="h-16 text-lg"
          >
            Não
          </SelectionButton>
        </div>

        {data.almoco.selecionado && (
          <>
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Selecione os itens:</h3>
              <div className="space-y-3">
                {ITENS_PREDEFINIDOS.map((item) => (
                  <SelectionButton
                    key={item}
                    selected={data.almoco.itens.includes(item)}
                    onClick={() => toggleItem(item)}
                  >
                    {item}
                  </SelectionButton>
                ))}
              </div>
            </div>

            <SelectedItemsList
              items={data.almoco.itens.filter(
                (item) => !ITENS_PREDEFINIDOS.includes(item)
              )}
              onRemove={removeAlmocoItem}
            />

            <CustomItemInput
              onAdd={addAlmocoItem}
              placeholder="Digite um item personalizado"
            />
          </>
        )}

        <NavigationButtons
          onBack={() => router.push("/form/roda-buteco")}
          onNext={handleNext}
        />
      </div>
    </FormLayout>
  );
}
