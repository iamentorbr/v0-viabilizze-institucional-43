import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { services, getServiceBySlug } from "@/lib/services-data"

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  
  if (!service) {
    return { title: "Serviço não encontrado" }
  }
  
  return {
    title: `${service.title} | Viabilizze Assessoria Industrial`,
    description: service.description,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const ServiceIcon = service.icon
  
  // Find next and previous services for navigation
  const currentIndex = services.findIndex(s => s.slug === slug)
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icone-transparente-kmBsGL4v9zcX6PmVsbtYap3tOnHeve.png"
                alt="Viabilizze"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/viabilize-logo-transprnt-METaVIlgFhCWg9emMHHqpIrXOMBJYK.png"
                alt="Viabilizze"
                width={140}
                height={32}
                className="h-8 w-auto hidden sm:block"
              />
            </Link>
            <Link href="/#servicos">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar aos Serviços
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
              <ServiceIcon className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6 text-balance">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-secondary-foreground/80 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              O que oferecemos
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {service.features.map((feature) => (
                <div 
                  key={feature}
                  className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border"
                >
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-card-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
              Benefícios para sua <span className="text-primary">Empresa</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-5 rounded-lg bg-background border border-border"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
              Nossa <span className="text-primary">Metodologia</span>
            </h2>
            <div className="space-y-6">
              {service.process.map((step, index) => (
                <div 
                  key={index}
                  className="flex gap-4 md:gap-6 p-6 rounded-lg bg-card border border-border"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-1">
                      {step.step}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-4">
              Pronto para transformar sua indústria?
            </h2>
            <p className="text-secondary-foreground/80 mb-8">
              Entre em contato conosco e descubra como podemos ajudar sua empresa a alcançar novos patamares.
            </p>
            <Button asChild size="lg" className="gap-2">
              <a 
                href={`https://wa.me/5518997086083?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20o%20servi%C3%A7o%20de%20${encodeURIComponent(service.title)}.`}
                target="_blank" 
                rel="noopener noreferrer"
              >
                Solicitar Orçamento
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation between services */}
      <section className="py-8 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center max-w-5xl mx-auto">
            {prevService ? (
              <Link href={`/servicos/${prevService.slug}`} className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{prevService.title}</span>
                <span className="sm:hidden">Anterior</span>
              </Link>
            ) : (
              <div />
            )}
            
            <Link href="/#servicos" className="text-muted-foreground hover:text-primary transition-colors">
              Ver todos os serviços
            </Link>
            
            {nextService ? (
              <Link href={`/servicos/${nextService.slug}`} className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <span className="hidden sm:inline">{nextService.title}</span>
                <span className="sm:hidden">Próximo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-secondary border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icone-transparente-kmBsGL4v9zcX6PmVsbtYap3tOnHeve.png"
                alt="Viabilizze"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-secondary-foreground font-semibold">Viabilizze</span>
            </div>
            <p className="text-sm text-secondary-foreground/70">
              © {new Date().getFullYear()} Viabilizze Assessoria Industrial. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
