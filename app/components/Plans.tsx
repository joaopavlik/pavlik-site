'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Check, Sparkles } from 'lucide-react'
import PaymentModal from './PaymentModal'

export default function Plans() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedPlan, setSelectedPlan] = useState<any>(null)

  const plans = [
    {
      name: 'Plano Mensal',
      price: 217,
      period: 'mês',
      features: [
        '1 planejamento de treino',
        '4 semanas de periodização',
        'Acompanhamento diário via WhatsApp',
        'Suporte para dúvidas',
        'Ajustes conforme necessário'
      ],
      featured: false
    },
    {
      name: 'Plano Trimestral',
      price: 557,
      period: '3 meses',
      features: [
        '3 planejamentos de treino',
        '4 semanas de duração cada',
        'Acompanhamento diário via WhatsApp',
        'Suporte para dúvidas',
        'Ajustes ilimitados',
        'Economia de R$ 94'
      ],
      featured: true,
      badge: 'Melhor Escolha'
    }
  ]

  return (
    <>
      <section id="plans" ref={ref} className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-secondary mb-4 uppercase">
              Planos
            </h2>
            <p className="text-primary text-xl font-semibold uppercase tracking-widest">
              Escolha o melhor para você
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`bg-white p-8 border-2 relative overflow-hidden ${
                  plan.featured 
                    ? 'border-primary shadow-2xl shadow-primary/20 md:scale-105' 
                    : 'border-gray-200 shadow-lg'
                }`}
              >
                {/* Top Border */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-primary-dark" />

                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 -right-10 bg-primary text-white px-12 py-1 text-sm font-bold uppercase tracking-wider rotate-45 shadow-lg">
                    <Sparkles className="inline w-3 h-3 mr-1" />
                    {plan.badge}
                  </div>
                )}

                <h3 className="font-heading text-3xl font-semibold text-secondary mb-6 uppercase">
                  {plan.name}
                </h3>

                <div className="mb-8">
                  <span className="font-display text-6xl text-primary">
                    R$ {plan.price}
                  </span>
                  <span className="text-gray-600 text-xl">/{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full py-4 font-bold uppercase tracking-wider transition-all ${
                    plan.featured
                      ? 'bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-xl'
                      : 'bg-secondary hover:bg-black text-white'
                  }`}
                >
                  Assinar Agora
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedPlan && (
        <PaymentModal 
          plan={selectedPlan} 
          onClose={() => setSelectedPlan(null)} 
        />
      )}
    </>
  )
}
