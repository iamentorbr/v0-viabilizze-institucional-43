import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, Mail, Phone, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Acesse a Assessoria Completa | Viabilizze Digital",
  description:
    "Você deu o primeiro passo com o Relatório de Viabilidade. Agora fale com a equipe Viabilizze e receba a assessoria completa para tirar o seu produto do papel.",
}

const beneficios = [
  "Acompanhamento técnico especializado do início ao fim",
  "Desenvolvimento e formulação do produto",
  "Homologação de fornecedores",
  "Conformidade regulatória e sistemas de qualidade",
  "Apoio na estratégia de lançamento",
]

const WHATSAPP_URL =
  "https://wa.me/5518997086083?text=Ol%C3%A1!%20Adquiri%20o%20Relat%C3%B3rio%20de%20Viabilidade%20e%20gostaria%20de%20acessar%20a%20assessoria%20completa%20da%20Viabilizze."

export default function AssessoriaCompletaPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <section className="bg-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-6">
                <Link
                  href="/viabilizze-digital/orcamento-viabilidade"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary-foreground/60 hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Voltar para o relatório
                </Link>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 border border-primary/30 px-4 py-1.5 mb-6">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wide text-primary">Próximo passo</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-secondary-foreground text-balance mb-6">
                Acesse a assessoria completa
              </h1>
              <p className="text-lg text-secondary-foreground/70 leading-relaxed mb-8">
                Você já tem em mãos o seu Relatório de Viabilidade. Agora é hora de transformar a análise em
                realidade com o acompanhamento da nossa equipe técnica especializada.
              </p>
              <Button asChild size="lg" className="gap-2">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  Entre em contato
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-sm border border-border mb-8">
                <h2 className="text-xl font-bold text-foreground mb-6">O que inclui a assessoria completa</h2>
                <ul className="grid gap-3.5">
                  {beneficios.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center gap-2 rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <MessageCircle className="w-6 h-6 text-primary" />
                  <span className="text-sm font-semibold text-foreground">WhatsApp</span>
                  <span className="text-xs text-muted-foreground">(18) 99708-6083</span>
                </a>
                <a
                  href="mailto:contato.viabilizze@gmail.com"
                  className="flex flex-col items-center text-center gap-2 rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <Mail className="w-6 h-6 text-primary" />
                  <span className="text-sm font-semibold text-foreground">E-mail</span>
                  <span className="text-xs text-muted-foreground break-all">contato.viabilizze@gmail.com</span>
                </a>
                <a
                  href="tel:+5518997086083"
                  className="flex flex-col items-center text-center gap-2 rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <Phone className="w-6 h-6 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Telefone</span>
                  <span className="text-xs text-muted-foreground">(18) 99708-6083</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
