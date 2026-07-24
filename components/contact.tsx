"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Contact() {
  return (
    <section id="contato" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Contato
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Vamos <span className="text-primary">conversar?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Entre em contato conosco e descubra como podemos ajudar sua indústria a alcançar novos patamares.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Informações de Contato
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">E-mail</p>
                    <a href="mailto:contato.viabilizze@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      contato.viabilizze@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Telefone / WhatsApp</p>
                    <a href="https://wa.me/5518997086083?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Viabilizze." target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      (18) 99708-6083
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Localização</p>
                    <p className="text-muted-foreground">
                      Jaboticabal - SP / Brasil
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4">
                <p className="font-medium text-foreground mb-4">Redes Sociais</p>
                <div className="flex gap-4">
                  <a 
                    href="https://www.instagram.com/viabilizze.br/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all group"
                  >
                    <svg className="w-6 h-6 text-primary group-hover:text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/viabilizzeBR" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all group"
                  >
                    <svg className="w-6 h-6 text-primary group-hover:text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="flex flex-col justify-between">
              <div className="p-6 bg-secondary rounded-lg border border-border mb-6">
                <h4 className="font-semibold text-secondary-foreground mb-2">
                  Precisa de uma resposta rápida?
                </h4>
                <p className="text-sm text-secondary-foreground mb-4">
                  Nossa equipe está pronta para atender você de segunda a sexta, das 8h às 18h.
                </p>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <a href="https://wa.me/5518997086083?text=Ol%C3%A1!%20Preciso%20de%20uma%20resposta%20r%C3%A1pida%20sobre%20os%20servi%C3%A7os%20da%20Viabilizze." target="_blank" rel="noopener noreferrer">
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>

              <div className="p-6 bg-card rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2">
                  Quer saber mais detalhes?
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Acesse nossa página de contato completa com todas as informações.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contato">
                    Ver Página de Contato
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
