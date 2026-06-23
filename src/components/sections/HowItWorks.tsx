import { motion } from 'framer-motion'
import { Download, Play, Globe, Smile } from 'lucide-react'

const steps = [
  {
    icon: Download,
    title: 'Install Extension',
    description: 'Add SubtitleFlow to your browser from the Chrome Web Store, Edge Add-ons, or Firefox Marketplace.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: Play,
    title: 'Open Any Video',
    description: 'Navigate to YouTube, Coursera, Twitch, or any video platform. The extension activates automatically.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Globe,
    title: 'Choose Language',
    description: 'Select your preferred language from 100+ options. Or let auto-detect handle it for you.',
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: Smile,
    title: 'Enjoy Translated Subtitles',
    description: 'Watch and understand content in your language with beautifully styled real-time subtitles.',
    color: 'from-emerald-500 to-emerald-600',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 relative scroll-mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.02] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            How It{' '}
            <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Get started in under a minute. Four simple steps to translate any video.
          </p>
        </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 opacity-30" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative text-center"
            >
              <div className="relative mb-6 inline-flex">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                  <step.icon size={28} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
