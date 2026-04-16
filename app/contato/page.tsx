import { Metadata } from "next"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Contato | Viabilizze Assessoria Industrial",
  description: "Entre em contato com a Viabilizze. Estamos prontos para ajudar sua indústria a alcançar novos patamares.",
}

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icone-transparente-kmBsGL4v9zcX6PmVsbtYap3tOnHeve.png"
                alt="Viabilizze"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/viabilize-logo-transprnt-METaVIlgFhCWg9emMHHqpIrXOMBJYK.png"
                alt="Viabilizze"
                width={120}
                height={24}
                className="h-5 w-auto"
              />
            </Link>
            <Button asChild variant="outline">
              <Link href="/">Voltar ao Site</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-4">
              Entre em <span className="text-primary">Contato</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80">
              Estamos prontos para ajudar sua indústria a alcançar novos patamares de qualidade e eficiência.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  Informações de Contato
                </h2>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Telefone / WhatsApp</p>
                      <a 
                        href="https://wa.me/5518997086083?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Viabilizze." 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-muted-foreground hover:text-primary transition-colors text-lg"
                      >
                        (18) 99708-6083
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Segunda a Sexta, 8h às 18h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">E-mail</p>
                      <a 
                        href="mailto:contato.viabilizze@gmail.com" 
                        className="text-muted-foreground hover:text-primary transition-colors text-lg"
                      >
                        contato.viabilizze@gmail.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Respondemos em até 24 horas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Localização</p>
                      <p className="text-muted-foreground text-lg">
                        Jaboticabal - SP / Brasil
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Atendimento em todo território nacional
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Siga-nos nas Redes Sociais
                  </h3>
                  <div className="flex gap-4">
                    <a 
                      href="https://www.instagram.com/viabilizze.br/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3 bg-card rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                      <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span className="font-medium text-foreground">Instagram</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/viabilizzeBR" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3 bg-card rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                      <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="font-medium text-foreground">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col gap-6">
                {/* WhatsApp CTA */}
                <div className="p-8 bg-secondary rounded-xl border border-border">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Fale pelo WhatsApp
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Atendimento rápido e personalizado. Tire suas dúvidas e solicite um orçamento diretamente pelo WhatsApp.
                  </p>
                  <Button asChild size="lg" className="w-full gap-2">
                    <a 
                      href="https://wa.me/5518997086083?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Viabilizze." 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Iniciar Conversa
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </div>

                {/* Quick Links */}
                <div className="p-8 bg-card rounded-xl border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Navegação Rápida
                  </h3>
                  <div className="space-y-3">
                    <Link 
                      href="/#servicos" 
                      className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-primary/5 transition-colors group"
                    >
                      <span className="text-foreground">Ver Nossos Serviços</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                    <Link 
                      href="/#quem-somos" 
                      className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-primary/5 transition-colors group"
                    >
                      <span className="text-foreground">Conhecer a Viabilizze</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                    <Link 
                      href="/" 
                      className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-primary/5 transition-colors group"
                    >
                      <span className="text-foreground">Voltar à Página Inicial</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-secondary border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icone-transparente-kmBsGL4v9zcX6PmVsbtYap3tOnHeve.png"
                alt="Viabilizze"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/viabilize-logo-transprnt-METaVIlgFhCWg9emMHHqpIrXOMBJYK.png"
                alt="Viabilizze"
                width={100}
                height={20}
                className="h-4 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {new Date().getFullYear()} Viabilizze Assessoria Industrial. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
