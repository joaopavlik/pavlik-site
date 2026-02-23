'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-black via-secondary to-black flex items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(196, 30, 58, 0.3) 2px, rgba(196, 30, 58, 0.3) 4px)'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl text-white leading-none mb-4"
          >
            FORÇA<br />
            TÉCNICA<br />
            <span className="text-primary text-5xl md:text-7xl tracking-[0.2em]">RESULTADOS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-xl"
          >
            Treinamento personalizado para hipertrofia, emagrecimento e performance no Jiu-Jitsu. 
            Desenvolva seu máximo potencial com metodologia baseada em evidências científicas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#plans"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 font-bold uppercase tracking-wider transition-all hover:scale-105 text-center shadow-lg shadow-primary/50"
            >
              Começar Agora
            </a>
            <a
              href="#about"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 font-bold uppercase tracking-wider transition-all text-center"
            >
              Saiba Mais
            </a>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative"
        >
          <div className="relative aspect-square max-w-lg mx-auto">
            {/* Decorative Border */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-primary rounded-lg" />
            
            {/* Image Container */}
            <div className="relative z-10 overflow-hidden rounded-lg border-4 border-primary shadow-2xl shadow-primary/30">
              <Image
                src="/pavlik.jpeg"
                alt="João Guilherme Pavlik - Atleta de Jiu-Jitsu"
                width={500}
                height={500}
                className="w-full h-full object-cover grayscale-[0.2] contrast-110 hover:grayscale-0 transition-all duration-500"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-3 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
