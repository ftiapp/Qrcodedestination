import { NextResponse, type NextRequest } from 'next/server'
import { findShortUrlBySlug, logAnalyticsClick } from '../../lib/db'

function isAllowedMainSiteReferrer(value: string) {
  if (!value) return false
  const allowedPrefixes = [
    'https://employee-management-9yicp.kinsta.app/',
    'http://localhost:3000/',
    'http://127.0.0.1:3000/',
  ]

  const allowedHosts = ['ftiservice.net', 'facebook.com', 'l.facebook.com', 'm.facebook.com']

  return (
    allowedPrefixes.some((prefix) => value.startsWith(prefix)) ||
    allowedHosts.some((host) => value.includes(host))
  )
}

function needsRedirectTo403(slugRecord: Awaited<ReturnType<typeof findShortUrlBySlug>>) {
  if (!slugRecord) return false
  const isInactive = slugRecord.is_active !== 1
  const isExpired =
    slugRecord.has_expire === 1 &&
    slugRecord.expire_date !== null &&
    new Date(slugRecord.expire_date).getTime() < Date.now()

  return isInactive || isExpired
}

function normalizeRedirectUrl(raw: string) {
  if (!raw) return null
  try {
    const parsed = new URL(raw)
    return parsed.toString()
  } catch {
    // try prefixing https:// if missing scheme
    try {
      const parsed = new URL(`https://${raw}`)
      return parsed.toString()
    } catch {
      return null
    }
  }
}

function redirectTo(path: string, request: NextRequest) {
  const url = new URL(path, request.url)
  return NextResponse.redirect(url)
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // Security Check: Referer/Origin
  const allowAllReferrers = process.env.ALLOW_ALL_REFERRERS === 'true'
  const referer = request.headers.get('referer') || ''
  const origin = request.headers.get('origin') || ''

  // Allow direct access for testing if no referer/origin is present
  const isDirectAccess = !referer && !origin
  const isAuthorized =
    allowAllReferrers ||
    isDirectAccess ||
    isAllowedMainSiteReferrer(referer) ||
    isAllowedMainSiteReferrer(origin)

  if (!isAuthorized) {
    return redirectTo('/403', request)
  }

  const shortUrl = await findShortUrlBySlug(slug)

  if (!shortUrl) {
    return redirectTo('/404', request)
  }

  if (needsRedirectTo403(shortUrl)) {
    return redirectTo('/403', request)
  }

  const destination = normalizeRedirectUrl(shortUrl.long_url)
  if (!destination) {
    return redirectTo('/404', request)
  }

  const forwardedFor = request.headers.get('x-forwarded-for')
  const clientIp =
    (forwardedFor ? forwardedFor.split(',')[0]?.trim() : undefined) ??
    request.headers.get('x-real-ip') ??
    null

  logAnalyticsClick({
    linkId: shortUrl.id,
    slug,
    userAgent: request.headers.get('user-agent'),
    ipAddress: clientIp,
    source: isDirectAccess ? 'direct' : 'redirect',
  }).catch((err) => {
    console.error('Failed to log analytics click:', err)
  })

  return NextResponse.redirect(destination)
}
