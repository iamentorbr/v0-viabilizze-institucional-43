import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-20 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">+10 anos de experiência</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground leading-tight mb-6">
              <span className="text-balance">Transformamos sua</span>
              <br />
              <span className="text-primary">indústria</span>
              <span className="text-balance"> em referência</span>
            </h1>

            <p className="text-lg md:text-xl text-secondary-foreground/80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Assessoria especializada para a indústria de bebidas. Da concepção do produto à conformidade regulatória, estamos ao seu lado em cada etapa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/#servicos">
                  Conheça Nossos Serviços
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-secondary-foreground/20">
              <div>
                <p className="text-3xl lg:text-4xl font-bold text-primary">+100</p>
                <p className="text-sm text-secondary-foreground/70 mt-1">Projetos Realizados</p>
              </div>
              <div>
                <p className="text-3xl lg:text-4xl font-bold text-primary">+10</p>
                <p className="text-sm text-secondary-foreground/70 mt-1">Anos de Experiência</p>
              </div>
              <div>
                <p className="text-3xl lg:text-4xl font-bold text-primary">98%</p>
                <p className="text-sm text-secondary-foreground/70 mt-1">Clientes Satisfeitos</p>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/60 rounded-full blur-[80px] scale-110" />
              <div className="absolute inset-0 bg-primary/40 rounded-full blur-[50px] scale-90" />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icone-transparente-kmBsGL4v9zcX6PmVsbtYap3tOnHeve.png"
                alt="Viabilizze - Assessoria Industrial"
                width={400}
                height={400}
                className="relative z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  )
}
