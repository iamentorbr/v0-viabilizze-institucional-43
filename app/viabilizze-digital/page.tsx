import type { Metadata } from "next"
import { Header } from "@/components/header"
import { ViabilizzeDigitalContent } from "@/components/viabilizze-digital-content"

export const metadata: Metadata = {
  title: "Viabilizze Digital | Da formulação ao registro",
  description:
    "Calcule, avalie e regularize seu produto de bebida com a Calculadora de Polpa/Suco, o Estudo de Viabilidade e a assessoria regulatória para importação da Viabilizze.",
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
