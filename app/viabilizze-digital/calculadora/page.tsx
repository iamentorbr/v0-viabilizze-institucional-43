'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle, ShieldCheck, Beaker, Crown, CreditCard,
  AlertTriangle, Loader2, FileText, TrendingUp, Lock, ArrowLeft
} from 'lucide-react'

const PRECO_MENSAL = 249.00

export default function PaginaCalculadora() {
  const [plano, setPlano]   = useState<'MENSAL' | 'SEMESTRAL' | 'ANUAL'>('ANUAL')
  const [email, setEmail]   = useState('')
  const [nome, setNome]     = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro]     = useState('')

  const meses      = plano === 'ANUAL' ? 12 : plano === 'SEMESTRAL' ? 6 : 1
  const valorTotal = PRECO_MENSAL * meses

  async function comprar() {
    if (!email.trim()) { setErro('Informe seu e-mail para continuar.'); return }
    setCarregando(true); setErro('')

    try {
      const res  = await fetch('https://viabilizzecrm.vercel.app/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plano, email: email.trim(), nome: nome.trim() }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setErro(data.error || 'Erro ao iniciar pagamento.')
    } catch { setErro('Erro de conexão. Tente novamente.') }
    finally   { setCarregando(false) }
  }

  return (
    <main style={{ fontFamily: 'Arial, sans-serif', background: '#fafafa', minHeight: '100vh' }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1d23 0%, #252931 100%)',
        padding: '72px 24px', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}>
            <Link href="/viabilizze-digital" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: 'rgba(255,255,255,.6)', fontSize: 12, fontWeight: 600, textDecoration: 'none',
            }}>
              <ArrowLeft size={14} /> Voltar para Viabilizze Digital
            </Link>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(249,115,22,.15)', border: '1px solid rgba(249,115,22,.3)',
            borderRadius: 9999, padding: '6px 14px', marginBottom: 20,
          }}>
            <Crown size={14} color="#F97316" />
            <span style={{ color: '#F97316', fontSize: 11, fontWeight: 800, letterSpacing: '.5px', textTransform: 'uppercase' }}>
              Produto VIABILIZZE
            </span>
          </div>
          <h1 style={{ color: '#fff', fontSize: 36, fontWeight: 900, margin: '0 0 16px', lineHeight: 1.2 }}>
            Calculadora VIABILIZZE<br />
            <span style={{ color: '#F97316' }}>Percentual de Polpa/Suco</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 16, lineHeight: 1.7, margin: 0 }}>
            Calcule o percentual de polpa e a quantidade de suco concentrado
            necessária para sua formulação — com validação automática da
            legislação MAPA (IN 49/2018) para Refresco, Suco Integral e Néctar.
          </p>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '56px 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: '#1a1d23', marginBottom: 32 }}>
          O que você recebe
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {[
            { icon: Beaker,     titulo: 'Cálculo por Brix',          desc: 'Fórmula oficial: (Brix Legislação × Fator) ÷ Brix Concentrado × 100' },
            { icon: ShieldCheck,titulo: 'Validação MAPA IN 49/2018', desc: '13 frutas com Brix integral e % mínimo por tipo de bebida' },
            { icon: TrendingUp, titulo: 'Qtd Suco Concentrado',      desc: 'Calcula automaticamente os quilos necessários para o volume final' },
            { icon: FileText,   titulo: 'Tabela de Referência',      desc: 'Consulta rápida da legislação para todas as frutas cadastradas' },
            { icon: Crown,      titulo: 'Melhorias contínuas',        desc: 'Acesso garantido a todas as atualizações durante o período do plano' },
            { icon: Lock,       titulo: 'Acesso exclusivo',           desc: 'Login individual via e-mail e senha enviados após a compra' },
          ].map(f => (
            <div key={f.titulo} style={{
              background: '#fff', borderRadius: 12, padding: 20,
              border: '1px solid #e8eaed', boxShadow: '0 1px 4px rgba(0,0,0,.05)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9, background: '#fff3e0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
              }}>
                <f.icon size={18} color="#F97316" />
              </div>
              <p style={{ fontWeight: 700, fontSize: 13, color: '#1a1d23', margin: '0 0 6px' }}>{f.titulo}</p>
              <p style={{ fontSize: 12, color: '#5f6368', margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANOS + CHECKOUT */}
      <section style={{ background: '#f0f2f5', padding: '56px 24px' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: '#1a1d23', marginBottom: 8 }}>
            Escolha seu plano
          </h2>
          <p style={{ textAlign: 'center', color: '#9aa0a6', fontSize: 13, marginBottom: 28 }}>
            R$ {PRECO_MENSAL.toFixed(2).replace('.', ',')}/mês · Sem descontos · Sem renovação automática
          </p>

          {/* Seletor de plano */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
            {([
              { id: 'MENSAL'   as const, label: 'Mensal',    meses: 1,  destaque: false },
              { id: 'SEMESTRAL' as const, label: 'Semestral', meses: 6, destaque: false },
              { id: 'ANUAL'    as const, label: 'Anual',     meses: 12, destaque: true  },
            ]).map(p => (
              <button key={p.id} onClick={() => setPlano(p.id)} style={{
                border:      `2px solid ${plano === p.id ? '#F97316' : '#e8eaed'}`,
                background:  plano === p.id ? '#fff9f5' : '#fff',
                borderRadius: 14, padding: '16px 14px', cursor: 'pointer',
                textAlign: 'left', position: 'relative', transition: 'all .15s',
              }}>
                {p.destaque && (
                  <span style={{
                    position: 'absolute', top: -10, right: 10,
                    background: '#F97316', color: '#fff',
                    fontSize: 9, fontWeight: 800, padding: '2px 8px',
                    borderRadius: 9999, letterSpacing: '.3px',
                  }}>MAIS COMPLETO</span>
                )}
                <p style={{ fontWeight: 700, fontSize: 14, color: '#1a1d23', margin: '0 0 4px' }}>
                  {p.label}
                </p>
                <p style={{ fontSize: 22, fontWeight: 900, color: '#F97316', margin: '0 0 4px' }}>
                  R$ {PRECO_MENSAL.toFixed(2).replace('.', ',')}
                  <span style={{ fontSize: 11, fontWeight: 400, color: '#9aa0a6' }}>/mês</span>
                </p>
                <p style={{ fontSize: 11, color: '#9aa0a6', margin: 0 }}>
                  Total: R$ {(PRECO_MENSAL * p.meses).toFixed(2).replace('.', ',')} · {p.meses} meses
                </p>
              </button>
            ))}
          </div>

          {/* Dados do comprador */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #e8eaed', marginBottom: 12 }}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#5f6368', marginBottom: 6 }}>
                Seu nome
              </label>
              <input value={nome} onChange={e => setNome(e.target.value)}
                placeholder="Nome completo"
                style={{
                  width: '100%', border: '1px solid #dadce0', borderRadius: 8,
                  padding: '10px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#5f6368', marginBottom: 6 }}>
                E-mail para receber o acesso *
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="voce@email.com"
                style={{
                  width: '100%', border: '1px solid #dadce0', borderRadius: 8,
                  padding: '10px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }} />
              <p style={{ fontSize: 10, color: '#9aa0a6', marginTop: 5 }}>
                Suas credenciais de acesso serão enviadas para este e-mail após a confirmação do pagamento.
              </p>
            </div>
          </div>

          {/* Resumo */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: '#fff', borderRadius: 12, padding: '14px 16px',
            border: '1px solid #e8eaed', marginBottom: 12,
          }}>
            <div>
              <p style={{ fontSize: 11, color: '#9aa0a6', margin: '0 0 2px' }}>Total a pagar agora</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#1a1d23', margin: 0 }}>
                R$ {valorTotal.toFixed(2).replace('.', ',')}
              </p>
            </div>
            <p style={{ fontSize: 11, color: '#9aa0a6', textAlign: 'right', margin: 0 }}>
              Plano {plano === 'ANUAL' ? 'Anual' : plano === 'SEMESTRAL' ? 'Semestral' : 'Mensal'}<br />
              {meses === 1 ? '1 mês' : `${meses} meses`} de acesso
            </p>
          </div>

          {erro && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: '#fce4ec', border: '1px solid #f48fb1',
              borderRadius: 10, padding: '10px 14px', marginBottom: 12,
            }}>
              <AlertTriangle size={14} color="#c62828" />
              <p style={{ fontSize: 12, fontWeight: 700, color: '#c62828', margin: 0 }}>{erro}</p>
            </div>
          )}

          <button onClick={comprar} disabled={carregando} style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, background: carregando ? '#ccc' : 'linear-gradient(135deg,#F97316,#ea6a00)',
            color: '#fff', border: 'none', borderRadius: 12, padding: '14px 20px',
            fontSize: 15, fontWeight: 700, cursor: carregando ? 'not-allowed' : 'pointer',
          }}>
            {carregando
              ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Redirecionando...</>
              : <><CreditCard size={18} /> Pagar com Stripe — Cartão ou Boleto</>}
          </button>

          <p style={{ fontSize: 11, textAlign: 'center', color: '#9aa0a6', marginTop: 12 }}>
            Pagamento 100% seguro processado pelo Stripe
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '56px 24px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1a1d23', marginBottom: 24 }}>
          Dúvidas frequentes
        </h2>
        {[
          { p: 'Como vou receber meu acesso?', r: 'Após a confirmação do pagamento pelo Stripe, você receberá um e-mail com seu login (e-mail) e senha gerada automaticamente. O acesso é liberado em até 5 minutos.' },
          { p: 'Posso usar em qualquer dispositivo?', r: 'Sim. A calculadora funciona no navegador — computador, celular ou tablet. Não é necessário instalar nada.' },
          { p: 'O plano renova automaticamente?', r: 'Não. O pagamento é único para o período escolhido (6 ou 12 meses). Você decide se renova no vencimento.' },
          { p: 'Tenho acesso a melhorias futuras?', r: 'Sim. Durante o período ativo do plano, você recebe automaticamente todas as atualizações e novas funcionalidades adicionadas à calculadora.' },
          { p: 'Já sou cliente VIABILIZZE. Preciso pagar?', r: 'Não necessariamente. Clientes em assessoria ativa da VIABILIZZE podem ter acesso gratuito mediante liberação pela equipe. Entre em contato para verificar.' },
        ].map(({ p, r }) => (
          <div key={p} style={{ borderBottom: '1px solid #e8eaed', paddingBottom: 16, marginBottom: 16 }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: '#1a1d23', margin: '0 0 6px' }}>{p}</p>
            <p style={{ fontSize: 13, color: '#5f6368', margin: 0, lineHeight: 1.7 }}>{r}</p>
          </div>
        ))}
      </section>

      <footer style={{
        background: '#1a1d23', padding: '24px', textAlign: 'center',
      }}>
        <p style={{ color: '#F97316', fontWeight: 900, fontSize: 16, margin: '0 0 4px' }}>VIABILIZZE</p>
        <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 10, margin: 0 }}>
          ASSESSORIA INDUSTRIAL · Desenvolvido por VI.P & NÔUS Consultoria
        </p>
      </footer>
    </main>
  )
}
