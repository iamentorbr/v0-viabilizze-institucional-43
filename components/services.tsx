"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { services } from "@/lib/services-data"

export function Services() {
  const [activeService, setActiveService] = useState(0)

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

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
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
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {service.title}
              </h3>
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
