import { Check, ArrowUpRight, Globe2 } from "lucide-react"

const whatsappBase = "https://wa.me/5518997086083?text="

const contactLink = `${whatsappBase}${encodeURIComponent(
  "Hello! I'm an international entrepreneur interested in producing in Brazil with Viabilizze.",
)}`

const reasons = [
  { title: "Favorable exchange rate", text: "Your dollars or euros go much further on production costs." },
  { title: "Local raw materials", text: "Access to fruit and other inputs at the source." },
  { title: "Industrial know-how", text: "Years of industrial advisory for the beverage industry." },
  { title: "One local partner", text: "We handle the Portuguese, the paperwork and the plant floor." },
]

const families = [
  {
    eyebrow: "BEVERAGES",
    title: "Beverages in general",
    description:
      "Formulation, regulatory compliance and filling for non-alcoholic beverages, including juices and nectars, our core expertise.",
    items: ["Recipe and formulation development", "Compliance with Brazilian regulation", "Filling and packaging"],
  },
  {
    eyebrow: "DRY FOODS",
    title: "Dry foods",
    description:
      "Development, regulatory support and packing for dry food products, from powders and mixes to other shelf-stable goods.",
    items: ["Product and recipe development", "Compliance with Brazilian regulation", "Packing and packaging"],
  },
]

const steps = [
  { title: "Feasibility", description: "We assess your project: investment, quality positioning, target market and competition." },
  { title: "Development", description: "We develop and validate the formulation and technical specifications." },
  { title: "Regulatory", description: "We handle product and company compliance with Brazilian rules and labeling." },
  { title: "Filling and packing", description: "Your product is filled or packed and ready to ship." },
]

function ContactLink({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <a
      href={contactLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] focus-visible:ring-offset-2 ${
        light ? "bg-white text-[#C2410C] hover:bg-orange-50" : "bg-[#C2410C] text-white hover:bg-[#9A3412]"
      }`}
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="size-4" />
    </a>
  )
}

export function GlobalContent() {
  return (
    <div lang="en" className="bg-white text-[#1F2430]">
      <section className="bg-[#FFF4EC] px-4 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-[88px]">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C2410C]/30 bg-white/75 px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#C2410C]">
            <Globe2 aria-hidden="true" className="size-4" />
            <span>INTERNATIONAL ENTREPRENEUR</span>
          </div>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[46px]">
            Viabilizze your production in Brazil
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[#4A4F5C] sm:text-lg sm:leading-8">
            From product development to filling and packing. We take your beverage or dry food idea from concept to
            finished goods, made in Brazil at a fraction of the cost you would pay at home.
          </p>
          <div className="mt-2 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#C2410C] px-7 py-3 text-base font-bold text-white transition-colors hover:bg-[#9A3412] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] focus-visible:ring-offset-2"
            >
              Check if your product fits
            </a>
            <a
              href="#process"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-[#C2410C] bg-white px-6 py-3 text-base font-bold text-[#C2410C] transition-colors hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] focus-visible:ring-offset-2"
            >
              See how it works
            </a>
          </div>
          <p className="text-sm font-bold">Beverages · Dry foods · Development to filling</p>
        </div>
      </section>

      <section id="why" className="scroll-mt-24 px-4 pb-10 pt-16 sm:px-8 sm:pt-20 lg:px-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold tracking-[0.12em] text-[#C2410C]">WHY BRAZIL</p>
            <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-[32px]">
              Production that can cost up to 6x less
            </h2>
            <p className="text-[15px] leading-7 text-[#4A4F5C] sm:text-base">
              With the exchange rate working in your favor, manufacturing in Brazil can cost up to six times less than in
              many markets. Brazil also has a large agricultural base, so fruit, grain and other raw materials are close
              to the plant.
            </p>
            <p className="text-[13px] leading-5 text-[#5F6572]">
              Savings vary by product, volume and exchange rate. We confirm real numbers in your feasibility study.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title} className="flex flex-col gap-2 rounded-xl bg-[#FFF4EC] p-6">
                <h3 className="text-base font-bold">{reason.title}</h3>
                <p className="text-sm leading-6 text-[#4A4F5C]">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="scroll-mt-24 px-4 py-14 sm:px-8 sm:py-16 lg:px-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-[28px]">What we help you produce</h2>
            <p className="mt-2 text-sm text-[#4A4F5C] sm:text-base">Two product families, one end-to-end path.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {families.map((family) => (
              <article key={family.title} className="flex flex-col gap-4 rounded-2xl border border-[#E6DFD8] bg-white p-6 sm:p-9">
                <p className="text-xs font-bold tracking-[0.12em] text-[#C2410C]">{family.eyebrow}</p>
                <h3 className="text-2xl font-bold">{family.title}</h3>
                <p className="text-[15px] leading-7 text-[#4A4F5C]">{family.description}</p>
                <ul className="flex flex-col gap-3">
                  {family.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#3F4652]">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#C2410C]" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 bg-[#FAFAF8] px-4 py-16 sm:px-8 sm:py-[72px] lg:px-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-[28px]">From idea to finished product</h2>
            <p className="mt-2 text-sm text-[#4A4F5C] sm:text-base">Four steps, one team.</p>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => (
              <li key={step.title} className="flex flex-col items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-11 items-center justify-center rounded-full bg-[#C2410C] text-base font-bold text-white"
                >
                  {index + 1}
                </span>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="text-sm leading-6 text-[#4A4F5C]">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-[72px] lg:px-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-[28px]">Built for international entrepreneurs</h2>
          <p className="text-[15px] leading-7 text-[#4A4F5C] sm:text-base">
            Whether you are launching your first beverage or dry food brand, or looking for a cost-efficient plant for an
            existing one, we give you a single point of contact in Brazil and keep the process clear from the first
            conversation.
          </p>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-[#C2410C] px-4 py-14 text-white sm:px-8 sm:py-16 lg:px-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <h2 className="text-2xl font-bold leading-tight sm:text-[30px]">Ready to produce in Brazil?</h2>
          <p className="text-base leading-7 text-white/90 sm:text-[17px]">
            Tell us about your product. We will reply with the best path forward and what it takes to get started.
          </p>
          <ContactLink light>Message us on WhatsApp</ContactLink>
          <p className="text-[13px] text-white/90">Based in Brazil · English and Portuguese support</p>
        </div>
      </section>
    </div>
  )
}
