import { NextResponse, type NextRequest } from 'next/server'
import { findShortUrlBySlug } from '../../lib/db'

function isAllowedMainSiteReferrer(value: string) {
  if (!value) return false
  return (
    value.startsWith('https://employee-management-9yicp.kinsta.app/') ||
    value.startsWith('http://localhost:3000/') ||
    value.startsWith('http://127.0.0.1:3000/') ||
    value.includes('ftiservice.net')
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
  const referer = request.headers.get('referer') || ''
  const origin = request.headers.get('origin') || ''

  // Allow direct access for testing if no referer/origin is present
  const isDirectAccess = !referer && !origin
  const isAuthorized =
    isDirectAccess || isAllowedMainSiteReferrer(referer) || isAllowedMainSiteReferrer(origin)

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

  return NextResponse.redirect(destination)
}
