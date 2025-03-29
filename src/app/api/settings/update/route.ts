import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/settings/update
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Проверка наличия необходимых полей
    if (!data.key || !data.value) {
      return NextResponse.json({ error: 'Отсутствуют обязательные поля' }, { status: 400 })
    }

    // Обновляем настройку, если она существует, иначе создаем новую
    const updatedSetting = await prisma.settings.upsert({
      where: { key: data.key },
      update: { value: data.value },
      create: { key: data.key, value: data.value }
    })

    return NextResponse.json({ success: true, setting: updatedSetting })
  } catch (error) {
    console.error('Failed to update setting:', error)
    return NextResponse.json({ error: 'Ошибка при обновлении настройки' }, { status: 500 })
  }
}
