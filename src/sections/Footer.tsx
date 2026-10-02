import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-ink/8 px-6 py-8 sm:px-10 lg:px-14 xl:px-20">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-3 sm:flex-row">
        <span className="font-mono text-[11px] text-ink/40">
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="font-mono text-[11px] text-ink/30">BUILT WITH REACT · TYPESCRIPT · FRAMER MOTION</span>
      </div>
    </footer>
  )
}
