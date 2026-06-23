import { motion } from 'framer-motion'

const browsers = [
  {
    name: 'Chrome',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <path fill="#FFC107" d="M24 4C13.5 4 4.9 11.4 4 22h12.9c1.1-3.3 4.2-5.7 7.9-6 3.7.3 6.8 2.7 7.9 6H44c-.9-10.6-9.5-18-20-18z"/>
        <path fill="#4CAF50" d="M24 44c10.5 0 19.1-7.4 20-18H31.1c-1.1 3.3-4.2 5.7-7.9 6-1.2 0-2.4-.2-3.5-.6L16 39.9c2.4 1.5 5.2 2.4 8 3.1z"/>
        <path fill="#1976D2" d="M6.4 36.5C9.9 41.5 16.4 44 24 44c3.5 0 6.8-.6 10-1.8L28.8 36c-1.5.6-3.1 1-4.8 1-3.7 0-7-1.9-8.9-4.8L6.4 36.5z"/>
        <path fill="#F44336" d="M4 22c0 4.5 1.6 8.7 4.6 12.1l3.5-5.6c-.7-1.1-1.1-2.3-1.1-3.7 0-4.1 3.4-7.5 7.5-7.5h.2C16.2 15 12.9 12.1 12.9 12.1L4 22z"/>
      </svg>
    ),
    badge: 'Recommended',
  },
  {
    name: 'Microsoft Edge',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <path fill="#1BA0E2" d="M38 18.5C38 12.7 33.3 8 27.5 8 21.7 8 17 12.7 17 18.5c0 5.8 4.7 10.5 10.5 10.5 5.8 0 10.5-4.7 10.5-10.5z"/>
        <path fill="#60CFFF" d="M17 35c5.8 0 10.5-4.7 10.5-10.5S22.8 14 17 14 6.5 18.7 6.5 24.5 11.2 35 17 35z"/>
      </svg>
    ),
  },
  {
    name: 'Firefox',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <path fill="#FF7139" d="M24 4C13.5 4 4.9 11.4 4 22c0 1.3.1 2.6.4 3.9C5.5 30.5 8.1 34 11 37l.1.1c3.5 3.5 8.1 6.9 13.9 6.9 10.5 0 19-8.5 19-19s-8.5-19-19-19z"/>
        <path fill="#FF9500" d="M40.5 35.5C37 40 31.5 44 24 44c-5.8 0-10.4-2.5-13.9-6.9 3.5 3 7.5 4.9 12.9 4.9 8 0 14.5-6.5 14.5-14.5 0-3.5-1.2-6.7-3.3-9.2.5 1.2.8 2.5.8 3.7 0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10c2.9 0 6.5 1.5 8.5 3.5C30.5 7.5 27 5 24 5c-10.5 0-19 8.5-19 19 0 2.5.5 4.9 1.3 7.1C5 29 4 26.5 4 24c0-11 9-20 20-20s20 9 20 20c0 5.5-2.2 10.5-5.8 14.2"/>
      </svg>
    ),
  },
  {
    name: 'Brave',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <path fill="#FB542B" d="M24 4L10 12v10c0 8.5 5.5 16.5 14 19 8.5-2.5 14-10.5 14-19V12L24 4z"/>
        <path fill="#fff" d="M24 8.5L13 14.5v7.5c0 7.5 4.5 13.5 11 15.5 6.5-2 11-8 11-15.5v-7.5L24 8.5z"/>
        <path fill="#FB542B" d="M24 11L16.5 16v6c0 5.5 3.5 9.5 7.5 11 4-1.5 7.5-5.5 7.5-11v-6L24 11z"/>
        <path fill="#fff" d="M24 14l-4 3.5v4.5c0 3.5 2 6 4 7 2-1 4-3.5 4-7v-4.5L24 14z"/>
      </svg>
    ),
  },
]

export default function BrowserSupport() {
  return (
    <section id="browsers" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Available on{' '}
            <span className="gradient-text">All Major Browsers</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            One extension, all your favorite browsers. Install once and use everywhere.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {browsers.map((browser, index) => (
            <motion.div
              key={browser.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 card-hover text-center hover:shadow-xl hover:shadow-indigo-500/5"
            >
              {browser.badge && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-500 text-white text-xs font-medium">
                  {browser.badge}
                </div>
              )}
              <div className="flex justify-center mb-4">
                {browser.icon}
              </div>
              <h3 className="text-lg font-semibold">{browser.name}</h3>
              <p className="text-xs text-slate-400 mt-1">v3.0+ supported</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
