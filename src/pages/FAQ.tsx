import { motion } from 'framer-motion'
import { Sparkles, Search } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is SubtitleFlow?',
        a: 'SubtitleFlow is an AI-powered browser extension that provides real-time subtitle translation for videos across the web. It works on YouTube, educational platforms, livestreams, and more, automatically detecting speech and translating it into your preferred language.',
      },
      {
        q: 'Is SubtitleFlow free?',
        a: 'Yes! SubtitleFlow has a generous free tier that includes real-time translation for 10 languages, basic styling, and up to 2 hours of usage per day. Premium and Enterprise plans are available for users who need more.',
      },
      {
        q: 'Which browsers are supported?',
        a: 'SubtitleFlow supports Chrome, Microsoft Edge, Firefox, and Brave. All major browsers are covered, and the extension uses Manifest V3 for the best performance and security.',
      },
      {
        q: 'Do I need to create an account?',
        a: 'No account is required to use SubtitleFlow. You can install the extension and start translating immediately. Creating an optional free account lets you sync settings across devices.',
      },
    ],
  },
  {
    category: 'Features',
    questions: [
      {
        q: 'How many languages are supported?',
        a: 'SubtitleFlow supports over 100 languages for translation. The free plan includes 10 languages, while Premium and Enterprise plans unlock the full library of 100+ languages.',
      },
      {
        q: 'How accurate are the translations?',
        a: 'SubtitleFlow uses advanced AI models for speech recognition and translation. Standard accuracy is excellent for clear audio, and Premium plans include AI-enhanced accuracy with context correction, speaker recognition, and noise filtering for near-perfect results.',
      },
      {
        q: 'Can I customize how subtitles look?',
        a: 'Absolutely! You can change font family, font size, text color, background color, opacity, and subtitle position. You can also save custom themes and switch between them instantly.',
      },
      {
        q: 'Does it work on all video platforms?',
        a: 'SubtitleFlow works on YouTube, Coursera, Udemy, Twitch, Vimeo, and most other video platforms. Premium plans extend support to additional platforms and provide better integration.',
      },
    ],
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'How fast is the translation?',
        a: 'SubtitleFlow processes audio and displays translated subtitles in under 200 milliseconds, ensuring a seamless real-time experience.',
      },
      {
        q: 'Can I download subtitles?',
        a: 'Yes! You can download subtitles in SRT format (standard subtitle format compatible with all video players) or TXT format for easy editing and sharing.',
      },
      {
        q: 'Does it work offline?',
        a: 'Previously translated and cached subtitles are available offline. Premium users get enhanced offline caching for a better experience.',
      },
      {
        q: 'Is my data private?',
        a: 'We take privacy seriously. Audio processing happens locally when possible, and translations are encrypted in transit. We do not store your video audio or translated content. See our Privacy Policy for details.',
      },
    ],
  },
  {
    category: 'Pricing & Plans',
    questions: [
      {
        q: 'Can I upgrade from Free to Premium?',
        a: 'Yes, you can upgrade at any time. Your settings and preferences will be preserved. Start your free Premium trial with no commitment required.',
      },
      {
        q: 'Is there a money-back guarantee?',
        a: 'Yes, Premium plans come with a 14-day money-back guarantee. If you\'re not satisfied, contact our support team for a full refund.',
      },
      {
        q: 'What is the Enterprise plan?',
        a: 'The Enterprise plan is designed for teams and businesses. It includes team management, custom AI models, API access, white-label solutions, dedicated support, and a 99.9% uptime SLA.',
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes, you can cancel your subscription at any time. Your Premium features will remain active until the end of your billing period.',
      },
    ],
  },
]

export default function FAQ() {
  const [search, setSearch] = useState('')

  const filtered = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      q => q.q.toLowerCase().includes(search.toLowerCase()) ||
           q.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => cat.questions.length > 0)

  return (
    <div className="pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-sm font-medium mb-4">
            <Sparkles size={14} />
            FAQ
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Everything you need to know about SubtitleFlow.
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-12">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* FAQ sections */}
        <div className="space-y-12">
          {filtered.map(cat => (
            <div key={cat.category}>
              <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
                {cat.category}
              </h2>
              <div className="space-y-3">
                {cat.questions.map((faq, i) => (
                  <motion.details
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200 cursor-pointer [&[open]]:border-indigo-500/30 [&[open]]:bg-indigo-500/[0.02]"
                  >
                    <summary className="text-sm font-medium list-none flex items-center justify-between">
                      <span>{faq.q}</span>
                      <span className="text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-4 text-xs">
                        ▼
                      </span>
                    </summary>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  </motion.details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
