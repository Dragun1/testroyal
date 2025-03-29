'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone } from 'lucide-react'
import { useForm } from 'react-hook-form'

type FormValues = {
  phone: string
}

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormValues>()

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings')
        if (response.ok) {
          const data = await response.json()
          setValue('phone', data.phone || '')
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error)
      }
    }

    fetchSettings()
  }, [setValue])

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await fetch('/api/settings/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: 'phone', value: data.phone }),
      })

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Номер телефона успешно обновлен'
        })
      } else {
        const error = await response.json()
        setMessage({
          type: 'error',
          text: error.error || 'Ошибка при обновлении номера телефона'
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Ошибка при обновлении. Пожалуйста, попробуйте позже.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Настройки сайта</h1>

      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center">
            <Phone className="mr-2 h-5 w-5 text-blue-500" />
            Контактная информация
          </CardTitle>
          <CardDescription>
            Редактирование номера телефона, отображаемого в футере сайта
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="pb-2">
            <div className="space-y-1">
              <label htmlFor="phone" className="text-sm font-medium">
                Номер телефона
              </label>
              <Input
                id="phone"
                placeholder="+7 (XXX) XXX-XX-XX"
                type="text"
                {...register('phone', {
                  required: 'Обязательное поле',
                  pattern: {
                    value: /^(\+7|8)[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
                    message: 'Введите корректный номер телефона'
                  }
                })}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}

              {message.text && (
                <p className={`text-sm ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                  {message.text}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
