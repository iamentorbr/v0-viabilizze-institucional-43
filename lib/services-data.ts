import { 
  Factory, 
  FileCheck, 
  Tag, 
  Lightbulb, 
  Shield, 
  GraduationCap, 
  ClipboardCheck,
  Handshake,
  Briefcase,
  ChartNoAxesCombined,
  LucideIcon
} from "lucide-react"

export interface Service {
  slug: string
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  fullDescription: string
  benefits: string[]
  process: { step: string; description: string }[]
}

export const services: Service[] = [
  {
    slug: "assessoria-industrial",
    icon: Briefcase,
    title: "Assessoria Industrial",
    description: "Consultoria abrangente para resolver desafios técnicos e operacionais da sua indústria, com soluções personalizadas para cada necessidade.",
    features: ["Diagnóstico operacional", "Planos de ação", "Acompanhamento contínuo"],
    fullDescription: "A Assessoria Industrial da Viabilizze oferece suporte técnico especializado para indústrias de bebidas de todos os portes. Nossa equipe atua como uma extensão do seu time, identificando oportunidades de melhoria, resolvendo problemas técnicos e implementando soluções que aumentam a eficiência e competitividade do seu negócio.",
    benefits: [
      "Acesso a expertise técnica especializada",
      "Soluções customizadas para sua realidade",
      "Aumento da eficiência operacional",
      "Redução de perdas e desperdícios",
      "Metodologia Exclusiva para Mitigação de Problemas",
      "Suporte técnico contínuo"
    ],
    process: [
      { step: "Diagnóstico Inicial", description: "Avaliação completa da situação atual da empresa" },
      { step: "Identificação de Oportunidades", description: "Mapeamento de pontos de melhoria e priorização" },
      { step: "Plano de Ação", description: "Elaboração de estratégias e cronograma de implementação" },
      { step: "Implementação", description: "Execução das melhorias com acompanhamento técnico" },
      { step: "Monitoramento", description: "Avaliação de resultados e ajustes necessários" }
    ]
  },
  {
    slug: "assessoria-terceirizacao",
    icon: Handshake,
    title: "Assessoria para Terceirização",
    description: "Suporte completo na busca e qualificação de parceiros para terceirização de produção, garantindo qualidade e conformidade em toda a cadeia produtiva.",
    features: ["Qualificação de fornecedores", "Auditorias técnicas", "Gestão de contratos"],
    fullDescription: "Nossa assessoria para terceirização oferece suporte estratégico completo para empresas que buscam parceiros confiáveis para produção. Atuamos na Gestão de Produção, Gestão de Estoque e Acompanhamento de Processo, realizando todo o ciclo de prospecção, qualificação e monitoramento de fornecedores, garantindo que sua marca mantenha os padrões de qualidade e conformidade regulatória mesmo em produções terceirizadas.",
    benefits: [
      "Redução de custos operacionais",
      "Acesso a capacidade produtiva sem investimento em infraestrutura",
      "Garantia de qualidade e conformidade",
      "Flexibilidade para demandas sazonais",
      "Mitigação de riscos na cadeia de suprimentos",
      "Mão de Obra Especializada"
    ],
    process: [
      { step: "Análise de Necessidades", description: "Levantamento detalhado das especificações técnicas e volume de produção" },
      { step: "Prospecção de Parceiros", description: "Identificação e pré-qualificação de potenciais fornecedores" },
      { step: "Auditoria Técnica", description: "Avaliação in loco das instalações e processos dos candidatos" },
      { step: "Negociação e Contratos", description: "Suporte na elaboração de contratos e acordos de qualidade" },
      { step: "Acompanhamento Contínuo", description: "Monitoramento da qualidade e desempenho do parceiro" }
    ]
  },
  {
    slug: "viabilidade-de-negocio",
    icon: ChartNoAxesCombined,
    title: "Viabilidade de Negócio",
    description: "Análise estratégica para validar oportunidades, reduzir riscos e orientar decisões de crescimento e investimento.",
    features: ["Análise de mercado", "Cenários financeiros", "Plano de implementação"],
    fullDescription: "A Viabilidade de Negócio da Viabilizze avalia se uma oportunidade pode se transformar em um negócio sustentável e rentável. Estudamos novos empreendimentos, expansão de operações, lançamento de produtos e investimentos, conectando mercado, operação e finanças para apoiar uma decisão segura.",
    benefits: [
      "Decisões baseadas em dados e cenários",
      "Redução de riscos antes do investimento",
      "Clareza sobre mercado e posicionamento",
      "Avaliação de custos, receitas e retorno",
      "Identificação de riscos e oportunidades",
      "Plano claro para os próximos passos"
    ],
    process: [
      { step: "Entendimento da Oportunidade", description: "Levantamento dos objetivos, premissas, escopo e expectativas do negócio" },
      { step: "Análise de Mercado", description: "Avaliação de demanda, concorrência, público e posicionamento da oportunidade" },
      { step: "Estudo Operacional", description: "Definição de estrutura, recursos, processos e capacidade necessários" },
      { step: "Modelagem Econômico-Financeira", description: "Estimativa de investimentos, custos, receitas, cenários e indicadores de retorno" },
      { step: "Recomendação Estratégica", description: "Entrega de relatório conclusivo com riscos, oportunidades e plano de implementação" }
    ]
  },
  {
    slug: "gestao-producao",
    icon: Factory,
    title: "Gestão de Produção",
    description: "Otimização de processos produtivos para maximizar eficiência, reduzir custos e garantir a qualidade dos produtos finais.",
    features: ["Mapeamento de processos", "Indicadores de performance", "Melhoria contínua"],
    fullDescription: "Nossa consultoria em Gestão de Produção transforma a operação da sua indústria através de metodologias comprovadas de otimização. Trabalhamos desde o mapeamento detalhado dos processos até a implementação de indicadores de performance e programas de melhoria contínua, garantindo resultados sustentáveis.",
    benefits: [
      "Aumento da produtividade",
      "Redução de custos de produção",
      "Melhoria da qualidade dos produtos",
      "Diminuição de retrabalhos e perdas",
      "Maior previsibilidade operacional"
    ],
    process: [
      { step: "Mapeamento de Processos", description: "Documentação detalhada de todas as etapas produtivas" },
      { step: "Análise de Gargalos", description: "Identificação de pontos de restrição e ineficiências" },
      { step: "Definição de KPIs", description: "Estabelecimento de indicadores de desempenho relevantes" },
      { step: "Implementação de Melhorias", description: "Execução de ações corretivas e preventivas" },
      { step: "Ciclo de Melhoria Contínua", description: "Estabelecimento de rotinas de análise e aprimoramento" }
    ]
  },
  {
    slug: "assessoria-regulatoria",
    icon: FileCheck,
    title: "Assessoria Regulatória",
    description: "Orientação especializada para adequação às normas e legislações vigentes, garantindo que seus produtos estejam em conformidade.",
    features: ["ANVISA e MAPA", "Licenciamento", "Atualização normativa"],
    fullDescription: "A Assessoria Regulatória da Viabilizze mantém sua empresa atualizada e em conformidade com toda a legislação aplicável ao setor alimentício. Atuamos junto à ANVISA, MAPA e órgãos estaduais e municipais, garantindo que seus produtos, processos e instalações atendam a todos os requisitos legais.",
    benefits: [
      "Conformidade legal garantida",
      "Redução de riscos de penalidades",
      "Agilidade em processos de legalização industrial",
      "Agilidade em processos de legalização de produtos",
      "Atualização constante sobre mudanças regulatórias",
      "Preparação para fiscalizações"
    ],
    process: [
      { step: "Levantamento Regulatório", description: "Identificação de todas as normas aplicáveis ao seu negócio" },
      { step: "Análise de Conformidade", description: "Verificação do atendimento aos requisitos legais" },
      { step: "Plano de Adequação", description: "Definição de ações para correção de não conformidades" },
      { step: "Documentação", description: "Elaboração e organização de documentos exigidos" },
      { step: "Acompanhamento", description: "Suporte em fiscalizações e atualizações normativas" }
    ]
  },
  {
    slug: "rotulagem",
    icon: Tag,
    title: "Rotulagem",
    description: "Desenvolvimento de rótulos em conformidade com a legislação brasileira, incluindo informações nutricionais e alegações.",
    features: ["Tabela nutricional", "Alegações", "Design regulatório"],
    fullDescription: "Nosso serviço de Rotulagem garante que seus produtos cheguem ao mercado com rótulos completos, corretos e em total conformidade com a legislação brasileira. Desenvolvemos desde a tabela nutricional até a adequação de alegações, lista de ingredientes e informações obrigatórias, seguindo as normas da ANVISA.",
    benefits: [
      "Conformidade com RDC 429 e IN 75",
      "Rótulos atrativos e informativos",
      "Redução de riscos de recalls",
      "Alegações nutricionais validadas",
      "Suporte para novos lançamentos"
    ],
    process: [
      { step: "Análise do Produto", description: "Levantamento de ingredientes, processos e características" },
      { step: "Cálculo Nutricional", description: "Elaboração da tabela de informação nutricional" },
      { step: "Adequação de Textos", description: "Revisão de alegações, ingredientes e informações legais" },
      { step: "Layout Regulatório", description: "Orientação sobre disposição e formatação obrigatórias" },
      { step: "Validação Final", description: "Conferência completa antes da impressão" }
    ]
  },
  {
    slug: "desenvolvimento-produtos",
    icon: Lightbulb,
    title: "Desenvolvimento de Produtos",
    description: "Do conceito à prateleira, acompanhamos todo o processo de desenvolvimento de novos produtos alimentícios.",
    features: ["Homologação de Fornecedor", "Formulação", "Testes sensoriais"],
    fullDescription: "O serviço de Desenvolvimento de Produtos da Viabilizze transforma suas ideias em produtos prontos para o mercado. Nossa equipe acompanha todo o ciclo de desenvolvimento, desde a concepção da formulação até o scale-up industrial, garantindo viabilidade técnica, econômica e regulatória.",
    benefits: [
      "Homologação de Fornecedor",
      "Inovação orientada pelo mercado",
      "Formulações otimizadas",
      "Redução do tempo de Lançamento",
      "Viabilidade técnica e econômica",
      "Suporte completo até o lançamento"
    ],
    process: [
      { step: "Briefing", description: "Definição do conceito, público-alvo e requisitos do produto" },
      { step: "Homologação de Fornecedor", description: "Qualificação e aprovação de fornecedores para produção" },
      { step: "Formulação", description: "Desenvolvimento e ajustes da receita em escala laboratorial" },
      { step: "Testes Sensoriais", description: "Avaliação de sabor, textura, aparência e aceitação" },
      { step: "Lançamento", description: "Suporte técnico para produção comercial" }
    ]
  },
  {
    slug: "sistema-qualidade",
    icon: Shield,
    title: "Sistema de Qualidade",
    description: "Implementação de sistemas de gestão da qualidade e segurança de bebidas conforme padrões internacionais.",
    features: ["Boas Práticas de Fabricação", "APPCC", "ISO 22000", "FSSC 22000", "IFS", "E outras"],
    fullDescription: "Implementamos sistemas de gestão da qualidade e segurança de bebidas reconhecidos internacionalmente. Nossa expertise abrange desde as Boas Práticas de Fabricação obrigatório até certificações como ISO 22000, APPCC e FSSC 22000, preparando sua empresa para atender os mais exigentes requisitos de clientes e mercados.",
    benefits: [
      "Segurança de bebidas garantida",
      "Qualidade de Processos",
      "Acesso a novos mercados e clientes",
      "Melhoria da gestão operacional",
      "Reconhecimento internacional",
      "Redução de riscos e recalls"
    ],
    process: [
      { step: "Diagnóstico Inicial", description: "Avaliação do nível de maturidade atual do sistema" },
      { step: "Planejamento", description: "Definição do escopo e cronograma de implementação" },
      { step: "Documentação", description: "Elaboração de manuais, procedimentos e registros" },
      { step: "Implementação", description: "Execução das práticas e treinamento das equipes" },
      { step: "Auditoria e Certificação", description: "Preparação e acompanhamento do processo de certificação" }
    ]
  },
  {
    slug: "treinamentos",
    icon: GraduationCap,
    title: "Treinamentos",
    description: "Capacitação de equipes em boas práticas de fabricação, segurança de bebidas e processos produtivos.",
    features: ["Boas Práticas", "BPF", "APPCC", "Treinamento de ISO", "Treinamento de Sensorial", "Entre outros"],
    fullDescription: "Nossos treinamentos são desenvolvidos para capacitar equipes em todos os níveis. Utilizamos metodologias práticas e interativas, adaptadas à realidade da sua empresa, garantindo a efetiva absorção do conhecimento e mudança de comportamento.",
    benefits: [
      "Equipes mais qualificadas",
      "Redução de erros operacionais",
      "Cultura de qualidade fortalecida",
      "Atendimento a requisitos legais",
      "Maior engajamento dos colaboradores"
    ],
    process: [
      { step: "Diagnóstico de Necessidades", description: "Identificação das lacunas de conhecimento e competências" },
      { step: "Programa Personalizado", description: "Desenvolvimento de conteúdo adaptado à sua realidade" },
      { step: "Execução", description: "Realização dos treinamentos presenciais ou online" },
      { step: "Avaliação", description: "Verificação da eficácia e absorção do conteúdo" },
      { step: "Reciclagem", description: "Planejamento de atualizações e reforços periódicos" }
    ]
  },
  {
    slug: "avaliacao-tecnica",
    icon: ClipboardCheck,
    title: "Avaliação Técnica Industrial",
    description: "Análise completa das instalações e processos para identificar oportunidades de melhoria e adequações necessárias.",
    features: ["Diagnóstico completo", "Relatório técnico", "Plano de adequação"],
    fullDescription: "A Avaliação Técnica Industrial é um diagnóstico completo das suas instalações, processos e práticas. Nossa equipe realiza uma análise criteriosa de todos os aspectos técnicos, identificando não conformidades, riscos e oportunidades de melhoria, entregando um relatório detalhado com plano de ação priorizado.",
    benefits: [
      "Visão clara da situação atual",
      "Identificação de riscos e oportunidades",
      "Priorização de investimentos",
      "Base para planejamento estratégico",
      "Preparação para auditorias e certificações"
    ],
    process: [
      { step: "Planejamento", description: "Definição do escopo e áreas a serem avaliadas" },
      { step: "Visita Técnica", description: "Inspeção detalhada das instalações e processos" },
      { step: "Análise Documental", description: "Verificação de registros, procedimentos e licenças" },
      { step: "Relatório Técnico", description: "Elaboração de documento com achados e evidências" },
      { step: "Plano de Adequação", description: "Definição de ações, responsáveis e prazos" }
    ]
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug)
}
