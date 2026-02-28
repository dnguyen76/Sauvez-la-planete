import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quiz Interactif',
  description: 'Testez vos connaissances avec notre quiz interactif',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
