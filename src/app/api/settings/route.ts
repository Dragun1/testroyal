import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/settings
export async function GET() {
  try {
    const settings = await prisma.settings.findMany()

    // Преобразуем массив в объект для более удобного использования
    const settingsObject = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {} as Record<string, string>)

    return NextResponse.json(settingsObject)
  } catch (error) {
    console.error('Failed to fetch settings:', error)
    return NextResponse.json({ error: 'Ошибка при получении настроек' }, { status: 500 })
  }
}
