import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calculator, ArrowRight, Sparkles, Zap, ShieldCheck, Clock, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Viabilizze Digital | Produtos Digitais para a Indústria de Bebidas",
  description:
    "Ferramentas e produtos digitais da Viabilizze Assessoria Industrial. Calculadoras, planilhas e soluções para otimizar sua produção com conformidade regulatória.",
}

const produtos = [
  {
    slug: "calculadora",
    icon: Calculator,
    badge: "Disponível",
    disponivel: true,
    title: "Calculadora de Percentual de Polpa/Suco",
    description:
      "Calcule o percentual de polpa e a quantidade de suco concentrado da sua formulação com validação automática da legislação MAPA (IN 49/2018) para Refresco, Suco Integral e Néctar.",
    features: ["Cálculo por Brix", "Validação MAPA", "13 frutas cadastradas", "Acesso web multiplataforma"],
    preco: "A partir de R$ 249,00/mês",
  },
  {
    slug: "orcamento-viabilidade",
    icon: FileText,
    badge: "Disponível",
    disponivel: true,
    title: "Orçamento de Desenvolvimento de Produto (Viabilidade de Projeto)",
    description:
      "Responda um questionário sobre o seu produto e gere um Relatório de Viabilidade personalizado, com análise de investimento, posicionamento de qualidade, público-alvo e concorrência.",
    features: ["Questionário guiado", "Relatório personalizado", "Análise de mercado", "Acesso à assessoria"],
    preco: "Relatório completo por R$ 197,00",
  },
]

const beneficios = [
  {
    icon: Zap,
    title: "Resultados imediatos",
    description: "Ferramentas prontas para uso, sem instalação e acessíveis de qualquer dispositivo.",
  },
  {
    icon: ShieldCheck,
    title: "Base regulatória",
    description: "Cálculos fundamentados na legislação vigente, reduzindo riscos de não conformidade.",
  },
  {
    icon: Clock,
    title: "Economia de tempo",
    description: "Automatize cálculos complexos e foque no que realmente importa: seu produto.",
  },
]

export default function ViabilizzeDigitalPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 border border-primary/30 px-4 py-1.5 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wide text-primary">
                  Viabilizze Digital
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-secondary-foreground text-balance mb-6">
                Produtos digitais para a indústria de bebidas
              </h1>
              <p className="text-lg text-secondary-foreground/70 leading-relaxed">
                Transformamos nossa expertise em assessoria industrial em ferramentas digitais práticas.
                Calculadoras e soluções que agilizam seu dia a dia com precisão técnica e conformidade regulatória.
              </p>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-14 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
              {beneficios.map((b) => (
                <div key={b.title} className="text-center px-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Produtos */}
        <section className="py-14 lg:py-20 bg-muted/40">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Nossos produtos</h2>
              <p className="text-muted-foreground">
                Soluções digitais desenvolvidas pela equipe técnica da Viabilizze.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {produtos.map((produto) => (
                <div
                  key={produto.slug}
                  className="flex flex-col bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg hover:border-primary/40 transition-all"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <produto.icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wide text-primary bg-primary/10 rounded-full px-3 py-1">
                      {produto.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 text-balance">{produto.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{produto.description}</p>

                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {produto.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 border-t border-border flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-foreground">{produto.preco}</p>
                    <Button asChild className="gap-2">
                      <Link href={`/viabilizze-digital/${produto.slug}`}>
                        Ver produto
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}

              {/* Em breve */}
              <div className="flex flex-col items-center justify-center bg-card/50 rounded-2xl p-8 border border-dashed border-border text-center">
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Novos produtos em breve</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Estamos desenvolvendo novas ferramentas digitais para a indústria de bebidas. Fique atento.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-4">
                Precisa de uma solução personalizada?
              </h2>
              <p className="text-secondary-foreground/70 mb-8">
                Além dos nossos produtos digitais, oferecemos assessoria completa para a indústria de bebidas.
                Fale com nossa equipe e descubra como podemos ajudar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <a
                    href="https://wa.me/5518997086083?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20digitais%20da%20Viabilizze."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Falar no WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
                >
                  <Link href="/#servicos">Ver Serviços</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
