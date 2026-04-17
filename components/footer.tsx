import Image from "next/image"
import Link from "next/link"

const footerLinks = {
  services: [
    { label: "Terceirização", href: "/servicos/assessoria-terceirizacao" },
    { label: "Assessoria Industrial", href: "/servicos/assessoria-industrial" },
    { label: "Gestão de Produção", href: "/servicos/gestao-producao" },
    { label: "Assessoria Regulatória", href: "/servicos/assessoria-regulatoria" },
    { label: "Rotulagem", href: "/servicos/rotulagem" },
  ],
  company: [
    { label: "Quem Somos", href: "#quem-somos" },
    { label: "Serviços", href: "#servicos" },
    { label: "Contato", href: "#contato" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full blur-sm scale-110"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icone-transparente-kmBsGL4v9zcX6PmVsbtYap3tOnHeve.png"
                  alt="Viabilizze Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 relative"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded blur-sm scale-110"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/viabilize-logo-transprnt-METaVIlgFhCWg9emMHHqpIrXOMBJYK.png"
                  alt="Viabilizze"
                  width={120}
                  height={30}
                  className="h-5 w-auto relative"
                />
              </div>
            </Link>
            <p className="text-sm text-secondary-foreground/70 leading-relaxed">
              Assessoria especializada em indústria de bebidas. Transformamos desafios em oportunidades de crescimento.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Serviços</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Empresa</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Contato</h4>
            <div className="space-y-2.5 text-sm text-secondary-foreground/70">
              <p>
                <a href="mailto:contato.viabilizze@gmail.com" className="hover:text-primary transition-colors">
                  contato.viabilizze@gmail.com
                </a>
              </p>
              <p>
                <a href="https://wa.me/5518997086083?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Viabilizze." target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  (18) 99708-6083
                </a>
              </p>
              <p>Jaboticabal - SP / Brasil</p>
            </div>
            
            {/* Social Media */}
            <div className="flex gap-3 mt-4">
              <a 
                href="https://www.instagram.com/viabilizze.br/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all group"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-secondary-foreground/70 group-hover:text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/viabilizzeBR" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all group"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-secondary-foreground/70 group-hover:text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-secondary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-foreground/70">
            © {new Date().getFullYear()} Viabilizze Assessoria Industrial. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
