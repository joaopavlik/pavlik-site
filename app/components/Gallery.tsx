'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    { src: '/competition1.jpeg', alt: 'João Pavlik competindo no Jiu-Jitsu' },
    { src: '/competition2.jpeg', alt: 'João Pavlik campeão no pódio' },
    { src: '/competition3.jpeg', alt: 'João Pavlik treinando' },
    { src: '/competition4.jpeg', alt: 'João Pavlik em ação no tatame' },
    { src: '/competition5.jpeg', alt: 'João Pavlik campeão 2025' },
    { src: '/competition6.jpeg', alt: 'João Pavlik competindo Alliance' }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section id="gallery" ref={ref} className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-primary" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-4 uppercase">
            Competições
          </h2>
          <p className="text-white/70 text-xl font-semibold uppercase tracking-widest">
            Trajetória e conquistas
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Main Image Container */}
          <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-lg border-4 border-primary/50 shadow-2xl shadow-primary/20 bg-black">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain transition-all duration-500"
              priority
            />

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-primary text-white p-3 rounded-full transition-all hover:scale-110 backdrop-blur-sm z-20"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-primary text-white p-3 rounded-full transition-all hover:scale-110 backdrop-blur-sm z-20"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={28} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold z-20">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-6 gap-3 mt-6">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                  currentIndex === index
                    ? 'ring-4 ring-primary scale-105'
                    : 'opacity-50 hover:opacity-100 hover:scale-105'
                }`}
              >
                <Image
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Dots Indicator (Mobile) */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? 'bg-primary w-8'
                    : 'bg-white/30'
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Auto-play indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-white/50 text-sm">
            Use as setas ou clique nas miniaturas para navegar
          </p>
        </motion.div>
      </div>
    </section>
  )
}