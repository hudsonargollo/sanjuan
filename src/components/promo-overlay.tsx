"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const PROMO_IMAGE = "/imgs/olasuavecitosensaciones5l.jpg";

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const pulse = {
  scale: [1, 1.06, 1],
  transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
};

export function PromoOverlay() {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.12 }}
      className="relative overflow-hidden bg-maroon text-light"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Bold animated text block */}
          <motion.div variants={slideUp} className="text-center md:text-left">
            <motion.span
              variants={slideUp}
              className="inline-block rounded-full border border-[rgba(230,205,139,0.55)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold"
            >
              Entrega inmediata
            </motion.span>

            <motion.h2
              variants={slideUp}
              className="mt-5 font-serif text-4xl font-black leading-tight tracking-tight sm:text-6xl"
            >
              LLEGÓ LO NUEVO
              <br />
              <span className="bg-gradient-to-r from-gold-hi to-gold bg-clip-text text-transparent">
                ¡OFERTA POR POCO TIEMPO!
              </span>
            </motion.h2>

            <motion.p variants={slideUp} className="mt-4 text-lg text-light/80">
              Pedí ahora y recibilo hoy mismo en{" "}
              <span className="font-semibold text-gold">Buena Vista</span>, Santa Cruz.
              <br className="hidden sm:block" />
              Pago contra entrega · Sin tarjetas · Sin complicaciones.
            </motion.p>

            <motion.div variants={slideUp} className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link
                href="/shop"
                className="inline-block rounded-full bg-gradient-to-r from-gold-hi to-gold px-9 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-maroon shadow-[0_14px_34px_-14px_rgba(230,205,139,0.7)] transition hover:opacity-90"
              >
                Comprar ahora
              </Link>
              <a
                href="https://wa.me/5910000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-[rgba(230,205,139,0.55)] px-9 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-light transition hover:border-gold hover:text-gold"
              >
                WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Product image with Framer Motion pulse */}
          <motion.div variants={slideUp} className="flex justify-center">
            <motion.img
              animate={pulse}
              src={PROMO_IMAGE}
              alt="Ola Suavecito Sensaciones — oferta limitada"
              className="max-h-[320px] w-auto drop-shadow-[0_24px_40px_-16px_rgba(0,0,0,0.7)]"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* thin gold hairline */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(230,205,139,0.55)] to-transparent"
        aria-hidden="true"
      />
    </motion.section>
  );
}
