import type { ReactNode } from "react"
import Logo from "./logo"

export default function FormLayout({
  children,
  title,
  step,
  totalSteps = 9,
}: {
  children: ReactNode
  title: string
  step: number
  totalSteps?: number
}) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="p-4 border-b border-[#f5a9a9]/20">
        <Logo className="w-40 mx-auto" />
      </header>

      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#f5a9a9]">
            Passo {step} de {totalSteps}
          </span>
          <div className="h-1 flex-1 mx-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-[#f5a9a9]" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
        </div>

        <h1 className="text-xl font-bold mb-6">{title}</h1>

        <div className="max-w-md mx-auto">{children}</div>
      </div>
    </div>
  )
}

