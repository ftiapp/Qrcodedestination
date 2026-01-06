export function GET() {
  const qrToolsUrl = 'https://employee-management-9yicp.kinsta.app/qr-tools'
  const loginUrl = 'https://employee-management-9yicp.kinsta.app/login'
  const html = `<!doctype html>
<html lang="th">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>404 Not Found</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
    <style>
      :root { color-scheme: light; }
      body {
        margin: 0;
        font-family: "Noto Sans Thai", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji", "Segoe UI Emoji";
        background: radial-gradient(1200px 600px at 18% 10%, rgba(79, 70, 229, 0.22), rgba(79, 70, 229, 0) 60%),
          radial-gradient(900px 520px at 70% 20%, rgba(16, 185, 129, 0.18), rgba(16, 185, 129, 0) 55%),
          linear-gradient(180deg, #0b1220, #0a0f1a);
        color: rgba(255, 255, 255, 0.92);
      }
      .wrap { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
      .panel { width: 100%; max-width: 980px; border-radius: 28px; overflow: hidden; box-shadow: 0 24px 70px rgba(0,0,0,0.55); background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.09); }
      .headline { display: grid; grid-template-columns: 1fr; gap: 16px; align-items: center; text-align: left; }
      .left { text-align: left; padding: 34px 34px 32px; }
      .kicker { margin: 0 0 10px; font-size: 16px; font-weight: 700; letter-spacing: 0.01em; color: rgba(255, 255, 255, 0.72); }
      .right { display: grid; place-items: center; background: #ffffff; padding: 34px; position: relative; }
      .right::before { content: ""; position: absolute; top: 0; bottom: 0; left: -90px; width: 200px; background: linear-gradient(135deg, rgba(255,255,255,0) 45%, rgba(255,255,255,1) 46%); pointer-events: none; }
      .big404 { position: relative; display: inline-block; font-weight: 900; letter-spacing: -0.02em; font-size: clamp(80px, 16vw, 170px); line-height: 0.92; margin: 0 0 14px; color: rgba(255, 255, 255, 0.96); text-shadow: 0 14px 40px rgba(0,0,0,0.45); }
      .big404::after { content: attr(data-text); position: absolute; inset: 0; transform: translate(0.06em, 0.06em); color: rgba(79, 70, 229, 0.7); z-index: -1; text-shadow: none; }
      .sub { margin-top: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.01em; color: rgba(255, 255, 255, 0.9); }
      .fineprint { margin-top: 12px; font-size: 13px; line-height: 1.5; color: rgba(255, 255, 255, 0.62); }
      .urlpill { display: inline-flex; align-items: center; justify-content: center; gap: 10px; margin: 6px 0 6px; padding: 0; border-radius: 0; background: transparent; border: 0; color: #a5b4fc; font-weight: 900; letter-spacing: 0.01em; text-decoration: none; box-shadow: none; word-break: break-word; }
      .urlpill:hover { color: #c7d2fe; }
      .logo { display:block; margin:0; width: min(220px, 44vw); height:auto; filter: drop-shadow(0 10px 18px rgba(0,0,0,0.45)); opacity: 0.96; }
      .actions { display:flex; flex-wrap:wrap; gap:.75rem; justify-content:flex-start; margin-top: 18px; }
      a.btn { display:inline-flex; align-items:center; justify-content:center; padding:.75rem 1rem; border-radius:14px; border:1px solid transparent; text-decoration:none; font-weight:700; }
      a.primary { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 55%, #1d4ed8 100%); color:#fff; }
      a.secondary { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.9); border-color: rgba(255,255,255,0.14); }
      @media (min-width: 760px) { .headline { grid-template-columns: 1fr auto; gap: 26px; } .right { justify-self: end; } }
      @media (max-width: 759px) { .panel { border-radius: 22px; } .headline { text-align: center; } .left { text-align: center; padding: 26px 22px 18px; } .logo { margin: 0 auto; } .right { padding: 18px 22px 26px; } .right::before { display: none; } .actions { justify-content: center; } }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="panel">
        <div class="headline">
          <div class="left">
            <div class="kicker">we have a problem.</div>
            <div class="big404" data-text="404!">404!</div>
            <div class="sub">Page not found</div>
            <div class="fineprint">
              <div>กรุณาเข้าสู่ระบบด้วยลิงก์นี้เท่านั้น</div>
              <a class="urlpill" href="${loginUrl}">${qrToolsUrl}</a>
              <div>หากมีปัญหาให้ติดต่อผู้ดูแลระบบของสภาอุตสาหกรรมแห่งประเทศไทย</div>
            </div>
            <div class="actions">
              <a class="btn primary" href="/">กลับหน้าแรก</a>
              <a class="btn secondary" href="/health">ตรวจสอบสถานะ</a>
            </div>
          </div>
          <div class="right"><img class="logo" src="/fti.png" alt="FTI" /></div>
        </div>
      </div>
    </div>
  </body>
</html>`

  return new Response(html, {
    status: 404,
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  })
}
