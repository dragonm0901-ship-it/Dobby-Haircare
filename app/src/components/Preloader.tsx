import { useState, useEffect } from 'react'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('dobby-visited')) { onComplete(); return }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100 }
        return prev + Math.random() * 15
      })
    }, 100)
    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsExiting(true)
        sessionStorage.setItem('dobby-visited', 'true')
        setTimeout(onComplete, 600)
      }, 300)
    }
  }, [progress, onComplete])

  if (sessionStorage.getItem('dobby-visited')) return null

  return (
    <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-all duration-600 ${
      isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
    }`}>
      <span className={`text-4xl sm:text-5xl font-black italic text-white tracking-tight transition-all duration-500 ${
        isExiting ? '-translate-y-4 opacity-0' : ''
      }`}>
        dobby
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-light mt-3">
        Haircare
      </span>
      <div className="w-32 h-[2px] bg-white/[0.06] mt-8 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple rounded-full transition-all duration-200"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  )
}
