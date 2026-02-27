import type { Metadata } from 'next'
import { Noto_Sans_Thai } from 'next/font/google'
import './globals.css'

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'FTI Service',
  description: 'FTI Service - เว็บไซต์ปลายทางสำหรับบริการของ FTI',
  icons: {
    icon: [
      { url: '/favicon.webp', type: 'image/webp' },
      { url: '/fti.png', type: 'image/png' }, // fallback
    ],
  },
  openGraph: {
    title: 'FTI Service',
    description: 'FTI Service - เว็บไซต์ปลายทางสำหรับบริการของ FTI',
    images: [{ url: '/meta-logo.webp', type: 'image/webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FTI Service',
    description: 'FTI Service - เว็บไซต์ปลายทางสำหรับบริการของ FTI',
    images: [{ url: '/meta-logo.webp', type: 'image/webp' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th">
      <body className={notoSansThai.className}>{children}</body>
    </html>
  )
}
