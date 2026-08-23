import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import Container from './Container'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[15px] w-[15px]">
      <defs>
        <linearGradient id="instagram-gradient" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEDA75" />
          <stop offset="0.35" stopColor="#FA7E1E" />
          <stop offset="0.65" stopColor="#D62976" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#instagram-gradient)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="url(#instagram-gradient)" strokeWidth="2" />
      <circle cx="17.4" cy="6.7" r="1.15" fill="#D62976" />
    </svg>
  )
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/theemiliob/',
    icon: InstagramIcon,
    className: 'hover:border-[#D62976]/70',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/emiliocali',
    icon: FaLinkedinIn,
    className: 'text-[#0A66C2] hover:border-[#0A66C2]/70',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/EmilioCali',
    icon: FaGithub,
    className: 'text-white hover:border-white/70',
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer data-cursor="dark" className="border-t border-white/15 bg-black py-7 text-white sm:py-8">
      <Container className="max-w-screen-2xl">
        <div className="flex flex-col gap-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono tracking-wide text-white/45">
            © {currentYear} Emilio Cali. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 sm:inline">
              Redes Sociales
            </span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-primary" />
            <nav aria-label="Redes sociales" className="flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon, className }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-colors ${className}`}
                >
                  <Icon size={15} />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  )
}
