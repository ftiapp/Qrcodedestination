import { useMemo, useState } from 'react'
import './App.css'

function App() {
  const pathname = useMemo(() => window.location.pathname || '/', [])
  const [logoVisible, setLogoVisible] = useState(true)

  if (pathname === '/health') {
    return <pre className="health">OK</pre>
  }

  const isHome = pathname === '/' || pathname === '/index.html'

  return (
    <div className="page">
      <main className="container">
        {logoVisible ? (
          <img
            className="logo"
            src="/fti.png"
            alt="FTI Service"
            onError={() => setLogoVisible(false)}
          />
        ) : null}

        {isHome ? (
          <>
            <h1 className="title">FTI Service</h1>
            <p className="subtitle">เว็บไซต์ปลายทางสำหรับบริการของ FTI</p>

            <div className="card">
              <p className="hint">
                หากคุณมีโลโก้ไฟล์ <code>logo.svg</code> (หรือแก้ให้เป็นชื่ออื่น) ให้วางไว้ในโฟลเดอร์{' '}
                <code>public/</code>
              </p>

              <div className="actions">
                <a className="primary" href="/">
                  หน้าแรก
                </a>
                <a className="secondary" href="/health">
                  ตรวจสอบสถานะ (/health)
                </a>
              </div>
            </div>

            <footer className="footer">
              <span>© {new Date().getFullYear()} FTI Service</span>
            </footer>
          </>
        ) : (
          <>
            <h1 className="title">404</h1>
            <p className="subtitle">ไม่พบหน้า {pathname}</p>
            <div className="actions">
              <a className="primary" href="/">
                กลับหน้าแรก
              </a>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App
