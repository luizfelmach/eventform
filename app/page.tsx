"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-black text-white">
      <div className="w-full max-w-md flex flex-col items-center justify-center min-h-screen">
        <Logo className="w-full max-w-xs mb-12" />

        <h1 className="text-2xl font-bold text-center mb-8">Orçamento de Eventos</h1>

        <p className="text-center mb-12 text-gray-300">Preencha o formulário para gerar seu orçamento personalizado</p>

        <Button
          onClick={() => router.push("/form/pessoas")}
          className="w-full py-6 text-lg bg-[#f5a9a9] hover:bg-[#f08080] text-black"
        >
          Começar
        </Button>
      </div>
    </main>
  )
}

