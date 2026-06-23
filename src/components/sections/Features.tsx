import { motion } from 'framer-motion'
import {
  Mic2, Languages, Earth, Sparkles, MonitorPlay, Palette,
  Database, Zap, Sliders, Accessibility,
  Download
} from 'lucide-react'

const features = [
  {
    icon: Mic2,
    title: 'Real-Time Speech Recognition',
    description: 'AI-powered engine detects speech from any video with near-perfect accuracy, even in noisy environments.',
  },
  {
    icon: Languages,
    title: 'Instant Subtitle Translation',
    description: 'Translate subtitles into 100+ languages in real-time while preserving context and meaning.',
  },
  {
    icon: Earth,
    title: '100+ Languages Supported',
    description: 'From English to Zulu, Hindi to Hebrew — watch content in any language you choose.',
  },
  {
    icon: Sparkles,
    title: 'AI-Enhanced Accuracy',
    description: 'Context-aware AI correction with speaker recognition, accent adaptation, and noise filtering.',
  },
  {
    icon: MonitorPlay,
    title: 'Works on All Platforms',
    description: 'YouTube, Coursera, Udemy, Zoom, Twitch, Vimeo — any video with audio, any platform.',
  },
  {
    icon: Palette,
    title: 'Custom Subtitle Styling',
    description: 'Change font, size, color, background, opacity, and position. Save your custom themes.',
  },
  {
    icon: Database,
    title: 'Offline Subtitle Caching',
    description: 'Cached subtitles work offline. Never lose access to previously translated content.',
  },
  {
    icon: Zap,
    title: 'Low-Latency Processing',
    description: 'Sub-200ms processing ensures subtitles appear almost instantly after speech is detected.',
  },
]

const categories = [
  {
    title: 'Translation Controls',
    icon: Languages,
    items: ['Auto-detect source language', 'Manual language selection', 'One-click language switching'],
  },
  {
    title: 'Accessibility',
    icon: Accessibility,
    items: ['High contrast mode', 'Dyslexia-friendly fonts', 'Keyboard shortcuts'],
  },
  {
    title: 'Download Options',
    icon: Download,
    items: ['Export as SRT', 'Export as TXT', 'Export translated subtitles'],
  },
  {
    title: 'Customization',
    icon: Sliders,
    items: ['Subtitle size slider', 'Color picker', 'Font selector', 'Theme settings'],
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.02] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-sm font-medium mb-4">
            <Sparkles size={14} />
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Understand</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Powerful features designed to make any video content accessible in your language.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.05 }}
              className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 card-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon size={20} className="text-indigo-500" />
              </div>
              <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Feature categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 border border-indigo-500/10"
            >
              <cat.icon size={24} className="text-indigo-500 mb-4" />
              <h3 className="text-base font-semibold mb-3">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map(item => (
                  <li key={item} className="text-sm text-slate-500 dark:text-slate-400 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
