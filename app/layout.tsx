import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Viabilizze | Assessoria Industrial',
  description: 'Assessoria especializada em indústria de bebidas. Mais de 10 anos de experiência em gestão de produção, assessoria regulatória, rotulagem e desenvolvimento de produtos.',
  keywords: 'assessoria industrial, engenharia de bebidas, terceirização, gestão de produção, assessoria regulatória, rotulagem, sistema de qualidade, treinamentos',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
