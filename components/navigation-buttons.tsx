"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function NavigationButtons({
  onBack,
  onNext,
  nextDisabled = false,
  nextLabel = "Próximo",
  isLastStep = false,
}: {
  onBack: () => void
  onNext: () => void
  nextDisabled?: boolean
  nextLabel?: string
  isLastStep?: boolean
}) {
  return (
    <div className="flex justify-between mt-8 pt-4 border-t border-gray-800">
      <Button type="button" variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <Button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={`${isLastStep ? "bg-green-600 hover:bg-green-700" : "bg-[#f5a9a9] hover:bg-[#f08080] text-black"}`}
      >
        {nextLabel}
        {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  )
}

