import type { Metadata } from 'next'
import React from 'react'
import './styles.css'

export const metadata: Metadata = {
  title: 'Json Studio',
  description: 'Desarrollo de software a la medida para negocios de Colombia.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
