import { motion } from 'framer-motion'
import { Sparkles, Search, Shield, Download, Settings, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is SubtitleFlow?',
        a: 'SubtitleFlow is an AI-powered browser extension that provides real-time subtitle translation for videos across the web. It works on YouTube, educational platforms, livestreams, and more.',
      },
      {
        q: 'Is SubtitleFlow free?',
        a: 'Yes! SubtitleFlow is completely free to use. There are no paid plans required for the core extension.',
      },
      {
        q: 'Which browsers are supported?',
        a: 'SubtitleFlow supports Chrome, Microsoft Edge, Firefox, and Brave. All major browsers are covered, and the extension uses Manifest V3 for the best performance and security.',
      },
      {
        q: 'Do I need to create an account?',
        a: 'No account is required to use SubtitleFlow. You can install the extension and start translating immediately with zero registration.',
      },
    ],
  },
  {
    category: 'Installation',
    icon: <Download size={16} />,
    questions: [
      {
        q: 'How do I install SubtitleFlow without the Chrome Web Store?',
        a: 'Simply download the extension ZIP file from our <a href="/install" class="text-indigo-500 hover:text-indigo-400 underline">Install page</a>, extract it, enable Developer Mode in your browser, and load the unpacked extension. Full step-by-step instructions are provided for each browser.',
      },
      {
        q: 'Why is Developer Mode required?',
        a: 'Browsers require Developer Mode to load extensions that aren\'t published through their official stores. This is a standard security feature. Developer Mode does not disable any browser security; it simply allows loading unpacked extensions. The extension runs in the same sandboxed environment as any store-installed extension.',
      },
      {
        q: 'Is it safe to enable Developer Mode?',
        a: 'Yes, it\'s perfectly safe for installing trusted extensions like SubtitleFlow. Developer Mode only adds developer tools and the ability to load unpacked extensions. Your browser\'s security sandbox, Safe Browsing, and other protections remain fully active. We recommend disabling Developer Mode if you\'re not actively using it.',
      },
      {
        q: 'Will the extension work after I restart my browser?',
        a: 'For Chrome, Edge, and Brave: yes — once loaded, the extension persists across browser restarts. For Firefox: the "Load Temporary Add-on" method loads the extension only for the current session. It will be removed on restart unless you sign the extension through Mozilla\'s add-on developer hub.',
      },
      {
        q: 'How do I update the extension?',
        a: 'Since the extension is installed locally (not from a store), updates are manual. Download the latest version from our website, extract it over your existing folder, and go to your browser\'s extensions page and click the refresh/update icon on the SubtitleFlow card.',
      },
      {
        q: 'Can I install on multiple browsers?',
        a: 'Yes! The same ZIP file works on Chrome, Edge, Firefox, and Brave. Simply repeat the installation steps on each browser. There\'s no limit on installations.',
      },
    ],
  },
  {
    category: 'Extension Permissions',
    icon: <Shield size={16} />,
    questions: [
      {
        q: 'What permissions does SubtitleFlow need and why?',
        a: 'SubtitleFlow requires: <strong>Storage</strong> — to save your language preferences, subtitle style settings, and themes. <strong>Active Tab</strong> — to inject the subtitle overlay into the current video page. <strong>Scripting</strong> — to run the subtitle detection and display code on video sites. <strong>Tabs</strong> — to communicate between the popup and content script. None of these permissions access your browsing history, personal data, or non-video pages.',
      },
      {
        q: 'Does SubtitleFlow collect my data?',
        a: 'No. SubtitleFlow does not collect, store, or transmit any personal data, browsing history, or video content. Audio processing and translation happen through secure, encrypted API calls. We do not use analytics trackers, cookies, or any form of user tracking in the extension.',
      },
      {
        q: 'What are the host permissions for?',
        a: 'Host permissions define which websites the extension can access. SubtitleFlow only requests access to video platforms: YouTube, Coursera, Udemy, Twitch, and Vimeo. The extension cannot access any other websites.',
      },
      {
        q: 'Can I see the extension source code?',
        a: 'Absolutely! Since you\'re installing directly from a ZIP file, you can inspect every file in the extension. The code is open and transparent — no obfuscation, no minification. You can verify exactly what the extension does before installing.',
      },
    ],
  },
  {
    category: 'Security',
    icon: <Shield size={16} />,
    questions: [
      {
        q: 'How is my privacy protected?',
        a: 'SubtitleFlow processes audio locally in your browser when possible. Translation requests are sent over encrypted HTTPS connections. We do not store your video audio, subtitle text, or any personal information. Your preferences are stored locally in your browser\'s sync storage.',
      },
      {
        q: 'Is local installation more or less secure than store installation?',
        a: 'Local installation via Developer Mode is equally secure from a technical standpoint. The extension runs in the same sandboxed environment with the same security restrictions. The key difference is that local installation lets you inspect the source code before installing — giving you more transparency, not less. Store installations are reviewed by the browser vendor, while local installations put that responsibility on you.',
      },
      {
        q: 'How do I verify the extension hasn\'t been tampered with?',
        a: 'Always download SubtitleFlow directly from our official website. The ZIP file is served over HTTPS from our domain. After downloading, you can compare the file hashes if you\'re concerned about integrity. Check our GitHub releases page for SHA-256 checksums.',
      },
    ],
  },
  {
    category: 'Features',
    questions: [
      {
        q: 'How many languages are supported?',
        a: 'SubtitleFlow supports over 100 languages for translation. You can translate between any supported language pair.',
      },
      {
        q: 'How accurate are the translations?',
        a: 'SubtitleFlow uses advanced AI models for speech recognition and translation. Standard accuracy is excellent for clear audio.',
      },
      {
        q: 'Can I customize how subtitles look?',
        a: 'Absolutely! You can change font family, font size, text color, background color, opacity, and subtitle position through the extension popup settings.',
      },
      {
        q: 'Does it work on all video platforms?',
        a: 'SubtitleFlow works on YouTube, Coursera, Udemy, Twitch, Vimeo, and most other video platforms.',
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
        a: 'Yes! You can download subtitles in SRT format or TXT format for easy editing and sharing.',
      },
      {
        q: 'Does it work offline?',
        a: 'Previously translated and cached subtitles are available offline.',
      },
      {
        q: 'Is my data private?',
        a: 'We take privacy seriously. Audio processing happens locally when possible, and translations are encrypted in transit. We do not store your video audio or translated content.',
      },
    ],
  },
  {
    category: 'Troubleshooting',
    icon: <Settings size={16} />,
    questions: [
      {
        q: 'The extension is not showing up after loading it.',
        a: 'Make sure you selected the correct folder (the one containing manifest.json, not the parent folder). Check that Developer Mode is enabled. Try removing and re-loading the extension. If it still doesn\'t work, restart your browser and try again.',
      },
      {
        q: 'Subtitles are not appearing on videos.',
        a: 'Ensure you\'re on a supported video platform (YouTube, Coursera, Udemy, etc.). Try refreshing the video page after enabling the extension. Check that the extension is enabled in your browser toolbar (the icon should be colorful, not grayscale).',
      },
      {
        q: '"Load unpacked" button is grayed out.',
        a: 'Make sure Developer Mode is enabled first. The toggle is usually in the top-right or top-left corner of the extensions page. If it\'s still grayed out, try closing and re-opening the extensions page.',
      },
      {
        q: 'The extension disappeared after a browser update.',
        a: 'Browser updates can sometimes disable developer-mode extensions. Go to your extensions page and re-enable SubtitleFlow. If it\'s been removed entirely, re-load it from the extracted folder.',
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
              <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                {cat.icon || <HelpCircle size={18} className="text-indigo-500" />}
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
                      <p
                        className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: faq.a }}
                      />
                    </motion.div>
                  </motion.details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 border border-slate-200 dark:border-slate-800"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Ready to get started?
          </p>
          <Link
            to="/install"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]"
          >
            <Download size={16} />
            Install SubtitleFlow Now
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
