import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { SiGithub, SiGmail } from 'react-icons/si'
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import Container from '../components/Container'

const ease = [0.16, 1, 0.3, 1]

const contactLinks = [
  {
    label: 'WhatsApp',
    value: 'Emilio Cali',
    href: 'https://wa.me/50241978981',
    icon: FaWhatsapp,
    color: '#25D366',
  },
  {
    label: 'Email',
    value: 'emiliocali56@gmail.com',
    href: 'mailto:emiliocali56@gmail.com',
    icon: SiGmail,
    color: '#EA4335',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/emiliocali',
    href: 'https://www.linkedin.com/in/emiliocali',
    icon: FaLinkedin,
    color: '#0A66C2',
  },
  {
    label: 'GitHub',
    value: 'github.com/EmilioCali',
    href: 'https://github.com/EmilioCali',
    icon: SiGithub,
    color: '#F8FAFC',
  },
  {
    label: 'Luma',
    value: 'luma.com/user/emiliobc',
    href: 'https://luma.com/user/emiliobc',
    icon: CalendarDays,
    color: '#A78BFA',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export default function Contact() {
  return (
    <section id="contacto" data-cursor="dark" className="overflow-hidden bg-black text-text-dark">
      <div className="h-px w-full bg-white/15" />
      <Container className="max-w-screen-2xl">
        <div className="py-16 sm:py-24 md:py-32">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:gap-24">
            <div>
              <span className="flex items-center gap-2 font-mono text-sm text-text-dark-secondary">
                <span className="h-px w-6 bg-text-dark-secondary" />
                Contacto
              </span>
              <h2 className="mt-5 max-w-3xl break-words text-[clamp(2.35rem,11vw,4.5rem)] font-bold uppercase leading-[1.03] tracking-tight">
                Construyamos algo{' '}
                <span className="inline-block -skew-x-6 bg-white px-3 italic text-text-light">útil</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-text-dark-secondary md:text-lg">
                ¿Tienes una idea, una oportunidad o un reto técnico? Estoy disponible para conversar y convertirlo en una solución funcional.
              </p>
              <a href={contactLinks[0].href} className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-text-light transition-transform duration-300 hover:-translate-y-1">
                Escríbeme por WhatsApp
                <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="flex flex-col border-t border-white/15 lg:border-t-0">
              {contactLinks.map(({ label, value, href, icon: Icon, color }) => (
                <a key={label} href={href} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noreferrer'} className="group flex items-center gap-4 border-b border-white/15 py-5 transition-colors hover:bg-white/[0.03] sm:gap-5 sm:px-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15" style={{ color, borderColor: `${color}80` }}>
                    <Icon size={21} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-text-dark-secondary">{label}</span>
                    <span className="mt-1 block truncate text-sm font-medium text-white sm:text-base">{value}</span>
                  </span>
                  <ArrowUpRight size={18} className="shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
