import mysql, { type Pool, type RowDataPacket } from 'mysql2/promise'

let cachedPool: Pool | null = null

function requiredEnv(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function getPool() {
  if (cachedPool) return cachedPool

  const host = requiredEnv('DB_HOST')
  const user = requiredEnv('DB_USER')
  const password = requiredEnv('DB_PASSWORD')
  const database = requiredEnv('DB_DATABASE')
  const port = Number(process.env.DB_PORT ?? 3306)

  cachedPool = mysql.createPool({
    host,
    user,
    password,
    database,
    port,
    waitForConnections: true,
    connectionLimit: 10,
    ssl: {
      rejectUnauthorized: false,
    },
  })

  return cachedPool
}

export type ShortUrlRow = RowDataPacket & {
  id: number
  slug: string
  name: string | null
  long_url: string
  description: string | null
  created_by: string | null
  has_expire: number
  expire_date: Date | null
  click_count: number
  created_at: Date
  updated_at: Date
  is_active: number
  share_scope: string | null
  qr_fg_color: string | null
  qr_bg_color: string | null
}

export async function findShortUrlBySlug(slug: string) {
  const pool = getPool()
  const [rows] = await pool.query<ShortUrlRow[]>(
    'SELECT * FROM shorturl_qrcode WHERE slug = ? LIMIT 1',
    [slug]
  )
  return rows[0] ?? null
}

type AnalyticsClickInsert = {
  linkId: number
  slug: string
  occurredAt?: Date
  userAgent: string | null
  ipAddress: string | null
  source: string | null
}

export async function logAnalyticsClick({
  linkId,
  slug,
  occurredAt = new Date(),
  userAgent,
  ipAddress,
  source,
}: AnalyticsClickInsert) {
  const pool = getPool()
  await pool.execute(
    `INSERT INTO analytics_clicks
      (link_id, slug, occurred_at, user_agent, ip_address, source)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [linkId, slug, occurredAt, userAgent, ipAddress, source]
  )
}
