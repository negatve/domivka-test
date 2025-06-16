// src/app/layout.tsx
import './globals.css'
import Footer from '../ui/footer'
import HeaderSwitcher from '@/ui/headerswitcher'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className="layout">
        <HeaderSwitcher />
        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
