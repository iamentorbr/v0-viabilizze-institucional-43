'use client'
import { useEffect, useState, useMemo, useCallback } from 'react'
import {
  ChevronRight, ChevronLeft, CheckCircle,
  TrendingUp, Package, DollarSign, Users, Truck,
  BarChart2, FileText, MessageCircle, Lock, Loader2, Star, Download,
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════════════
const WHATSAPP = 'https://wa.me/5518997086083?text=Ol%C3%A1%20Ana%20Paula!%20Acabei%20de%20ver%20meu%20relat%C3%B3rio%20de%20viabilidade%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20assessoria%20VIABILIZZE.'
const API = 'https://viabilizzecrm.vercel.app/api'
const STORE_KEY = 'vd_orcamento_estado'

// ═══════════════════════════════════════════════════════════════════════════
// ENQUETE — 6 ÁREAS × ~4 PERGUNTAS
// ═══════════════════════════════════════════════════════════════════════════
type Opcao = { texto: string; pontos: number }
type Pergunta = {
  id: string
  area: string
  texto: string
  tipo: 'radio' | 'numero' | 'texto'
  opcoes?: Opcao[]
  dica?: string
}

const AREAS = [
  { id: 'produto',      label: 'Produto / Serviço',       icon: Package,    cor: '#F97316', bg: '#fff3e0' },
  { id: 'mercado',      label: 'Mercado & Concorrência',  icon: Users,      cor: '#1565c0', bg: '#e3f2fd' },
  { id: 'custos',       label: 'Custos & Investimento',   icon: DollarSign, cor: '#2e7d32', bg: '#e8f5e9' },
  { id: 'precificacao', label: 'Precificação & Margem',   icon: TrendingUp, cor: '#8e24aa', bg: '#f3e5f5' },
  { id: 'distribuicao', label: 'Distribuição & Canais',   icon: Truck,      cor: '#00838f', bg: '#e0f7fa' },
  { id: 'gestao',       label: 'Gestão & Planejamento',   icon: BarChart2,  cor: '#c62828', bg: '#fce4ec' },
]

const PERGUNTAS: Pergunta[] = [
  // PRODUTO
  { id: 'p1', area: 'produto', texto: 'Seu produto/serviço está completamente desenvolvido e testado?', tipo: 'radio', opcoes: [
    { texto: 'Sim, está pronto e validado com clientes reais', pontos: 10 },
    { texto: 'Parcialmente — ainda em desenvolvimento', pontos: 5 },
    { texto: 'Tenho apenas a ideia, ainda não desenvolvi', pontos: 1 },
  ]},
  { id: 'p2', area: 'produto', texto: 'Você sabe quais registros e certificações seu produto exige (ANVISA, MAPA, SIF...)?', tipo: 'radio', opcoes: [
    { texto: 'Sim, já tenho todos os registros necessários', pontos: 10 },
    { texto: 'Sei o que precisa, mas ainda não regularizei', pontos: 5 },
    { texto: 'Não sei quais registros são obrigatórios', pontos: 0 },
  ]},
  { id: 'p3', area: 'produto', texto: 'Seu produto tem um diferencial claro em relação ao que já existe no mercado?', tipo: 'radio', opcoes: [
    { texto: 'Sim, diferencial forte e bem definido', pontos: 10 },
    { texto: 'Tenho alguma diferença, mas não está claro', pontos: 4 },
    { texto: 'Não — é parecido com o que já existe', pontos: 1 },
  ]},
  { id: 'p4', area: 'produto', texto: 'Você já tem fornecedores de matéria-prima identificados e cotados?', tipo: 'radio', opcoes: [
    { texto: 'Sim, com cotações e contratos fechados', pontos: 10 },
    { texto: 'Identifiquei alguns mas não cotei ainda', pontos: 5 },
    { texto: 'Ainda não pesquisei fornecedores', pontos: 0 },
  ]},

  // MERCADO
  { id: 'm1', area: 'mercado', texto: 'Você sabe quem é exatamente seu cliente ideal (perfil, renda, hábitos de compra)?', tipo: 'radio', opcoes: [
    { texto: 'Sim, tenho o perfil detalhado e validado', pontos: 10 },
    { texto: 'Tenho uma ideia geral, mas não é preciso', pontos: 4 },
    { texto: 'Não defini ainda — quero atingir todo mundo', pontos: 0 },
  ]},
  { id: 'm2', area: 'mercado', texto: 'Você conhece seus principais concorrentes e como eles se posicionam?', tipo: 'radio', opcoes: [
    { texto: 'Sim, fiz análise detalhada da concorrência', pontos: 10 },
    { texto: 'Conheço alguns, mas não fiz análise formal', pontos: 5 },
    { texto: 'Não sei quem são meus concorrentes diretos', pontos: 0 },
  ]},
  { id: 'm3', area: 'mercado', texto: 'Você estimou o tamanho do mercado que quer atender?', tipo: 'radio', opcoes: [
    { texto: 'Sim, com dados de pesquisa de mercado', pontos: 10 },
    { texto: 'Tenho uma estimativa aproximada', pontos: 4 },
    { texto: 'Não fiz nenhuma estimativa de mercado', pontos: 0 },
  ]},
  { id: 'm4', area: 'mercado', texto: 'Você já testou seu produto com potenciais clientes e coletou feedback?', tipo: 'radio', opcoes: [
    { texto: 'Sim, vendi ou testei com clientes reais', pontos: 10 },
    { texto: 'Mostrei para amigos/família, recebi elogios', pontos: 3 },
    { texto: 'Ainda não testei com ninguém fora', pontos: 0 },
  ]},

  // CUSTOS
  { id: 'c1', area: 'custos', texto: 'Você sabe qual é o custo total para produzir uma unidade do seu produto?', tipo: 'radio', opcoes: [
    { texto: 'Sim, tenho planilha com todos os custos detalhados', pontos: 10 },
    { texto: 'Tenho uma estimativa grosseira', pontos: 4 },
    { texto: 'Não calculei os custos de produção ainda', pontos: 0 },
  ]},
  { id: 'c2', area: 'custos', texto: 'Você tem capital disponível ou financiamento garantido para iniciar?', tipo: 'radio', opcoes: [
    { texto: 'Sim, tenho capital próprio suficiente', pontos: 10 },
    { texto: 'Tenho parte — precisarei de crédito complementar', pontos: 5 },
    { texto: 'Não tenho capital — preciso de 100% de financiamento', pontos: 1 },
  ]},
  { id: 'c3', area: 'custos', texto: 'Você mapeou todos os custos fixos mensais do negócio (aluguel, energia, mão de obra...)?', tipo: 'radio', opcoes: [
    { texto: 'Sim, tenho todos os custos fixos levantados', pontos: 10 },
    { texto: 'Parcialmente — sei alguns mas não todos', pontos: 4 },
    { texto: 'Não levantei os custos fixos ainda', pontos: 0 },
  ]},
  { id: 'c4', area: 'custos', texto: 'Você já calculou seu ponto de equilíbrio (quantas unidades precisa vender para cobrir custos)?', tipo: 'radio', opcoes: [
    { texto: 'Sim, sei exatamente meu break-even', pontos: 10 },
    { texto: 'Tenho uma noção, mas não calculei formalmente', pontos: 4 },
    { texto: 'Não sei o que é ponto de equilíbrio', pontos: 0 },
  ]},

  // PRECIFICAÇÃO
  { id: 'pr1', area: 'precificacao', texto: 'Como você definiu o preço de venda do seu produto?', tipo: 'radio', opcoes: [
    { texto: 'Com base em custo + margem + análise de concorrência', pontos: 10 },
    { texto: 'Olhei o preço do concorrente e fiz similar', pontos: 4 },
    { texto: 'Ainda não defini o preço', pontos: 0 },
  ]},
  { id: 'pr2', area: 'precificacao', texto: 'Qual a margem de lucro estimada por unidade vendida?', tipo: 'radio', opcoes: [
    { texto: 'Acima de 30% — margem saudável e calculada', pontos: 10 },
    { texto: 'Entre 10% e 30% — margem apertada mas positiva', pontos: 6 },
    { texto: 'Abaixo de 10% ou não sei ainda', pontos: 1 },
  ]},
  { id: 'pr3', area: 'precificacao', texto: 'Você incluiu todos os impostos no seu preço de venda (Simples, ICMS, PIS/COFINS...)?', tipo: 'radio', opcoes: [
    { texto: 'Sim, com assessoria contábil especializada', pontos: 10 },
    { texto: 'Incluí algo, mas não sei se está completo', pontos: 4 },
    { texto: 'Não incluí impostos no preço ainda', pontos: 0 },
  ]},
  { id: 'pr4', area: 'precificacao', texto: 'Você tem estratégia para diferentes canais (preço atacado x varejo x direto)?', tipo: 'radio', opcoes: [
    { texto: 'Sim, tabela de preços por canal definida', pontos: 10 },
    { texto: 'Pensei nisso mas não formalizei', pontos: 4 },
    { texto: 'Pretendo vender por um único preço para todos', pontos: 2 },
  ]},

  // DISTRIBUIÇÃO
  { id: 'd1', area: 'distribuicao', texto: 'Por quais canais você vai vender seu produto?', tipo: 'radio', opcoes: [
    { texto: 'Múltiplos canais definidos: varejo, atacado, e-commerce, direto', pontos: 10 },
    { texto: 'Um ou dois canais, mas sem estratégia clara', pontos: 5 },
    { texto: 'Ainda não decidi como vou vender', pontos: 0 },
  ]},
  { id: 'd2', area: 'distribuicao', texto: 'Você já tem contato ou negociação com distribuidores, representantes ou varejistas?', tipo: 'radio', opcoes: [
    { texto: 'Sim, contratos ou cartas de intenção firmados', pontos: 10 },
    { texto: 'Tenho conversas iniciais, nada formalizado', pontos: 5 },
    { texto: 'Ainda não contatei nenhum canal de venda', pontos: 0 },
  ]},
  { id: 'd3', area: 'distribuicao', texto: 'Sua logística de entrega está definida (frota própria, transportadora, marketplace...)?', tipo: 'radio', opcoes: [
    { texto: 'Sim, logística totalmente definida e cotada', pontos: 10 },
    { texto: 'Tenho uma ideia, mas não está detalhado', pontos: 4 },
    { texto: 'Não pensei na logística ainda', pontos: 0 },
  ]},
  { id: 'd4', area: 'distribuicao', texto: 'Você tem estratégia de marketing digital para gerar demanda?', tipo: 'radio', opcoes: [
    { texto: 'Sim, com plano de marketing e verba definida', pontos: 10 },
    { texto: 'Tenho ideia de fazer redes sociais, mas sem plano', pontos: 3 },
    { texto: 'Não tenho estratégia de marketing', pontos: 0 },
  ]},

  // GESTÃO
  { id: 'g1', area: 'gestao', texto: 'Você tem um plano de negócio ou Business Plan estruturado?', tipo: 'radio', opcoes: [
    { texto: 'Sim, plano completo com projeções financeiras', pontos: 10 },
    { texto: 'Tenho algo básico, não muito detalhado', pontos: 5 },
    { texto: 'Não tenho plano de negócio formal', pontos: 0 },
  ]},
  { id: 'g2', area: 'gestao', texto: 'Você tem sócios ou equipe para tocar o negócio?', tipo: 'radio', opcoes: [
    { texto: 'Sim, equipe/sócios com funções definidas e complementares', pontos: 10 },
    { texto: 'Vou começar sozinho, com ajuda eventual', pontos: 5 },
    { texto: 'Completamente solo — sem equipe ou sócios', pontos: 3 },
  ]},
  { id: 'g3', area: 'gestao', texto: 'Você tem assessoria especializada no setor (nutricional, regulatória, contábil)?', tipo: 'radio', opcoes: [
    { texto: 'Sim, equipe especializada contratada', pontos: 10 },
    { texto: 'Tenho alguns consultores pontuais', pontos: 5 },
    { texto: 'Ainda não busquei nenhuma assessoria', pontos: 0 },
  ]},
  { id: 'g4', area: 'gestao', texto: 'Você tem projeção de faturamento para os primeiros 12 meses?', tipo: 'radio', opcoes: [
    { texto: 'Sim, com cenários pessimista, realista e otimista', pontos: 10 },
    { texto: 'Tenho uma estimativa geral sem cenários', pontos: 4 },
    { texto: 'Não fiz nenhuma projeção financeira', pontos: 0 },
  ]},
]

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS DE SCORE
// ═══════════════════════════════════════════════════════════════════════════
function calcularScore(respostas: Record<string, number>) {
  const scores: Record<string, { obtido: number; maximo: number; pct: number }> = {}
  let totalObtido = 0
  let totalMaximo = 0

  AREAS.forEach(area => {
    const pergsArea = PERGUNTAS.filter(p => p.area === area.id)
    const maximo  = pergsArea.reduce((s, p) => s + Math.max(...(p.opcoes?.map(o => o.pontos) ?? [0])), 0)
    const obtido  = pergsArea.reduce((s, p) => s + (respostas[p.id] ?? 0), 0)
    const pct     = maximo > 0 ? Math.round((obtido / maximo) * 100) : 0
    scores[area.id] = { obtido, maximo, pct }
    totalObtido += obtido
    totalMaximo += maximo
  })

  const scoreFinal = totalMaximo > 0 ? Math.round((totalObtido / totalMaximo) * 100) : 0
  return { scores, scoreFinal }
}

function nivelViabilidade(score: number): { label: string; cor: string; bg: string; emoji: string; descricao: string } {
  if (score >= 80) return { label: 'Alta Viabilidade',   cor: '#2e7d32', bg: '#e8f5e9', emoji: '🚀', descricao: 'Seu negócio tem base sólida. Com assessoria especializada, as chances de sucesso são altas.' }
  if (score >= 60) return { label: 'Viabilidade Média',  cor: '#F97316', bg: '#fff3e0', emoji: '⚡', descricao: 'Bom começo, mas há lacunas importantes que precisam ser trabalhadas antes do lançamento.' }
  if (score >= 40) return { label: 'Viabilidade Baixa',  cor: '#c62828', bg: '#fce4ec', emoji: '⚠️', descricao: 'Existem riscos significativos. Uma consultoria especializada é fundamental para evitar perdas.' }
  return               { label: 'Alto Risco',            cor: '#b71c1c', bg: '#ffebee', emoji: '🆘', descricao: 'Muitas áreas críticas precisam ser estruturadas. Não avance sem suporte especializado.' }
}

function recomendacaoPorArea(pct: number, areaLabel: string): string {
  if (pct >= 80) return `${areaLabel}: ponto forte do seu negócio — continue aprofundando.`
  if (pct >= 60) return `${areaLabel}: boa base, mas ainda há gaps a preencher antes do lançamento.`
  if (pct >= 40) return `${areaLabel}: área de atenção — recomendamos estruturação urgente com especialista.`
  return              `${areaLabel}: área crítica — risco alto. Priorize esta área antes de qualquer investimento.`
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════
export default function OrcamentoViabilidadeApp() {
  const [tela, setTela]           = useState<'intro' | 'lead' | 'enquete' | 'relatorio'>('intro')
  const [areaIdx, setAreaIdx]     = useState(0)
  const [respostas, setRespostas] = useState<Record<string, number>>({})
  const [lead, setLead]           = useState({ nome: '', email: '', empresa: '', setor: '' })
  const [pagando, setPagando]     = useState(false)
  const [pago, setPago]           = useState(false)
  const [demo, setDemo]           = useState(false)

  const areaAtual     = AREAS[areaIdx]
  const pergsArea     = PERGUNTAS.filter(p => p.area === areaAtual?.id)
  const totalAreas    = AREAS.length
  const progresso     = Math.round(((areaIdx) / totalAreas) * 100)

  const { scores, scoreFinal } = useMemo(() => calcularScore(respostas), [respostas])
  const nivel = useMemo(() => nivelViabilidade(scoreFinal), [scoreFinal])

  const todasRespondidas = pergsArea.every(p => respostas[p.id] !== undefined)

  // ── Retorno do pagamento: detecta flag na URL e desbloqueia o PDF ──────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const flagPago = ['pago', 'paid', 'sucesso'].some(k => {
      const v = params.get(k) ?? (params.get('status') === k ? k : null)
      return v === '1' || v === 'true' || v === 'sucesso'
    }) || params.get('status') === 'sucesso' || params.get('status') === 'success'

    // Modo DEMO: libera a geração do relatório sem pagamento (marcado como demonstração)
    const flagDemo = ['1', 'true', 'sim'].includes((params.get('demo') ?? '').toLowerCase())
    if (flagDemo) setDemo(true)

    const salvo = localStorage.getItem(STORE_KEY)
    if (salvo) {
      try {
        const dados = JSON.parse(salvo)
        if (dados.respostas) setRespostas(dados.respostas)
        if (dados.lead) setLead(dados.lead)
        if (flagPago && dados.respostas) {
          setPago(true)
          setTela('relatorio')
          window.scrollTo(0, 0)
        }
      } catch { /* ignora estado corrompido */ }
    }
  }, [])

  // ── Persiste estado para sobreviver ao redirect do checkout ────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORE_KEY, JSON.stringify({ respostas, lead }))
  }, [respostas, lead])

  function avancarArea() {
    if (areaIdx < AREAS.length - 1) {
      setAreaIdx(i => i + 1)
      window.scrollTo(0, 0)
    } else {
      setTela('relatorio')
      window.scrollTo(0, 0)
    }
  }

  const gerarPDFCompleto = useCallback((modoDemo = false) => {
    const html = gerarHTMLRelatorio(lead, scores, scoreFinal, nivel, respostas, modoDemo)
    // Gera o relatório 100% no navegador (sem chamada de rede) usando um Blob.
    // Isso evita o "Erro de conexão" e é resistente a bloqueadores de pop-up.
    try {
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
      const url  = URL.createObjectURL(blob)
      const w    = window.open(url, '_blank')
      if (!w) {
        // Pop-up bloqueado → força o download do arquivo HTML do relatório
        const a = document.createElement('a')
        a.href = url
        a.download = `relatorio-viabilidade${modoDemo ? '-demo' : ''}.html`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
      setTimeout(() => URL.revokeObjectURL(url), 60000)
    } catch {
      // Fallback final: escreve direto em uma nova janela
      const w = window.open('', '_blank', 'width=900,height=700')
      if (w) { w.document.write(html); w.document.close(); w.focus() }
    }
  }, [lead, scores, scoreFinal, nivel, respostas])

  async function iniciarPagamento() {
    setPagando(true)
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ respostas, lead }))
      const res  = await fetch(`${API}/checkout-orcamento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: lead.email, nome: lead.nome,
          empresa: lead.empresa, valor: 197,
          produto: 'orcamento-viabilidade',
          score: scoreFinal,
        }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else alert('Erro ao processar pagamento. Tente novamente.')
    } catch {
      alert('Erro de conexão. Tente novamente.')
    } finally { setPagando(false) }
  }

  return (
    <>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>

      {/* ══ TELA INTRO ═══════════════════════════════════════════════════════ */}
      {tela === 'intro' && (
        <div style={S.page}>
          <div style={S.card}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={S.iconBox('#fff3e0')}><TrendingUp size={30} color="#F97316" /></div>
              <h1 style={S.h1}>Orçamento de Viabilidade</h1>
              <p style={{ ...S.sub, maxWidth: 440, margin: '8px auto 0' }}>
                Descubra se seu negócio tem base para prosperar — antes de investir.
                Responda ~24 perguntas e receba seu diagnóstico completo.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 28 }}>
              {[
                { n: '24', l: 'perguntas', s: '~8 minutos' },
                { n: '6',  l: 'áreas avaliadas', s: 'diagnóstico completo' },
                { n: '0→100', l: 'score de viabilidade', s: 'resultado imediato' },
              ].map(i => (
                <div key={i.l} style={{ textAlign: 'center', padding: 14, borderRadius: 12, background: '#fafafa', border: '1px solid #e8eaed' }}>
                  <p style={{ fontSize: 22, fontWeight: 900, color: '#F97316', margin: '0 0 2px' }}>{i.n}</p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#1a1d23', margin: '0 0 2px' }}>{i.l}</p>
                  <p style={{ fontSize: 10, color: '#9aa0a6', margin: 0 }}>{i.s}</p>
                </div>
              ))}
            </div>

            <div style={{ background: '#f8f9fa', borderRadius: 12, padding: 16, marginBottom: 24 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#1a1d23', margin: '0 0 10px' }}>O que você vai descobrir:</p>
              <div style={{ display: 'grid', gap: 8 }}>
                {[
                  'Score de viabilidade de 0 a 100 com diagnóstico por área',
                  'Pontos fortes e áreas críticas do seu negócio',
                  'Recomendações específicas para cada área avaliada',
                  'PDF completo para baixar (mediante pagamento de R$ 197)',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <CheckCircle size={14} color="#2e7d32" style={{ flexShrink: 0, marginTop: 1 }} />
                    <p style={{ fontSize: 12, color: '#5f6368', margin: 0 }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>

            <p style={{ fontSize: 11, color: '#9aa0a6', textAlign: 'center', marginBottom: 12 }}>
              ✓ Gratuito · Sem cadastro para responder · PDF por R$ 197
            </p>
            <button onClick={() => setTela('lead')} style={S.btnPrimary}>
              Iniciar Diagnóstico <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ══ TELA LEAD ════════════════════════════════════════════════════════ */}
      {tela === 'lead' && (
        <div style={S.page}>
          <div style={S.card}>
            <button onClick={() => setTela('intro')} style={S.btnBack}><ChevronLeft size={14} /> Voltar</button>
            <h2 style={{ ...S.h1, marginBottom: 4 }}>Antes de começar</h2>
            <p style={{ ...S.sub, marginBottom: 24 }}>Informe seus dados para personalizar o relatório</p>

            <div style={{ display: 'grid', gap: 14, marginBottom: 24 }}>
              {[
                { key: 'nome',    label: 'Seu nome *',           placeholder: 'Nome completo' },
                { key: 'email',   label: 'E-mail *',             placeholder: 'voce@email.com', type: 'email' },
                { key: 'empresa', label: 'Nome do negócio / produto', placeholder: 'Ex: Sucos Tropicais da Serra' },
                { key: 'setor',   label: 'Setor de atuação',     placeholder: 'Ex: Bebidas, Alimentos, Cosméticos...' },
              ].map(f => (
                <div key={f.key}>
                  <label style={S.label}>{f.label}</label>
                  <input
                    type={(f as any).type || 'text'}
                    value={(lead as any)[f.key]}
                    onChange={e => setLead(l => ({ ...l, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    style={S.input}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => { if (lead.nome && lead.email) { setTela('enquete'); setAreaIdx(0) } }}
              disabled={!lead.nome || !lead.email}
              style={{ ...S.btnPrimary, opacity: (!lead.nome || !lead.email) ? .5 : 1 }}>
              Iniciar Enquete <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ══ TELA ENQUETE ═════════════════════════════════════════════════════ */}
      {tela === 'enquete' && areaAtual && (
        <div style={S.page}>
          <div style={{ ...S.card, maxWidth: 680 }}>

            {/* Progresso geral */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#9aa0a6', margin: 0 }}>
                  Área {areaIdx + 1} de {totalAreas}
                </p>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#F97316', margin: 0 }}>{progresso}% concluído</p>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: '#e8eaed' }}>
                <div style={{ height: 6, borderRadius: 99, background: '#F97316', width: `${progresso}%`, transition: 'width .3s' }} />
              </div>
            </div>

            {/* Abas de áreas */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
              {AREAS.map((a, i) => {
                const pergsA   = PERGUNTAS.filter(p => p.area === a.id)
                const concluida = pergsA.every(p => respostas[p.id] !== undefined)
                return (
                  <div key={a.id} style={{
                    padding: '4px 10px', borderRadius: 99, fontSize: 10, fontWeight: 700,
                    background: i === areaIdx ? a.bg : concluida ? '#e8f5e9' : '#f5f5f5',
                    color: i === areaIdx ? a.cor : concluida ? '#2e7d32' : '#9aa0a6',
                    border: `1px solid ${i === areaIdx ? a.cor : concluida ? '#a5d6a7' : '#e8eaed'}`,
                  }}>
                    {concluida && i !== areaIdx ? '✓ ' : ''}{a.label}
                  </div>
                )
              })}
            </div>

            {/* Header da área */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: 14, marginBottom: 24, background: areaAtual.bg, border: `1px solid ${areaAtual.cor}20` }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.08)', flexShrink: 0 }}>
                <areaAtual.icon size={20} color={areaAtual.cor} />
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 900, color: areaAtual.cor, margin: 0 }}>{areaAtual.label}</p>
                <p style={{ fontSize: 11, color: '#5f6368', margin: 0 }}>{pergsArea.length} perguntas nesta área</p>
              </div>
            </div>

            {/* Perguntas */}
            <div style={{ display: 'grid', gap: 20, marginBottom: 24 }}>
              {pergsArea.map((p, qi) => (
                <div key={p.id}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1d23', margin: '0 0 12px', lineHeight: 1.5 }}>
                    <span style={{ color: areaAtual.cor, marginRight: 6 }}>{qi + 1}.</span>{p.texto}
                  </p>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {p.opcoes?.map((op, oi) => {
                      const selecionado = respostas[p.id] === op.pontos
                      return (
                        <button key={oi} onClick={() => setRespostas(r => ({ ...r, [p.id]: op.pontos }))}
                          style={{
                            textAlign: 'left', padding: '12px 16px', borderRadius: 10, cursor: 'pointer',
                            border: `2px solid ${selecionado ? areaAtual.cor : '#e8eaed'}`,
                            background: selecionado ? areaAtual.bg : '#fff',
                            display: 'flex', alignItems: 'center', gap: 10, transition: 'all .15s',
                          }}>
                          <div style={{
                            width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                            border: `2px solid ${selecionado ? areaAtual.cor : '#dadce0'}`,
                            background: selecionado ? areaAtual.cor : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            {selecionado && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
                          </div>
                          <p style={{ fontSize: 12, color: selecionado ? areaAtual.cor : '#5f6368', margin: 0, fontWeight: selecionado ? 700 : 400, lineHeight: 1.4 }}>
                            {op.texto}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Navegação */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {areaIdx > 0 && (
                <button onClick={() => { setAreaIdx(i => i - 1); window.scrollTo(0, 0) }} style={{ ...S.btnSecondary, flex: '0 0 auto' }}>
                  <ChevronLeft size={14} /> Anterior
                </button>
              )}
              <button
                onClick={avancarArea}
                disabled={!todasRespondidas}
                style={{ ...S.btnPrimary, flex: 1, opacity: todasRespondidas ? 1 : .4 }}>
                {areaIdx === AREAS.length - 1 ? 'Ver Diagnóstico' : 'Próxima Área'}
                <ChevronRight size={16} />
              </button>
            </div>
            {!todasRespondidas && (
              <p style={{ fontSize: 11, color: '#9aa0a6', textAlign: 'center', marginTop: 8 }}>
                Responda todas as perguntas para avançar
              </p>
            )}
          </div>
        </div>
      )}

      {/* ══ TELA RELATÓRIO ═══════════════════════════════════════════════════ */}
      {tela === 'relatorio' && (
        <div style={S.page}>
          <div style={{ ...S.card, maxWidth: 780 }}>

            {/* Header do relatório */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#9aa0a6', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 1 }}>
                Diagnóstico de Viabilidade
              </p>
              <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1a1d23', margin: '0 0 4px' }}>
                {lead.empresa || lead.nome}
              </h1>
              <p style={{ fontSize: 12, color: '#9aa0a6', margin: 0 }}>
                {lead.setor && `${lead.setor} · `}Gerado em {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>

            {/* Score principal */}
            <div style={{
              textAlign: 'center', padding: '28px 20px', borderRadius: 20, marginBottom: 24,
              background: nivel.bg, border: `2px solid ${nivel.cor}30`,
            }}>
              <p style={{ fontSize: 48, margin: 0 }}>{nivel.emoji}</p>
              <p style={{ fontSize: 56, fontWeight: 900, color: nivel.cor, margin: '4px 0', lineHeight: 1 }}>
                {scoreFinal}
              </p>
              <p style={{ fontSize: 12, color: '#9aa0a6', margin: '0 0 8px' }}>de 100 pontos</p>
              <p style={{ fontSize: 18, fontWeight: 900, color: nivel.cor, margin: '0 0 8px' }}>
                {nivel.label}
              </p>
              <p style={{ fontSize: 13, color: '#5f6368', margin: 0, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
                {nivel.descricao}
              </p>
            </div>

            {/* Score por área */}
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a1d23', margin: '0 0 14px' }}>Diagnóstico por Área</h3>
            <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
              {AREAS.map(area => {
                const sc = scores[area.id]
                if (!sc) return null
                const corBarra = sc.pct >= 70 ? '#2e7d32' : sc.pct >= 45 ? '#F97316' : '#c62828'
                return (
                  <div key={area.id} style={{ padding: '14px 16px', borderRadius: 12, background: '#fafafa', border: '1px solid #e8eaed' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: area.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <area.icon size={15} color={area.cor} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <p style={{ fontSize: 12, fontWeight: 700, color: '#1a1d23', margin: 0 }}>{area.label}</p>
                          <p style={{ fontSize: 13, fontWeight: 900, color: corBarra, margin: 0 }}>{sc.pct}%</p>
                        </div>
                        <div style={{ height: 6, borderRadius: 99, background: '#e8eaed' }}>
                          <div style={{ height: 6, borderRadius: 99, background: corBarra, width: `${sc.pct}%`, transition: 'width .5s' }} />
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: 11, color: '#5f6368', margin: 0, lineHeight: 1.5 }}>
                      {recomendacaoPorArea(sc.pct, area.label)}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Paywall / Desbloqueio — PDF completo */}
            {pago ? (
              <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 24, border: '2px solid #2e7d32' }}>
                <div style={{ background: 'linear-gradient(135deg,#2e7d32,#1b5e20)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <CheckCircle size={20} color="#fff" />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 900, color: '#fff', margin: 0 }}>Pagamento confirmado — PDF liberado</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,.85)', margin: 0 }}>
                      Seu relatório executivo completo está pronto para download
                    </p>
                  </div>
                </div>
                <div style={{ background: '#fff', padding: 20 }}>
                  <button onClick={gerarPDFCompleto} style={{ ...S.btnPrimary, background: 'linear-gradient(135deg,#2e7d32,#1b5e20)' }}>
                    <Download size={16} /> Baixar PDF Completo
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 24, border: '2px solid #F97316' }}>
                <div style={{ background: 'linear-gradient(135deg,#F97316,#ea6a00)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Lock size={20} color="#fff" />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 900, color: '#fff', margin: 0 }}>PDF Completo — Relatório Executivo</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,.8)', margin: 0 }}>
                      Versão detalhada com análise aprofundada, plano de ação e projeções
                    </p>
                  </div>
                  <p style={{ marginLeft: 'auto', fontSize: 22, fontWeight: 900, color: '#fff', margin: 0 }}>R$ 197</p>
                </div>
                <div style={{ background: '#fff', padding: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                    {[
                      'Diagnóstico completo por área (6 páginas)',
                      'Score detalhado com benchmarks do setor',
                      'Plano de ação prioritário com 30/60/90 dias',
                      'Estimativa de investimento inicial necessário',
                      'Checklist de regularização e registros',
                      'Orientações específicas para o seu setor',
                    ].map((t, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <CheckCircle size={13} color="#2e7d32" style={{ flexShrink: 0, marginTop: 1 }} />
                        <p style={{ fontSize: 11, color: '#5f6368', margin: 0 }}>{t}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={iniciarPagamento} disabled={pagando}
                    style={{ ...S.btnPrimary, background: pagando ? '#ccc' : 'linear-gradient(135deg,#F97316,#ea6a00)' }}>
                    {pagando ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Aguarde...</> : <><FileText size={16} /> Desbloquear PDF por R$ 197</>}
                  </button>

                  {/* Acesso DEMO — gera o relatório sem pagamento (marca d'água de demonstração) */}
                  <button onClick={() => gerarPDFCompleto(true)}
                    style={{
                      width: '100%', marginTop: 10, padding: '10px 16px', borderRadius: 10,
                      border: `1px dashed ${demo ? '#F97316' : '#c4c7cc'}`,
                      background: demo ? '#fff3e0' : '#fafafa', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      fontSize: 12, fontWeight: 700, color: demo ? '#e65100' : '#5f6368',
                    }}>
                    <FileText size={14} /> Gerar relatório DEMO (sem pagamento)
                  </button>
                  <p style={{ fontSize: 10, color: '#9aa0a6', textAlign: 'center', margin: '6px 0 0' }}>
                    Versão de demonstração com marca d&apos;água — para avaliação do produto
                  </p>
                </div>
              </div>
            )}

            {/* CTA WhatsApp */}
            <div style={{
              background: '#e8f5e9', border: '1px solid #a5d6a7',
              borderRadius: 16, padding: 20, textAlign: 'center',
            }}>
              <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 8 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={14} color="#F97316" fill="#F97316" />)}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 900, color: '#1a1d23', margin: '0 0 6px' }}>
                Quer transformar esse diagnóstico em resultados reais?
              </h3>
              <p style={{ fontSize: 12, color: '#5f6368', margin: '0 0 16px', lineHeight: 1.6 }}>
                A Ana Paula e a equipe VIABILIZZE podem te acompanhar desde a formulação até a prateleira.
                Fale agora e descubra qual plano de assessoria faz sentido para o seu momento.
              </p>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: '#25D366', color: '#fff', textDecoration: 'none',
                  padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 900,
                }}>
                <MessageCircle size={20} /> Falar com a Ana Paula no WhatsApp
              </a>
              <p style={{ fontSize: 10, color: '#9aa0a6', margin: '10px 0 0' }}>
                +55 18 99708-6083 · Resposta em até 24h
              </p>
            </div>

            <p style={{ fontSize: 10, color: '#9aa0a6', textAlign: 'center', marginTop: 20 }}>
              VIABILIZZE Assessoria Industrial · assessoriaviabilizze.com.br · VI.P & NÔUS Consultoria
            </p>
          </div>
        </div>
      )}
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// GERADOR DE HTML DO PDF
// ═══════════════════════════════════════════════════════════════════════════
function gerarHTMLRelatorio(
  lead: any, scores: any, scoreFinal: number,
  nivel: any, respostas: Record<string, number>, demo = false
) {
  const data = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  const marcaDagua = demo ? `
    <div style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;">
      <div style="position:absolute;top:45%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:90px;font-weight:900;color:rgba(249,115,22,.10);white-space:nowrap;">DEMONSTRAÇÃO</div>
    </div>
    <div class="no-print" style="background:#fff3e0;border:1px solid #ffcc80;border-radius:10px;padding:12px 16px;margin-bottom:20px;text-align:center;">
      <p style="font-size:12px;font-weight:700;color:#e65100;margin:0;">Versão DEMO — relatório de demonstração sem valor comercial. Para o relatório executivo completo, adquira a versão oficial por R$ 197.</p>
    </div>` : ''
  const linhasAreas = AREAS.map(area => {
    const sc = scores[area.id]
    const cor = sc.pct >= 70 ? '#2e7d32' : sc.pct >= 45 ? '#F97316' : '#c62828'
    return `
      <div style="margin-bottom:20px;padding:16px;border-radius:10px;background:#fafafa;border:1px solid #e8eaed;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <strong style="color:#1a1d23;">${area.label}</strong>
          <span style="font-weight:900;color:${cor};font-size:18px;">${sc.pct}%</span>
        </div>
        <div style="height:8px;background:#e8eaed;border-radius:99px;margin-bottom:10px;">
          <div style="height:8px;background:${cor};border-radius:99px;width:${sc.pct}%;"></div>
        </div>
        <p style="font-size:12px;color:#5f6368;margin:0;">${recomendacaoPorArea(sc.pct, area.label)}</p>
      </div>`
  }).join('')

  return `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"/>
<title>Relatório de Viabilidade — ${lead.empresa || lead.nome}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:Arial,sans-serif; color:#1a1d23; padding:32px; font-size:12px; line-height:1.6; }
  @media print { body { padding:16px; } .no-print { display:none !important; } @page { margin:16mm; size:A4; } }
  .btn { display:inline-flex;align-items:center;gap:8px;background:#F97316;color:#fff;border:none;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;margin-bottom:24px; }
  h2 { font-size:15px;font-weight:700;color:#1a1d23;margin:24px 0 12px;padding-bottom:4px;border-bottom:2px solid #F97316; }
</style>
</head><body>
${marcaDagua}
<button class="no-print btn" onclick="window.print()">🖨️ Imprimir / Salvar PDF</button>

<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;padding-bottom:16px;border-bottom:3px solid #F97316;">
  <div>
    <p style="font-size:22px;font-weight:900;color:#F97316;margin:0;">VIABILIZZE</p>
    <p style="font-size:10px;color:#9aa0a6;margin:2px 0 0;">ASSESSORIA INDUSTRIAL · Relatório de Viabilidade</p>
  </div>
  <div style="text-align:right;">
    <p style="font-size:15px;font-weight:700;color:#1a1d23;margin:0;">${lead.empresa || lead.nome}</p>
    ${lead.setor ? `<p style="font-size:11px;color:#9aa0a6;margin:2px 0 0;">${lead.setor}</p>` : ''}
    <p style="font-size:10px;color:#9aa0a6;margin:4px 0 0;">Gerado em ${data}</p>
  </div>
</div>

<div style="text-align:center;padding:24px;background:${nivel.bg};border-radius:16px;margin-bottom:24px;border:2px solid ${nivel.cor}30;">
  <p style="font-size:40px;margin:0;">${nivel.emoji}</p>
  <p style="font-size:52px;font-weight:900;color:${nivel.cor};margin:4px 0;line-height:1;">${scoreFinal}</p>
  <p style="font-size:11px;color:#9aa0a6;margin:0 0 6px;">de 100 pontos</p>
  <p style="font-size:18px;font-weight:900;color:${nivel.cor};margin:0 0 8px;">${nivel.label}</p>
  <p style="font-size:12px;color:#5f6368;margin:0;max-width:480px;margin-left:auto;margin-right:auto;">${nivel.descricao}</p>
</div>

<h2>Diagnóstico por Área</h2>
${linhasAreas}

<h2>Próximos Passos Recomendados</h2>
<div style="background:#fff3e0;border:1px solid #ffe0b2;border-radius:10px;padding:16px;margin-bottom:20px;">
  <p style="font-size:12px;color:#e65100;margin:0 0 10px;font-weight:700;">Com base no seu diagnóstico, recomendamos priorizar:</p>
  ${AREAS.filter(a => scores[a.id]?.pct < 60).slice(0,3).map((a, i) => `
    <p style="font-size:12px;color:#5f6368;margin:4px 0;"><strong>${i+1}. ${a.label}:</strong> área crítica que precisa ser estruturada antes do lançamento.</p>
  `).join('')}
</div>

<div style="background:#e8f5e9;border:1px solid #a5d6a7;border-radius:12px;padding:20px;text-align:center;margin-top:24px;">
  <p style="font-size:16px;font-weight:900;color:#1a1d23;margin:0 0 8px;">Pronto para transformar esse diagnóstico em resultados reais?</p>
  <p style="font-size:12px;color:#5f6368;margin:0 0 12px;">A equipe VIABILIZZE acompanha seu negócio do desenvolvimento à prateleira.</p>
  <p style="font-size:14px;font-weight:900;color:#25D366;margin:0;">WhatsApp: +55 18 99708-6083 · Ana Paula Santos</p>
</div>

<div style="margin-top:32px;padding-top:12px;border-top:1px solid #e8eaed;display:flex;justify-content:space-between;">
  <p style="font-size:9px;color:#9aa0a6;margin:0;">VIABILIZZE Assessoria Industrial · assessoriaviabilizze.com.br</p>
  <p style="font-size:9px;color:#9aa0a6;margin:0;">Desenvolvido por VI.P & NÔUS Consultoria</p>
</div>
</body></html>`
}

// ══ ESTILOS ════════════════════════════════════════════════════════════════
const S = {
  page: { minHeight:'100vh', display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'32px 16px', background:'#f0f2f5', fontFamily:'Arial,sans-serif' } as React.CSSProperties,
  card: { width:'100%', maxWidth:640, background:'#fff', borderRadius:20, padding:28, boxShadow:'0 4px 24px rgba(0,0,0,.08)' } as React.CSSProperties,
  h1: { fontSize:22, fontWeight:900, color:'#1a1d23', margin:'0 0 4px' } as React.CSSProperties,
  sub: { fontSize:13, color:'#9aa0a6', margin:0 } as React.CSSProperties,
  label: { display:'block', fontSize:11, fontWeight:700, color:'#5f6368', marginBottom:6 } as React.CSSProperties,
  input: { width:'100%', border:'1px solid #dadce0', borderRadius:8, padding:'10px 12px', fontSize:13, outline:'none', background:'#fff', boxSizing:'border-box', fontFamily:'inherit' } as React.CSSProperties,
  btnPrimary: { display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#F97316,#ea6a00)', color:'#fff', border:'none', borderRadius:12, padding:'13px 24px', fontSize:14, fontWeight:700, cursor:'pointer', width:'100%', justifyContent:'center' } as React.CSSProperties,
  btnSecondary: { display:'inline-flex', alignItems:'center', gap:8, background:'#fff', color:'#5f6368', border:'1px solid #dadce0', borderRadius:10, padding:'10px 16px', fontSize:13, fontWeight:600, cursor:'pointer' } as React.CSSProperties,
  btnBack: { display:'inline-flex', alignItems:'center', gap:6, background:'none', border:'none', color:'#9aa0a6', fontSize:12, cursor:'pointer', padding:'0 0 16px', marginBottom:4 } as React.CSSProperties,
  iconBox: (bg: string) => ({ width:64, height:64, borderRadius:18, background:bg, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }) as React.CSSProperties,
}
