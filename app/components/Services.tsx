'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Dumbbell, Flame, Users, Target, MessageCircle, TrendingUp } from 'lucide-react'

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      icon: Dumbbell,
      title: 'Hipertrofia',
      description: 'Planejamento individualizado para ganho de massa muscular com base em evidências científicas e acompanhamento personalizado.'
    },
    {
      icon: Flame,
      title: 'Emagrecimento',
      description: 'Estratégias eficazes para perda de gordura corporal mantendo a massa muscular e saúde metabólica.'
    },
    {
      icon: Users,
      title: 'Performance Jiu-Jitsu',
      description: 'Treinamento específico para praticantes de Jiu-Jitsu focado em força, resistência e condicionamento para o tatame.'
    },
    {
      icon: TrendingUp,
      title: 'Periodização',
      description: 'Planejamento estratégico de treinos com periodização adequada para otimizar resultados e prevenir lesões.'
    },
    {
      icon: MessageCircle,
      title: 'Acompanhamento Diário',
      description: 'Suporte contínuo via WhatsApp para tirar dúvidas, fazer ajustes e manter você motivado durante toda a jornada.'
    },
    {
      icon: Target,
      title: 'Treinamento Personalizado',
      description: 'Programas 100% personalizados baseados nas suas necessidades, objetivos e estilo de vida.'
    }
  ]

  return (
    <section id="services" ref={ref} className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-4 uppercase">
            Serviços
          </h2>
          <p className="text-white/70 text-xl font-semibold uppercase tracking-widest">
            O que eu ofereço
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:border-primary hover:bg-white/10 transition-all group hover:-translate-y-3 relative overflow-hidden"
              >
                {/* Hover Effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                
                <Icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                
                <h3 className="font-heading text-2xl text-white mb-4 uppercase tracking-wide">
                  {service.title}
                </h3>
                
                <p className="text-white/70 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
