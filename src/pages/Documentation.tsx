import { motion } from 'framer-motion'
import { Book, Code, Cpu, Download, Globe, Layers, Palette, Settings, Sparkles, Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'
import ExtensionPopup from '../components/extension/Popup'

const sections = [
  { id: 'getting-started', icon: Book, label: 'Getting Started' },
  { id: 'features', icon: Sparkles, label: 'Features Guide' },
  { id: 'customization', icon: Palette, label: 'Customization' },
  { id: 'shortcuts', icon: Terminal, label: 'Keyboard Shortcuts' },
  { id: 'api', icon: Code, label: 'API Reference' },
  { id: 'troubleshooting', icon: Cpu, label: 'Troubleshooting' },
]

export default function Documentation() {
  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-sm font-medium mb-4">
            <Book size={14} />
            Documentation
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Get Started</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive guides, API references, and troubleshooting tips for SubtitleFlow.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="sticky top-24 space-y-1">
              {sections.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <s.icon size={16} />
                  {s.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-16">
            <section id="getting-started">
              <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-400">
                <p>
                  Welcome to SubtitleFlow! This guide will help you install and start using
                  the extension in just a few minutes.
                </p>
                <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Quick Start</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Install the extension from your browser&apos;s extension store</li>
                    <li>Pin the extension to your toolbar for easy access</li>
                    <li>Navigate to any video on YouTube or supported platforms</li>
                    <li>Click the SubtitleFlow icon and select your language</li>
                    <li>Enjoy real-time translated subtitles</li>
                  </ol>
                </div>
              </div>
            </section>

            <section id="features">
              <h2 className="text-2xl font-bold mb-6">Features Guide</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'Real-Time Translation', desc: 'AI-powered engine translates speech as it happens with sub-200ms latency.', icon: Globe },
                  { title: 'Language Detection', desc: 'Automatically detects the source language and translates to your preferred language.', icon: Layers },
                  { title: 'Subtitle Styling', desc: 'Customize font, size, color, background, opacity, and position of subtitles.', icon: Palette },
                  { title: 'Export Subtitles', desc: 'Download subtitles in SRT or TXT format for offline use.', icon: Download },
                  { title: 'Offline Mode', desc: 'Cached subtitles are available even without an internet connection.', icon: Cpu },
                  { title: 'Settings Sync', desc: 'Your preferences sync across devices when you create an account.', icon: Settings },
                ].map(f => (
                  <div key={f.title} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
                    <f.icon size={20} className="text-indigo-500 mb-2" />
                    <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="customization">
              <h2 className="text-2xl font-bold mb-6">Customization</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    SubtitleFlow offers extensive customization options to make subtitles
                    look exactly how you want them. Preview the extension interface:
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: 'Font Family', desc: 'Choose from Inter, Arial, Helvetica, Georgia, and more' },
                      { label: 'Font Size', desc: 'Adjust from 12px to 48px with a simple slider' },
                      { label: 'Text Color', desc: 'Pick any color using the built-in color picker' },
                      { label: 'Background', desc: 'Customize background color and opacity' },
                      { label: 'Position', desc: 'Place subtitles at top, middle, or bottom of screen' },
                      { label: 'Themes', desc: 'Save and switch between custom theme presets' },
                    ].map(item => (
                      <div key={item.label} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="scale-75 origin-top-left opacity-90">
                  <ExtensionPopup />
                </div>
              </div>
            </section>

            <section id="shortcuts">
              <h2 className="text-2xl font-bold mb-6">Keyboard Shortcuts</h2>
              <div className="space-y-2 max-w-lg">
                {[
                  { keys: 'Ctrl + Shift + S', action: 'Toggle subtitles on/off' },
                  { keys: 'Ctrl + Shift + L', action: 'Cycle through languages' },
                  { keys: 'Ctrl + Shift + +', action: 'Increase subtitle size' },
                  { keys: 'Ctrl + Shift + -', action: 'Decrease subtitle size' },
                  { keys: 'Ctrl + Shift + D', action: 'Download current subtitles' },
                  { keys: 'Ctrl + Shift + P', action: 'Open settings panel' },
                ].map(s => (
                  <div key={s.action} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{s.action}</span>
                    <kbd className="px-2 py-1 text-xs rounded bg-slate-200 dark:bg-slate-700 font-mono">{s.keys}</kbd>
                  </div>
                ))}
              </div>
            </section>

            <section id="api">
              <h2 className="text-2xl font-bold mb-6">API Reference</h2>
              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <p>
                  SubtitleFlow provides a RESTful API for enterprise customers to integrate
                  subtitle translation into their own applications.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <code className="text-xs font-mono text-indigo-500">POST /api/v1/translate</code>
                  <pre className="mt-2 text-xs text-slate-500 dark:text-slate-400 overflow-x-auto">
{`{
  "audio_url": "https://example.com/video.mp4",
  "source_language": "auto",
  "target_language": "es",
  "options": {
    "format": "srt",
    "accuracy": "enhanced"
  }
}`}
                  </pre>
                </div>
                <p>
                  API access is available on the Enterprise plan. Contact sales for API keys
                  and documentation.
                </p>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-400 font-medium"
                >
                  View Enterprise Plan →
                </Link>
              </div>
            </section>

            <section id="troubleshooting">
              <h2 className="text-2xl font-bold mb-6">Troubleshooting</h2>
              <div className="space-y-4">
                {[
                  { q: 'Subtitles not appearing?', a: 'Make sure the extension is pinned and enabled. Check that the video has audio and try refreshing the page.' },
                  { q: 'Translation seems inaccurate?', a: 'Try selecting the source language manually. AI accuracy improves with clearer audio and proper language selection.' },
                  { q: 'Extension not working on a specific site?', a: 'SubtitleFlow works on most video platforms. If you encounter issues, try our premium plan for extended platform support.' },
                  { q: 'How to export subtitles?', a: 'Open the extension popup, navigate to Settings &gt; Export, and choose SRT or TXT format.' },
                  { q: 'Can I use SubtitleFlow offline?', a: 'Previously cached subtitles are available offline. Premium users get enhanced offline caching.' },
                ].map((item, i) => (
                  <details key={i} className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <summary className="text-sm font-medium cursor-pointer list-none flex items-center justify-between">
                      {item.q}
                      <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
