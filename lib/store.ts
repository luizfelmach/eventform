import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FormData = {
  quantidadePessoas: number;
  entrada: {
    selecionado: boolean;
    itens: string[];
  };
  rodaButeco: {
    selecionado: boolean;
    itens: string[];
  };
  almoco: {
    selecionado: boolean;
    itens: string[];
  };
  jantar: {
    selecionado: boolean;
    itens: string[];
  };
  churrasco: {
    selecionado: boolean;
    itens: string[];
  };
  coffeeBreak: {
    selecionado: boolean;
    itens: string[];
  };
  bebidas: {
    selecionado: boolean;
    itens: string[];
  };
  espaco: {
    selecionado: boolean;
    itens: string[];
  };
  preco: string;
  observacoes: string[];
};

type FormStore = {
  data: FormData;
  setQuantidadePessoas: (quantidade: number) => void;
  setEntrada: (selecionado: boolean, itens?: string[]) => void;
  addEntradaItem: (item: string) => void;
  removeEntradaItem: (index: number) => void;
  setRodaButeJantarco: (selecionado: boolean, itens?: string[]) => void;
  addRodaBudecoItem: (item: string) => void;
  removeRodaBudecoItem: (index: number) => void;
  setAlmoco: (selecionado: boolean, itens?: string[]) => void;
  addAlmocoItem: (item: string) => void;
  removeAlmocoItem: (index: number) => void;
  setJantar: (selecionado: boolean, itens?: string[]) => void;
  addJantarItem: (item: string) => void;
  removeJantarItem: (index: number) => void;

  setChurrasco: (selecionado: boolean, itens?: string[]) => void;
  addChurrascoItem: (item: string) => void;
  removeChurrascoItem: (index: number) => void;

  setCoffeeBreak: (selecionado: boolean, itens?: string[]) => void;
  addCoffeeBreakItem: (item: string) => void;
  removeCoffeeBreakItem: (index: number) => void;

  setBebidas: (selecionado: boolean, itens?: string[]) => void;
  addBebidasItem: (item: string) => void;
  removeBebidasItem: (index: number) => void;
  setEspaco: (selecionado: boolean, itens?: string[]) => void;
  addEspacoItem: (item: string) => void;
  removeEspacoItem: (index: number) => void;
  setPreco: (preco: string) => void;
  setObservacoes: (observacoes: string[]) => void;
  addObservacao: (observacao: string) => void;
  removeObservacao: (index: number) => void;
  resetForm: () => void;
};

const initialData: FormData = {
  quantidadePessoas: 0,
  entrada: {
    selecionado: false,
    itens: [],
  },
  rodaButeco: {
    selecionado: false,
    itens: [],
  },
  almoco: {
    selecionado: false,
    itens: [],
  },
  jantar: {
    selecionado: false,
    itens: [],
  },
  churrasco: {
    selecionado: false,
    itens: [],
  },
  coffeeBreak: {
    selecionado: false,
    itens: [],
  },
  bebidas: {
    selecionado: false,
    itens: [],
  },
  espaco: {
    selecionado: false,
    itens: [],
  },
  preco: "",
  observacoes: [],
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      data: initialData,

      setQuantidadePessoas: (quantidade) =>
        set((state) => ({
          data: { ...state.data, quantidadePessoas: quantidade },
        })),

      setEntrada: (selecionado, itens) =>
        set((state) => ({
          data: {
            ...state.data,
            entrada: {
              selecionado,
              itens: itens || (selecionado ? state.data.entrada.itens : []),
            },
          },
        })),

      addEntradaItem: (item) =>
        set((state) => ({
          data: {
            ...state.data,
            entrada: {
              ...state.data.entrada,
              itens: [...state.data.entrada.itens, item],
            },
          },
        })),

      removeEntradaItem: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            entrada: {
              ...state.data.entrada,
              itens: state.data.entrada.itens.filter((_, i) => i !== index),
            },
          },
        })),

      setRodaButeco: (selecionado, itens) =>
        set((state) => ({
          data: {
            ...state.data,
            rodaButeco: {
              selecionado,
              itens: itens || (selecionado ? state.data.rodaButeco.itens : []),
            },
          },
        })),

      addRodaBudecoItem: (item) =>
        set((state) => ({
          data: {
            ...state.data,
            rodaButeco: {
              ...state.data.rodaButeco,
              itens: [...state.data.rodaButeco.itens, item],
            },
          },
        })),

      removeRodaBudecoItem: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            rodaButeco: {
              ...state.data.rodaButeco,
              itens: state.data.rodaButeco.itens.filter((_, i) => i !== index),
            },
          },
        })),

      setAlmoco: (selecionado, itens) =>
        set((state) => ({
          data: {
            ...state.data,
            almoco: {
              selecionado,
              itens: itens || (selecionado ? state.data.almoco.itens : []),
            },
          },
        })),

      addAlmocoItem: (item) =>
        set((state) => ({
          data: {
            ...state.data,
            almoco: {
              ...state.data.almoco,
              itens: [...state.data.almoco.itens, item],
            },
          },
        })),

      removeAlmocoItem: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            almoco: {
              ...state.data.almoco,
              itens: state.data.almoco.itens.filter((_, i) => i !== index),
            },
          },
        })),

      setJantar: (selecionado, itens) =>
        set((state) => ({
          data: {
            ...state.data,
            jantar: {
              selecionado,
              itens: itens || (selecionado ? state.data.jantar.itens : []),
            },
          },
        })),

      addJantarItem: (item) =>
        set((state) => ({
          data: {
            ...state.data,
            jantar: {
              ...state.data.jantar,
              itens: [...state.data.jantar.itens, item],
            },
          },
        })),

      removeJantarItem: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            jantar: {
              ...state.data.jantar,
              itens: state.data.jantar.itens.filter((_, i) => i !== index),
            },
          },
        })),

      setChurrasco: (selecionado, itens) =>
        set((state) => ({
          data: {
            ...state.data,
            churrasco: {
              selecionado,
              itens: itens || (selecionado ? state.data.churrasco.itens : []),
            },
          },
        })),

      addChurrascoItem: (item) =>
        set((state) => ({
          data: {
            ...state.data,
            churrasco: {
              ...state.data.churrasco,
              itens: [...state.data.churrasco.itens, item],
            },
          },
        })),

      removeChurrascoItem: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            churrasco: {
              ...state.data.churrasco,
              itens: state.data.churrasco.itens.filter((_, i) => i !== index),
            },
          },
        })),

      setCoffeeBreak: (selecionado, itens) =>
        set((state) => ({
          data: {
            ...state.data,
            coffeeBreak: {
              selecionado,
              itens: itens || (selecionado ? state.data.coffeeBreak.itens : []),
            },
          },
        })),

      addCoffeeBreakItem: (item) =>
        set((state) => ({
          data: {
            ...state.data,
            coffeeBreak: {
              ...state.data.coffeeBreak,
              itens: [...state.data.coffeeBreak.itens, item],
            },
          },
        })),

      removeCoffeeBreakItem: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            coffeeBreak: {
              ...state.data.coffeeBreak,
              itens: state.data.coffeeBreak.itens.filter((_, i) => i !== index),
            },
          },
        })),

      setBebidas: (selecionado, itens) =>
        set((state) => ({
          data: {
            ...state.data,
            bebidas: {
              selecionado,
              itens: itens || (selecionado ? state.data.bebidas.itens : []),
            },
          },
        })),

      addBebidasItem: (item) =>
        set((state) => ({
          data: {
            ...state.data,
            bebidas: {
              ...state.data.bebidas,
              itens: [...state.data.bebidas.itens, item],
            },
          },
        })),

      removeBebidasItem: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            bebidas: {
              ...state.data.bebidas,
              itens: state.data.bebidas.itens.filter((_, i) => i !== index),
            },
          },
        })),

      setEspaco: (selecionado, itens) =>
        set((state) => ({
          data: {
            ...state.data,
            espaco: {
              selecionado,
              itens: itens || (selecionado ? state.data.espaco.itens : []),
            },
          },
        })),

      addEspacoItem: (item) =>
        set((state) => ({
          data: {
            ...state.data,
            espaco: {
              ...state.data.espaco,
              itens: [...state.data.espaco.itens, item],
            },
          },
        })),

      removeEspacoItem: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            espaco: {
              ...state.data.espaco,
              itens: state.data.espaco.itens.filter((_, i) => i !== index),
            },
          },
        })),

      setPreco: (preco) =>
        set((state) => ({
          data: { ...state.data, preco },
        })),

      setObservacoes: (observacoes) =>
        set((state) => ({
          data: { ...state.data, observacoes },
        })),

      addObservacao: (observacao) =>
        set((state) => ({
          data: {
            ...state.data,
            observacoes: [...state.data.observacoes, observacao],
          },
        })),

      removeObservacao: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            observacoes: state.data.observacoes.filter((_, i) => i !== index),
          },
        })),

      resetForm: () => set({ data: initialData }),
    }),
    {
      name: "event-form-storage",
    }
  )
);
