import Image from "next/image"

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Image src="/logo.png" alt="Darlene Machado" width={300} height={150} priority />
    </div>
  )
}

