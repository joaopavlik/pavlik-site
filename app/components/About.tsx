'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const cards = [
    {
      title: 'Formação & Experiência',
      content: [
        'Formado em Educação Física pela Universidade Estadual de Goiás e especialista em Ciências do Exercício Clínico e Esportivo. O esporte sempre fez parte da minha vida: desde a infância estive envolvido com diferentes modalidades, movido pela paixão por competir, evoluir e buscar alto desempenho.',
        'Atualmente, estou profundamente envolvido com o Jiu-Jitsu, onde sou faixa azul e já acumulo um sólido repertório de campeonatos.'
      ]
    },
    {
      title: 'Minha Metodologia',
      content: [
        'Ao longo de 8 anos de atuação sempre trabalhei com pessoas que buscam resultados estéticos como hipertrofia e emagrecimento com um planejamento individualizado e baseado em evidências científicas.',
        'Expandi meus conhecimentos para além da estética, atuando também no desenvolvimento da performance esportiva voltado para praticantes de Jiu-Jitsu que desejam melhorar sua performance no tatame sem abrir mão da estética.'
      ]
    }
  ]

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-display text-[12rem] md:text-[20rem] text-primary/5 pointer-events-none select-none">
        ABOUT
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-5xl md:text-7xl font-bold text-secondary mb-4 uppercase">
            Sobre Mim
          </h2>
          <p className="text-primary text-xl font-semibold uppercase tracking-widest mb-16">
            Quem é João Guilherme Pavlik
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-8 border-l-4 border-primary shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group"
            >
              <h3 className="font-heading text-2xl font-semibold text-secondary mb-6 uppercase tracking-wide group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              {card.content.map((paragraph, i) => (
                <p key={i} className={`text-gray-700 leading-relaxed ${i > 0 ? 'mt-4' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
