"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Target,
  Wallet,
  Crown,
  Users,
  Swords,
  Factory,
  Store,
  CalendarClock,
  FileText,
  Lock,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  ClipboardList,
} from "lucide-react"

const PRECO = 197.0

type OptionQuestion = {
  id: string
  type: "single"
  title: string
  subtitle?: string
  icon: React.ElementType
  options: { value: string; label: string; hint?: string }[]
}

type TextQuestion = {
  id: string
  type: "text" | "textarea"
  title: string
  subtitle?: string
  icon: React.ElementType
  placeholder: string
}

type Question = OptionQuestion | TextQuestion

const questions: Question[] = [
  {
    id: "produto",
    type: "text",
    icon: ClipboardList,
    title: "Qual produto você quer desenvolver?",
    subtitle: "Descreva o tipo de bebida ou produto que deseja criar.",
    placeholder: "Ex.: Suco natural de laranja, energético, refrigerante de guaraná...",
  },
  {
    id: "investimento",
    type: "single",
    icon: Wallet,
    title: "Qual o valor de investimento disponível?",
    subtitle: "Considere o capital total que você pode aplicar no projeto.",
    options: [
      { value: "ate-50k", label: "Até R$ 50 mil" },
      { value: "50k-150k", label: "R$ 50 mil a R$ 150 mil" },
      { value: "150k-500k", label: "R$ 150 mil a R$ 500 mil" },
      { value: "acima-500k", label: "Acima de R$ 500 mil" },
    ],
  },
  {
    id: "qualidade",
    type: "single",
    icon: Crown,
    title: "Qual o posicionamento de qualidade do produto?",
    subtitle: "Defina em que faixa de mercado seu produto vai competir.",
    options: [
      { value: "premium", label: "Premium", hint: "Alto padrão, maior valor agregado" },
      { value: "padrao", label: "Padrão de mercado", hint: "Equilíbrio entre custo e qualidade" },
      { value: "combate", label: "De combate", hint: "Baixo custo, foco em preço competitivo" },
    ],
  },
  {
    id: "publico",
    type: "textarea",
    icon: Users,
    title: "Quem é o seu público-alvo?",
    subtitle: "Descreva o perfil de consumidor que você quer atingir.",
    placeholder: "Ex.: Jovens de 18 a 30 anos, praticantes de atividade física, classe B/C...",
  },
  {
    id: "concorrentes",
    type: "textarea",
    icon: Swords,
    title: "Quem são os seus principais concorrentes?",
    subtitle: "Liste marcas ou empresas que competem no mesmo segmento.",
    placeholder: "Ex.: Marca X, Marca Y, produtos regionais similares...",
  },
  {
    id: "volume",
    type: "single",
    icon: Factory,
    title: "Qual o volume de produção estimado por mês?",
    subtitle: "Uma estimativa inicial já é suficiente.",
    options: [
      { value: "ate-5k", label: "Até 5.000 unidades/mês" },
      { value: "5k-20k", label: "5.000 a 20.000 unidades/mês" },
      { value: "20k-100k", label: "20.000 a 100.000 unidades/mês" },
      { value: "acima-100k", label: "Acima de 100.000 unidades/mês" },
    ],
  },
  {
    id: "canais",
    type: "single",
    icon: Store,
    title: "Qual o principal canal de venda?",
    subtitle: "Escolha o canal onde pretende concentrar as vendas.",
    options: [
      { value: "varejo", label: "Varejo / Supermercados" },
      { value: "distribuidor", label: "Distribuidores / Atacado" },
      { value: "food-service", label: "Food service (bares, restaurantes)" },
      { value: "online", label: "E-commerce / Venda direta" },
    ],
  },
  {
    id: "prazo",
    type: "single",
    icon: CalendarClock,
    title: "Qual o prazo desejado para o lançamento?",
    subtitle: "Isso ajuda a dimensionar o cronograma do projeto.",
    options: [
      { value: "3-meses", label: "Até 3 meses" },
      { value: "6-meses", label: "3 a 6 meses" },
      { value: "12-meses", label: "6 a 12 meses" },
      { value: "sem-prazo", label: "Ainda não tenho prazo definido" },
    ],
  },
]

type Stage = "intro" | "quiz" | "cadastro" | "relatorio"

export default function OrcamentoViabilidadePage() {
  const [stage, setStage] = useState<Stage>("intro")
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [empresa, setEmpresa] = useState("")

  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")

  const total = questions.length
  const question = questions[current]
  const progress = Math.round(((current + 1) / total) * 100)

  function setAnswer(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
  }

  function next() {
    if (current < total - 1) setCurrent((c) => c + 1)
    else setStage("cadastro")
  }

  function back() {
    if (current > 0) setCurrent((c) => c - 1)
    else setStage("intro")
  }

  const answered = Boolean(answers[question?.id]?.trim())

  function submitCadastro(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim() || !email.trim()) {
      setErro("Preencha nome e e-mail para gerar seu relatório.")
      return
    }
    setErro("")
    setStage("relatorio")
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function comprar() {
    setCarregando(true)
    setErro("")
    try {
      const res = await fetch("https://viabilizzecrm.vercel.app/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          produto: "RELATORIO_VIABILIDADE",
          valor: PRECO,
          email: email.trim(),
          nome: nome.trim(),
          telefone: telefone.trim(),
          empresa: empresa.trim(),
          respostas: answers,
        }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setErro(data.error || "Não foi possível iniciar o pagamento. Tente novamente.")
    } catch {
      setErro("Erro de conexão. Tente novamente em instantes.")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* ---------- INTRO ---------- */}
        {stage === "intro" && (
          <>
            <section className="bg-secondary py-16 lg:py-24">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="mb-6">
                    <Link
                      href="/viabilizze-digital"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary-foreground/60 hover:text-primary transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Voltar para Viabilizze Digital
                    </Link>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 border border-primary/30 px-4 py-1.5 mb-6">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wide text-primary">
                      Produto Viabilizze Digital
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-secondary-foreground text-balance mb-6">
                    Orçamento de Desenvolvimento de Produto
                  </h1>
                  <p className="text-lg text-secondary-foreground/70 leading-relaxed mb-8">
                    Responda algumas perguntas sobre o seu produto e gere um{" "}
                    <strong className="text-secondary-foreground">Relatório de Viabilidade de Projeto</strong>{" "}
                    personalizado, com análise de investimento, posicionamento, público-alvo e concorrência.
                  </p>
                  <Button size="lg" className="gap-2" onClick={() => setStage("quiz")}>
                    Iniciar questionário
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <p className="text-xs text-secondary-foreground/50 mt-4">
                    Leva menos de 3 minutos · Gratuito para começar
                  </p>
                </div>
              </div>
            </section>

            <section className="py-14 lg:py-16">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
                  {[
                    {
                      icon: ClipboardList,
                      title: "1. Responda o questionário",
                      desc: "Perguntas rápidas sobre investimento, qualidade, público e concorrência.",
                    },
                    {
                      icon: FileText,
                      title: "2. Receba seu relatório",
                      desc: "Após o cadastro, geramos um relatório de viabilidade sob medida para o seu projeto.",
                    },
                    {
                      icon: Target,
                      title: "3. Acesse a assessoria",
                      desc: "Desbloqueie o conteúdo completo e fale com nossa equipe para tirar o projeto do papel.",
                    },
                  ].map((s) => (
                    <div key={s.title} className="text-center px-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <s.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ---------- QUIZ ---------- */}
        {stage === "quiz" && (
          <section className="py-12 lg:py-20 bg-muted/40 min-h-[70vh]">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-2xl mx-auto">
                {/* progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-2">
                    <span>
                      Pergunta {current + 1} de {total}
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-sm border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <question.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-foreground text-balance mb-2">
                    {question.title}
                  </h2>
                  {question.subtitle && (
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{question.subtitle}</p>
                  )}

                  {question.type === "single" && (
                    <div className="grid gap-3">
                      {question.options.map((opt) => {
                        const selected = answers[question.id] === opt.value
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setAnswer(opt.value)}
                            className={`text-left rounded-xl border-2 px-4 py-3.5 transition-all ${
                              selected
                                ? "border-primary bg-primary/5"
                                : "border-border bg-background hover:border-primary/40"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="font-semibold text-foreground text-sm">{opt.label}</p>
                                {opt.hint && <p className="text-xs text-muted-foreground mt-0.5">{opt.hint}</p>}
                              </div>
                              {selected && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {question.type === "text" && (
                    <input
                      value={answers[question.id] || ""}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder={question.placeholder}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  )}

                  {question.type === "textarea" && (
                    <textarea
                      value={answers[question.id] || ""}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder={question.placeholder}
                      rows={4}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  )}

                  <div className="flex items-center justify-between gap-4 mt-8">
                    <Button variant="ghost" className="gap-2" onClick={back}>
                      <ArrowLeft className="w-4 h-4" />
                      Voltar
                    </Button>
                    <Button className="gap-2" onClick={next} disabled={!answered}>
                      {current === total - 1 ? "Finalizar" : "Próxima"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ---------- CADASTRO ---------- */}
        {stage === "cadastro" && (
          <section className="py-12 lg:py-20 bg-muted/40 min-h-[70vh]">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Questionário concluído!</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Faça seu cadastro para gerarmos o seu Relatório de Viabilidade personalizado.
                  </p>
                </div>

                <form
                  onSubmit={submitCadastro}
                  className="bg-card rounded-2xl p-6 lg:p-8 shadow-sm border border-border grid gap-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Nome completo *</label>
                    <input
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">E-mail *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="voce@email.com"
                      className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">WhatsApp / Telefone</label>
                    <input
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      placeholder="(00) 00000-0000"
                      className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Empresa (opcional)</label>
                    <input
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      placeholder="Nome da empresa"
                      className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  {erro && (
                    <div className="flex items-center gap-2 rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-2.5">
                      <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                      <p className="text-xs font-semibold text-destructive">{erro}</p>
                    </div>
                  )}

                  <Button type="submit" size="lg" className="gap-2 mt-2">
                    Gerar meu relatório
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <p className="text-[11px] text-center text-muted-foreground">
                    Ao continuar, você concorda em receber contato da equipe Viabilizze.
                  </p>
                </form>

                <button
                  onClick={() => setStage("quiz")}
                  className="mx-auto mt-6 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Revisar respostas
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ---------- RELATÓRIO ---------- */}
        {stage === "relatorio" && (
          <RelatorioViabilidade
            nome={nome}
            answers={answers}
            carregando={carregando}
            erro={erro}
            onComprar={comprar}
          />
        )}
      </main>
      <Footer />
    </>
  )
}

/* ---------------- Relatório ---------------- */

const investimentoLabels: Record<string, string> = {
  "ate-50k": "Até R$ 50 mil",
  "50k-150k": "R$ 50 mil a R$ 150 mil",
  "150k-500k": "R$ 150 mil a R$ 500 mil",
  "acima-500k": "Acima de R$ 500 mil",
}
const qualidadeLabels: Record<string, string> = {
  premium: "Premium",
  padrao: "Padrão de mercado",
  combate: "De combate (baixo custo)",
}

function RelatorioViabilidade({
  nome,
  answers,
  carregando,
  erro,
  onComprar,
}: {
  nome: string
  answers: Record<string, string>
  carregando: boolean
  erro: string
  onComprar: () => void
}) {
  const primeiroNome = nome.trim().split(" ")[0] || "Empreendedor"

  const previewSections = [
    {
      title: "Resumo do Projeto",
      content:
        answers.produto ||
        "Produto informado no questionário, avaliado quanto à sua viabilidade técnica e de mercado.",
    },
    {
      title: "Análise de Investimento",
      content: `Faixa de investimento indicada: ${
        investimentoLabels[answers.investimento] || "não informada"
      }. Este patamar direciona as escolhas de fornecedores, escala de produção e estratégia de entrada no mercado.`,
    },
    {
      title: "Posicionamento e Qualidade",
      content: `Posicionamento escolhido: ${
        qualidadeLabels[answers.qualidade] || "não informado"
      }. Definir a faixa de qualidade é decisivo para precificação, formulação e percepção de marca.`,
    },
  ]

  const lockedSections = [
    "Análise de viabilidade financeira detalhada (custos, margem e ponto de equilíbrio)",
    "Estudo de público-alvo e potencial de mercado",
    "Análise competitiva aprofundada vs. concorrentes informados",
    "Recomendações técnicas de formulação e conformidade regulatória",
    "Cronograma sugerido e próximos passos para o lançamento",
  ]

  return (
    <>
      <section className="bg-secondary py-14 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 border border-primary/30 px-4 py-1.5 mb-5">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wide text-primary">
                Relatório de Viabilidade
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-secondary-foreground text-balance mb-3">
              {primeiroNome}, seu relatório está pronto!
            </h1>
            <p className="text-secondary-foreground/70 leading-relaxed">
              Preparamos uma prévia da análise do seu projeto. Desbloqueie o conteúdo completo para acessar todas
              as recomendações.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Preview */}
            <div className="grid gap-4 mb-8">
              {previewSections.map((s) => (
                <div key={s.title} className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
                </div>
              ))}
            </div>

            {/* Paywall */}
            <div className="relative rounded-2xl border-2 border-primary/30 bg-card overflow-hidden">
              <div className="p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <Lock className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-foreground">Conteúdo completo do relatório</h3>
                </div>
                <ul className="grid gap-3 mb-6">
                  {lockedSections.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="blur-[3px] select-none">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-xl bg-muted/60 p-5 text-center">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Acesso ao relatório completo</p>
                  <p className="text-3xl font-bold text-foreground mb-1">
                    R$ {PRECO.toFixed(2).replace(".", ",")}
                  </p>
                  <p className="text-xs text-muted-foreground mb-5">Pagamento único · Acesso imediato</p>

                  {erro && (
                    <div className="flex items-center justify-center gap-2 rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-2.5 mb-4">
                      <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                      <p className="text-xs font-semibold text-destructive">{erro}</p>
                    </div>
                  )}

                  <Button size="lg" className="w-full gap-2" onClick={onComprar} disabled={carregando}>
                    {carregando ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Redirecionando...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Desbloquear relatório completo
                      </>
                    )}
                  </Button>
                  <p className="text-[11px] text-muted-foreground mt-3">
                    Pagamento 100% seguro processado pelo Stripe
                  </p>
                </div>
              </div>
            </div>

            {/* Assessoria link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Já adquiriu o relatório e quer avançar com o projeto?
              </p>
              <Button asChild variant="outline" className="gap-2">
                <Link href="/viabilizze-digital/orcamento-viabilidade/assessoria">
                  Acesse a assessoria completa
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
