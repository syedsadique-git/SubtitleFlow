import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles, Globe, Shield, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { value: '100K+', label: 'Active Users' },
  { value: '100+', label: 'Languages' },
  { value: '99.9%', label: 'Accuracy' },
  { value: '<200ms', label: 'Latency' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-sm font-medium mb-6">
              <Sparkles size={14} />
              AI-Powered Real-Time Translation
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6">
              Understand Any{' '}
              <span className="gradient-text">Video</span>{' '}
              in Any Language
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
              Break language barriers with AI-powered real-time subtitle translation.
              Works on YouTube, educational platforms, livestreams, and more.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/download"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]"
              >
                Download Extension
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => {
                  const demoSection = document.getElementById('how-it-works')
                  if (demoSection) demoSection.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <Play size={16} />
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-8">
              {stats.map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 glow">
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                    <Play size={28} className="text-white ml-1" />
                  </div>
                  <p className="text-white/60 text-sm">Watch Demo Video</p>
                </div>
              </div>
              {/* Subtitles overlay mock */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 max-w-md">
                  <p className="text-white text-center text-sm">
                    <span className="text-cyan-400">[EN]</span>{' '}
                    Welcome to SubtitleFlow — your AI-powered translation tool.{' '}
                    <span className="text-indigo-400">[ES]</span>{' '}
                    Bienvenido a SubtitleFlow — tu herramienta de traducción impulsada por IA.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating feature badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 p-3 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2"
            >
              <Globe size={16} className="text-indigo-500" />
              <span className="text-xs font-medium">100+ Languages</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-4 p-3 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2"
            >
              <Zap size={16} className="text-cyan-500" />
              <span className="text-xs font-medium">Real-time</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 -right-6 p-3 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2"
            >
              <Shield size={16} className="text-green-500" />
              <span className="text-xs font-medium">99.9% Accurate</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
