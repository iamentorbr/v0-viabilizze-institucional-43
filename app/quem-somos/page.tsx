import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Award, Users, Target, ArrowRight, Briefcase, GraduationCap, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Quem Somos | Viabilizze Assessoria Industrial",
  description: "Conheça a Viabilizze Assessoria Industrial. Fundada por uma Engenheira de Bebidas com mais de 10 anos de experiência no setor.",
}

const highlights = [
  {
    icon: Award,
    title: "Experiência Comprovada",
    description: "Mais de 10 anos atuando na indústria de bebidas"
  },
  {
    icon: Users,
    title: "Atendimento Personalizado",
    description: "Cada projeto recebe atenção única e dedicada"
  },
  {
    icon: Target,
    title: "Foco em Resultados",
    description: "Compromisso com a excelência e satisfação do cliente"
  },
]

const values = [
  "Comprometimento com a qualidade",
  "Ética e transparência",
  "Inovação constante",
  "Parceria de longo prazo",
  "Atualização técnica contínua",
  "Responsabilidade e pontualidade",
]

const expertise = [
  {
    icon: Briefcase,
    title: "Assessoria Completa",
    description: "Do planejamento à execução, acompanhamos cada etapa do seu projeto"
  },
  {
    icon: GraduationCap,
    title: "Conhecimento Técnico",
    description: "Formação sólida em Engenharia de Bebidas e constante atualização"
  },
  {
    icon: Star,
    title: "Excelência em Qualidade",
    description: "Implementamos sistemas de qualidade reconhecidos pelo mercado"
  },
]

export default function QuemSomosPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Quem Somos
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Expertise que <span className="text-primary">transforma</span> negócios
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Conheça a história e os valores que guiam a Viabilizze Assessoria Industrial em sua missão de transformar a indústria de bebidas.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-6">
                Nossa História
              </h2>
              
              <div className="space-y-6 text-secondary-foreground/80">
                <p className="text-lg leading-relaxed">
                  A <strong className="text-secondary-foreground font-bold">Viabilizze Assessoria Industrial</strong> nasceu da <strong className="text-secondary-foreground font-bold">paixão pela indústria de bebidas</strong> e do desejo de transformar desafios em <strong className="text-secondary-foreground font-bold">oportunidades de crescimento</strong>.
                </p>
                <p className="leading-relaxed">
                  Fundada por uma <strong className="text-secondary-foreground font-bold">Engenheira de Bebidas</strong> com mais de <strong className="text-secondary-foreground font-bold">10 anos de experiência</strong> no setor, nossa assessoria combina <strong className="text-secondary-foreground font-bold">conhecimento técnico aprofundado</strong> com <strong className="text-secondary-foreground font-bold">visão estratégica de negócios</strong>.
                </p>
                <p className="leading-relaxed">
                  Atuamos desde a <strong className="text-secondary-foreground font-bold">concepção de produtos</strong> até a <strong className="text-secondary-foreground font-bold">implementação de sistemas de qualidade</strong>, sempre focados em viabilizar os objetivos dos nossos clientes de forma eficiente e em conformidade com as <strong className="text-secondary-foreground font-bold">regulamentações vigentes</strong>.
                </p>
                <p className="leading-relaxed">
                  Nossa sede está localizada em <strong className="text-secondary-foreground font-bold">Jaboticabal - SP</strong>, região reconhecida por sua forte tradição no <strong className="text-secondary-foreground font-bold">setor agroindustrial</strong>, o que nos permite estar próximos das principais demandas do mercado.
                </p>
              </div>
            </div>

            {/* Visual Side */}
            <div className="space-y-6">
              {/* Logo Card */}
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <div className="flex justify-center mb-6">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icone-transparente-kmBsGL4v9zcX6PmVsbtYap3tOnHeve.png"
                    alt="Viabilizze Logo"
                    width={120}
                    height={120}
                    className="w-24 h-24"
                  />
                </div>
                <div className="text-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/viabilize-logo-transprnt-METaVIlgFhCWg9emMHHqpIrXOMBJYK.png"
                    alt="Viabilizze"
                    width={200}
                    height={50}
                    className="h-8 w-auto mx-auto"
                  />
                  <p className="text-muted-foreground mt-3 text-sm">Assessoria Industrial</p>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid gap-4">
                {highlights.map((item) => (
                  <div 
                    key={item.title}
                    className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Nossos Valores
            </h2>
            <p className="text-muted-foreground">
              Princípios que norteiam todas as nossas ações e relacionamentos
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {values.map((value) => (
              <div 
                key={value} 
                className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border"
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 lg:py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-4">
              Nossa Expertise
            </h2>
            <p className="text-muted-foreground">
              Áreas em que nos destacamos para entregar os melhores resultados
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {expertise.map((item) => (
              <div 
                key={item.title}
                className="bg-card rounded-xl p-6 border border-border text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Vamos trabalhar juntos?
            </h2>
            <p className="text-gray-600 mb-8">
              Entre em contato e descubra como podemos ajudar sua empresa a alcançar novos patamares.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <a 
                  href="https://wa.me/5518997086083?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20mais%20sobre%20a%20Viabilizze%20e%20seus%20servi%C3%A7os."
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Falar no WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
                <Link href="/#servicos">
                  Ver Serviços
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
