"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle, Lock, MessageCircle, FileText,
  ChevronRight, ChevronLeft, Loader2,
  TrendingUp, Package, DollarSign, Users, Truck, BarChart2, Star
} from "lucide-react"

const WA_LINK = "https://wa.me/5518997086083?text=Ol%C3%A1%20Ana%20Paula!%20Acabei%20de%20receber%20meu%20relat%C3%B3rio%20de%20viabilidade%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20assessoria%20VIABILIZZE."

const AREAS = [
  { id:"produto",      label:"Produto / Serviço",      icon: Package    },
  { id:"mercado",      label:"Mercado & Concorrência", icon: Users      },
  { id:"custos",       label:"Custos & Investimento",  icon: DollarSign },
  { id:"precificacao", label:"Precificação & Margem",  icon: TrendingUp },
  { id:"distribuicao", label:"Distribuição & Canais",  icon: Truck      },
  { id:"gestao",       label:"Gestão & Planejamento",  icon: BarChart2  },
]

type Pergunta = { id:string; area:string; texto:string; opcoes:{texto:string;pontos:number}[] }

const PERGUNTAS: Pergunta[] = [
  {id:"p1",area:"produto",texto:"Seu produto está desenvolvido e testado?",opcoes:[
    {texto:"Sim, pronto e validado com clientes reais",pontos:10},
    {texto:"Parcialmente — ainda em desenvolvimento",pontos:5},
    {texto:"Tenho apenas a ideia, não desenvolvi ainda",pontos:1},
  ]},
  {id:"p2",area:"produto",texto:"Você conhece os registros obrigatórios (ANVISA, MAPA, SIF...)?",opcoes:[
    {texto:"Sim, já tenho todos os registros necessários",pontos:10},
    {texto:"Sei o que precisa, mas ainda não regularizei",pontos:5},
    {texto:"Não sei quais registros são obrigatórios",pontos:0},
  ]},
  {id:"p3",area:"produto",texto:"Seu produto tem um diferencial claro em relação à concorrência?",opcoes:[
    {texto:"Sim, diferencial forte e bem definido",pontos:10},
    {texto:"Tenho alguma diferença, mas não está claro",pontos:4},
    {texto:"Não — é parecido com o que já existe",pontos:1},
  ]},
  {id:"p4",area:"produto",texto:"Você já identificou e cotou fornecedores de matéria-prima?",opcoes:[
    {texto:"Sim, com cotações e contratos fechados",pontos:10},
    {texto:"Identifiquei alguns mas não cotei ainda",pontos:5},
    {texto:"Ainda não pesquisei fornecedores",pontos:0},
  ]},
  {id:"m1",area:"mercado",texto:"Você sabe quem é exatamente seu cliente ideal?",opcoes:[
    {texto:"Sim, perfil detalhado e validado",pontos:10},
    {texto:"Tenho ideia geral, mas não é preciso",pontos:4},
    {texto:"Não defini — quero atingir todo mundo",pontos:0},
  ]},
  {id:"m2",area:"mercado",texto:"Você conhece seus principais concorrentes e como se posicionam?",opcoes:[
    {texto:"Sim, fiz análise detalhada da concorrência",pontos:10},
    {texto:"Conheço alguns, mas sem análise formal",pontos:5},
    {texto:"Não sei quem são meus concorrentes",pontos:0},
  ]},
  {id:"m3",area:"mercado",texto:"Você estimou o tamanho do mercado que quer atender?",opcoes:[
    {texto:"Sim, com dados de pesquisa de mercado",pontos:10},
    {texto:"Tenho estimativa aproximada",pontos:4},
    {texto:"Não fiz estimativa de mercado",pontos:0},
  ]},
  {id:"m4",area:"mercado",texto:"Você já testou o produto com potenciais clientes reais?",opcoes:[
    {texto:"Sim, vendi ou testei com clientes reais",pontos:10},
    {texto:"Mostrei para amigos/família, recebi elogios",pontos:3},
    {texto:"Ainda não testei com ninguém fora",pontos:0},
  ]},
  {id:"c1",area:"custos",texto:"Você sabe o custo total para produzir uma unidade?",opcoes:[
    {texto:"Sim, planilha com todos os custos detalhados",pontos:10},
    {texto:"Tenho estimativa grosseira",pontos:4},
    {texto:"Não calculei os custos de produção",pontos:0},
  ]},
  {id:"c2",area:"custos",texto:"Você tem capital ou financiamento garantido para iniciar?",opcoes:[
    {texto:"Sim, tenho capital próprio suficiente",pontos:10},
    {texto:"Tenho parte — precisarei de crédito",pontos:5},
    {texto:"Preciso de 100% de financiamento externo",pontos:1},
  ]},
  {id:"c3",area:"custos",texto:"Você mapeou todos os custos fixos mensais do negócio?",opcoes:[
    {texto:"Sim, todos os custos fixos levantados",pontos:10},
    {texto:"Parcialmente — sei alguns mas não todos",pontos:4},
    {texto:"Não levantei os custos fixos ainda",pontos:0},
  ]},
  {id:"c4",area:"custos",texto:"Você calculou seu ponto de equilíbrio (break-even)?",opcoes:[
    {texto:"Sim, sei exatamente meu break-even",pontos:10},
    {texto:"Tenho noção, mas não calculei formalmente",pontos:4},
    {texto:"Não sei o que é ponto de equilíbrio",pontos:0},
  ]},
  {id:"pr1",area:"precificacao",texto:"Como você definiu o preço de venda?",opcoes:[
    {texto:"Custo + margem + análise de concorrência",pontos:10},
    {texto:"Olhei o concorrente e fiz similar",pontos:4},
    {texto:"Ainda não defini o preço",pontos:0},
  ]},
  {id:"pr2",area:"precificacao",texto:"Qual a margem de lucro estimada por unidade?",opcoes:[
    {texto:"Acima de 30% — margem saudável e calculada",pontos:10},
    {texto:"Entre 10% e 30% — margem apertada",pontos:6},
    {texto:"Abaixo de 10% ou não sei ainda",pontos:1},
  ]},
  {id:"pr3",area:"precificacao",texto:"Você incluiu todos os impostos no preço de venda?",opcoes:[
    {texto:"Sim, com assessoria contábil especializada",pontos:10},
    {texto:"Incluí algo, mas não sei se está completo",pontos:4},
    {texto:"Não incluí impostos no preço",pontos:0},
  ]},
  {id:"pr4",area:"precificacao",texto:"Você tem estratégia de preço por canal (atacado x varejo x direto)?",opcoes:[
    {texto:"Sim, tabela de preços por canal definida",pontos:10},
    {texto:"Pensei nisso mas não formalizei",pontos:4},
    {texto:"Um único preço para todos",pontos:2},
  ]},
  {id:"d1",area:"distribuicao",texto:"Por quais canais você vai vender seu produto?",opcoes:[
    {texto:"Múltiplos canais: varejo, atacado, e-commerce, direto",pontos:10},
    {texto:"Um ou dois canais, sem estratégia clara",pontos:5},
    {texto:"Ainda não decidi como vou vender",pontos:0},
  ]},
  {id:"d2",area:"distribuicao",texto:"Você tem contato com distribuidores ou varejistas?",opcoes:[
    {texto:"Sim, contratos ou cartas de intenção firmados",pontos:10},
    {texto:"Tenho conversas iniciais, nada formalizado",pontos:5},
    {texto:"Ainda não contatei nenhum canal de venda",pontos:0},
  ]},
  {id:"d3",area:"distribuicao",texto:"Sua logística de entrega está definida?",opcoes:[
    {texto:"Sim, totalmente definida e cotada",pontos:10},
    {texto:"Tenho ideia mas não está detalhado",pontos:4},
    {texto:"Não pensei na logística ainda",pontos:0},
  ]},
  {id:"d4",area:"distribuicao",texto:"Você tem estratégia de marketing digital para gerar demanda?",opcoes:[
    {texto:"Sim, com plano de marketing e verba definida",pontos:10},
    {texto:"Vou fazer redes sociais, mas sem plano",pontos:3},
    {texto:"Não tenho estratégia de marketing",pontos:0},
  ]},
  {id:"g1",area:"gestao",texto:"Você tem um plano de negócio estruturado?",opcoes:[
    {texto:"Sim, plano completo com projeções financeiras",pontos:10},
    {texto:"Tenho algo básico, não muito detalhado",pontos:5},
    {texto:"Não tenho plano de negócio formal",pontos:0},
  ]},
  {id:"g2",area:"gestao",texto:"Você tem sócios ou equipe para tocar o negócio?",opcoes:[
    {texto:"Sim, equipe com funções definidas e complementares",pontos:10},
    {texto:"Vou começar sozinho, com ajuda eventual",pontos:5},
    {texto:"Completamente solo — sem equipe ou sócios",pontos:3},
  ]},
  {id:"g3",area:"gestao",texto:"Você tem assessoria especializada no setor?",opcoes:[
    {texto:"Sim, equipe especializada contratada",pontos:10},
    {texto:"Tenho alguns consultores pontuais",pontos:5},
    {texto:"Ainda não busquei nenhuma assessoria",pontos:0},
  ]},
  {id:"g4",area:"gestao",texto:"Você tem projeção de faturamento para os primeiros 12 meses?",opcoes:[
    {texto:"Sim, com cenários pessimista, realista e otimista",pontos:10},
    {texto:"Estimativa geral sem cenários",pontos:4},
    {texto:"Não fiz nenhuma projeção financeira",pontos:0},
  ]},
]

function calcScore(resp: Record<string,number>) {
  let total=0, max=0
  const porArea: Record<string,{pct:number}> = {}
  AREAS.forEach(a => {
    const ps = PERGUNTAS.filter(p => p.area===a.id)
    const obt = ps.reduce((s,p) => s+(resp[p.id]??0), 0)
    const mx  = ps.reduce((s,p) => s+Math.max(...p.opcoes.map(o=>o.pontos)), 0)
    porArea[a.id] = {pct: mx>0 ? Math.round((obt/mx)*100) : 0}
    total+=obt; max+=mx
  })
  return { score: max>0 ? Math.round((total/max)*100) : 0, porArea }
}

function nivel(score:number) {
  if (score>=80) return {label:"Alta Viabilidade",  emoji:"🚀", cor:"#16a34a", bg:"#f0fdf4", desc:"Base sólida. Com assessoria especializada, as chances de sucesso são altas."}
  if (score>=60) return {label:"Viabilidade Média", emoji:"⚡", cor:"#ea580c", bg:"#fff7ed", desc:"Bom começo, mas há lacunas importantes que precisam ser trabalhadas antes do lançamento."}
  if (score>=40) return {label:"Viabilidade Baixa", emoji:"⚠️", cor:"#dc2626", bg:"#fef2f2", desc:"Existem riscos significativos. Consultoria especializada é fundamental para evitar perdas."}
  return             {label:"Alto Risco",            emoji:"🆘", cor:"#b91c1c", bg:"#fef2f2", desc:"Muitas áreas críticas precisam ser estruturadas. Não avance sem suporte especializado."}
}

export default function OrcamentoViabilidade() {
  const [step, setStep]       = useState<"intro"|"lead"|"quiz"|"previa"|"relatorio">("intro")
  const [qIdx, setQIdx]       = useState(0)
  const [resp, setResp]       = useState<Record<string,number>>({})
  const [lead, setLead]       = useState({nome:"",email:"",empresa:"",setor:""})
  const [pagando, setPagando] = useState(false)

  // Detectar retorno do Stripe com pagamento confirmado
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("pago")==="sim") {
      try {
        const saved = localStorage.getItem("ov_dados")
        if (saved) {
          const {lead:l, resp:r} = JSON.parse(saved)
          setLead(l); setResp(r); setStep("relatorio")
          window.history.replaceState({}, "", window.location.pathname)
        }
      } catch {}
    }
  }, [])

  const pergunta  = PERGUNTAS[qIdx]
  const total     = PERGUNTAS.length
  const prog      = Math.round((qIdx/total)*100)
  const {score, porArea} = calcScore(resp)
  const nv        = nivel(score)

  async function pagar() {
    setPagando(true)
    localStorage.setItem("ov_dados", JSON.stringify({lead, resp}))
    try {
      const res  = await fetch("https://viabilizzecrm.vercel.app/api/checkout", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          plano:"ORCAMENTO", email:lead.email, nome:lead.nome,
          produto_slug:"orcamento-viabilidade", valor:197,
          success_url:`${window.location.origin}/viabilizze-digital/orcamento-viabilidade?pago=sim`,
          cancel_url:`${window.location.origin}/viabilizze-digital/orcamento-viabilidade`,
        }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else alert("Erro ao iniciar pagamento. Tente novamente.")
    } catch { alert("Erro de conexão. Tente novamente.") }
    finally { setPagando(false) }
  }

  function gerarPDF() {
    const nv2 = nivel(score)
    const areas = AREAS.map(a => {
      const s = porArea[a.id]
      const c = s.pct>=70?"#16a34a":s.pct>=45?"#ea580c":"#dc2626"
      const rec = s.pct>=80?"Ponto forte — continue aprofundando."
        :s.pct>=60?"Boa base, mas há gaps a preencher antes do lançamento."
        :s.pct>=40?"Área de atenção — recomendamos estruturação urgente com especialista."
        :"Área crítica — priorize antes de qualquer investimento."
      return `<div style="margin-bottom:14px;padding:14px;border-radius:8px;background:#fafafa;border:1px solid #e5e7eb">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
          <strong style="font-size:13px">${a.label}</strong>
          <span style="font-weight:900;color:${c}">${s.pct}%</span>
        </div>
        <div style="height:6px;background:#e5e7eb;border-radius:99px;margin-bottom:8px">
          <div style="height:6px;background:${c};border-radius:99px;width:${s.pct}%"></div>
        </div>
        <p style="font-size:11px;color:#6b7280;margin:0">${rec}</p>
      </div>`
    }).join("")
    const criticas = AREAS.filter(a=>porArea[a.id].pct<60)
    const acoes = criticas.slice(0,3).map((a,i)=>
      `<p style="font-size:12px;color:#374151;margin:4px 0"><strong>${i+1}. ${a.label}:</strong> estruturar antes do lançamento.</p>`
    ).join("")
    const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/>
<title>Relatório — ${lead.empresa||lead.nome}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;color:#111827;padding:32px;font-size:12px;line-height:1.6}@media print{body{padding:16px}.np{display:none}@page{margin:16mm;size:A4}}</style>
</head><body>
<button class="np" onclick="window.print()" style="background:#ea580c;color:#fff;border:none;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer;margin-bottom:24px">🖨️ Imprimir / Salvar PDF</button>
<div style="display:flex;justify-content:space-between;margin-bottom:24px;padding-bottom:16px;border-bottom:3px solid #ea580c">
  <div><p style="font-size:20px;font-weight:900;color:#ea580c">VIABILIZZE</p><p style="font-size:10px;color:#9ca3af">ASSESSORIA INDUSTRIAL · Relatório de Viabilidade</p></div>
  <div style="text-align:right"><p style="font-size:14px;font-weight:700">${lead.empresa||lead.nome}</p>${lead.setor?`<p style="font-size:11px;color:#9ca3af">${lead.setor}</p>`:""}<p style="font-size:10px;color:#9ca3af">${new Date().toLocaleDateString("pt-BR",{day:"2-digit",month:"long",year:"numeric"})}</p></div>
</div>
<div style="text-align:center;padding:24px;background:${nv2.bg};border-radius:12px;margin-bottom:24px">
  <p style="font-size:36px;margin:0">${nv2.emoji}</p>
  <p style="font-size:48px;font-weight:900;color:${nv2.cor};margin:4px 0;line-height:1">${score}</p>
  <p style="font-size:11px;color:#9ca3af;margin:0 0 6px">de 100 pontos</p>
  <p style="font-size:16px;font-weight:900;color:${nv2.cor};margin:0 0 8px">${nv2.label}</p>
  <p style="font-size:12px;color:#374151;margin:0;max-width:440px;margin-left:auto;margin-right:auto">${nv2.desc}</p>
</div>
<h2 style="font-size:14px;font-weight:700;margin:0 0 12px;padding-bottom:4px;border-bottom:2px solid #ea580c">Diagnóstico por Área</h2>
${areas}
${criticas.length>0?`<h2 style="font-size:14px;font-weight:700;margin:20px 0 10px;padding-bottom:4px;border-bottom:2px solid #ea580c">Próximos Passos</h2>
<div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:14px;margin-bottom:16px">${acoes}</div>`:""}
<div style="background:#f0fdf4;border:1px solid #86efac;border-radius:10px;padding:18px;text-align:center;margin-top:20px">
  <p style="font-size:15px;font-weight:900;margin:0 0 8px">Pronto para transformar esse diagnóstico em resultados?</p>
  <p style="font-size:12px;color:#374151;margin:0 0 10px">A equipe VIABILIZZE acompanha seu negócio do desenvolvimento à prateleira.</p>
  <p style="font-size:14px;font-weight:900;color:#25D366">WhatsApp: +55 18 99708-6083 · Ana Paula Santos</p>
</div>
<div style="margin-top:28px;padding-top:10px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between">
  <p style="font-size:9px;color:#9ca3af">VIABILIZZE Assessoria Industrial · assessoriaviabilizze.com.br</p>
  <p style="font-size:9px;color:#9ca3af">Desenvolvido por VI.P & NÔUS Consultoria</p>
</div></body></html>`
    const w = window.open("","_blank","width=900,height=700")
    if (w) { w.document.write(html); w.document.close(); w.focus() }
  }

  // ── INTRO ────────────────────────────────────────────────────────────────
  if (step==="intro") return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-6 pt-10">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-orange-600"/>
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Orçamento de Viabilidade</h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
            Descubra se seu negócio tem base para prosperar — antes de investir. Responda 24 perguntas e receba seu diagnóstico completo.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[{n:"24",l:"perguntas",s:"~8 min"},{n:"6",l:"áreas avaliadas",s:"diagnóstico"},{n:"0→100",l:"score final",s:"resultado"}].map(i=>(
            <Card key={i.l}><CardContent className="p-3 text-center">
              <p className="text-xl font-black text-orange-600">{i.n}</p>
              <p className="text-xs font-semibold text-gray-800">{i.l}</p>
              <p className="text-xs text-gray-400">{i.s}</p>
            </CardContent></Card>
          ))}
        </div>
        <Card className="mb-4"><CardContent className="p-4">
          <p className="text-sm font-semibold text-gray-800 mb-3">O que você vai descobrir:</p>
          {["Score 0–100 com diagnóstico por área","Pontos fortes e áreas críticas do seu negócio","Recomendações específicas para cada área","PDF completo para baixar (R$ 197)"].map((t,i)=>(
            <div key={i} className="flex items-start gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0"/>
              <p className="text-sm text-gray-600">{t}</p>
            </div>
          ))}
        </CardContent></Card>
        <p className="text-xs text-gray-400 text-center mb-3">✓ Gratuito · PDF completo por R$ 197</p>
        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3" onClick={()=>setStep("lead")}>
          Iniciar Diagnóstico <ChevronRight className="w-4 h-4 ml-1"/>
        </Button>
      </div>
    </div>
  )

  // ── LEAD ─────────────────────────────────────────────────────────────────
  if (step==="lead") return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-6 pt-10">
      <div className="w-full max-w-md">
        <button onClick={()=>setStep("intro")} className="flex items-center gap-1 text-sm text-gray-400 mb-6 hover:text-gray-600">
          <ChevronLeft className="w-4 h-4"/> Voltar
        </button>
        <h2 className="text-xl font-black text-gray-900 mb-1">Antes de começar</h2>
        <p className="text-sm text-gray-500 mb-6">Informe seus dados para personalizar o relatório</p>
        <div className="space-y-4 mb-6">
          {[{key:"nome",label:"Seu nome *",ph:"Nome completo",type:"text"},{key:"email",label:"E-mail *",ph:"voce@email.com",type:"email"},{key:"empresa",label:"Nome do negócio/produto",ph:"Ex: Sucos Tropicais da Serra",type:"text"},{key:"setor",label:"Setor de atuação",ph:"Ex: Bebidas, Alimentos...",type:"text"}].map(f=>(
            <div key={f.key}>
              <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
              <input type={f.type} value={(lead as any)[f.key]}
                onChange={e=>setLead(l=>({...l,[f.key]:e.target.value}))}
                placeholder={f.ph}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors"/>
            </div>
          ))}
        </div>
        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 disabled:opacity-50"
          disabled={!lead.nome||!lead.email}
          onClick={()=>{setQIdx(0);setStep("quiz")}}>
          Iniciar Enquete <ChevronRight className="w-4 h-4 ml-1"/>
        </Button>
      </div>
    </div>
  )

  // ── QUIZ ─────────────────────────────────────────────────────────────────
  if (step==="quiz") return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-6 pt-10">
      <div className="w-full max-w-lg">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-semibold text-gray-500">Pergunta {qIdx+1} de {total}</p>
            <p className="text-xs font-bold text-orange-600">{prog}%</p>
          </div>
          <Progress value={prog} className="h-1.5 bg-gray-200"/>
        </div>
        <Card className="mb-6"><CardContent className="p-6">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-5 h-5 text-orange-600"/>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">{pergunta.texto}</h3>
          <div className="space-y-3">
            {pergunta.opcoes.map((op,oi)=>{
              const sel = resp[pergunta.id]===op.pontos
              return (
                <button key={oi} onClick={()=>setResp(r=>({...r,[pergunta.id]:op.pontos}))}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all text-sm ${sel?"border-orange-500 bg-orange-50 font-semibold text-orange-800":"border-gray-200 bg-white text-gray-700 hover:border-orange-300"}`}>
                  {op.texto}
                </button>
              )
            })}
          </div>
        </CardContent></Card>
        <div className="flex gap-3">
          {qIdx>0 && (
            <Button variant="outline" onClick={()=>{setQIdx(i=>i-1);window.scrollTo(0,0)}} className="shrink-0">
              <ChevronLeft className="w-4 h-4 mr-1"/> Voltar
            </Button>
          )}
          <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold disabled:opacity-40"
            disabled={resp[pergunta.id]===undefined}
            onClick={()=>{
              if(qIdx<total-1){setQIdx(i=>i+1);window.scrollTo(0,0)}
              else setStep("previa")
            }}>
            {qIdx===total-1?"Ver Diagnóstico":"Próxima"} <ChevronRight className="w-4 h-4 ml-1"/>
          </Button>
        </div>
      </div>
    </div>
  )

  // ── PRÉVIA ───────────────────────────────────────────────────────────────
  if (step==="previa") return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-10 px-4 text-center">
        <p className="text-sm text-gray-400 mb-1">Diagnóstico de Viabilidade</p>
        <h1 className="text-2xl font-black mb-1">{(lead.nome||"").split(" ")[0]}, seu relatório está pronto!</h1>
        <p className="text-gray-400 text-sm max-w-md mx-auto">Preparamos uma prévia da análise. Desbloqueie o conteúdo completo para acessar todas as recomendações.</p>
      </div>
      <div className="max-w-lg mx-auto px-4 py-8 space-y-4">
        {[
          {t:"Resumo do Projeto", c:lead.empresa||lead.nome||"—"},
          {t:"Análise de Investimento", c:score>=70?"Faixa indicada: R$ 50 mil a R$ 150 mil. Este patamar direciona as escolhas de fornecedores, escala de produção e estratégia de entrada no mercado.":"Faixa indicada: R$ 20 mil a R$ 80 mil. Recomendamos início em escala reduzida para validação antes de aportes maiores."},
          {t:"Posicionamento e Qualidade", c:score>=70?"Posicionamento: Premium. Definir a faixa de qualidade é decisivo para precificação, formulação e percepção de marca.":"Posicionamento: Padrão de mercado. Definir a faixa de qualidade é decisivo para precificação, formulação e percepção de marca."},
        ].map((c,i)=>(
          <Card key={i}><CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-orange-600"/>
              <p className="font-semibold text-sm text-gray-800">{c.t}</p>
            </div>
            <p className="text-sm text-gray-600">{c.c}</p>
          </CardContent></Card>
        ))}

        {/* Paywall */}
        <Card className="border-2 border-orange-200"><CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-4 h-4 text-orange-600"/>
            <p className="font-semibold text-sm text-gray-800">Conteúdo completo do relatório</p>
          </div>
          <div className="space-y-2 mb-5">
            {["Análise de viabilidade financeira detalhada (custos, margem e ponto de equilíbrio)","Estudo de público-alvo e potencial de mercado","Análise competitiva aprofundada vs. concorrentes","Recomendações técnicas de formulação e conformidade regulatória","Cronograma sugerido e próximos passos para o lançamento"].map((t,i)=>(
              <p key={i} className="text-xs text-gray-400 line-through pl-1">• {t}</p>
            ))}
          </div>
          <div className="text-center mb-4">
            <p className="text-xs text-gray-400 mb-1">Acesso ao relatório completo</p>
            <p className="text-3xl font-black text-gray-900">R$ 197,00</p>
            <p className="text-xs text-gray-400">Pagamento único · Acesso imediato</p>
          </div>
          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 disabled:opacity-60"
            disabled={pagando} onClick={pagar}>
            {pagando?<><Loader2 className="w-4 h-4 mr-2 animate-spin"/>Aguarde...</>:<><Lock className="w-4 h-4 mr-2"/>Desbloquear relatório completo</>}
          </Button>
          <p className="text-xs text-center text-gray-400 mt-2">Pagamento 100% seguro processado pelo Stripe</p>
        </CardContent></Card>

        <div className="text-center">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 underline">
            Já adquiriu o relatório e quer avançar com o projeto?
          </a>
        </div>
        <Button variant="outline" className="w-full" onClick={()=>window.open(WA_LINK,"_blank")}>
          Acesse a assessoria completa →
        </Button>
      </div>
    </div>
  )

  // ── RELATÓRIO COMPLETO (pós-pagamento) ────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-10 px-4 text-center">
        <Badge className="bg-green-600 mb-3">✓ Relatório Desbloqueado</Badge>
        <h1 className="text-2xl font-black mb-1">Relatório Completo — {lead.empresa||lead.nome}</h1>
        <p className="text-gray-400 text-sm">{lead.setor&&`${lead.setor} · `}{new Date().toLocaleDateString("pt-BR",{day:"2-digit",month:"long",year:"numeric"})}</p>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
        {/* Score */}
        <Card style={{background:nv.bg,borderColor:nv.cor+"30"}}>
          <CardContent className="p-6 text-center">
            <p className="text-4xl mb-1">{nv.emoji}</p>
            <p className="text-5xl font-black mb-1" style={{color:nv.cor}}>{score}</p>
            <p className="text-xs text-gray-400 mb-2">de 100 pontos</p>
            <p className="text-lg font-black mb-2" style={{color:nv.cor}}>{nv.label}</p>
            <p className="text-sm text-gray-600 max-w-sm mx-auto">{nv.desc}</p>
          </CardContent>
        </Card>

        {/* Diagnóstico por área */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Diagnóstico por Área</h3>
          <div className="space-y-3">
            {AREAS.map(a=>{
              const s=porArea[a.id]
              const c=s.pct>=70?"#16a34a":s.pct>=45?"#ea580c":"#dc2626"
              const rec=s.pct>=80?"Ponto forte — continue aprofundando."
                :s.pct>=60?"Boa base, mas há gaps a preencher antes do lançamento."
                :s.pct>=40?"Área de atenção — recomendamos estruturação urgente com especialista."
                :"Área crítica — priorize antes de qualquer investimento."
              return (
                <Card key={a.id}><CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
                      <a.icon className="w-4 h-4 text-gray-600"/>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-semibold text-gray-800">{a.label}</p>
                        <p className="text-sm font-black" style={{color:c}}>{s.pct}%</p>
                      </div>
                      <div className="h-2 rounded-full bg-gray-200">
                        <div className="h-2 rounded-full transition-all" style={{width:`${s.pct}%`,background:c}}/>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{rec}</p>
                </CardContent></Card>
              )
            })}
          </div>
        </div>

        {/* Próximos passos */}
        {AREAS.filter(a=>porArea[a.id].pct<60).length>0 && (
          <Card className="border-orange-200 bg-orange-50"><CardContent className="p-4">
            <h3 className="font-bold text-orange-800 mb-3">Próximos Passos Prioritários</h3>
            {AREAS.filter(a=>porArea[a.id].pct<60).slice(0,3).map((a,i)=>(
              <div key={a.id} className="flex items-start gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">{i+1}</span>
                <p className="text-sm text-orange-800"><strong>{a.label}:</strong> estruturar antes do lançamento.</p>
              </div>
            ))}
          </CardContent></Card>
        )}

        {/* Botão PDF */}
        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3" onClick={gerarPDF}>
          <FileText className="w-4 h-4 mr-2"/> Baixar PDF do Relatório Completo
        </Button>

        {/* CTA WhatsApp */}
        <Card className="bg-green-50 border-green-200"><CardContent className="p-5 text-center">
          <div className="flex justify-center gap-0.5 mb-3">
            {[1,2,3,4,5].map(i=><Star key={i} className="w-4 h-4 text-orange-500 fill-orange-500"/>)}
          </div>
          <h3 className="font-black text-gray-900 mb-2">Quer transformar esse diagnóstico em resultados reais?</h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            A Ana Paula e a equipe VIABILIZZE acompanham seu negócio do desenvolvimento à prateleira.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">
            <MessageCircle className="w-5 h-5"/> Falar com a Ana Paula no WhatsApp
          </a>
          <p className="text-xs text-gray-400 mt-2">+55 18 99708-6083 · Resposta em até 24h</p>
        </CardContent></Card>

        <p className="text-xs text-center text-gray-400 pb-4">
          VIABILIZZE Assessoria Industrial · assessoriaviabilizze.com.br · VI.P & NÔUS Consultoria
        </p>
      </div>
    </div>
  )
}
