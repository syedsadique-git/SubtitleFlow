import { motion } from 'framer-motion'
import { DownloadIcon, Globe, Sparkles, ExternalLink, FileArchive, ArrowRight, CheckCircle, Monitor, Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { detectOS } from '../hooks/useExtensionDetection'

const browsers = [
  {
    name: 'Chrome',
    icon: <Globe size={24} />,
    version: 'v3.0+',
    url: 'https://chrome.google.com/webstore',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Edge',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M19 9.25C19 6.25 16.75 4 13.75 4C10.75 4 8.5 6.25 8.5 9.25C8.5 12.25 10.75 14.5 13.75 14.5C16.75 14.5 19 12.25 19 9.25z" fill="#1BA0E2"/>
        <path d="M8.5 17.5C11.5 17.5 13.75 15.25 13.75 12.25S11.5 7 8.5 7 3.25 9.25 3.25 12.25 5.5 17.5 8.5 17.5z" fill="#60CFFF"/>
      </svg>
    ),
    version: 'v3.0+',
    url: 'https://microsoftedge.microsoft.com/addons',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Firefox',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2C6.75 2 2.45 5.7 2 11h6.45c.55-1.65 2.1-2.85 3.95-3 1.85.15 3.4 1.35 3.95 3H22c-.45-5.3-4.75-9-10-9z" fill="#FF7139"/>
        <path d="M12 22c5.25 0 9.55-3.7 10-9h-6.45c-.55 1.65-2.1 2.85-3.95 3-.6 0-1.2-.1-1.75-.3L8 19.95C9.2 20.7 10.6 21.1 12 22z" fill="#FF9500"/>
      </svg>
    ),
    version: 'v2.0+',
    url: 'https://addons.mozilla.org',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Brave',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2L5 6v5c0 4.25 2.75 8.25 7 9.5 4.25-1.25 7-5.25 7-9.5V6L12 2z" fill="#FB542B"/>
        <path d="M12 4.25L7.5 7.25v3.75c0 3.75 2.25 6.75 4.5 7.75 2.25-1 4.5-4 4.5-7.75V7.25L12 4.25z" fill="currentColor"/>
      </svg>
    ),
    version: 'v3.0+',
    url: 'https://brave.com/extensions/',
    color: 'from-orange-500 to-amber-500',
  },
]

const instructions = [
  {
    step: 1,
    title: 'Download the Extension',
    description: 'Download the SubtitleFlow ZIP from our secure server.',
  },
  {
    step: 2,
    title: 'Install Directly',
    description: 'Extract the ZIP, enable Developer Mode, and load the unpacked extension.',
  },
  {
    step: 3,
    title: 'Pin the Extension',
    description: 'Click the puzzle icon in your toolbar and pin SubtitleFlow for easy access.',
  },
  {
    step: 4,
    title: 'Start Translating',
    description: 'Open any video and click the SubtitleFlow icon to begin translation.',
  },
]

export default function Download() {
  const os = detectOS()

  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-sm font-medium mb-4">
            <Sparkles size={14} />
            Download
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
            Install{' '}
            <span className="gradient-text">SubtitleFlow</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Available on all major browsers. Free to download, free to use.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400">
              <Monitor size={12} />
              Detected: {os}
            </span>
            {os === 'Windows' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-xs font-medium text-blue-600 dark:text-blue-400">
                <DownloadIcon size={12} />
                Windows installer available
              </span>
            )}
          </div>
        </motion.div>

        {/* Direct Download Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative group p-8 sm:p-10 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-950/30 dark:to-cyan-950/30 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-sm font-medium mb-4">
                <FileArchive size={14} />
                No Store Required
              </div>
              <h2 className="text-2xl font-bold mb-2">Install Without the Store</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                Download the extension ZIP directly and install it manually. No Chrome Web Store,
                no Edge Add-ons — just you and your browser.
              </p>
              <Link
                to="/install"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]"
              >
                <DownloadIcon size={16} />
                Download Extension
                <ArrowRight size={16} />
              </Link>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><CheckCircle size={12} /> Manifest V3</span>
                <span className="flex items-center gap-1"><CheckCircle size={12} /> ~50 KB</span>
                <span className="flex items-center gap-1"><CheckCircle size={12} /> No account needed</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Windows Desktop Installer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative group p-8 sm:p-10 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
                <Monitor size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Download for Windows Desktop</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                One-click installer script for Windows. Downloads, extracts, and opens your browser's
                extensions page — all automatically.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/SubtitleFlow/downloads/install-subtitleflow.bat"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]"
                >
                  <DownloadIcon size={16} />
                  Download Installer (.bat)
                </a>
                <Link
                  to="/install"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  <Terminal size={16} />
                  Manual Setup
                </Link>
              </div>
              <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 text-left">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">What it does</p>
                <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0" />
                    Downloads the latest extension ZIP
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0" />
                    Extracts it to your Downloads folder
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0" />
                    Automatically detects Chrome, Edge, or Firefox
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0" />
                    Opens the extensions page with Developer Mode prompt
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 text-xs font-medium text-slate-400 bg-white dark:bg-slate-950">
              OR INSTALL FROM THE STORE
            </span>
          </div>
        </div>

        {/* Browser cards for store links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-4xl mx-auto">
          {browsers.map((browser, index) => (
            <motion.div
              key={browser.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 card-hover text-center"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${browser.color} flex items-center justify-center mx-auto mb-4 text-white`}>
                {browser.icon}
              </div>
              <h3 className="text-lg font-bold mb-1">{browser.name}</h3>
              <p className="text-xs text-slate-400 mb-4">Manifest {browser.version}</p>
              <a
                href={browser.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25"
              >
                <DownloadIcon size={14} />
                Store
                <ExternalLink size={12} />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Installation instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto w-full"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Quick Install Steps</h2>
          <div className="space-y-4">
            {instructions.map(inst => (
              <div
                key={inst.step}
                className="flex items-start gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {inst.step}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{inst.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{inst.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Need detailed instructions?{' '}
            <Link to="/install" className="text-indigo-500 hover:text-indigo-400 font-medium">
              View full installation guide →
            </Link>
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            Already have the extension?{' '}
            <Link to="/docs" className="text-indigo-500 hover:text-indigo-400 font-medium">
              View documentation →
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
