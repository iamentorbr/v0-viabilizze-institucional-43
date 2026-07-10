'use client'
import { useEffect, useState, useMemo, useCallback } from 'react'
import {
  Calculator, Lock, Eye, EyeOff, LogOut,
  CheckCircle, AlertTriangle, Loader2, Crown, Info,
  ChevronRight, ChevronLeft, FileText,
  Upload, Download, BookOpen, Beaker, Droplets, FlaskConical, Leaf
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// TABELA DE FRUTAS — MAPA IN 49/2018
// ═══════════════════════════════════════════════════════════════════════════
const FRUTAS: Record<string, {
  label: string
  brixIntegral: number
  pctRefresco: number
  pctNectar: number
  brixConc?: number
  brixInteg?: number
}> = {
  ACEROLA:   { label: 'Acerola',    brixIntegral: 5.5,  pctRefresco: 10, pctNectar: 30,  brixConc: 7  },
  ABACAXI:   { label: 'Abacaxi',    brixIntegral: 11,   pctRefresco: 30, pctNectar: 50,  brixConc: 45, brixInteg: 12 },
  CAJU:      { label: 'Caju',       brixIntegral: 10,   pctRefresco: 10, pctNectar: 25,  brixConc: 32 },
  GOIABA:    { label: 'Goiaba',     brixIntegral: 7,    pctRefresco: 15, pctNectar: 35,  brixConc: 15 },
  LIMAO:     { label: 'Limão',      brixIntegral: 10,   pctRefresco: 5,  pctNectar: 15,  brixConc: 62 },
  LARANJA:   { label: 'Laranja',    brixIntegral: 10,   pctRefresco: 30, pctNectar: 50,  brixConc: 65 },
  MANGA:     { label: 'Manga',      brixIntegral: 11,   pctRefresco: 20, pctNectar: 40,  brixConc: 28 },
  MORANGO:   { label: 'Morango',    brixIntegral: 6.5,  pctRefresco: 5,  pctNectar: 30  },
  PESSEGO:   { label: 'Pêssego',    brixIntegral: 10.5, pctRefresco: 30, pctNectar: 40,  brixConc: 30 },
  TANGERINA: { label: 'Tangerina',  brixIntegral: 10,   pctRefresco: 30, pctNectar: 50,  brixConc: 65 },
  MACA:      { label: 'Maçã',       brixIntegral: 10,   pctRefresco: 20, pctNectar: 50,  brixConc: 70 },
  UVA:       { label: 'Uva',        brixIntegral: 14,   pctRefresco: 30, pctNectar: 50,  brixConc: 68, brixInteg: 17 },
  MARACUJA:  { label: 'Maracujá',   brixIntegral: 11,   pctRefresco: 6,  pctNectar: 25,  brixInteg: 11 },
  TAMARINDO: { label: 'Tamarindo',  brixIntegral: 6,    pctRefresco: 10, pctNectar: 20  },
  CAJA:      { label: 'Cajá',       brixIntegral: 9,    pctRefresco: 10, pctNectar: 30  },
  MISTO:     { label: 'Misto (multifrutas)', brixIntegral: 10, pctRefresco: 20, pctNectar: 40 },
}

// ═══════════════════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════════════════
type TipoBebida = 'SUCO_RECONSTITUIDO' | 'NECTAR' | 'REFRESCO' | 'PREPARADO_REFRESCO'
type FrutaKey   = keyof typeof FRUTAS

const TIPO_CONFIG: Record<TipoBebida, {
  label: string
  icon: any
  cor: string
  bg: string
  desc: string
  pctMinLabel: string
}> = {
  SUCO_RECONSTITUIDO: {
    label: 'Suco Reconstituído', icon: Droplets,
    cor: '#1565c0', bg: '#e3f2fd',
    desc: 'Suco obtido pela dissolução de suco concentrado ou desidratado em água potável.',
    pctMinLabel: '100% de polpa reconstituída'
  },
  NECTAR: {
    label: 'Néctar', icon: Leaf,
    cor: '#2e7d32', bg: '#e8f5e9',
    desc: 'Bebida não fermentada com polpa de fruta, água e açúcares.',
    pctMinLabel: '% mínimo varia por fruta'
  },
  REFRESCO: {
    label: 'Refresco', icon: FlaskConical,
    cor: '#F97316', bg: '#fff3e0',
    desc: 'Bebida não gaseificada com polpa de fruta, água e açúcares.',
    pctMinLabel: '% mínimo varia por fruta'
  },
  PREPARADO_REFRESCO: {
    label: 'Preparado para Refresco', icon: Beaker,
    cor: '#8e24aa', bg: '#f3e5f5',
    desc: 'Produto em pó ou concentrado destinado ao preparo de refresco.',
    pctMinLabel: '% proporcional ao refresco'
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// ENGINES DE CÁLCULO
// ═══════════════════════════════════════════════════════════════════════════
function r2(v: number) { return Math.round(v * 100) / 100 }
function r4(v: number) { return Math.round(v * 10000) / 10000 }

function calcularPolpa(fruta: FrutaKey, tipo: TipoBebida, brixConc: number, fatorCorrecao: number, volumeLitros: number) {
  const f = FRUTAS[fruta]
  const brixLeg = f.brixIntegral

  const pctPolpa = brixConc > 0 ? (brixLeg * fatorCorrecao / brixConc) * 100 : 0

  const pctMinimo =
    tipo === 'SUCO_RECONSTITUIDO' ? 100 :
    tipo === 'NECTAR'             ? f.pctNectar :
    tipo === 'REFRESCO'           ? f.pctRefresco :
    tipo === 'PREPARADO_REFRESCO' ? f.pctRefresco * 3 :
    f.pctRefresco

  const qtdSucoConc = r2((pctPolpa / 100) * volumeLitros)
  const qtdSucoPor100ml    = r4(qtdSucoConc / volumeLitros * 100)
  const qtdIntegralPor100ml = r4(qtdSucoPor100ml * (brixLeg / brixConc))

  return {
    brixLegislacao: brixLeg,
    pctPolpaCalculado: r2(pctPolpa),
    pctMinimoLegal: pctMinimo,
    qtdSucoConcentrado: qtdSucoConc,
    qtdSucoPor100ml,
    qtdIntegralPor100ml,
    conforme: pctPolpa >= pctMinimo,
    margem: r2(pctPolpa - pctMinimo),
  }
}

function calcularAcucar(
  qtdAcucarUtilizada: number,
  brixAcucarTabela: number,
  fatorCorrecao: number,
  volumeLitros: number
) {
  const qtdPor100ml = r4((qtdAcucarUtilizada / volumeLitros) * 100)
  const correcaoBrix = r4(brixAcucarTabela * fatorCorrecao)
  const qtdCorrigida = r2((correcaoBrix / brixAcucarTabela) * qtdAcucarUtilizada)
  const qtdCorrigidaPor100ml = r4(qtdCorrigida / volumeLitros * 100)

  return {
    qtdAcucarUtilizada,
    qtdPor100ml,
    correcaoBrix,
    qtdCorrigida,
    qtdCorrigidaPor100ml,
    brixFinal: correcaoBrix,
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// AUTENTICAÇÃO
// ═══════════════════════════════════════════════════════════════════════════
const TOKEN_KEY = 'vd_calc_token'
const API = 'https://viabilizzecrm.vercel.app/api'

// ─── ACESSO DEMO (LOCAL) ───────────────────────────────────────────────────────
// Credenciais de acesso direto, sem depender do CRM externo.
const DEMO_EMAIL = 'admin@viabilizze.com.br'
const DEMO_SENHA = 'viabilizze2025'
const DEMO_TOKEN = 'demo-local-access'
const DEMO_SESSAO = {
  usuario: { nome: 'Administrador VIABILIZZE', email: DEMO_EMAIL },
  assinatura: { plano: 'ANUAL', dataExpiracao: '2099-12-31T00:00:00.000Z' },
}

// ─── TELA DE LOGIN ────────────────────────────────────────────────────────────
function Login({ onLogin }: { onLogin: (d: any) => void }) {
  const [email, setEmail]     = useState('')
  const [senha, setSenha]     = useState('')
  const [vis, setVis]         = useState(false)
  const [loading, setLoading] = useState(false)
  const [erro, setErro]       = useState('')

  async function entrar() {
    if (!email || !senha) { setErro('Preencha e-mail e senha.'); return }
    setLoading(true); setErro('')

    // Acesso demo local (não usa o CRM externo)
    if (email.trim().toLowerCase() === DEMO_EMAIL && senha === DEMO_SENHA) {
      localStorage.setItem(TOKEN_KEY, DEMO_TOKEN)
      onLogin(DEMO_SESSAO)
      setLoading(false)
      return
    }

    try {
      const res  = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), senha }),
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.error || 'Erro ao entrar.'); return }
      localStorage.setItem(TOKEN_KEY, data.token)
      onLogin(data)
    } catch { setErro('Erro de conexão. Tente novamente.') }
    finally  { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'linear-gradient(135deg,#1a1d23,#252931)', fontFamily: 'Arial,sans-serif' }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(249,115,22,.15)', border: '1px solid rgba(249,115,22,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Calculator size={28} color="#F97316" />
          </div>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 900, margin: '0 0 4px' }}>Calculadora VIABILIZZE</h1>
          <p style={{ color: '#5f6875', fontSize: 12, margin: 0 }}>Desenvolvimento de Bebidas · MAPA IN 49/2018</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 24px 64px rgba(0,0,0,.5)' }}>
          <p style={{ fontWeight: 700, fontSize: 14, color: '#1a1d23', margin: '0 0 16px' }}>Acesse com suas credenciais</p>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#5f6368', marginBottom: 6 }}>E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && entrar()}
              placeholder="voce@email.com"
              style={{ width: '100%', border: '1px solid #dadce0', borderRadius: 8, padding: '10px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: 16, position: 'relative' }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#5f6368', marginBottom: 6 }}>Senha</label>
            <input type={vis ? 'text' : 'password'} value={senha}
              onChange={e => setSenha(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && entrar()}
              placeholder="••••••••"
              style={{ width: '100%', border: '1px solid #dadce0', borderRadius: 8, padding: '10px 40px 10px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
            <button onClick={() => setVis(v => !v)}
              style={{ position: 'absolute', right: 12, top: 32, background: 'none', border: 'none', cursor: 'pointer', color: '#9aa0a6', padding: 0 }}>
              {vis ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {erro && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fce4ec', border: '1px solid #f48fb1', borderRadius: 8, padding: '8px 12px', marginBottom: 12 }}>
              <AlertTriangle size={13} color="#c62828" />
              <p style={{ fontSize: 12, fontWeight: 700, color: '#c62828', margin: 0 }}>{erro}</p>
            </div>
          )}

          <button onClick={entrar} disabled={loading}
            style={{ width: '100%', background: loading ? '#ccc' : 'linear-gradient(135deg,#F97316,#ea6a00)', color: '#fff', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Lock size={15} />}
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <p style={{ fontSize: 11, textAlign: 'center', color: '#9aa0a6', marginTop: 12 }}>
            Não tem acesso?{' '}
            <a href="/viabilizze-digital/calculadora" style={{ color: '#F97316', fontWeight: 700 }}>
              Assine aqui
            </a>
          </p>
        </div>

        <p style={{ fontSize: 10, textAlign: 'center', color: '#3a3f47', marginTop: 16 }}>
          VIABILIZZE Assessoria Industrial · VI.P & NÔUS Consultoria
        </p>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CALCULADORA DE DESENVOLVIMENTO (MicroSaaS)
// ═══════════════════════════════════════════════════════════════════════════
function CalculadoraDesenvolvimento({ usuario, assinatura, onLogout }: { usuario: any; assinatura: any; onLogout: () => void }) {
  const [tela, setTela] = useState<'manual' | 'tipo' | 'calculo' | 'resultado'>('manual')
  const [tipoBebida, setTipoBebida] = useState<TipoBebida | null>(null)
  const [fruta, setFruta] = useState<FrutaKey>('LARANJA')
  const [volumeLitros, setVolumeLitros] = useState(1000)
  const [brixConc, setBrixConc] = useState(65)
  const [fatorCorrecao, setFatorCorrecao] = useState(1.032)
  const [qtdAcucar, setQtdAcucar] = useState(0)
  const [brixAcucarTabela, setBrixAcucarTabela] = useState(7.5)
  const [arquivoUpload, setArquivoUpload] = useState<File | null>(null)

  const cfg = tipoBebida ? TIPO_CONFIG[tipoBebida] : null

  const resultadoPolpa = useMemo(() => {
    if (!tipoBebida) return null
    return calcularPolpa(fruta, tipoBebida, brixConc, fatorCorrecao, volumeLitros)
  }, [tipoBebida, fruta, brixConc, fatorCorrecao, volumeLitros])

  const resultadoAcucar = useMemo(() => {
    if (qtdAcucar <= 0) return null
    return calcularAcucar(qtdAcucar, brixAcucarTabela, fatorCorrecao, volumeLitros)
  }, [qtdAcucar, brixAcucarTabela, fatorCorrecao, volumeLitros])

  const expira = assinatura?.dataExpiracao
    ? new Date(assinatura.dataExpiracao).toLocaleDateString('pt-BR')
    : null

  // ── Geração de PDF ──────────────────────────────────────────────────────
  const gerarPDF = useCallback(() => {
    if (!resultadoPolpa || !tipoBebida) return
    const f = FRUTAS[fruta]
    const c = TIPO_CONFIG[tipoBebida]
    const dataHoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

    const linhasAcucar = resultadoAcucar ? `
      <tr><td>Açúcar utilizado</td><td>${resultadoAcucar.qtdAcucarUtilizada.toLocaleString('pt-BR')} kg</td></tr>
      <tr><td>Açúcar por 100mL</td><td>${resultadoAcucar.qtdPor100ml.toLocaleString('pt-BR')} g</td></tr>
      <tr><td>Correção Brix açúcar</td><td>${resultadoAcucar.correcaoBrix.toLocaleString('pt-BR')}°</td></tr>
      <tr><td>Qtd. corrigida total</td><td>${resultadoAcucar.qtdCorrigida.toLocaleString('pt-BR')} kg</td></tr>
      <tr><td>Qtd. corrigida/100mL</td><td>${resultadoAcucar.qtdCorrigidaPor100ml.toLocaleString('pt-BR')} g</td></tr>
    ` : '<tr><td colspan="2" style="color:#9aa0a6">Não informado</td></tr>'

    const html = `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"/>
<title>Fórmula — ${f.label} ${c.label}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:Arial,sans-serif; color:#1a1d23; padding:32px; font-size:12px; }
  @media print { body { padding:16px; } .no-print { display:none !important; } @page { margin:16mm; size:A4; } }
  .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:24px; padding-bottom:16px; border-bottom:3px solid #F97316; }
  .logo { font-size:22px; font-weight:900; color:#F97316; }
  .logo-sub { font-size:10px; color:#9aa0a6; margin-top:2px; }
  .badge { display:inline-block; padding:4px 12px; border-radius:99px; font-size:11px; font-weight:700; background:${c.bg}; color:${c.cor}; margin-bottom:16px; }
  h2 { font-size:16px; font-weight:700; color:#1a1d23; margin:20px 0 10px; border-bottom:1px solid #e8eaed; padding-bottom:4px; }
  table { width:100%; border-collapse:collapse; margin-bottom:16px; }
  th { background:#1a1d23; color:#fff; padding:7px 10px; text-align:left; font-size:11px; }
  td { padding:7px 10px; border-bottom:1px solid #f0f2f5; font-size:12px; }
  tr:nth-child(even) td { background:#fafafa; }
  .conforme { color:#2e7d32; font-weight:700; }
  .nao-conforme { color:#c62828; font-weight:700; }
  .destaque { font-size:18px; font-weight:900; color:${c.cor}; }
  .footer { margin-top:32px; padding-top:12px; border-top:1px solid #e8eaed; font-size:9px; color:#9aa0a6; display:flex; justify-content:space-between; }
  .btn { display:inline-flex; align-items:center; gap:8px; background:#F97316; color:#fff; border:none; padding:10px 20px; border-radius:8px; font-size:13px; font-weight:700; cursor:pointer; margin-bottom:24px; }
</style>
</head><body>
<button class="no-print btn" onclick="window.print()">Imprimir / Salvar PDF</button>

<div class="header">
  <div>
    <div class="logo">VIABILIZZE</div>
    <div class="logo-sub">ASSESSORIA INDUSTRIAL · Calculadora de Desenvolvimento</div>
  </div>
  <div style="text-align:right">
    <div style="font-size:14px;font-weight:700">${f.label}</div>
    <div class="badge">${c.label}</div>
    <div style="font-size:10px;color:#9aa0a6">Gerado em ${dataHoje}</div>
    <div style="font-size:10px;color:#9aa0a6">Ref: MAPA IN 49/2018</div>
  </div>
</div>

<h2>Parâmetros da Formulação</h2>
<table>
  <tr><th>Parâmetro</th><th>Valor</th></tr>
  <tr><td>Tipo de bebida</td><td>${c.label}</td></tr>
  <tr><td>Fruta / Sabor</td><td>${f.label}</td></tr>
  <tr><td>Volume total da formulação</td><td>${volumeLitros.toLocaleString('pt-BR')} L</td></tr>
  <tr><td>Brix suco concentrado utilizado</td><td>${brixConc}°Bx</td></tr>
  <tr><td>Brix integral legislação</td><td>${resultadoPolpa.brixLegislacao}°Bx</td></tr>
  <tr><td>Fator de correção</td><td>${fatorCorrecao}</td></tr>
</table>

<h2>Cálculo de Polpa / Suco</h2>
<table>
  <tr><th>Item</th><th>Valor</th></tr>
  <tr><td>% Polpa calculado</td><td><span class="destaque">${resultadoPolpa.pctPolpaCalculado}%</span></td></tr>
  <tr><td>% Mínimo legal (${c.label})</td><td>${resultadoPolpa.pctMinimoLegal}%</td></tr>
  <tr><td>Margem</td><td class="${resultadoPolpa.conforme ? 'conforme' : 'nao-conforme'}">${resultadoPolpa.margem > 0 ? '+' : ''}${resultadoPolpa.margem} p.p.</td></tr>
  <tr><td>Conformidade MAPA</td><td class="${resultadoPolpa.conforme ? 'conforme' : 'nao-conforme'}">${resultadoPolpa.conforme ? 'CONFORME' : 'NAO CONFORME'}</td></tr>
  <tr><td>Qtd. suco concentrado total</td><td><strong>${resultadoPolpa.qtdSucoConcentrado.toLocaleString('pt-BR')} kg</strong></td></tr>
  <tr><td>Qtd. suco concentrado / 100mL</td><td>${resultadoPolpa.qtdSucoPor100ml.toLocaleString('pt-BR')} g</td></tr>
  <tr><td>Qtd. suco integral equivalente / 100mL</td><td>${resultadoPolpa.qtdIntegralPor100ml.toLocaleString('pt-BR')} mL</td></tr>
</table>

<h2>Cálculo de Açúcar</h2>
<table>
  <tr><th>Item</th><th>Valor</th></tr>
  ${linhasAcucar}
</table>

<div class="footer">
  <span>VIABILIZZE Assessoria Industrial · assessoriaviabilizze.com.br</span>
  <span>Desenvolvido por VI.P & NÔUS Consultoria</span>
</div>
</body></html>`

    const w = window.open('', '_blank', 'width=900,height=700')
    if (w) { w.document.write(html); w.document.close(); w.focus() }
  }, [resultadoPolpa, resultadoAcucar, tipoBebida, fruta, volumeLitros, brixConc, fatorCorrecao])

  // ── Shell com header (plano + logout) ───────────────────────────────────
  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: 'Arial,sans-serif' }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
      <header style={{ background: '#1a1d23', borderBottom: '1px solid #252931', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Calculator size={18} color="#F97316" />
            <div>
              <p style={{ color: '#fff', fontWeight: 900, fontSize: 13, margin: 0, lineHeight: 1 }}>Calculadora VIABILIZZE</p>
              <p style={{ color: '#5f6875', fontSize: 10, margin: 0 }}>Desenvolvimento de Bebidas · MAPA IN 49/2018</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(249,115,22,.1)', borderRadius: 20, padding: '4px 10px' }}>
              <Crown size={12} color="#F97316" />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#F97316' }}>
                {assinatura?.plano === 'ANUAL' ? 'Plano Anual' : 'Plano Semestral'}
              </span>
            </div>
            {expira && <span style={{ fontSize: 11, color: '#5f6875' }} className="hide-mobile">Válido até {expira}</span>}
            <button onClick={onLogout}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#5f6875', background: 'none', border: '1px solid #252931', borderRadius: 8, padding: '6px 12px', cursor: 'pointer' }}>
              <LogOut size={13} /> Sair
            </button>
          </div>
        </div>
      </header>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 16px' }}>
        {children}
      </div>
    </div>
  )

  // ══════════════════════════════════════════════════════════════════════════
  // TELA: MANUAL DE USO
  // ══════════════════════════════════════════════════════════════════════════
  if (tela === 'manual') return (
    <Shell>
      <div style={ST.card}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={ST.iconBox('#fff3e0')}>
            <BookOpen size={28} color="#F97316" />
          </div>
          <h1 style={ST.h1}>Calculadora de Desenvolvimento</h1>
          <p style={ST.sub}>VIABILIZZE Assessoria Industrial</p>
        </div>

        <div style={{ background: '#fafafa', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #e8eaed' }}>
          <h2 style={{ ...ST.h2, marginTop: 0 }}>Manual de Uso</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { n: '1', t: '4 tipos de calculadora', d: 'Suco Reconstituído, Néctar, Refresco e Preparado para Refresco — cada um com seus parâmetros e limites legais.' },
              { n: '2', t: 'Método de uso', d: 'Informe fruta, volume, Brix do concentrado e fator de correção. O sistema calcula % de polpa, quantidade de concentrado e verifica conformidade MAPA IN 49/2018.' },
              { n: '3', t: 'Geração de PDF', d: 'Após o cálculo, exporte a fórmula pronta em PDF para impressão ou envio ao cliente.' },
              { n: '4', t: 'Upload de tabela', d: 'Faça upload de uma planilha com produtos já produzidos para correção e verificação de conformidade.' },
            ].map(i => (
              <div key={i.n} style={{ background: '#fff', borderRadius: 10, padding: 14, border: '1px solid #e8eaed' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#F97316', color: '#fff', fontSize: 11, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i.n}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#1a1d23' }}>{i.t}</span>
                </div>
                <p style={{ fontSize: 11, color: '#5f6368', margin: 0, lineHeight: 1.6 }}>{i.d}</p>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => setTela('tipo')} style={ST.btnPrimary}>
          Iniciar Calculadora <ChevronRight size={16} />
        </button>
      </div>
    </Shell>
  )

  // ══════════════════════════════════════════════════════════════════════════
  // TELA: SELEÇÃO DE TIPO
  // ══════════════════════════════════════════════════════════════════════════
  if (tela === 'tipo') return (
    <Shell>
      <div style={ST.card}>
        <button onClick={() => setTela('manual')} style={ST.btnBack}>
          <ChevronLeft size={14} /> Voltar
        </button>
        <h1 style={ST.h1}>Selecione o Tipo de Bebida</h1>
        <p style={{ ...ST.sub, marginBottom: 24 }}>
          Cada tipo tem parâmetros e limites legais próprios conforme MAPA IN 49/2018
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          {(Object.entries(TIPO_CONFIG) as [TipoBebida, typeof TIPO_CONFIG[TipoBebida]][]).map(([key, c]) => (
            <button key={key}
              onClick={() => { setTipoBebida(key); setTela('calculo') }}
              style={{
                textAlign: 'left', padding: 20, borderRadius: 14, cursor: 'pointer',
                border: `2px solid ${c.bg}`, background: '#fff', transition: 'all .15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = c.cor }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = c.bg }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <c.icon size={20} color={c.cor} />
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1d23', margin: '0 0 4px' }}>{c.label}</p>
              <p style={{ fontSize: 11, color: '#5f6368', margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
              <p style={{ fontSize: 10, fontWeight: 700, color: c.cor, margin: '8px 0 0' }}>{c.pctMinLabel}</p>
            </button>
          ))}
        </div>
      </div>
    </Shell>
  )

  // ══════════════════════════════════════════════════════════════════════════
  // TELA: CÁLCULO
  // ══════════════════════════════════════════════════════════════════════════
  if (tela === 'calculo' && tipoBebida && cfg) return (
    <Shell>
      <div style={{ ...ST.card, maxWidth: 760 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button onClick={() => setTela('tipo')} style={ST.btnBack}>
            <ChevronLeft size={14} /> Tipos
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <cfg.icon size={16} color={cfg.cor} />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1d23', margin: 0 }}>{cfg.label}</p>
              <p style={{ fontSize: 11, color: '#9aa0a6', margin: 0 }}>MAPA IN 49/2018</p>
            </div>
          </div>
        </div>

        {/* Upload de tabela */}
        <div style={{ background: '#fafafa', border: '1px dashed #dadce0', borderRadius: 12, padding: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Upload size={18} color="#9aa0a6" />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#1a1d23', margin: '0 0 2px' }}>Upload de tabela pronta</p>
              <p style={{ fontSize: 11, color: '#9aa0a6', margin: 0 }}>Opcional — envie planilha com produtos já produzidos para verificação de conformidade</p>
            </div>
            <label style={{ cursor: 'pointer', background: '#fff', border: '1px solid #dadce0', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#5f6368', whiteSpace: 'nowrap' }}>
              {arquivoUpload ? arquivoUpload.name : 'Escolher arquivo'}
              <input type="file" accept=".xlsx,.csv" style={{ display: 'none' }}
                onChange={e => setArquivoUpload(e.target.files?.[0] || null)} />
            </label>
          </div>
        </div>

        {/* Entradas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>

          {/* Fruta */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={ST.label}>Fruta / Sabor</label>
            <select value={fruta} onChange={e => setFruta(e.target.value as FrutaKey)} style={ST.input}>
              {Object.entries(FRUTAS).map(([k, v]) => (
                <option key={k} value={k}>{v.label} — Brix integral: {v.brixIntegral}° · % min Refresco: {v.pctRefresco}%</option>
              ))}
            </select>
          </div>

          <div>
            <label style={ST.label}>Volume total da formulação (L)</label>
            <input type="number" min="1" step="1" value={volumeLitros}
              onChange={e => setVolumeLitros(Number(e.target.value))} style={ST.input} />
          </div>

          <div>
            <label style={ST.label}>Brix do suco concentrado utilizado (°Bx)</label>
            <input type="number" min="1" step="0.1" value={brixConc}
              onChange={e => setBrixConc(Number(e.target.value))} style={ST.input} />
            {FRUTAS[fruta].brixConc && (
              <p style={{ fontSize: 10, color: '#9aa0a6', margin: '4px 0 0' }}>
                Ref. tabela MAPA: {FRUTAS[fruta].brixConc}°Bx
              </p>
            )}
          </div>

          <div>
            <label style={ST.label}>Fator de correção (densidade)</label>
            <input type="number" min="1" step="0.001" value={fatorCorrecao}
              onChange={e => setFatorCorrecao(Number(e.target.value))} style={ST.input} />
            <p style={{ fontSize: 10, color: '#9aa0a6', margin: '4px 0 0' }}>Padrão: 1,032</p>
          </div>

          <div>
            <label style={ST.label}>Brix legislação (integral da fruta)</label>
            <input type="number" value={FRUTAS[fruta].brixIntegral} readOnly
              style={{ ...ST.input, background: '#f5f5f5', color: '#9aa0a6', cursor: 'not-allowed' }} />
            <p style={{ fontSize: 10, color: '#9aa0a6', margin: '4px 0 0' }}>Automático — tabela MAPA IN 49/2018</p>
          </div>
        </div>

        {/* Açúcar (opcional) */}
        <div style={{ background: '#fafafa', borderRadius: 12, padding: 16, marginBottom: 20, border: '1px solid #e8eaed' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#1a1d23', margin: '0 0 12px' }}>
            Cálculo de Açúcar (opcional)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={ST.label}>Quantidade de açúcar utilizada (kg)</label>
              <input type="number" min="0" step="0.01" value={qtdAcucar}
                onChange={e => setQtdAcucar(Number(e.target.value))} style={ST.input} />
            </div>
            <div>
              <label style={ST.label}>Brix açúcar tabela (°Bx)</label>
              <input type="number" min="0" step="0.1" value={brixAcucarTabela}
                onChange={e => setBrixAcucarTabela(Number(e.target.value))} style={ST.input} />
            </div>
          </div>
        </div>

        <button onClick={() => setTela('resultado')} style={{ ...ST.btnPrimary, background: cfg.cor }}>
          Calcular <ChevronRight size={16} />
        </button>
      </div>
    </Shell>
  )

  // ══════════════════════════════════════════════════════════════════════════
  // TELA: RESULTADO
  // ══════════════════════════════════════════════════════════════════════════
  if (tela === 'resultado' && tipoBebida && cfg && resultadoPolpa) return (
    <Shell>
      <div style={{ ...ST.card, maxWidth: 800 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setTela('calculo')} style={ST.btnBack}>
              <ChevronLeft size={14} /> Editar
            </button>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1d23', margin: 0 }}>
                {FRUTAS[fruta].label} — {cfg.label}
              </p>
              <p style={{ fontSize: 11, color: '#9aa0a6', margin: 0 }}>{volumeLitros.toLocaleString('pt-BR')} L · Brix {brixConc}°</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setTela('calculo')} style={{ ...ST.btnSecondary }}>
              <Upload size={13} /> Corrigir
            </button>
            <button onClick={gerarPDF} style={{ ...ST.btnPrimary, padding: '8px 16px' }}>
              <Download size={13} /> Exportar PDF
            </button>
          </div>
        </div>

        {/* Badge conformidade */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, marginBottom: 20,
          background: resultadoPolpa.conforme ? '#e8f5e9' : '#fce4ec',
          border: `1px solid ${resultadoPolpa.conforme ? '#a5d6a7' : '#f48fb1'}`,
        }}>
          {resultadoPolpa.conforme
            ? <CheckCircle size={20} color="#2e7d32" />
            : <AlertTriangle size={20} color="#c62828" />}
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, margin: 0, color: resultadoPolpa.conforme ? '#2e7d32' : '#c62828' }}>
              {resultadoPolpa.conforme ? 'Formulação CONFORME com a legislação MAPA IN 49/2018' : 'Formulação NÃO CONFORME — ajuste necessário'}
            </p>
            <p style={{ fontSize: 11, color: '#5f6368', margin: 0 }}>
              {resultadoPolpa.pctPolpaCalculado}% de polpa calculado · {resultadoPolpa.pctMinimoLegal}% mínimo legal · margem {resultadoPolpa.margem > 0 ? '+' : ''}{resultadoPolpa.margem} p.p.
            </p>
          </div>
        </div>

        {/* Resultado polpa */}
        <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e8eaed', marginBottom: 16 }}>
          <div style={{ background: '#1a1d23', padding: '10px 16px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#fff', margin: 0 }}>RESULTADO — POLPA / SUCO</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
            {[
              { l: 'Brix legislação', v: `${resultadoPolpa.brixLegislacao}°Bx`, c: '#1a1d23' },
              { l: '% Mínimo legal', v: `${resultadoPolpa.pctMinimoLegal}%`, c: cfg.cor },
              { l: '% Polpa calculado', v: `${resultadoPolpa.pctPolpaCalculado}%`, c: resultadoPolpa.conforme ? '#2e7d32' : '#c62828', bold: true },
              { l: 'Qtd. concentrado total', v: `${resultadoPolpa.qtdSucoConcentrado.toLocaleString('pt-BR')} kg`, c: cfg.cor, bold: true },
              { l: 'Qtd. por 100mL', v: `${resultadoPolpa.qtdSucoPor100ml.toLocaleString('pt-BR')} g`, c: '#1a1d23' },
              { l: 'Integral equiv./100mL', v: `${resultadoPolpa.qtdIntegralPor100ml.toLocaleString('pt-BR')} mL`, c: '#1a1d23' },
            ].map((c, i) => (
              <div key={i} style={{ padding: 16, borderRight: i % 3 !== 2 ? '1px solid #f0f2f5' : 'none', borderBottom: i < 3 ? '1px solid #f0f2f5' : 'none' }}>
                <p style={{ fontSize: 11, color: '#9aa0a6', margin: '0 0 4px' }}>{c.l}</p>
                <p style={{ fontSize: c.bold ? 20 : 15, fontWeight: 900, color: c.c, margin: 0 }}>{c.v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resultado açúcar */}
        {resultadoAcucar && (
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e8eaed', marginBottom: 16 }}>
            <div style={{ background: '#1a1d23', padding: '10px 16px' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#fff', margin: 0 }}>RESULTADO — AÇÚCAR</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
              {[
                { l: 'Qtd. açúcar utilizada', v: `${resultadoAcucar.qtdAcucarUtilizada.toLocaleString('pt-BR')} kg` },
                { l: 'Açúcar por 100mL', v: `${resultadoAcucar.qtdPor100ml.toLocaleString('pt-BR')} g` },
                { l: 'Correção Brix', v: `${resultadoAcucar.correcaoBrix.toLocaleString('pt-BR')}°` },
                { l: 'Qtd. corrigida total', v: `${resultadoAcucar.qtdCorrigida.toLocaleString('pt-BR')} kg`, bold: true },
                { l: 'Qtd. corrigida/100mL', v: `${resultadoAcucar.qtdCorrigidaPor100ml.toLocaleString('pt-BR')} g` },
                { l: 'Brix final açúcar', v: `${resultadoAcucar.brixFinal.toLocaleString('pt-BR')}°` },
              ].map((c, i) => (
                <div key={i} style={{ padding: 16, borderRight: i % 3 !== 2 ? '1px solid #f0f2f5' : 'none', borderBottom: i < 3 ? '1px solid #f0f2f5' : 'none' }}>
                  <p style={{ fontSize: 11, color: '#9aa0a6', margin: '0 0 4px' }}>{c.l}</p>
                  <p style={{ fontSize: c.bold ? 18 : 14, fontWeight: c.bold ? 900 : 600, color: '#1a1d23', margin: 0 }}>{c.v}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabela referência compacta */}
        <details style={{ marginBottom: 16 }}>
          <summary style={{ fontSize: 12, fontWeight: 700, color: '#5f6368', cursor: 'pointer', padding: '8px 0' }}>
            Ver tabela de referência MAPA IN 49/2018
          </summary>
          <div style={{ overflowX: 'auto', marginTop: 8 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
              <thead>
                <tr style={{ background: '#1a1d23' }}>
                  <th style={{ padding: '6px 10px', color: '#fff', textAlign: 'left' }}>Fruta</th>
                  <th style={{ padding: '6px 10px', color: '#fff', textAlign: 'right' }}>Brix integral</th>
                  <th style={{ padding: '6px 10px', color: '#fff', textAlign: 'right' }}>% Refresco</th>
                  <th style={{ padding: '6px 10px', color: '#fff', textAlign: 'right' }}>% Néctar</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(FRUTAS).map(([k, v], i) => (
                  <tr key={k} style={{ background: k === fruta ? '#fff9f5' : i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '5px 10px', fontWeight: k === fruta ? 700 : 400, color: k === fruta ? cfg.cor : '#1a1d23' }}>{v.label}{k === fruta ? ' ✓' : ''}</td>
                    <td style={{ padding: '5px 10px', textAlign: 'right', color: '#5f6368' }}>{v.brixIntegral}°</td>
                    <td style={{ padding: '5px 10px', textAlign: 'right', color: '#F97316', fontWeight: 600 }}>{v.pctRefresco}%</td>
                    <td style={{ padding: '5px 10px', textAlign: 'right', color: '#2e7d32', fontWeight: 600 }}>{v.pctNectar}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        {/* Ações finais */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={() => { setTela('tipo'); setTipoBebida(null) }}
            style={ST.btnSecondary}>
            Nova calculadora
          </button>
          <button onClick={() => setTela('calculo')} style={ST.btnSecondary}>
            <Upload size={13} /> Correção
          </button>
          <button onClick={gerarPDF} style={ST.btnPrimary}>
            <FileText size={13} /> Gerar PDF da fórmula
          </button>
        </div>

        <p style={{ fontSize: 10, color: '#9aa0a6', marginTop: 16, textAlign: 'center' }}>
          Calculadora VIABILIZZE · MAPA IN 49/2018 · VI.P & NÔUS Consultoria
        </p>
      </div>
    </Shell>
  )

  return null
}

// ═══════════════════════════════════════════════════════════════════════════
// ORQUESTRADOR (auth)
// ═══════════════════════════════════════════════════════════════════════════
export default function AppCalculadora() {
  const [sessao, setSessao] = useState<any>(null)
  const [verificando, setVerif] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) { setVerif(false); return }
    if (token === DEMO_TOKEN) { setSessao(DEMO_SESSAO); setVerif(false); return }
    fetch(`${API}/auth/verificar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(r => r.json())
      .then(d => { if (d.valido) setSessao({ usuario: d.usuario, assinatura: d.assinatura }); else localStorage.removeItem(TOKEN_KEY) })
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setVerif(false))
  }, [])

  async function handleLogout() {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token && token !== DEMO_TOKEN) {
      await fetch(`${API}/auth/logout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) })
    }
    localStorage.removeItem(TOKEN_KEY)
    setSessao(null)
  }

  if (verificando) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#1a1d23,#252931)' }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
      <Loader2 size={32} color="#F97316" style={{ animation: 'spin 1s linear infinite' }} />
    </div>
  )

  return sessao
    ? <CalculadoraDesenvolvimento usuario={sessao.usuario} assinatura={sessao.assinatura} onLogout={handleLogout} />
    : <Login onLogin={d => setSessao({ usuario: d.usuario, assinatura: d.assinatura })} />
}

// ═══════════════════════════════════════════════════════════════════════════
// ESTILOS
// ═══════════════════════════════════════════════════════════════════════════
const ST = {
  card: {
    width: '100%', maxWidth: 680, background: '#fff',
    borderRadius: 20, padding: 28,
    boxShadow: '0 4px 24px rgba(0,0,0,.08)',
  } as React.CSSProperties,
  h1: { fontSize: 20, fontWeight: 900, color: '#1a1d23', margin: '0 0 4px' } as React.CSSProperties,
  h2: { fontSize: 14, fontWeight: 700, color: '#1a1d23', margin: '16px 0 10px' } as React.CSSProperties,
  sub: { fontSize: 12, color: '#9aa0a6', margin: 0 } as React.CSSProperties,
  label: { display: 'block', fontSize: 11, fontWeight: 700, color: '#5f6368', marginBottom: 6 } as React.CSSProperties,
  input: {
    width: '100%', border: '1px solid #dadce0', borderRadius: 8,
    padding: '9px 12px', fontSize: 13, outline: 'none',
    background: '#fff', boxSizing: 'border-box', fontFamily: 'inherit',
  } as React.CSSProperties,
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'linear-gradient(135deg,#F97316,#ea6a00)', color: '#fff',
    border: 'none', borderRadius: 12, padding: '12px 24px',
    fontSize: 14, fontWeight: 700, cursor: 'pointer', width: '100%',
    justifyContent: 'center',
  } as React.CSSProperties,
  btnSecondary: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: '#fff', color: '#5f6368',
    border: '1px solid #dadce0', borderRadius: 10, padding: '8px 16px',
    fontSize: 12, fontWeight: 600, cursor: 'pointer',
  } as React.CSSProperties,
  btnBack: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: 'none', border: 'none', color: '#9aa0a6',
    fontSize: 12, cursor: 'pointer', padding: '4px 0',
  } as React.CSSProperties,
  iconBox: (bg: string) => ({
    width: 64, height: 64, borderRadius: 18, background: bg,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 16px',
  }) as React.CSSProperties,
}
