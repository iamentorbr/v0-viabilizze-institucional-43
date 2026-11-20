import type { Metadata } from "next"
import { Header } from "@/components/header"
import { GlobalContent } from "@/components/global-content"

export const metadata: Metadata = {
  title: "Viabilizze Global | Produce your beverages and dry foods in Brazil",
  description:
    "International entrepreneurs: develop, regulate and fill or pack your beverages and dry foods in Brazil, with production that can cost up to 6x less.",
}

export default function GlobalPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <GlobalContent />
      </main>
    </>
  )
}
