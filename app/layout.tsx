import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Copy Lab - Copy That Actually Converts',
  description: 'Generate high-converting copy in 30 seconds using proven DTC principles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
