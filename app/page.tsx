export default function HomePage() {
  return (
    <div className="refWrap">
      <div className="refPanel">
        <div className="refHeadline">
          <div className="refLeft">
            <div className="refKicker">ftiservice.net</div>
            <div className="refBig" data-text="FTI">FTI</div>
            <div className="refSub">FTI Service (Destination)</div>
            <div className="refFine">
              <div>เว็บไซต์ปลายทางสำหรับบริการของ FTI</div>
              <div>ใช้เส้นทางด้านล่างเพื่อทดสอบการเชื่อมต่อและสถานะระบบ</div>
            </div>

            <div className="actions refActions">
              <a className="primary" href="/health">
                /health
              </a>
              <a className="secondary" href="/401">
                /401
              </a>
              <a className="secondary" href="/402">
                /402
              </a>
              <a className="secondary" href="/403">
                /403
              </a>
              <a className="secondary" href="/404">
                /404
              </a>
            </div>

            <div className="refFine" style={{ marginTop: 14 }}>
              <div>© {new Date().getFullYear()} FTI Service</div>
            </div>
          </div>

          <div className="refRight">
            <img className="refLogo" src="/fti.png" alt="FTI" />
          </div>
        </div>
      </div>
    </div>
  )
}
