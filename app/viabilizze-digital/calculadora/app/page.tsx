'use client'
import { useEffect, useState, useMemo } from 'react'
import {
  Calculator, Lock, Eye, EyeOff, LogOut,
  CheckCircle, AlertTriangle, Loader2, Crown, Info
} from 'lucide-react'

// ─── TABELA MAPA IN 49/2018 ───────────────────────────────────────────────────
const FRUTAS = {
  LARANJA:   { label: 'Laranja',   brixIntegral: 10,   pctRefresco: 30 },
  LIMAO:     { label: 'Limão',     brixIntegral: 10,   pctRefresco: 5  },
  ABACAXI:   { label: 'Abacaxi',   brixIntegral: 11,   pctRefresco: 30 },
  MANGA:     { label: 'Manga',     brixIntegral: 11,   pctRefresco: 20 },
  UVA:       { label: 'Uva',       brixIntegral: 14,   pctRefresco: 30 },
  MACA:      { label: 'Maçã',      brixIntegral: 10,   pctRefresco: 20 },
  MORANGO:   { label: 'Morango',   brixIntegral: 6.5,  pctRefresco: 5  },
  GOIABA:    { label: 'Goiaba',    brixIntegral: 7,    pctRefresco: 15 },
  CAJU:      { label: 'Caju',      brixIntegral: 10,   pctRefresco: 10 },
  ACEROLA:   { label: 'Acerola',   brixIntegral: 5.5,  pctRefresco: 10 },
  PESSEGO:   { label: 'Pêssego',   brixIntegral: 10.5, pctRefresco: 30 },
  TANGERINA: { label: 'Tangerina', brixIntegral: 10,   pctRefresco: 30 },
  MISTO:     { label: 'Misto',     brixIntegral: 10,   pctRefresco: 20 },
} as const
type Fruta = keyof typeof FRUTAS
type Tipo  = 'REFRESCO' | 'SUCO_INTEGRAL' | 'NECTAR'

const PCT_MIN: Record<Tipo, number | 'FRUTA'> = {
  REFRESCO: 'FRUTA', SUCO_INTEGRAL: 100, NECTAR: 50,
}

function calcular(fruta: Fruta, tipo: Tipo, brixConc: number, brixLeg: number, volume: number, fator: number) {
  const f = FRUTAS[fruta]
  const pctMin = PCT_MIN[tipo] === 'FRUTA' ? f.pctRefresco : PCT_MIN[tipo] as number
  const pctCalc = brixConc > 0 ? (brixLeg * fator / brixConc) * 100 : 0
  const qtdKg = (pctCalc / 100) * volume
  const margem = pctCalc - pctMin
  return {
    brixIntegral: f.brixIntegral,
    pctMin, pctCalc: Math.round(pctCalc * 100) / 100,
    qtdKg: Math.round(qtdKg * 100) / 100,
    margem: Math.round(margem * 100) / 100,
    conforme: pctCalc >= pctMin,
  }
}

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
          <p style={{ color: '#5f6875', fontSize: 12, margin: 0 }}>Percentual de Polpa/Suco · MAPA IN 49/2018</p>
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

// ─── CALCULADORA ──────────────────────────────────────────────────────────────
function Calculadora({ usuario, assinatura, onLogout }: { usuario: any; assinatura: any; onLogout: () => void }) {
  const [fruta, setFruta]   = useState<Fruta>('LARANJA')
  const [tipo, setTipo]     = useState<Tipo>('REFRESCO')
  const [brixC, setBrixC]   = useState(68)
  const [brixL, setBrixL]   = useState(14)
  const [volume, setVolume] = useState(1000)
  const [fator, setFator]   = useState(1.032)

  const r = useMemo(() => calcular(fruta, tipo, brixC, brixL, volume, fator), [fruta, tipo, brixC, brixL, volume, fator])

  const expira = assinatura?.dataExpiracao
    ? new Date(assinatura.dataExpiracao).toLocaleDateString('pt-BR')
    : null

  const s: Record<string, string> = { width: '100%', border: '1px solid #dadce0', borderRadius: 8, padding: '9px 12px', fontSize: 13, outline: 'none', background: '#fff', boxSizing: 'border-box', fontFamily: 'inherit' }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: 'Arial,sans-serif' }}>

      {/* Header */}
      <header style={{ background: '#1a1d23', borderBottom: '1px solid #252931', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Calculator size={18} color="#F97316" />
            <div>
              <p style={{ color: '#fff', fontWeight: 900, fontSize: 13, margin: 0, lineHeight: 1 }}>Calculadora VIABILIZZE</p>
              <p style={{ color: '#5f6875', fontSize: 10, margin: 0 }}>Percentual de Polpa/Suco · MAPA IN 49/2018</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(249,115,22,.1)', borderRadius: 20, padding: '4px 10px' }}>
              <Crown size={12} color="#F97316" />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#F97316' }}>
                {assinatura?.plano === 'ANUAL' ? 'Plano Anual' : 'Plano Semestral'}
              </span>
            </div>
            {expira && <span style={{ fontSize: 11, color: '#5f6875' }}>Válido até {expira}</span>}
            <button onClick={onLogout}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#5f6875', background: 'none', border: '1px solid #252931', borderRadius: 8, padding: '6px 12px', cursor: 'pointer' }}>
              <LogOut size={13} /> Sair
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>

        {/* Aviso legislação */}
        <div style={{ display: 'flex', gap: 8, background: '#e3f2fd', border: '1px solid #90caf9', borderRadius: 10, padding: '10px 14px', marginBottom: 20 }}>
          <Info size={14} color="#1565c0" style={{ marginTop: 1, flexShrink: 0 }} />
          <p style={{ fontSize: 12, color: '#1565c0', margin: 0 }}>
            <strong>Legislação:</strong> Instrução Normativa MAPA nº 49/2018 — Refresco, Suco Integral e Néctar.
          </p>
        </div>

        {/* Entradas */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, marginBottom: 16, border: '1px solid #e8eaed' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a1d23', margin: '0 0 20px' }}>Dados da Formulação</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
            {([
              { label: 'Fruta / Sabor', el: <select value={fruta} onChange={e => setFruta(e.target.value as Fruta)} style={s}>{Object.entries(FRUTAS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select> },
              { label: 'Tipo de Bebida', el: <select value={tipo} onChange={e => setTipo(e.target.value as Tipo)} style={s}><option value="REFRESCO">Refresco</option><option value="SUCO_INTEGRAL">Suco Integral</option><option value="NECTAR">Néctar</option></select> },
              { label: `Brix Suco Concentrado (°Bx)`, el: <input type="number" step="0.1" value={brixC} onChange={e => setBrixC(Number(e.target.value))} style={s} /> },
              { label: `Brix Legislação — D (°Bx)`, el: <input type="number" step="0.1" value={brixL} onChange={e => setBrixL(Number(e.target.value))} style={s} /> },
              { label: 'Volume Final (L)', el: <input type="number" step="1" value={volume} onChange={e => setVolume(Number(e.target.value))} style={s} /> },
              { label: 'Fator de Correção', el: <input type="number" step="0.001" value={fator} onChange={e => setFator(Number(e.target.value))} style={s} /> },
            ] as const).map((f, i) => (
              <div key={i}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#5f6368', marginBottom: 6 }}>{f.label}</label>
                {f.el}
              </div>
            ))}
          </div>
        </div>

        {/* Resultado */}
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e8eaed', marginBottom: 16 }}>
          <div style={{ background: '#1a1d23', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 900, color: '#fff', letterSpacing: 1 }}>RESULTADO</span>
            <span style={{ fontSize: 11, color: '#9aa0a6' }}>{FRUTAS[fruta].label} · {tipo === 'REFRESCO' ? 'Refresco' : tipo === 'SUCO_INTEGRAL' ? 'Suco Integral' : 'Néctar'}</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 9999, background: r.conforme ? '#e8f5e9' : '#fce4ec', color: r.conforme ? '#2e7d32' : '#c62828' }}>
              {r.conforme ? '✓ CONFORME' : '⚠ NÃO CONFORME'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {[
              { label: 'Brix Integral', value: `${r.brixIntegral}°`, color: '#1a1d23' },
              { label: '% Mínimo MAPA', value: `${r.pctMin}%`,       color: '#1565c0' },
              { label: '% Polpa Calculado', value: `${r.pctCalc}%`,  color: r.conforme ? '#2e7d32' : '#c62828', bold: true },
              { label: 'Margem (p.p.)',  value: `${r.margem > 0 ? '+' : ''}${r.margem}`, color: r.margem >= 0 ? '#2e7d32' : '#c62828' },
            ].map(c => (
              <div key={c.label} style={{ padding: '16px', borderRight: '1px solid #f0f2f5', borderBottom: '1px solid #f0f2f5' }}>
                <p style={{ fontSize: 11, color: '#9aa0a6', margin: '0 0 4px' }}>{c.label}</p>
                <p style={{ fontSize: c.bold ? 22 : 16, fontWeight: 900, color: c.color, margin: 0 }}>{c.value}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #f0f2f5' }}>
            <div style={{ padding: 16, borderRight: '1px solid #f0f2f5' }}>
              <p style={{ fontSize: 11, color: '#9aa0a6', margin: '0 0 4px' }}>Suco Concentrado Necessário</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#F97316', margin: 0 }}>{r.qtdKg.toLocaleString('pt-BR')} kg</p>
              <p style={{ fontSize: 11, color: '#9aa0a6', margin: '2px 0 0' }}>para {volume.toLocaleString('pt-BR')} L de formulação</p>
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ fontSize: 11, color: '#9aa0a6', margin: '0 0 4px' }}>Fórmula utilizada</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#5f6368', margin: 0 }}>
                ({brixL} × {fator}) ÷ {brixC} × 100 = {r.pctCalc}%
              </p>
            </div>
          </div>

          <div style={{ padding: '12px 20px', background: r.conforme ? '#f1f8f4' : '#fdf2f4', display: 'flex', gap: 8 }}>
            {r.conforme
              ? <CheckCircle size={15} color="#2e7d32" style={{ flexShrink: 0, marginTop: 1 }} />
              : <AlertTriangle size={15} color="#c62828" style={{ flexShrink: 0, marginTop: 1 }} />}
            <p style={{ fontSize: 12, fontWeight: 600, color: r.conforme ? '#2e7d32' : '#c62828', margin: 0 }}>
              {r.conforme
                ? `Formulação CONFORME — ${r.pctCalc}% de polpa, ${r.margem} p.p. acima do mínimo exigido (${r.pctMin}%).`
                : `Formulação NÃO CONFORME — ${r.pctCalc}% está ${Math.abs(r.margem)} p.p. ABAIXO do mínimo exigido (${r.pctMin}%).`}
            </p>
          </div>
        </div>

        {/* Tabela referência */}
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e8eaed' }}>
          <div style={{ padding: '12px 20px', borderBottom: '1px solid #e8eaed' }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#1a1d23', margin: 0 }}>
              Tabela de Referência — MAPA IN 49/2018
            </h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#1a1d23' }}>
                  {['Fruta', 'Brix Integral', '% Mín. Refresco', ''].map(h => (
                    <th key={h} style={{ padding: '8px 14px', color: '#fff', fontWeight: 700, textAlign: h === 'Brix Integral' || h === '% Mín. Refresco' ? 'right' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(FRUTAS).map(([k, v], i) => (
                  <tr key={k} style={{ background: k === fruta ? '#fff9f5' : i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '7px 14px', fontWeight: k === fruta ? 700 : 400, color: '#1a1d23' }}>{v.label}</td>
                    <td style={{ padding: '7px 14px', textAlign: 'right', color: '#5f6368' }}>{v.brixIntegral}°</td>
                    <td style={{ padding: '7px 14px', textAlign: 'right', color: '#1565c0', fontWeight: 600 }}>{v.pctRefresco}%</td>
                    <td style={{ padding: '7px 14px' }}>{k === fruta && <span style={{ background: '#fff3e0', color: '#e65100', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 9999 }}>✓ Selecionada</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p style={{ fontSize: 10, textAlign: 'center', color: '#9aa0a6', marginTop: 20 }}>
          Calculadora VIABILIZZE · assessoriaviabilizze.com.br · VI.P & NÔUS Consultoria
        </p>
      </main>
    </div>
  )
}

// ─── ORQUESTRADOR ─────────────────────────────────────────────────────────────
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
    ? <Calculadora usuario={sessao.usuario} assinatura={sessao.assinatura} onLogout={handleLogout} />
    : <Login onLogin={d => setSessao({ usuario: d.usuario, assinatura: d.assinatura })} />
}
