export default function NotFound() {
  const qrToolsUrl = 'https://employee-management-9yicp.kinsta.app/qr-tools'
  const loginUrl = 'https://employee-management-9yicp.kinsta.app/login'
  return (
    <div className="refWrap">
      <div className="refPanel">
        <div className="refHeadline">
          <div className="refLeft">
            <div className="refKicker">we have a problem.</div>
            <div className="refBig" data-text="404!">404!</div>
            <div className="refSub">Page not found</div>
            <div className="refFine">
              <div>กรุณาเข้าสู่ระบบด้วยลิงก์นี้เท่านั้น</div>
              <a className="refLink" href={loginUrl}>
                {qrToolsUrl}
              </a>
              <div>หากมีปัญหาให้ติดต่อผู้ดูแลระบบของสภาอุตสาหกรรมแห่งประเทศไทย</div>
            </div>

            <div className="actions refActions">
              <a className="primary" href="/">
                กลับหน้าแรก
              </a>
              <a className="secondary" href="/health">
                ตรวจสอบสถานะ
              </a>
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
