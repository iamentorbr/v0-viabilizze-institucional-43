import { Check, ArrowUpRight, Gem } from "lucide-react"

const whatsappBase = "https://wa.me/5518997086083?text="

const conversationLinks = {
  expert: `${whatsappBase}${encodeURIComponent("Olá! Gostaria de saber mais sobre os produtos digitais da Viabilizze.")}`,
  calculator: `${whatsappBase}${encodeURIComponent("Olá! Quero conhecer a Calculadora de Polpa/Suco da Viabilizze.")}`,
  viability: `${whatsappBase}${encodeURIComponent("Olá! Quero fazer a Viabilidade de Projeto do meu produto.")}`,
  regulatory: `${whatsappBase}${encodeURIComponent("Olá! Quero saber como a assessoria regulatória da Viabilizze pode ajudar meu produto ou empresa.")}`,
  marketing: `${whatsappBase}${encodeURIComponent("Olá! Quero saber como a assessoria de Marketing e Gestão Comercial da Viabilizze pode ajudar minha empresa de alimentos.")}`,
}

const moments = [
  {
    eyebrow: "ESTOU FORMULANDO",
    title: "Preciso saber se minha formulação está de acordo",
    service: "Calculadora de Polpa/Suco",
    href: "#calculadora",
  },
  {
    eyebrow: "VOU LANÇAR UM PRODUTO",
    title: "Quero saber se a ideia se sustenta antes de investir",
    service: "Viabilidade de Projeto",
    href: "#viabilidade",
  },
  {
    eyebrow: "PRECISO REGULARIZAR",
    title: "Quero adequar meu produto ou regularizar minha empresa",
    service: "Assessoria Regulatória",
    href: "#regulatorio",
  },
]

const calculatorFeatures = [
  "Cálculo por Brix, sem planilhas manuais",
  "Validação automática da legislação MAPA",
  "13 frutas já cadastradas",
  "Acesso web, de qualquer dispositivo",
]

const viabilityFeatures = [
  "Análise de investimento",
  "Posicionamento de qualidade",
  "Público-alvo e concorrência",
  "Acesso direto à assessoria para os próximos passos",
]

const productRegulatoryFeatures = [
  "Enquadramento e classificação do produto",
  "Registros e notificações aplicáveis",
  "Análise e adequação de rotulagem",
  "Verificação de requisitos de identidade, qualidade e segurança",
]

const businessRegulatoryFeatures = [
  "Enquadramento das atividades e exigências",
  "Registros e licenças necessários para operar",
  "Organização da documentação da empresa",
  "Orientação sobre obrigações regulatórias contínuas",
]

const marketingPillars = [
  {
    label: "FRENTE 1",
    title: "Ativação de Novos Produtos",
    description: "Planejamos a entrada do seu produto no mercado, do posicionamento inicial à estratégia comercial de lançamento.",
    features: [
      "Plano de lançamento e go-to-market",
      "Definição de canais e público-alvo",
      "Estratégia de preço e portfólio",
      "Apoio na ativação junto a clientes e distribuidores",
    ],
  },
  {
    label: "FRENTE 2",
    title: "Reposicionamento de Produtos e Marcas",
    description: "Revisamos a proposta de valor de produtos já no mercado para renovar a percepção, o espaço no ponto de venda e o resultado comercial.",
    features: [
      "Diagnóstico de posicionamento atual",
      "Revisão de proposta de valor e diferenciais",
      "Ajustes de portfólio, apresentação e embalagem",
      "Plano de transição e reposicionamento",
    ],
  },
  {
    label: "FRENTE 3",
    title: "Estudo de Mercado",
    description: "Reunimos informações do setor, do consumidor e da concorrência para sustentar decisões comerciais com mais segurança.",
    features: [
      "Análise de mercado e tendências do segmento",
      "Mapeamento de concorrentes e referências de preço",
      "Perfil e comportamento do consumidor",
      "Identificação de oportunidades e nichos",
    ],
  },
  {
    label: "FRENTE 4",
    title: "Comunicação Estratégica",
    description: "Construímos uma comunicação coerente com o posicionamento do produto, voltada ao seu público e aos objetivos comerciais da empresa.",
    features: [
      "Definição de mensagem e narrativa de marca",
      "Comunicação para o trade e para o consumidor final",
      "Materiais comerciais e apresentações de vendas",
      "Alinhamento entre comunicação e gestão comercial",
    ],
  },
]

const steps = [
  {
    title: "Conte sobre o seu produto",
    description: "Fale com a nossa equipe ou preencha o questionário e diga em que etapa você está.",
  },
  {
    title: "Indicamos o serviço certo",
    description: "Você não precisa adivinhar: dizemos qual solução resolve o seu caso e o que será necessário.",
  },
  {
    title: "Você segue com segurança",
    description: "Com os números, o relatório ou a regularização em mãos, o próximo passo fica claro.",
  },
]

function ContactLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] focus-visible:ring-offset-2 ${
        light
          ? "bg-white text-[#C2410C] hover:bg-orange-50"
          : "bg-[#C2410C] text-white hover:bg-[#9A3412]"
      }`}
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="size-4" />
    </a>
  )
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#3F4652] sm:text-[15px]">
          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#C2410C]" strokeWidth={2.5} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ServiceCard({
  id,
  number,
  label,
  title,
  description,
  action,
  href,
  featuresTitle,
  features,
}: {
  id: string
  number: string
  label: string
  title: string
  description: string
  action: string
  href: string
  featuresTitle: string
  features: string[]
}) {
  return (
    <article id={id} className="scroll-mt-28 rounded-2xl border border-[#E6DFD8] bg-white p-6 sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        <div className="flex flex-col items-start gap-4">
          <p className="text-xs font-bold tracking-[0.12em] text-[#C2410C]">{number} · {label}</p>
          <h3 className="text-2xl font-bold leading-tight tracking-tight text-[#1F2430] sm:text-[28px]">{title}</h3>
          <p className="text-[15px] leading-7 text-[#4A4F5C]">{description}</p>
          <div className="mt-2">
            <ContactLink href={href}>{action}</ContactLink>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-5 rounded-xl bg-[#FFF4EC] p-6 sm:p-7">
          <h4 className="text-sm font-bold text-[#1F2430]">{featuresTitle}</h4>
          <FeatureList items={features} />
        </div>
      </div>
    </article>
  )
}

function RegulatoryService() {
  return (
    <article id="regulatorio" className="scroll-mt-28 flex flex-col gap-7 rounded-2xl border-2 border-[#C2410C] bg-white p-6 sm:p-8 lg:p-10">
      <div className="flex max-w-3xl flex-col gap-4">
        <p className="text-xs font-bold tracking-[0.12em] text-[#C2410C]">03 · ASSESSORIA ESPECIALIZADA</p>
        <h3 className="text-2xl font-bold leading-tight tracking-tight text-[#1F2430] sm:text-[28px]">Assessoria Regulatória para Produtos e Empresas</h3>
        <p className="text-[15px] leading-7 text-[#4A4F5C]">
          Apoiamos empresas na adequação regulatória de produtos e na regularização da operação, com orientações alinhadas às exigências de cada atividade. Da classificação e documentação do produto às licenças e registros da empresa, ajudamos você a entender o que é necessário e avançar com segurança.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-xl bg-[#FFF4EC] p-6 sm:p-7">
          <p className="text-xs font-bold tracking-wide text-[#C2410C]">PARTE 1</p>
          <h4 className="text-xl font-bold text-[#1F2430]">Adequação Regulatória de Produtos</h4>
          <p className="text-sm leading-6 text-[#4A4F5C]">Orientamos a regularização do seu produto conforme as normas aplicáveis ao segmento, ao mercado e à sua finalidade.</p>
          <FeatureList items={productRegulatoryFeatures} />
        </div>
        <div className="flex flex-col gap-4 rounded-xl bg-[#FFF4EC] p-6 sm:p-7">
          <p className="text-xs font-bold tracking-wide text-[#C2410C]">PARTE 2</p>
          <h4 className="text-xl font-bold text-[#1F2430]">Regularização de Empresas</h4>
          <p className="text-sm leading-6 text-[#4A4F5C]">Apoiamos a empresa na obtenção e organização dos registros, licenças e documentos necessários para operar.</p>
          <FeatureList items={businessRegulatoryFeatures} />
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <ContactLink href={conversationLinks.regulatory}>Quero regularizar meu produto ou empresa</ContactLink>
        <p className="text-sm leading-6 text-[#4A4F5C]">Conte sobre o seu produto ou negócio e indicamos por onde começar.</p>
      </div>
    </article>
  )
}

function MarketingService() {
  return (
    <article id="marketing" className="scroll-mt-28 flex flex-col gap-7 rounded-2xl border-2 border-[#C2410C] bg-white p-6 sm:p-8 lg:p-10">
      <div className="flex max-w-3xl flex-col gap-4">
        <p className="text-xs font-bold tracking-[0.12em] text-[#C2410C]">04 · ASSESSORIA ESPECIALIZADA</p>
        <h3 className="text-2xl font-bold leading-tight tracking-tight text-[#1F2430] sm:text-[28px]">Marketing e Gestão Comercial Especializada para a Indústria de Alimentos</h3>
        <p className="text-[15px] leading-7 text-[#4A4F5C]">
          Apoiamos a indústria de alimentos na ativação de novos produtos, no reposicionamento de itens já no mercado, em estudos de mercado e na comunicação estratégica. Unimos conhecimento técnico do setor e visão comercial para ajudar você a posicionar seu produto, chegar ao cliente certo e decidir com mais segurança.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {marketingPillars.map((pillar) => (
          <div key={pillar.title} className="flex flex-col gap-4 rounded-xl bg-[#FFF4EC] p-6 sm:p-7">
            <p className="text-xs font-bold tracking-wide text-[#C2410C]">{pillar.label}</p>
            <h4 className="text-xl font-bold text-[#1F2430]">{pillar.title}</h4>
            <p className="text-sm leading-6 text-[#4A4F5C]">{pillar.description}</p>
            <FeatureList items={pillar.features} />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <ContactLink href={conversationLinks.marketing}>Quero fortalecer meu produto no mercado</ContactLink>
        <p className="text-sm leading-6 text-[#4A4F5C]">Conte sobre o seu produto e o seu momento comercial e indicamos por onde começar.</p>
      </div>
    </article>
  )
}

export function ViabilizzeDigitalContent() {
  return (
    <div className="bg-white text-[#1F2430]">
      <section className="bg-[#FFF4EC] px-4 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-[88px]">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C08A2C]/40 bg-white/75 px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#805B17] shadow-sm">
            <Gem aria-hidden="true" className="size-4" />
            <span>VIABILIZZE DIGITAL · SERVIÇOS PREMIUM</span>
          </div>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-[#1F2430] sm:text-4xl lg:text-[46px]">
            Soluções premium para desenvolver, viabilizar e regularizar seu produto
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[#4A4F5C] sm:text-lg sm:leading-8">
            Expertise técnica, orientação especializada e ferramentas para acompanhar cada etapa do seu projeto — da formulação à regularização, com a qualidade e o cuidado que o seu negócio merece.
          </p>
          <ul aria-label="Diferenciais dos serviços Premium" className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <li className="rounded-full border border-[#D6C199] bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#5F482A] sm:text-sm">Acompanhamento especializado</li>
            <li className="rounded-full border border-[#D6C199] bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#5F482A] sm:text-sm">Soluções para cada etapa</li>
            <li className="rounded-full border border-[#D6C199] bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#5F482A] sm:text-sm">Segurança regulatória</li>
          </ul>
          <div className="mt-2 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <a href="#servicos" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#C2410C] px-7 py-3 text-base font-bold text-white transition-colors hover:bg-[#9A3412] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] focus-visible:ring-offset-2">
              Conheça os serviços
            </a>
            <a href={conversationLinks.expert} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-[#C2410C] bg-white px-6 py-3 text-base font-bold text-[#C2410C] transition-colors hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] focus-visible:ring-offset-2">
              Falar com um especialista
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 pt-16 sm:px-8 sm:pt-[72px] lg:px-14">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-9">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2430] sm:text-[28px]">Em que momento está o seu projeto?</h2>
            <p className="mt-2 text-sm leading-6 text-[#4A4F5C] sm:text-base">Escolha a situação mais próxima da sua e vá direto ao serviço certo.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {moments.map((moment) => (
              <a key={moment.href} href={moment.href} className="group flex min-h-44 flex-col items-start gap-2 rounded-xl border border-[#E6DFD8] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#C2410C]/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] focus-visible:ring-offset-2">
                <span className="text-xs font-bold tracking-wide text-[#C2410C]">{moment.eyebrow}</span>
                <span className="text-lg font-bold leading-snug text-[#1F2430]">{moment.title}</span>
                <span className="mt-auto pt-2 text-sm text-[#4A4F5C] group-hover:text-[#C2410C]">{moment.service} <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="servicos" className="scroll-mt-24 px-4 py-12 sm:px-8 sm:py-14 lg:px-14 lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-8">
          <ServiceCard
            id="calculadora"
            number="01"
            label="FERRAMENTA ONLINE"
            title="Calculadora de Percentual de Polpa/Suco"
            description="Informe a sua formulação e descubra o percentual de polpa e a quantidade de suco concentrado, com validação automática conforme a legislação do MAPA (IN 49/2018) para Refresco, Suco Integral e Néctar."
            action="Quero usar a calculadora"
            href={conversationLinks.calculator}
            featuresTitle="O que você resolve com ela"
            features={calculatorFeatures}
          />
          <ServiceCard
            id="viabilidade"
            number="02"
            label="ESTUDO PERSONALIZADO"
            title="Viabilidade de Projeto (Orçamento de Desenvolvimento de Produto)"
            description="Responda a um questionário guiado sobre o seu produto e receba um Relatório de Viabilidade feito para o seu caso: quanto investir, onde posicionar a qualidade, para quem vender e contra quem você vai competir."
            action="Quero avaliar meu projeto"
            href={conversationLinks.viability}
            featuresTitle="O que o relatório traz"
            features={viabilityFeatures}
          />
          <RegulatoryService />
          <MarketingService />
        </div>
      </section>

      <section className="bg-[#FAFAF8] px-4 py-16 sm:px-8 sm:py-[72px] lg:px-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2430] sm:text-[28px]">Como funciona</h2>
            <p className="mt-2 text-sm text-[#4A4F5C] sm:text-base">Simples do primeiro contato até o resultado.</p>
          </div>
          <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((step, index) => (
              <li key={step.title} className="flex flex-col items-start gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-[#C2410C] text-base font-bold text-white" aria-hidden="true">{index + 1}</span>
                <h3 className="text-lg font-bold text-[#1F2430]">{step.title}</h3>
                <p className="text-sm leading-6 text-[#4A4F5C]">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#C2410C] px-4 py-14 text-white sm:px-8 sm:py-16 lg:px-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <h2 className="text-2xl font-bold leading-tight sm:text-[30px]">Ficou com dúvida sobre qual serviço escolher?</h2>
          <p className="text-base leading-7 text-white/90 sm:text-[17px]">Fale com a nossa equipe técnica. Em poucos minutos entendemos o seu caso e mostramos o melhor caminho.</p>
          <ContactLink href={conversationLinks.expert} light>Falar no WhatsApp</ContactLink>
        </div>
      </section>
    </div>
  )
}
