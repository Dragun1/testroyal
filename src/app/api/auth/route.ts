import { NextRequest, NextResponse } from 'next/server'

// POST /api/auth
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Простая проверка учетных данных, в реальном проекте лучше использовать NextAuth или аналогичные решения
    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (username === adminUsername && password === adminPassword) {
      // В реальном проекте следует использовать JWT или другие токены
      return NextResponse.json({
        success: true,
        token: 'admin-session-token'
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'Неверные учетные данные'
      }, { status: 401 })
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({
      success: false,
      error: 'Ошибка аутентификации'
    }, { status: 500 })
  }
}
