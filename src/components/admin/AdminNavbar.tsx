'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Settings, LogOut } from 'lucide-react'

export default function AdminNavbar() {
  const { logout } = useAuth()

  return (
    <header className="bg-gray-900 text-white py-4 px-6 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin" className="text-xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              Royal<span className="text-primary">Transfer</span>
            </span>
            <span className="ml-2 text-sm text-gray-400">Админ-панель</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">
            Настройки
          </Link>
          <Link href="/" className="text-gray-300 hover:text-white transition-colors" target="_blank">
            Сайт
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="border-gray-700 text-gray-300 hover:text-white"
            onClick={() => logout()}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
