"use client";

import { useRouter } from "next/navigation";
import FormLayout from "@/components/form-layout";
import NavigationButtons from "@/components/navigation-buttons";
import SelectionButton from "@/components/selection-button";
import CustomItemInput from "@/components/custom-item-input";
import SelectedItemsList from "@/components/selected-items-list";
import { useFormStore } from "@/lib/store";

const ITENS_PREDEFINIDOS = ["Mesas", "Cadeiras", "Toalhas de mesa"];

export default function Espaco() {
  const router = useRouter();
  const { data, setEspaco, addEspacoItem, removeEspacoItem } = useFormStore();

  const handleNext = () => {
    router.push("/form/preco");
  };

  const toggleItem = (item: string) => {
    if (data.espaco.itens.includes(item)) {
      removeEspacoItem(data.espaco.itens.indexOf(item));
    } else {
      addEspacoItem(item);
    }
  };

  return (
    <FormLayout title="O espaço será utilizado?" step={7}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <SelectionButton
            selected={data.espaco.selecionado}
            onClick={() => setEspaco(true)}
            className="h-16 text-lg"
          >
            Sim
          </SelectionButton>

          <SelectionButton
            selected={!data.espaco.selecionado}
            onClick={() => setEspaco(false)}
            className="h-16 text-lg"
          >
            Não
          </SelectionButton>
        </div>

        {data.espaco.selecionado && (
          <>
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Selecione os itens:</h3>
              <div className="space-y-3">
                {ITENS_PREDEFINIDOS.map((item) => (
                  <SelectionButton
                    key={item}
                    selected={data.espaco.itens.includes(item)}
                    onClick={() => toggleItem(item)}
                  >
                    {item}
                  </SelectionButton>
                ))}
              </div>
            </div>

            <SelectedItemsList
              items={data.espaco.itens.filter(
                (item) => !ITENS_PREDEFINIDOS.includes(item)
              )}
              onRemove={removeEspacoItem}
            />

            <CustomItemInput
              onAdd={addEspacoItem}
              placeholder="Digite um item personalizado"
            />
          </>
        )}

        <NavigationButtons
          onBack={() => router.push("/form/bebidas")}
          onNext={handleNext}
        />
      </div>
    </FormLayout>
  );
}
