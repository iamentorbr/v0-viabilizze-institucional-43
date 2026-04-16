import Image from "next/image"
import { CheckCircle2, Award, Users, Target } from "lucide-react"

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

export function About() {
  return (
    <section id="quem-somos" className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Quem Somos
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6">
              Expertise que <span className="text-primary">transforma</span> negócios
            </h2>
            
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                A <strong className="text-secondary-foreground">Viabilizze Assessoria Industrial</strong> nasceu da paixão pela indústria de bebidas e do desejo de transformar desafios em oportunidades de crescimento.
              </p>
              <p className="leading-relaxed">
                Fundada por uma <strong className="text-secondary-foreground">Engenheira de Bebidas</strong> com mais de 10 anos de experiência no setor, nossa assessoria combina conhecimento técnico aprofundado com visão estratégica de negócios.
              </p>
              <p className="leading-relaxed">
                Atuamos desde a concepção de produtos até a implementação de sistemas de qualidade, sempre focados em viabilizar os objetivos dos nossos clientes de forma eficiente e em conformidade com as regulamentações vigentes.
              </p>
            </div>

            {/* Values */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-secondary-foreground mb-4">Nossos Valores</h3>
              <div className="grid grid-cols-2 gap-3">
                {values.map((value) => (
                  <div key={value} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
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
  )
}
