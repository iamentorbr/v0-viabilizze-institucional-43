'use client'
import { useState, useMemo, useCallback } from 'react'
import {
  ChevronRight, ChevronLeft, FileText, Upload, CheckCircle,
  AlertTriangle, Download, BookOpen, Beaker, Droplets,
  FlaskConical, Leaf, Plus, Trash2, Scale
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// TABELA DE FRUTAS — Base legal:
//   IN MAPA 12/2003 (Suco Tropical Anexo II + Néctar Anexo III)
//   IN MAPA 42/2013 (Néctar laranja/uva: 50%)
//   Decreto 12.709/2025 (Refresco: laranja/tangerina/uva 30%, maçã 20%,
//     maracujá 6%, limão 5%) + IN 19/2013
// ═══════════════════════════════════════════════════════════════════════════
type DadosFruta = {
  label: string
  tropical: boolean            // fruta com padrão de Suco Tropical na IN 12/2003
  acidezAlta: boolean          // acidez elevada / sabor forte (regra 20% néctar)
  stNaoAdocado: number         // % mín. polpa — Suco Tropical NÃO adoçado
  stAdocado: number            // % mín. polpa — Suco Tropical ADOÇADO
  brixST: number               // °Brix mínimo Suco Tropical não adoçado
  nectar: number               // % mín. polpa/suco — Néctar
  brixNectar: number           // °Brix mínimo Néctar
  refresco: number             // % mín. — Refresco
  brixIntegral: number         // °Brix do suco integral (base de cálculo)
  fonteST: string
  fonteNectar: string
  fonteRefresco: string
}

const FRUTAS: Record<string, DadosFruta> = {
  ABACAXI:   { label:'Abacaxi',   tropical:true,  acidezAlta:false, stNaoAdocado:60, stAdocado:50, brixST:6,  nectar:40, brixNectar:11, refresco:30, brixIntegral:11,   fonteST:'IN 12/2003 Anexo II', fonteNectar:'IN 12/2003 Anexo III', fonteRefresco:'IN 19/2013' },
  ACEROLA:   { label:'Acerola',   tropical:true,  acidezAlta:true,  stNaoAdocado:60, stAdocado:35, brixST:5,  nectar:25, brixNectar:10, refresco:10, brixIntegral:5.5,  fonteST:'IN 12/2003 Anexo II', fonteNectar:'IN 12/2003 Anexo III', fonteRefresco:'IN 19/2013' },
  CAJA:      { label:'Cajá',      tropical:true,  acidezAlta:true,  stNaoAdocado:50, stAdocado:35, brixST:8,  nectar:25, brixNectar:11, refresco:10, brixIntegral:9,    fonteST:'IN 12/2003 Anexo II', fonteNectar:'IN 12/2003 Anexo III', fonteRefresco:'IN 19/2013' },
  CAJU:      { label:'Caju',      tropical:true,  acidezAlta:true,  stNaoAdocado:60, stAdocado:25, brixST:5,  nectar:15, brixNectar:10, refresco:10, brixIntegral:10,   fonteST:'IN 12/2003 Anexo II', fonteNectar:'IN 12/2003 Anexo III', fonteRefresco:'IN 19/2013' },
  GOIABA:    { label:'Goiaba',    tropical:true,  acidezAlta:false, stNaoAdocado:50, stAdocado:45, brixST:6,  nectar:35, brixNectar:10, refresco:15, brixIntegral:7,    fonteST:'IN 12/2003 Anexo II', fonteNectar:'IN 12/2003 Anexo III', fonteRefresco:'IN 19/2013' },
  GRAVIOLA:  { label:'Graviola',  tropical:true,  acidezAlta:false, stNaoAdocado:50, stAdocado:35, brixST:8,  nectar:25, brixNectar:11, refresco:15, brixIntegral:8,    fonteST:'IN 12/2003 Anexo II', fonteNectar:'IN 12/2003 Anexo III', fonteRefresco:'IN 19/2013' },
  MAMAO:     { label:'Mamão',     tropical:true,  acidezAlta:false, stNaoAdocado:60, stAdocado:45, brixST:6,  nectar:35, brixNectar:10, refresco:20, brixIntegral:10,   fonteST:'IN 12/2003 Anexo II', fonteNectar:'IN 12/2003 Anexo III', fonteRefresco:'IN 19/2013' },
  MANGA:     { label:'Manga',     tropical:true,  acidezAlta:false, stNaoAdocado:60, stAdocado:50, brixST:10, nectar:40, brixNectar:10, refresco:20, brixIntegral:11,   fonteST:'IN 12/2003 Anexo II', fonteNectar:'IN 12/2003 Anexo III', fonteRefresco:'IN 19/2013' },
  MANGABA:   { label:'Mangaba',   tropical:true,  acidezAlta:false, stNaoAdocado:50, stAdocado:30, brixST:7,  nectar:30, brixNectar:10, refresco:15, brixIntegral:7,    fonteST:'IN 12/2003 Anexo II', fonteNectar:'Regra geral (30%)', fonteRefresco:'IN 19/2013' },
  MARACUJA:  { label:'Maracujá',  tropical:true,  acidezAlta:true,  stNaoAdocado:50, stAdocado:12, brixST:6,  nectar:10, brixNectar:11, refresco:6,  brixIntegral:11,   fonteST:'IN 12/2003 Anexo II', fonteNectar:'IN 12/2003 Anexo III', fonteRefresco:'Decreto 12.709/2025' },
  PITANGA:   { label:'Pitanga',   tropical:true,  acidezAlta:true,  stNaoAdocado:60, stAdocado:35, brixST:5,  nectar:25, brixNectar:10, refresco:15, brixIntegral:7,    fonteST:'IN 12/2003 Anexo II', fonteNectar:'IN 12/2003 Anexo III', fonteRefresco:'IN 19/2013' },
  PESSEGO:   { label:'Pêssego',   tropical:false, acidezAlta:false, stNaoAdocado:50, stAdocado:40, brixST:8,  nectar:40, brixNectar:11, refresco:30, brixIntegral:10.5, fonteST:'Regra geral', fonteNectar:'IN 12/2003 Anexo III', fonteRefresco:'IN 19/2013' },
  LARANJA:   { label:'Laranja',   tropical:false, acidezAlta:false, stNaoAdocado:50, stAdocado:40, brixST:10, nectar:50, brixNectar:11, refresco:30, brixIntegral:10,   fonteST:'Regra geral', fonteNectar:'IN 42/2013 (50%)', fonteRefresco:'Decreto 12.709/2025' },
  UVA:       { label:'Uva',       tropical:false, acidezAlta:false, stNaoAdocado:50, stAdocado:40, brixST:14, nectar:50, brixNectar:14, refresco:30, brixIntegral:14,   fonteST:'Regra geral', fonteNectar:'IN 42/2013 (50%)', fonteRefresco:'Decreto 12.709/2025' },
  TANGERINA: { label:'Tangerina', tropical:false, acidezAlta:false, stNaoAdocado:50, stAdocado:40, brixST:8,  nectar:30, brixNectar:10, refresco:30, brixIntegral:10,   fonteST:'Regra geral', fonteNectar:'Regra geral (30%)', fonteRefresco:'Decreto 12.709/2025' },
  MACA:      { label:'Maçã',      tropical:false, acidezAlta:false, stNaoAdocado:50, stAdocado:40, brixST:9,  nectar:30, brixNectar:10, refresco:20, brixIntegral:10,   fonteST:'Regra geral', fonteNectar:'Regra geral (30%)', fonteRefresco:'Decreto 12.709/2025' },
  LIMAO:     { label:'Limão',     tropical:false, acidezAlta:true,  stNaoAdocado:35, stAdocado:35, brixST:7,  nectar:20, brixNectar:10, refresco:5,  brixIntegral:10,   fonteST:'Regra geral (acidez alta)', fonteNectar:'Regra geral (20% acidez alta)', fonteRefresco:'Decreto 12.709/2025' },
  MORANGO:   { label:'Morango',   tropical:false, acidezAlta:false, stNaoAdocado:50, stAdocado:35, brixST:5.5,nectar:30, brixNectar:10, refresco:5,  brixIntegral:6.5,  fonteST:'Regra geral', fonteNectar:'Regra geral (30%)', fonteRefresco:'IN 19/2013' },
}
type FrutaKey = keyof typeof FRUTAS

// ═══════════════════════════════════════════════════════════════════════════
// TIPOS DE BEBIDA
// ═══════════════════════════════════════════════════════════════════════════
type Tipo = 'SUCO_TROPICAL' | 'NECTAR' | 'REFRESCO' | 'PREPARADO_REFRESCO'

const TIPOS: Record<Tipo, { label:string; icon:any; cor:string; bg:string; desc:string; norma:string; acucar:'OBRIGATORIO'|'OPCIONAL'|'CONDICIONAL' }> = {
  SUCO_TROPICAL: {
    label:'Suco Tropical', icon:Droplets, cor:'#1565c0', bg:'#e3f2fd',
    desc:'Dissolução de polpa de fruta tropical em água potável. Não adoçado (50–60% polpa) ou adoçado (12–50%).',
    norma:'IN MAPA 12/2003 · Decreto 12.709/2025', acucar:'CONDICIONAL',
  },
  NECTAR: {
    label:'Néctar', icon:Leaf, cor:'#2e7d32', bg:'#e8f5e9',
    desc:'Diluição de polpa em água com adição OBRIGATÓRIA de açúcares. Mínimo de polpa: 10–50% conforme fruta.',
    norma:'IN MAPA 12/2003 · IN 42/2013 · Decreto 12.709/2025', acucar:'OBRIGATORIO',
  },
  REFRESCO: {
    label:'Refresco', icon:FlaskConical, cor:'#F97316', bg:'#fff3e0',
    desc:'Diluição de suco ou polpa em água, com ou sem açúcares. Mínimos: 5–30% conforme fruta.',
    norma:'Decreto 12.709/2025 · IN 19/2013', acucar:'OPCIONAL',
  },
  PREPARADO_REFRESCO: {
    label:'Preparado para Refresco', icon:Beaker, cor:'#8e24aa', bg:'#f3e5f5',
    desc:'Concentrado líquido ou sólido que, após diluição, deve apresentar as características do refresco correspondente.',
    norma:'Decreto 12.709/2025 (Arts. 27–31)', acucar:'OPCIONAL',
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// ENGINE DE CÁLCULO
// ═══════════════════════════════════════════════════════════════════════════
const r2 = (v:number) => Math.round(v*100)/100
const r4 = (v:number) => Math.round(v*10000)/10000

type FrutaMista = { fruta: FrutaKey; participacao: number }

/** % mínimo legal conforme tipo, fruta(s) e regime */
function getMinimoLegal(
  tipo: Tipo, frutas: FrutaMista[], adocado: boolean, fatorDiluicao: number
): { pct:number; fonte:string } {
  const isMisto = frutas.length > 1

  if (tipo === 'SUCO_TROPICAL') {
    // Misto: média ponderada dos mínimos individuais (Sumo Tropical Misto)
    const pct = frutas.reduce((s,f) => {
      const d = FRUTAS[f.fruta]
      const min = adocado ? d.stAdocado : d.stNaoAdocado
      return s + min * (f.participacao/100)
    }, 0)
    return {
      pct: r2(pct),
      fonte: isMisto
        ? 'Suco Tropical Misto — média ponderada dos mínimos (IN 12/2003)'
        : FRUTAS[frutas[0].fruta].fonteST + (adocado ? ' (adoçado)' : ' (não adoçado)'),
    }
  }

  if (tipo === 'NECTAR') {
    if (isMisto) {
      // Néctar misto: 30% total; 20% se houver fruta de acidez elevada
      const temAcidezAlta = frutas.some(f => FRUTAS[f.fruta].acidezAlta)
      return {
        pct: temAcidezAlta ? 20 : 30,
        fonte: `Néctar Misto — regra geral ${temAcidezAlta ? '20% (acidez elevada na mistura)' : '30%'} (Decreto 12.709/2025)`,
      }
    }
    return { pct: FRUTAS[frutas[0].fruta].nectar, fonte: FRUTAS[frutas[0].fruta].fonteNectar }
  }

  if (tipo === 'REFRESCO') {
    if (isMisto) {
      return { pct: 10, fonte: 'Refresco Misto — mínimo 10% de polpa total (IN 19/2013)' }
    }
    return { pct: FRUTAS[frutas[0].fruta].refresco, fonte: FRUTAS[frutas[0].fruta].fonteRefresco }
  }

  // PREPARADO — % mínimo do refresco × (fator de diluição + 1)
  const base = isMisto ? 10 : FRUTAS[frutas[0].fruta].refresco
  const concentracao = fatorDiluicao + 1
  return {
    pct: r2(base * concentracao),
    fonte: `Preparado 1:${fatorDiluicao} — ${base}% do refresco × ${concentracao} (Decreto 12.709/2025 Art. 28)`,
  }
}

/** °Brix de referência (ponderado no misto) */
function getBrixReferencia(tipo: Tipo, frutas: FrutaMista[]): number {
  const campo = tipo === 'NECTAR' ? 'brixNectar' : tipo === 'SUCO_TROPICAL' ? 'brixST' : 'brixIntegral'
  return r2(frutas.reduce((s,f) => s + (FRUTAS[f.fruta] as any)[campo] * (f.participacao/100), 0))
}

/** % polpa calculado pela fórmula de Brix (planilha VIABILIZZE) */
function calcPolpa(brixLeg:number, fator:number, brixConc:number): number {
  return brixConc > 0 ? r2((brixLeg * fator / brixConc) * 100) : 0
}

/** Cálculos de açúcar — g/100mL e % m/v */
function calcAcucar(kgAcucar:number, volumeLitros:number, tipo:Tipo, adocado:boolean) {
  const gPor100ml = volumeLitros > 0 ? r2((kgAcucar / volumeLitros) * 100) : 0  // kg/L×100 = g/100mL
  const pctMV = gPor100ml   // g/100mL numericamente = % m/v
  // Limite: suco tropical adoçado → máx 10 g/100 g (~10% m/m ≈ m/v para densidade ~1)
  const limiteMax = tipo === 'SUCO_TROPICAL' ? 10 : null
  const acimaDoLimite = limiteMax !== null && adocado && pctMV > limiteMax
  const obrigatorio = TIPOS[tipo].acucar === 'OBRIGATORIO'
  const faltando = obrigatorio && kgAcucar <= 0
  return { gPor100ml, pctMV, limiteMax, acimaDoLimite, obrigatorio, faltando }
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTE
// ═══════════════════════════════════════════════════════════════════════════
export default function CalculadoraDesenvolvimento() {
  const [tela, setTela]         = useState<'manual'|'tipo'|'calculo'|'resultado'>('manual')
  const [tipo, setTipo]         = useState<Tipo|null>(null)
  const [modoMisto, setMisto]   = useState(false)
  const [frutas, setFrutas]     = useState<FrutaMista[]>([{ fruta:'LARANJA', participacao:100 }])
  const [adocado, setAdocado]   = useState(false)
  const [fatorDiluicao, setFD]  = useState(3)
  const [volume, setVolume]     = useState(1000)
  const [brixConc, setBrixConc] = useState(65)
  const [fatorCorr, setFC]      = useState(1.032)
  const [kgAcucar, setKgAcucar] = useState(0)
  const [arquivo, setArquivo]   = useState<File|null>(null)

  const cfg = tipo ? TIPOS[tipo] : null
  const somaParticipacao = frutas.reduce((s,f) => s + f.participacao, 0)

  const resultado = useMemo(() => {
    if (!tipo || somaParticipacao !== 100) return null
    const minimo   = getMinimoLegal(tipo, frutas, adocado, fatorDiluicao)
    const brixLeg  = getBrixReferencia(tipo, frutas)
    const pctCalc  = calcPolpa(brixLeg, fatorCorr, brixConc)
    const qtdKg    = r2((pctCalc/100) * volume)
    const por100ml = r4(qtdKg / volume * 100)
    const acucar   = calcAcucar(kgAcucar, volume, tipo, adocado)
    const conforme = pctCalc >= minimo.pct && !acucar.acimaDoLimite && !acucar.faltando
    return { minimo, brixLeg, pctCalc, qtdKg, por100ml, acucar, conforme, margem: r2(pctCalc - minimo.pct) }
  }, [tipo, frutas, adocado, fatorDiluicao, volume, brixConc, fatorCorr, kgAcucar, somaParticipacao])

  // ── Frutas do misto ────────────────────────────────────────────────────
  const addFruta = () => {
    const usadas = frutas.map(f => f.fruta)
    const prox = (Object.keys(FRUTAS) as FrutaKey[]).find(k => !usadas.includes(k))
    if (prox) {
      const novas = [...frutas, { fruta: prox, participacao: 0 }]
      setFrutas(novas)
    }
  }
  const rmFruta = (i:number) => {
    if (frutas.length <= 1) return
    const novas = frutas.filter((_,idx) => idx !== i)
    if (novas.length === 1) novas[0].participacao = 100
    setFrutas(novas)
  }
  const setFruta = (i:number, key:FrutaKey) => {
    const novas = [...frutas]; novas[i] = { ...novas[i], fruta:key }; setFrutas(novas)
  }
  const setPart = (i:number, v:number) => {
    const novas = [...frutas]; novas[i] = { ...novas[i], participacao: Math.max(0, Math.min(100, v)) }; setFrutas(novas)
  }

  // ── PDF ─────────────────────────────────────────────────────────────────
  const gerarPDF = useCallback(() => {
    if (!resultado || !tipo || !cfg) return
    const nomeFrutas = frutas.map(f => `${FRUTAS[f.fruta].label}${frutas.length>1 ? ` (${f.participacao}%)` : ''}`).join(' + ')
    const data = new Date().toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' })
    const isMisto = frutas.length > 1

    const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/>
<title>Fórmula — ${nomeFrutas} ${cfg.label}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;color:#1a1d23;padding:32px;font-size:12px;line-height:1.6}
@media print{body{padding:16px}.np{display:none}@page{margin:16mm;size:A4}}
h2{font-size:14px;font-weight:700;margin:20px 0 10px;border-bottom:2px solid ${cfg.cor};padding-bottom:4px}
table{width:100%;border-collapse:collapse;margin-bottom:14px}
th{background:#1a1d23;color:#fff;padding:7px 10px;text-align:left;font-size:11px}
td{padding:7px 10px;border-bottom:1px solid #f0f2f5}
tr:nth-child(even) td{background:#fafafa}
.ok{color:#2e7d32;font-weight:700}.err{color:#c62828;font-weight:700}
.big{font-size:18px;font-weight:900;color:${cfg.cor}}</style></head><body>
<button class="np" onclick="window.print()" style="background:${cfg.cor};color:#fff;border:none;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer;margin-bottom:20px">🖨️ Imprimir / Salvar PDF</button>

<div style="display:flex;justify-content:space-between;margin-bottom:20px;padding-bottom:14px;border-bottom:3px solid ${cfg.cor}">
  <div><p style="font-size:20px;font-weight:900;color:#F97316">VIABILIZZE</p>
  <p style="font-size:10px;color:#9aa0a6">ASSESSORIA INDUSTRIAL · Calculadora de Desenvolvimento</p></div>
  <div style="text-align:right"><p style="font-size:14px;font-weight:700">${nomeFrutas}</p>
  <p style="font-size:11px;color:${cfg.cor};font-weight:700">${cfg.label}${isMisto?' MISTO':''}${adocado&&tipo==='SUCO_TROPICAL'?' — Adoçado':''}</p>
  <p style="font-size:10px;color:#9aa0a6">${data} · ${cfg.norma}</p></div>
</div>

<h2>Parâmetros da Formulação</h2>
<table><tr><th>Parâmetro</th><th>Valor</th></tr>
<tr><td>Tipo de bebida</td><td>${cfg.label}${isMisto?' Misto':''}</td></tr>
<tr><td>Composição de frutas</td><td>${nomeFrutas}</td></tr>
${tipo==='SUCO_TROPICAL'?`<tr><td>Regime</td><td>${adocado?'Adoçado':'Não adoçado'}</td></tr>`:''}
${tipo==='PREPARADO_REFRESCO'?`<tr><td>Fator de diluição</td><td>1:${fatorDiluicao} (concentração ${fatorDiluicao+1}×)</td></tr>`:''}
<tr><td>Volume da formulação</td><td>${volume.toLocaleString('pt-BR')} L</td></tr>
<tr><td>Brix do concentrado utilizado</td><td>${brixConc}°Bx</td></tr>
<tr><td>Brix de referência (legislação)</td><td>${resultado.brixLeg}°Bx</td></tr>
<tr><td>Fator de correção</td><td>${fatorCorr}</td></tr></table>

<h2>Cálculo de Polpa / Suco</h2>
<table><tr><th>Item</th><th>Valor</th></tr>
<tr><td>% Polpa calculado</td><td><span class="big">${resultado.pctCalc}%</span></td></tr>
<tr><td>% Mínimo legal</td><td>${resultado.minimo.pct}%</td></tr>
<tr><td>Base legal</td><td>${resultado.minimo.fonte}</td></tr>
<tr><td>Margem</td><td class="${resultado.margem>=0?'ok':'err'}">${resultado.margem>0?'+':''}${resultado.margem} p.p.</td></tr>
<tr><td>Qtd. concentrado total</td><td><strong>${resultado.qtdKg.toLocaleString('pt-BR')} kg</strong></td></tr>
<tr><td>Qtd. por 100 mL</td><td>${resultado.por100ml.toLocaleString('pt-BR')} g</td></tr></table>

<h2>Açúcares</h2>
<table><tr><th>Item</th><th>Valor</th></tr>
<tr><td>Regra para ${cfg.label}</td><td>${cfg.acucar==='OBRIGATORIO'?'Adição OBRIGATÓRIA':cfg.acucar==='OPCIONAL'?'Adição opcional (se houver → "adoçado")':'Opcional — máx. 10 g/100 g no adoçado'}</td></tr>
<tr><td>Quantidade utilizada</td><td>${kgAcucar.toLocaleString('pt-BR')} kg</td></tr>
<tr><td>Quantidade por 100 mL</td><td><strong>${resultado.acucar.gPor100ml.toLocaleString('pt-BR')} g/100 mL</strong></td></tr>
<tr><td>Percentual (m/v)</td><td><strong>${resultado.acucar.pctMV.toLocaleString('pt-BR')}%</strong></td></tr>
${resultado.acucar.limiteMax?`<tr><td>Limite legal (adoçado)</td><td class="${resultado.acucar.acimaDoLimite?'err':'ok'}">máx. ${resultado.acucar.limiteMax}% — ${resultado.acucar.acimaDoLimite?'ACIMA DO LIMITE':'dentro do limite'}</td></tr>`:''}
${resultado.acucar.faltando?`<tr><td>Atenção</td><td class="err">Néctar exige adição de açúcares — informe a quantidade</td></tr>`:''}</table>

<h2>Conformidade</h2>
<p class="${resultado.conforme?'ok':'err'}" style="font-size:14px">
${resultado.conforme
  ? `✓ FORMULAÇÃO CONFORME — ${resultado.pctCalc}% de polpa atende ao mínimo de ${resultado.minimo.pct}%.`
  : `⚠ FORMULAÇÃO NÃO CONFORME — verifique os itens sinalizados acima.`}</p>

<div style="margin-top:24px;padding-top:10px;border-top:1px solid #e8eaed;display:flex;justify-content:space-between">
<p style="font-size:9px;color:#9aa0a6">VIABILIZZE Assessoria Industrial · assessoriaviabilizze.com.br</p>
<p style="font-size:9px;color:#9aa0a6">Desenvolvido por VI.P & NÔUS Consultoria</p></div>
</body></html>`
    const w = window.open('','_blank','width=900,height=700')
    if (w) { w.document.write(html); w.document.close(); w.focus() }
  }, [resultado, tipo, cfg, frutas, adocado, fatorDiluicao, volume, brixConc, fatorCorr, kgAcucar])

  // ═══ TELAS ══════════════════════════════════════════════════════════════
  const s = ST

  if (tela === 'manual') return (
    <div style={s.page}><div style={s.card}>
      <div style={{ textAlign:'center', marginBottom:24 }}>
        <div style={s.iconBox('#fff3e0')}><BookOpen size={28} color="#F97316"/></div>
        <h1 style={s.h1}>Calculadora de Desenvolvimento</h1>
        <p style={s.sub}>VIABILIZZE Assessoria Industrial · Conforme legislação MAPA vigente</p>
      </div>
      <div style={{ background:'#fafafa', borderRadius:12, padding:20, marginBottom:20, border:'1px solid #e8eaed' }}>
        <h2 style={{ fontSize:14, fontWeight:700, color:'#1a1d23', margin:'0 0 14px' }}>📋 Manual de Uso</h2>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {[
            { n:'1', t:'4 calculadoras', d:'Suco Tropical, Néctar, Refresco e Preparado para Refresco — cada uma com limites legais próprios (IN 12/2003, IN 42/2013, IN 19/2013 e Decreto 12.709/2025).' },
            { n:'2', t:'Bebida mista', d:'Adicione 2 ou mais frutas com o percentual de participação de cada uma — o sistema calcula o mínimo legal da mistura automaticamente.' },
            { n:'3', t:'Açúcares', d:'Informe a quantidade de açúcar e receba g/100mL e % (m/v), com validação dos limites legais por tipo de bebida.' },
            { n:'4', t:'PDF + Upload', d:'Exporte a fórmula pronta em PDF ou faça upload de tabela com produtos já produzidos para verificação.' },
          ].map(i => (
            <div key={i.n} style={{ background:'#fff', borderRadius:10, padding:14, border:'1px solid #e8eaed' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                <span style={{ width:22, height:22, borderRadius:'50%', background:'#F97316', color:'#fff', fontSize:11, fontWeight:900, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{i.n}</span>
                <span style={{ fontSize:12, fontWeight:700, color:'#1a1d23' }}>{i.t}</span>
              </div>
              <p style={{ fontSize:11, color:'#5f6368', margin:0, lineHeight:1.6 }}>{i.d}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:'#e3f2fd', border:'1px solid #90caf9', borderRadius:10, padding:'10px 14px', marginBottom:20, display:'flex', gap:8 }}>
        <Scale size={14} color="#1565c0" style={{ flexShrink:0, marginTop:2 }}/>
        <p style={{ fontSize:11, color:'#1565c0', margin:0 }}>
          <strong>Base legal atualizada:</strong> Decreto 12.709/2025 (vigente desde 31/10/2025, substituiu o Decreto 6.871/2009),
          IN MAPA 12/2003, IN 42/2013 e IN 19/2013.
        </p>
      </div>
      <button onClick={() => setTela('tipo')} style={s.btnPrimary}>
        Iniciar Calculadora <ChevronRight size={16}/>
      </button>
    </div></div>
  )

  if (tela === 'tipo') return (
    <div style={s.page}><div style={s.card}>
      <button onClick={() => setTela('manual')} style={s.btnBack}><ChevronLeft size={14}/> Voltar</button>
      <h1 style={s.h1}>Selecione o Tipo de Bebida</h1>
      <p style={{ ...s.sub, marginBottom:24 }}>Cada tipo tem parâmetros e limites legais próprios</p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        {(Object.entries(TIPOS) as [Tipo, typeof TIPOS[Tipo]][]).map(([key, c]) => (
          <button key={key} onClick={() => { setTipo(key); setTela('calculo') }}
            style={{ textAlign:'left', padding:20, borderRadius:14, cursor:'pointer', border:`2px solid ${c.bg}`, background:'#fff', transition:'all .15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = c.cor }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = c.bg }}>
            <div style={{ width:40, height:40, borderRadius:10, background:c.bg, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}>
              <c.icon size={20} color={c.cor}/>
            </div>
            <p style={{ fontSize:14, fontWeight:700, color:'#1a1d23', margin:'0 0 4px' }}>{c.label}</p>
            <p style={{ fontSize:11, color:'#5f6368', margin:'0 0 8px', lineHeight:1.5 }}>{c.desc}</p>
            <p style={{ fontSize:10, fontWeight:700, color:c.cor, margin:0 }}>{c.norma}</p>
          </button>
        ))}
      </div>
    </div></div>
  )

  if (tela === 'calculo' && tipo && cfg) return (
    <div style={s.page}><div style={{ ...s.card, maxWidth:780 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <button onClick={() => setTela('tipo')} style={s.btnBack}><ChevronLeft size={14}/> Tipos</button>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:cfg.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <cfg.icon size={16} color={cfg.cor}/>
          </div>
          <div>
            <p style={{ fontSize:14, fontWeight:700, color:'#1a1d23', margin:0 }}>{cfg.label}</p>
            <p style={{ fontSize:10, color:'#9aa0a6', margin:0 }}>{cfg.norma}</p>
          </div>
        </div>
      </div>

      {/* Upload */}
      <div style={{ background:'#fafafa', border:'1px dashed #dadce0', borderRadius:12, padding:14, marginBottom:18 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <Upload size={16} color="#9aa0a6"/>
          <p style={{ flex:1, fontSize:11, color:'#9aa0a6', margin:0 }}>Upload de tabela pronta (opcional)</p>
          <label style={{ cursor:'pointer', background:'#fff', border:'1px solid #dadce0', borderRadius:8, padding:'5px 12px', fontSize:11, fontWeight:600, color:'#5f6368' }}>
            {arquivo ? arquivo.name : 'Escolher arquivo'}
            <input type="file" accept=".xlsx,.csv" style={{ display:'none' }} onChange={e => setArquivo(e.target.files?.[0] || null)}/>
          </label>
        </div>
      </div>

      {/* MODO: única ou mista */}
      <div style={{ display:'flex', gap:10, marginBottom:18 }}>
        {[{ v:false, l:'Fruta única' }, { v:true, l:'Bebida mista (2+ frutas)' }].map(m => (
          <button key={String(m.v)} onClick={() => {
            setMisto(m.v)
            if (!m.v) setFrutas([{ fruta: frutas[0].fruta, participacao:100 }])
            else if (frutas.length === 1) setFrutas([{ ...frutas[0], participacao:50 }, { fruta: frutas[0].fruta === 'LARANJA' ? 'MACA' : 'LARANJA', participacao:50 }])
          }}
            style={{ flex:1, padding:'10px 14px', borderRadius:10, cursor:'pointer', fontSize:12, fontWeight:700,
              border:`2px solid ${modoMisto === m.v ? cfg.cor : '#e8eaed'}`,
              background: modoMisto === m.v ? cfg.bg : '#fff',
              color: modoMisto === m.v ? cfg.cor : '#5f6368' }}>
            {m.l}
          </button>
        ))}
      </div>

      {/* FRUTAS */}
      <div style={{ marginBottom:18 }}>
        <label style={s.label}>{modoMisto ? 'Composição de frutas (soma deve ser 100%)' : 'Fruta / Sabor'}</label>
        {frutas.map((f, i) => (
          <div key={i} style={{ display:'flex', gap:8, marginBottom:8, alignItems:'center' }}>
            <select value={f.fruta} onChange={e => setFruta(i, e.target.value as FrutaKey)} style={{ ...s.input, flex:1 }}>
              {(Object.entries(FRUTAS)).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}{tipo === 'SUCO_TROPICAL' && !v.tropical ? ' (não tropical — regra geral)' : ''}
                </option>
              ))}
            </select>
            {modoMisto && (
              <>
                <input type="number" min={0} max={100} value={f.participacao}
                  onChange={e => setPart(i, Number(e.target.value))}
                  style={{ ...s.input, width:80, textAlign:'right' }}/>
                <span style={{ fontSize:12, color:'#9aa0a6' }}>%</span>
                <button onClick={() => rmFruta(i)} disabled={frutas.length <= 2}
                  style={{ background:'none', border:'none', cursor:'pointer', color: frutas.length <= 2 ? '#e8eaed' : '#c62828', padding:4 }}>
                  <Trash2 size={15}/>
                </button>
              </>
            )}
          </div>
        ))}
        {modoMisto && (
          <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:6 }}>
            <button onClick={addFruta} style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#fff', border:`1px solid ${cfg.cor}`, color:cfg.cor, borderRadius:8, padding:'6px 12px', fontSize:11, fontWeight:700, cursor:'pointer' }}>
              <Plus size={13}/> Adicionar fruta
            </button>
            <span style={{ fontSize:11, fontWeight:700, color: somaParticipacao === 100 ? '#2e7d32' : '#c62828' }}>
              Soma: {somaParticipacao}% {somaParticipacao === 100 ? '✓' : '(ajuste para 100%)'}
            </span>
          </div>
        )}
      </div>

      {/* Suco Tropical: adoçado */}
      {tipo === 'SUCO_TROPICAL' && (
        <div style={{ display:'flex', gap:10, marginBottom:18 }}>
          {[{ v:false, l:'Não adoçado (50–60% polpa)' }, { v:true, l:'Adoçado (máx. 10% açúcar)' }].map(m => (
            <button key={String(m.v)} onClick={() => setAdocado(m.v)}
              style={{ flex:1, padding:'10px 14px', borderRadius:10, cursor:'pointer', fontSize:12, fontWeight:700,
                border:`2px solid ${adocado === m.v ? '#1565c0' : '#e8eaed'}`,
                background: adocado === m.v ? '#e3f2fd' : '#fff',
                color: adocado === m.v ? '#1565c0' : '#5f6368' }}>
              {m.l}
            </button>
          ))}
        </div>
      )}

      {/* Preparado: fator diluição */}
      {tipo === 'PREPARADO_REFRESCO' && (
        <div style={{ marginBottom:18 }}>
          <label style={s.label}>Fator de diluição (1 parte de preparado : N partes de água)</label>
          <div style={{ display:'flex', gap:8 }}>
            {[2,3,4,5,6].map(n => (
              <button key={n} onClick={() => setFD(n)}
                style={{ flex:1, padding:'10px', borderRadius:10, cursor:'pointer', fontSize:13, fontWeight:900,
                  border:`2px solid ${fatorDiluicao === n ? '#8e24aa' : '#e8eaed'}`,
                  background: fatorDiluicao === n ? '#f3e5f5' : '#fff',
                  color: fatorDiluicao === n ? '#8e24aa' : '#5f6368' }}>
                1:{n}
              </button>
            ))}
          </div>
          <p style={{ fontSize:10, color:'#9aa0a6', margin:'6px 0 0' }}>
            O preparado diluído deve apresentar as características do refresco correspondente (Decreto 12.709/2025, Art. 28)
          </p>
        </div>
      )}

      {/* Parâmetros técnicos */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14, marginBottom:18 }}>
        <div>
          <label style={s.label}>Volume da formulação (L)</label>
          <input type="number" min={1} value={volume} onChange={e => setVolume(Number(e.target.value))} style={s.input}/>
        </div>
        <div>
          <label style={s.label}>Brix do concentrado (°Bx)</label>
          <input type="number" min={1} step={0.1} value={brixConc} onChange={e => setBrixConc(Number(e.target.value))} style={s.input}/>
        </div>
        <div>
          <label style={s.label}>Fator de correção</label>
          <input type="number" min={1} step={0.001} value={fatorCorr} onChange={e => setFC(Number(e.target.value))} style={s.input}/>
        </div>
      </div>

      {/* Açúcar */}
      <div style={{ background:cfg.bg, borderRadius:12, padding:16, marginBottom:20, border:`1px solid ${cfg.cor}30` }}>
        <p style={{ fontSize:12, fontWeight:700, color:cfg.cor, margin:'0 0 4px' }}>
          Açúcares — {cfg.acucar === 'OBRIGATORIO' ? 'adição OBRIGATÓRIA (néctar)' : cfg.acucar === 'OPCIONAL' ? 'adição opcional' : adocado ? 'adoçado: máx. 10 g/100 g' : 'não adoçado: sem adição'}
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginTop:10 }}>
          <div>
            <label style={s.label}>Açúcar utilizado (kg)</label>
            <input type="number" min={0} step={0.01} value={kgAcucar}
              onChange={e => setKgAcucar(Number(e.target.value))} style={s.input}
              disabled={tipo === 'SUCO_TROPICAL' && !adocado}/>
          </div>
          <div>
            <label style={s.label}>g / 100 mL</label>
            <input readOnly value={volume > 0 ? r2((kgAcucar/volume)*100) : 0}
              style={{ ...s.input, background:'#fff', fontWeight:700, color:cfg.cor }}/>
          </div>
          <div>
            <label style={s.label}>% (m/v)</label>
            <input readOnly value={volume > 0 ? r2((kgAcucar/volume)*100) : 0}
              style={{ ...s.input, background:'#fff', fontWeight:700, color:cfg.cor }}/>
          </div>
        </div>
      </div>

      <button onClick={() => setTela('resultado')} disabled={somaParticipacao !== 100}
        style={{ ...s.btnPrimary, background: somaParticipacao === 100 ? cfg.cor : '#ccc' }}>
        Calcular <ChevronRight size={16}/>
      </button>
    </div></div>
  )

  if (tela === 'resultado' && tipo && cfg && resultado) {
    const nomeFrutas = frutas.map(f => `${FRUTAS[f.fruta].label}${frutas.length>1 ? ` ${f.participacao}%` : ''}`).join(' + ')
    return (
      <div style={s.page}><div style={{ ...s.card, maxWidth:800 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18, flexWrap:'wrap', gap:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <button onClick={() => setTela('calculo')} style={s.btnBack}><ChevronLeft size={14}/> Editar</button>
            <div>
              <p style={{ fontSize:14, fontWeight:700, color:'#1a1d23', margin:0 }}>{nomeFrutas}</p>
              <p style={{ fontSize:11, color:cfg.cor, fontWeight:700, margin:0 }}>
                {cfg.label}{frutas.length > 1 ? ' MISTO' : ''}{tipo === 'SUCO_TROPICAL' ? (adocado ? ' · Adoçado' : ' · Não adoçado') : ''}{tipo === 'PREPARADO_REFRESCO' ? ` · Diluição 1:${fatorDiluicao}` : ''}
              </p>
            </div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={() => setTela('calculo')} style={s.btnSecondary}><Upload size={13}/> Corrigir</button>
            <button onClick={gerarPDF} style={{ ...s.btnPrimary, width:'auto', padding:'8px 16px', background:cfg.cor }}>
              <Download size={13}/> PDF
            </button>
          </div>
        </div>

        {/* Selo */}
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 16px', borderRadius:12, marginBottom:18,
          background: resultado.conforme ? '#e8f5e9' : '#fce4ec',
          border:`1px solid ${resultado.conforme ? '#a5d6a7' : '#f48fb1'}` }}>
          {resultado.conforme ? <CheckCircle size={20} color="#2e7d32"/> : <AlertTriangle size={20} color="#c62828"/>}
          <div>
            <p style={{ fontSize:13, fontWeight:700, margin:0, color: resultado.conforme ? '#2e7d32' : '#c62828' }}>
              {resultado.conforme ? 'FORMULAÇÃO CONFORME' : 'FORMULAÇÃO NÃO CONFORME'}
            </p>
            <p style={{ fontSize:11, color:'#5f6368', margin:0 }}>{resultado.minimo.fonte}</p>
          </div>
        </div>

        {/* Polpa */}
        <div style={{ background:'#fff', borderRadius:12, overflow:'hidden', border:'1px solid #e8eaed', marginBottom:14 }}>
          <div style={{ background:'#1a1d23', padding:'10px 16px' }}>
            <p style={{ fontSize:12, fontWeight:700, color:'#fff', margin:0 }}>POLPA / SUCO</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)' }}>
            {[
              { l:'Brix referência (lei)', v:`${resultado.brixLeg}°Bx`, c:'#1a1d23' },
              { l:'% Mínimo legal', v:`${resultado.minimo.pct}%`, c:cfg.cor },
              { l:'% Polpa calculado', v:`${resultado.pctCalc}%`, c: resultado.pctCalc >= resultado.minimo.pct ? '#2e7d32' : '#c62828', bold:true },
              { l:'Margem', v:`${resultado.margem>0?'+':''}${resultado.margem} p.p.`, c: resultado.margem>=0 ? '#2e7d32' : '#c62828' },
              { l:'Qtd. concentrado total', v:`${resultado.qtdKg.toLocaleString('pt-BR')} kg`, c:cfg.cor, bold:true },
              { l:'Qtd. por 100 mL', v:`${resultado.por100ml.toLocaleString('pt-BR')} g`, c:'#1a1d23' },
            ].map((c,i) => (
              <div key={i} style={{ padding:16, borderRight: i%3 !== 2 ? '1px solid #f0f2f5' : 'none', borderBottom: i<3 ? '1px solid #f0f2f5' : 'none' }}>
                <p style={{ fontSize:11, color:'#9aa0a6', margin:'0 0 4px' }}>{c.l}</p>
                <p style={{ fontSize:(c as any).bold ? 20 : 15, fontWeight:900, color:c.c, margin:0 }}>{c.v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Açúcar */}
        <div style={{ background:'#fff', borderRadius:12, overflow:'hidden', border:'1px solid #e8eaed', marginBottom:14 }}>
          <div style={{ background:'#1a1d23', padding:'10px 16px', display:'flex', alignItems:'center', gap:10 }}>
            <p style={{ fontSize:12, fontWeight:700, color:'#fff', margin:0 }}>AÇÚCARES</p>
            {resultado.acucar.faltando && <span style={{ fontSize:10, fontWeight:900, background:'#c62828', color:'#fff', padding:'2px 8px', borderRadius:99 }}>OBRIGATÓRIO — FALTANDO</span>}
            {resultado.acucar.acimaDoLimite && <span style={{ fontSize:10, fontWeight:900, background:'#c62828', color:'#fff', padding:'2px 8px', borderRadius:99 }}>ACIMA DO LIMITE 10%</span>}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)' }}>
            {[
              { l:'Quantidade utilizada', v:`${kgAcucar.toLocaleString('pt-BR')} kg` },
              { l:'Quantidade por 100 mL', v:`${resultado.acucar.gPor100ml.toLocaleString('pt-BR')} g`, bold:true },
              { l:'Percentual (m/v)', v:`${resultado.acucar.pctMV.toLocaleString('pt-BR')}%`, bold:true },
            ].map((c,i) => (
              <div key={i} style={{ padding:16, borderRight: i%3 !== 2 ? '1px solid #f0f2f5' : 'none' }}>
                <p style={{ fontSize:11, color:'#9aa0a6', margin:'0 0 4px' }}>{c.l}</p>
                <p style={{ fontSize:(c as any).bold ? 18 : 14, fontWeight:(c as any).bold ? 900 : 600, color:'#1a1d23', margin:0 }}>{c.v}</p>
              </div>
            ))}
          </div>
          <div style={{ padding:'10px 16px', background:'#fafafa', borderTop:'1px solid #f0f2f5' }}>
            <p style={{ fontSize:11, color:'#5f6368', margin:0 }}>
              {cfg.acucar === 'OBRIGATORIO' && 'Néctar: adição de açúcares é obrigatória por definição legal (Decreto 12.709/2025).'}
              {cfg.acucar === 'OPCIONAL' && 'Refresco/Preparado: açúcar opcional — se adicionado, denominação recebe "adoçado".'}
              {cfg.acucar === 'CONDICIONAL' && (adocado ? 'Suco Tropical adoçado: máximo 10 g de açúcar por 100 g de produto.' : 'Suco Tropical não adoçado: sem adição de açúcares.')}
            </p>
          </div>
        </div>

        {/* Composição do misto */}
        {frutas.length > 1 && (
          <div style={{ background:'#fff', borderRadius:12, overflow:'hidden', border:'1px solid #e8eaed', marginBottom:14 }}>
            <div style={{ background:'#1a1d23', padding:'10px 16px' }}>
              <p style={{ fontSize:12, fontWeight:700, color:'#fff', margin:0 }}>COMPOSIÇÃO DA MISTURA</p>
            </div>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
              <thead><tr style={{ background:'#fafafa' }}>
                <th style={{ padding:'8px 16px', textAlign:'left', color:'#5f6368', fontSize:11 }}>Fruta</th>
                <th style={{ padding:'8px 16px', textAlign:'right', color:'#5f6368', fontSize:11 }}>Participação</th>
                <th style={{ padding:'8px 16px', textAlign:'right', color:'#5f6368', fontSize:11 }}>Mínimo individual</th>
                <th style={{ padding:'8px 16px', textAlign:'right', color:'#5f6368', fontSize:11 }}>Contribuição</th>
              </tr></thead>
              <tbody>
                {frutas.map((f,i) => {
                  const d = FRUTAS[f.fruta]
                  const minInd = tipo === 'SUCO_TROPICAL' ? (adocado ? d.stAdocado : d.stNaoAdocado)
                    : tipo === 'NECTAR' ? d.nectar : d.refresco
                  return (
                    <tr key={i} style={{ borderTop:'1px solid #f0f2f5' }}>
                      <td style={{ padding:'8px 16px', fontWeight:600, color:'#1a1d23' }}>{d.label}{d.acidezAlta ? ' ⚡' : ''}</td>
                      <td style={{ padding:'8px 16px', textAlign:'right', color:'#5f6368' }}>{f.participacao}%</td>
                      <td style={{ padding:'8px 16px', textAlign:'right', color:cfg.cor }}>{minInd}%</td>
                      <td style={{ padding:'8px 16px', textAlign:'right', fontWeight:700, color:'#1a1d23' }}>{r2(minInd * f.participacao/100)}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <p style={{ fontSize:10, color:'#9aa0a6', margin:0, padding:'8px 16px', background:'#fafafa' }}>
              ⚡ = fruta de acidez elevada/sabor forte (regra do mínimo reduzido no néctar misto)
            </p>
          </div>
        )}

        {/* Ações */}
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          <button onClick={() => { setTela('tipo'); setTipo(null) }} style={s.btnSecondary}>Nova calculadora</button>
          <button onClick={gerarPDF} style={{ ...s.btnPrimary, width:'auto', flex:1, background:cfg.cor }}>
            <FileText size={14}/> Gerar PDF da Fórmula
          </button>
        </div>
        <p style={{ fontSize:10, color:'#9aa0a6', marginTop:16, textAlign:'center' }}>
          Calculadora VIABILIZZE · Decreto 12.709/2025 · IN 12/2003 · IN 42/2013 · IN 19/2013 · VI.P & NÔUS Consultoria
        </p>
      </div></div>
    )
  }

  return null
}

// ═══ ESTILOS ═════════════════════════════════════════════════════════════════
const ST = {
  page: { minHeight:'100vh', display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'32px 16px', background:'#f0f2f5', fontFamily:'Arial,sans-serif' } as React.CSSProperties,
  card: { width:'100%', maxWidth:700, background:'#fff', borderRadius:20, padding:28, boxShadow:'0 4px 24px rgba(0,0,0,.08)' } as React.CSSProperties,
  h1: { fontSize:20, fontWeight:900, color:'#1a1d23', margin:'0 0 4px' } as React.CSSProperties,
  sub: { fontSize:12, color:'#9aa0a6', margin:0 } as React.CSSProperties,
  label: { display:'block', fontSize:11, fontWeight:700, color:'#5f6368', marginBottom:6 } as React.CSSProperties,
  input: { width:'100%', border:'1px solid #dadce0', borderRadius:8, padding:'9px 12px', fontSize:13, outline:'none', background:'#fff', boxSizing:'border-box', fontFamily:'inherit' } as React.CSSProperties,
  btnPrimary: { display:'inline-flex', alignItems:'center', gap:8, justifyContent:'center', background:'linear-gradient(135deg,#F97316,#ea6a00)', color:'#fff', border:'none', borderRadius:12, padding:'12px 24px', fontSize:14, fontWeight:700, cursor:'pointer', width:'100%' } as React.CSSProperties,
  btnSecondary: { display:'inline-flex', alignItems:'center', gap:8, background:'#fff', color:'#5f6368', border:'1px solid #dadce0', borderRadius:10, padding:'8px 16px', fontSize:12, fontWeight:600, cursor:'pointer' } as React.CSSProperties,
  btnBack: { display:'inline-flex', alignItems:'center', gap:6, background:'none', border:'none', color:'#9aa0a6', fontSize:12, cursor:'pointer', padding:'4px 0' } as React.CSSProperties,
  iconBox: (bg:string) => ({ width:64, height:64, borderRadius:18, background:bg, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }) as React.CSSProperties,
}
