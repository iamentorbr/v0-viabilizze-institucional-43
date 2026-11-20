import type { Metadata } from "next"
import { Header } from "@/components/header"
import { ViabilizzeDigitalContent } from "@/components/viabilizze-digital-content"

export const metadata: Metadata = {
  title: "Viabilizze Digital Premium | Soluções especializadas",
  description:
    "Serviços Premium Viabilizze para desenvolver, viabilizar e regularizar produtos, com expertise técnica, orientação especializada e soluções para cada etapa do projeto.",
}

export default function ViabilizzeDigitalPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <ViabilizzeDigitalContent />
      </main>
    </>
  )
}
