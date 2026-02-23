'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface PaymentModalProps {
  plan: {
    name: string
    price: number
    duration: string
  }
  onClose: () => void
}

export default function PaymentModal({ plan, onClose }: PaymentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    billingType: 'CREDIT_CARD'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          plan: plan.name.includes('Mensal') ? 'MENSAL' : 'TRIMESTRAL',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar pagamento')
      }

      // --- BLOCO DE REDIRECIONAMENTO PARA CELULAR ---
      if (data.whatsappUrl) {
        setLoading(false)
        
        // Essa confirmação "destrava" o navegador do celular para abrir o WhatsApp
        const usuarioConfirmou = confirm(
          '✅ Assinatura gerada com sucesso!\n\nClique em OK para abrir seu WhatsApp e receber o link de pagamento.'
        )
        
        if (usuarioConfirmou) {
          window.location.href = data.whatsappUrl
        } else {
          // Se ele cancelar por erro, pelo menos fechamos o carregamento
          onClose()
        }
      } else {
        alert('✅ Assinatura criada com sucesso!\n\nEm breve você receberá os detalhes por email!')
        onClose()
      }
      // ----------------------------------------------

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar pagamento')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Finalizar Assinatura
          </h2>
          <p className="text-gray-600">
            {plan.name} - R$ {plan.price}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">❌ {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
              placeholder="João Silva"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
              placeholder="joao@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone/WhatsApp
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
              placeholder="(62) 99999-9999"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CPF
            </label>
            <input
              type="text"
              required
              value={formData.cpf}
              onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
              placeholder="000.000.000-00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Forma de Pagamento
            </label>
            <select
              value={formData.billingType}
              onChange={(e) => setFormData({ ...formData, billingType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
            >
              <option value="CREDIT_CARD">💳 Cartão de Crédito</option>
              <option value="PIX">📱 PIX</option>
              <option value="BOLETO">🧾 Boleto</option>
            </select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              {formData.billingType === 'CREDIT_CARD' 
                ? '✅ Pagamento recorrente automático. A renovação acontece todo mês!'
                : '📲 Você receberá o link de pagamento via WhatsApp após finalizar!'}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-bold hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {loading ? 'Processando...' : 'Finalizar Assinatura'}
          </button>

          <p className="text-center text-sm text-gray-500">
            💬 Você será redirecionado para o WhatsApp
          </p>
        </form>
      </div>
    </div>
  )
}