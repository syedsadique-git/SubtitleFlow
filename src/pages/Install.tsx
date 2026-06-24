import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Download, Globe, Shield, CheckCircle,
  AlertTriangle, ChevronDown,
  Smartphone, Package, RefreshCw,
  Sparkles, Puzzle, MousePointer, Settings, FolderOpen,
  Copy, Check, HelpCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useExtensionDetection, detectBrowser, detectOS } from '../hooks/useExtensionDetection'

const EXTENSION_PATH = '/SubtitleFlow/downloads/subtitleflow-extension-v1.0.0.zip'
const EXTENSION_VERSION = '1.0.0'

const browsers = [
  { name: 'Chrome', id: 'chrome', color: 'from-yellow-500 to-orange-500', icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" opacity="0.9"/><circle cx="12" cy="12" r="2.5"/></svg> },
  { name: 'Edge', id: 'edge', color: 'from-blue-500 to-cyan-500', icon: <Globe size={24} /> },
  { name: 'Firefox', id: 'firefox', color: 'from-orange-500 to-red-500', icon: <Globe size={24} /> },
  { name: 'Brave', id: 'brave', color: 'from-orange-500 to-amber-500', icon: <Shield size={24} /> },
]

interface InstallStep {
  icon: typeof Puzzle
  title: string
  description: string
  browserId?: string
}

const stepsByBrowser: Record<string, InstallStep[]> = {
  chrome: [
    { icon: Download, title: 'Download Extension', description: 'Download the ZIP file from the button below.' },
    { icon: FolderOpen, title: 'Extract the ZIP', description: 'Right-click the ZIP and extract to a folder (e.g., "subtitleflow-extension"). Remember this location.' },
    { icon: Settings, title: 'Open Extensions Page', description: 'Type <code>chrome://extensions</code> in the address bar and press Enter.', browserId: 'chrome' },
    { icon: MousePointer, title: 'Enable Developer Mode', description: 'Toggle ON "Developer mode" in the top-right corner of the Extensions page.' },
    { icon: Package, title: 'Load Unpacked Extension', description: 'Click "Load unpacked" button, navigate to the extracted folder, and select it.' },
    { icon: CheckCircle, title: 'Verify Installation', description: 'You should see SubtitleFlow in your extensions list with the toggle ON.' },
  ],
  edge: [
    { icon: Download, title: 'Download Extension', description: 'Download the ZIP file from the button below.' },
    { icon: FolderOpen, title: 'Extract the ZIP', description: 'Right-click the ZIP and extract all contents to a dedicated folder.' },
    { icon: Settings, title: 'Open Extensions Page', description: 'Type <code>edge://extensions</code> in the address bar and press Enter.', browserId: 'edge' },
    { icon: MousePointer, title: 'Enable Developer Mode', description: 'Toggle ON "Developer mode" in the bottom-left corner.' },
    { icon: Package, title: 'Load Unpacked Extension', description: 'Click "Load unpacked", browse to the extracted folder, and click Select Folder.' },
    { icon: CheckCircle, title: 'Verify Installation', description: 'SubtitleFlow will appear in your extensions. Pin it for easy access.' },
  ],
  firefox: [
    { icon: Download, title: 'Download Extension', description: 'Download the ZIP file from the button below.' },
    { icon: FolderOpen, title: 'Extract the ZIP', description: 'Extract the ZIP contents to a permanent folder (Firefox keeps a reference to it).' },
    { icon: Settings, title: 'Open Debugging Page', description: 'Type <code>about:debugging#/runtime/this-firefox</code> in the address bar.', browserId: 'firefox' },
    { icon: MousePointer, title: 'Load Temporary Add-on', description: 'Click "Load Temporary Add-on…" and select the <code>manifest.json</code> file from the extracted folder.' },
    { icon: CheckCircle, title: 'Verify Installation', description: 'SubtitleFlow appears under "Temporary Extensions". It will remain active until you restart Firefox.' },
    { icon: Shield, title: 'For Permanent Install', description: 'Consider signing the extension via Firefox Add-ons Developer Hub for persistent installation.' },
  ],
  brave: [
    { icon: Download, title: 'Download Extension', description: 'Download the ZIP file from the button below.' },
    { icon: FolderOpen, title: 'Extract the ZIP', description: 'Extract the ZIP to a folder on your computer.' },
    { icon: Settings, title: 'Open Extensions Page', description: 'Type <code>brave://extensions</code> in the address bar and press Enter.', browserId: 'brave' },
    { icon: MousePointer, title: 'Enable Developer Mode', description: 'Toggle ON "Developer mode" in the top-right corner.' },
    { icon: Package, title: 'Load Unpacked Extension', description: 'Click "Load unpacked" and select the extracted folder.' },
    { icon: CheckCircle, title: 'Verify Installation', description: 'SubtitleFlow is now installed. Pin it from the puzzle icon in the toolbar.' },
  ],
}

const extensionFAQs = [
  {
    q: 'Why is Developer Mode required?',
    a: 'Browsers require Developer Mode to load extensions that aren\'t published through their official stores. This is a security measure that prevents sideloading of malicious extensions. Developer Mode allows you to install extensions directly from source files on your computer. It\'s completely safe — Developer Mode does not disable any browser security features; it simply enables additional developer tools.',
  },
  {
    q: 'Is it safe to use Developer Mode?',
    a: 'Yes, it\'s perfectly safe. Developer Mode only enables additional debugging tools and the ability to load unpacked extensions. Your browser\'s security sandbox, Safe Browsing, and all other protections remain active. The only risk comes from loading extensions you don\'t trust — since you\'re installing SubtitleFlow directly from our official website, you can verify exactly what code is being installed.',
  },
  {
    q: 'What permissions does the extension need?',
    a: 'SubtitleFlow requires: <strong>Storage</strong> (to save your preferences and subtitle settings), <strong>Active Tab</strong> (to inject subtitles into the current video page), <strong>Scripting</strong> (to run the subtitle overlay on video pages), and <strong>Tabs</strong> (to communicate between the popup and content script). It does NOT read your browsing history, collect personal data, or access non-video pages.',
  },
  {
    q: 'Is SubtitleFlow free and open source?',
    a: 'Yes! SubtitleFlow is completely free to use. The extension source code is available for inspection — you can review exactly what the extension does before installing. There are no hidden trackers, analytics, or data collection.',
  },
  {
    q: 'Will I receive automatic updates?',
    a: 'When installing via Developer Mode, automatic updates are not available. You\'ll need to download the latest version from our website and re-install it. We recommend checking back periodically for updates, or following our GitHub repository for release notifications.',
  },
  {
    q: 'Can I install on multiple browsers?',
    a: 'Yes! Since the extension is installed locally from a ZIP file, you can install it on as many browsers and as many computers as you like. Simply repeat the installation steps on each browser.',
  },
  {
    q: 'Does it work on Firefox permanently?',
    a: 'Firefox\'s "Load Temporary Add-on" feature loads the extension for the current session only. It will be removed when you restart Firefox. For a permanent installation, you would need to submit the extension to Firefox Add-ons. However, the temporary installation is perfect for trying out SubtitleFlow.',
  },
  {
    q: 'How do I uninstall SubtitleFlow?',
    a: 'Go to your browser\'s extensions page (chrome://extensions, edge://extensions, or about:debugging#/runtime/this-firefox), find SubtitleFlow, and click Remove or Uninstall. You can also delete the extracted folder after removal.',
  },
]

function CodeBlock({ children }: { children: string }) {
  return (
    <code className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 text-sm font-mono">
      {children}
    </code>
  )
}

interface StepCardProps {
  step: InstallStep
  index: number
  total: number
}

function StepCard({ step, index, total }: StepCardProps) {
  const Icon = step.icon
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15 }}
      className="relative flex gap-5"
    >
      {index < total - 1 && (
        <div className="absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-indigo-500/30 to-transparent" />
      )}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
          <Icon size={18} />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-800 dark:bg-slate-700 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
          {index + 1}
        </div>
      </div>
      <div className="flex-1 pb-8">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{step.title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: step.description }} />
      </div>
    </motion.div>
  )
}

function DownloadButton() {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + EXTENSION_PATH)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center">
      <a
        href={EXTENSION_PATH}
        download
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-lg transition-all hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-[0.98] overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <Download size={22} className="relative" />
        <span className="relative">Download Extension</span>
        <span className="relative text-xs bg-white/20 px-2 py-0.5 rounded-full">ZIP</span>
      </a>
      <button
        onClick={handleCopyLink}
        className="inline-flex items-center gap-2 px-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}

function ExtensionStatusBadge() {
  const { installed, version, checking } = useExtensionDetection()

  if (checking) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-sm">
        <RefreshCw size={14} className="animate-spin" />
        Checking...
      </div>
    )
  }

  if (installed) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium">
        <CheckCircle size={16} />
        Installed {version ? `v${version}` : ''}
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium">
      <AlertTriangle size={16} />
      Not Installed
    </div>
  )
}

function BrowserSelector({ selected, onChange }: { selected: string; onChange: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {browsers.map(b => (
        <button
          key={b.id}
          onClick={() => onChange(b.id)}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
            selected === b.id
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 shadow-md'
              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900/50'
          }`}
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${b.color} flex items-center justify-center text-white`}>
            {b.icon}
          </div>
          <div>
            <div className="font-semibold text-sm text-slate-900 dark:text-white">{b.name}</div>
            <div className="text-xs text-slate-400">Manifest V3</div>
          </div>
          {selected === b.id && (
            <CheckCircle size={16} className="ml-auto text-indigo-500 shrink-0" />
          )}
        </button>
      ))}
    </div>
  )
}

function FileStructurePreview() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-4 font-mono text-xs">
      <div className="text-slate-400 mb-2 text-xs font-semibold uppercase tracking-wider">Extension Structure</div>
      <div className="space-y-1 text-slate-600 dark:text-slate-400">
        <div className="text-indigo-500 font-medium">subtitleflow-extension/</div>
        <div className="pl-4">├── manifest.json</div>
        <div className="pl-4">├── background.js</div>
        <div className="pl-4">├── content.js</div>
        <div className="pl-4">├── styles.css</div>
        <div className="pl-4">├── popup.html</div>
        <div className="pl-4">├── popup.js</div>
        <div className="pl-4">├── popup.css</div>
        <div className="pl-4">└── icons/</div>
        <div className="pl-6">├── icon16.svg</div>
        <div className="pl-6">├── icon48.svg</div>
        <div className="pl-6">└── icon128.svg</div>
      </div>
    </div>
  )
}

export default function Install() {
  const [selectedBrowser, setSelectedBrowser] = useState('')
  const [showFAQ, setShowFAQ] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const detectedBrowser = detectBrowser()
  const detectedOS = detectOS()

  useEffect(() => {
    const supported = browsers.find(b => b.id === detectedBrowser.toLowerCase() && b.id !== 'unknown')
    if (supported) setSelectedBrowser(supported.id)
    else setSelectedBrowser('chrome')
  }, [detectedBrowser])

  const steps = stepsByBrowser[selectedBrowser] || stepsByBrowser.chrome

  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-sm font-medium mb-4">
            <Sparkles size={14} />
            Direct Installation
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
            Install{' '}
            <span className="gradient-text">SubtitleFlow</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
            No app store required. Download the extension and install it directly in your browser.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <ExtensionStatusBadge />
            <span className="text-sm text-slate-400">
              Detected: {detectedBrowser} on {detectedOS}
            </span>
          </div>
        </motion.div>

        {/* Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <div className="p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20">
                <Package size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">SubtitleFlow v{EXTENSION_VERSION}</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Manifest V3 · ~50 KB · No dependencies
              </p>
              <DownloadButton />
              <p className="mt-4 text-xs text-slate-400">
                The extension is a self-contained ZIP file. No installation wizard — just download, extract, and load.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Browser Compatibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Browser Compatibility</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {browsers.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-5 rounded-xl border-2 text-center transition-all cursor-pointer hover:shadow-lg ${
                  selectedBrowser === b.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
                onClick={() => setSelectedBrowser(b.id)}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center mx-auto mb-3 text-white`}>
                  {b.icon}
                </div>
                <h3 className="font-semibold">{b.name}</h3>
                <p className="text-xs text-slate-400 mt-1">Manifest V3</p>
                <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium flex items-center justify-center gap-1">
                  <CheckCircle size={12} />
                  Supported
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Installation Wizard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-4">Step-by-Step Installation Guide</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Select your browser below for tailored installation instructions.
            </p>
          </div>

          <div className="mb-8">
            <BrowserSelector selected={selectedBrowser} onChange={setSelectedBrowser} />
          </div>

          <div className="flex items-start gap-2 mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-300">
              <strong>Heads up:</strong> Developer Mode must be enabled to install extensions outside the official store.
              This is a standard browser security feature and does not affect normal browsing.
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${browsers.find(b => b.id === selectedBrowser)?.color || 'from-indigo-500 to-cyan-500'} flex items-center justify-center text-white`}>
                {browsers.find(b => b.id === selectedBrowser)?.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  {browsers.find(b => b.id === selectedBrowser)?.name} Installation
                </h3>
                <p className="text-xs text-slate-400">
                  {detectedOS === 'Windows' ? 'Windows' : detectedOS === 'macOS' ? 'macOS' : 'Your OS'} instructions
                </p>
              </div>
            </div>

            <div className="space-y-1">
              {steps.map((step, i) => (
                <StepCard key={i} step={step} index={i} total={steps.length} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* OS-specific Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            <Smartphone size={20} className="inline mr-2" />
            {detectedOS} Tips
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {detectedOS === 'Windows' && (
              <>
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <FolderOpen size={16} className="text-indigo-500" />
                    Extracting on Windows
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Right-click the ZIP file and select "Extract All…". Choose a destination folder you can find easily, such as your Desktop or Documents folder.</p>
                </div>
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Settings size={16} className="text-cyan-500" />
                    Folder Location
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Do <strong>not</strong> delete the extracted folder after installation — the browser needs it to run the extension. Keep it in a permanent location.</p>
                </div>
              </>
            )}
            {detectedOS === 'macOS' && (
              <>
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <FolderOpen size={16} className="text-indigo-500" />
                    Extracting on macOS
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Double-click the ZIP file in Finder — it will automatically extract to a folder. Move it to a permanent location like Applications or Documents.</p>
                </div>
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Settings size={16} className="text-cyan-500" />
                    Chrome on macOS
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">When selecting the folder in Chrome's "Load unpacked" dialog, you may need to switch from the default file picker to find folders. Select the extension folder itself, not its contents.</p>
                </div>
              </>
            )}
            {(detectedOS !== 'Windows' && detectedOS !== 'macOS') && (
              <div className="sm:col-span-2 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FolderOpen size={16} className="text-indigo-500" />
                  Extracting on {detectedOS}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Use your file manager to extract the ZIP file. Alternatively, use <CodeBlock>unzip subtitleflow-extension-v1.0.0.zip -d subtitleflow-extension</CodeBlock> in the terminal.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* File Structure Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto mb-20"
        >
          <h2 className="text-2xl font-bold text-center mb-6">What's Inside</h2>
          <FileStructurePreview />
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Installation FAQs</h2>
            <button
              onClick={() => setShowFAQ(!showFAQ)}
              className="text-sm text-indigo-500 hover:text-indigo-400 font-medium flex items-center gap-1"
            >
              {showFAQ ? 'Hide' : 'Show all'}
              <ChevronDown size={14} className={`transition-transform ${showFAQ ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="space-y-3">
            {extensionFAQs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    expandedFAQ === i
                      ? 'border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-500/5'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <HelpCircle size={18} className="text-indigo-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{faq.q}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 shrink-0 mt-1 transition-transform ${
                        expandedFAQ === i ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {expandedFAQ === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p
                          className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: faq.a }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Need more help?{' '}
            <Link to="/faq" className="text-indigo-500 hover:text-indigo-400 font-medium">
              Visit the main FAQ →
            </Link>
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            Already installed?{' '}
            <Link to="/docs" className="text-indigo-500 hover:text-indigo-400 font-medium">
              Read the documentation →
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
