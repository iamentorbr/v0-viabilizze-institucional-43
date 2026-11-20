"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { services } from "@/lib/services-data"

export function Services() {
  const [activeService, setActiveService] = useState(0)
  const featuredService = services.find((service) => service.slug === "assessoria-industrial")

  return (
    <section id="servicos" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            O que fazemos
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nossos <span className="text-primary">Serviços</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções completas para impulsionar sua indústria de bebidas com excelência e conformidade.
          </p>
        </div>

        {/* Featured Service */}
        {featuredService && (
          <Link
            href={`/servicos/${featuredService.slug}`}
            className="group mb-10 block overflow-hidden rounded-2xl border border-primary/30 bg-primary/[0.06] shadow-lg shadow-primary/10 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/15"
          >
            <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                  <featuredService.icon className="h-7 w-7" />
                </div>
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Serviço em destaque
                    </span>
                    <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                      Assessoria Industrial
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground md:text-3xl">
                    Assessoria Industrial
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {featuredService.description}
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                Conheça a solução
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>
            <div className="h-1 bg-primary" />
          </Link>
        )}

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services
            .filter((service) => service.slug !== featuredService?.slug)
            .map((service, index) => (
            <Link
              key={service.slug}
              href={`/servicos/${service.slug}`}
              className={cn(
                "group relative p-6 rounded-lg border border-border bg-card transition-all duration-300",
                activeService === index 
                  ? "border-primary shadow-lg shadow-primary/10" 
                  : "hover:border-primary/50 hover:shadow-md"
              )}
              onMouseEnter={() => setActiveService(index)}
            >
              {/* Icon */}
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors",
                activeService === index 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
              )}>
                <service.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-xl font-semibold text-card-foreground">
                  {service.title}
                </h3>

              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-1.5 mb-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link indicator */}
              <div className="flex items-center gap-1 text-primary text-sm font-medium transition-all group-hover:gap-2">
                Saiba mais
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Hover accent */}
              <div className={cn(
                "absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-b-lg transition-opacity",
                activeService === index ? "opacity-100" : "opacity-0"
              )} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
