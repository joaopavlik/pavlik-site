import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'João Guilherme Pavlik - Personal Trainer & Atleta de Jiu-Jitsu',
  description: 'Treinamento personalizado para hipertrofia, emagrecimento e performance no Jiu-Jitsu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300;400;600;700&family=Work+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
