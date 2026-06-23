import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mic2, Languages, Type,
  Keyboard, Download, Eye
} from 'lucide-react'
import ThemeCustomizer from './ThemeCustomizer'

export default function SettingsPanel() {
  const [section, setSection] = useState<string>('translation')
  const [sourceLang, setSourceLang] = useState('auto-detect')
  const [targetLang, setTargetLang] = useState('es')
  const [autoTranslate, setAutoTranslate] = useState(true)
  const [noiseFilter, setNoiseFilter] = useState(true)
  const [speakerRecognition, setSpeakerRecognition] = useState(true)

  const sections = [
    { id: 'translation', icon: Languages, label: 'Translation' },
    { id: 'audio', icon: Mic2, label: 'Audio' },
    { id: 'style', icon: Type, label: 'Style' },
    { id: 'accessibility', icon: Eye, label: 'Accessibility' },
    { id: 'shortcuts', icon: Keyboard, label: 'Shortcuts' },
    { id: 'export', icon: Download, label: 'Export' },
  ]

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 border-r border-slate-200 dark:border-slate-800 p-3 space-y-1">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                section === s.id
                  ? 'bg-indigo-500 text-white'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <s.icon size={14} />
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 max-h-[600px] overflow-y-auto scrollbar-hide">
          {section === 'translation' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-base font-semibold">Translation Settings</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="src-lang" className="text-xs font-medium block mb-1">Default Source Language</label>
                  <select
                    id="src-lang"
                    value={sourceLang}
                    onChange={e => setSourceLang(e.target.value)}
                    className="w-full p-2 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <option value="auto-detect">Auto-detect</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="tgt-lang" className="text-xs font-medium block mb-1">Default Target Language</label>
                  <select
                    id="tgt-lang"
                    value={targetLang}
                    onChange={e => setTargetLang(e.target.value)}
                    className="w-full p-2 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input type="checkbox" checked={autoTranslate} onChange={() => setAutoTranslate(!autoTranslate)} className="accent-indigo-500" />
                  <div>
                    <span className="text-sm font-medium">Auto-translate on video start</span>
                    <p className="text-xs text-slate-400">Automatically begin translation when a video plays</p>
                  </div>
                </label>
              </div>
            </motion.div>
          )}

          {section === 'audio' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-base font-semibold">Audio & Speech Settings</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="mic-sensitivity" className="text-xs font-medium block mb-1">Microphone Sensitivity</label>
                  <input id="mic-sensitivity" type="range" className="w-full accent-indigo-500" />
                </div>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input type="checkbox" checked={noiseFilter} onChange={() => setNoiseFilter(!noiseFilter)} className="accent-indigo-500" />
                  <div>
                    <span className="text-sm font-medium">Noise filtering</span>
                    <p className="text-xs text-slate-400">Filter background noise for better accuracy</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input type="checkbox" checked={speakerRecognition} onChange={() => setSpeakerRecognition(!speakerRecognition)} className="accent-indigo-500" />
                  <div>
                    <span className="text-sm font-medium">Speaker recognition</span>
                    <p className="text-xs text-slate-400">Identify different speakers in conversations</p>
                  </div>
                </label>
              </div>
            </motion.div>
          )}

          {section === 'style' && <ThemeCustomizer />}

          {section === 'accessibility' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-base font-semibold">Accessibility</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input type="checkbox" className="accent-indigo-500" />
                  <div>
                    <span className="text-sm font-medium">High contrast mode</span>
                    <p className="text-xs text-slate-400">Maximum contrast for better readability</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input type="checkbox" className="accent-indigo-500" />
                  <div>
                    <span className="text-sm font-medium">Dyslexia-friendly font</span>
                    <p className="text-xs text-slate-400">Use OpenDyslexic font for easier reading</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input type="checkbox" className="accent-indigo-500" />
                  <div>
                    <span className="text-sm font-medium">Reduce motion</span>
                    <p className="text-xs text-slate-400">Minimize animations and transitions</p>
                  </div>
                </label>
              </div>
            </motion.div>
          )}

          {section === 'shortcuts' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-base font-semibold">Keyboard Shortcuts</h3>
              <div className="space-y-2">
                {[
                  { key: 'Ctrl+Shift+S', action: 'Toggle subtitles' },
                  { key: 'Ctrl+Shift+L', action: 'Switch language' },
                  { key: 'Ctrl+Shift++', action: 'Increase subtitle size' },
                  { key: 'Ctrl+Shift+-', action: 'Decrease subtitle size' },
                  { key: 'Ctrl+Shift+D', action: 'Download subtitles' },
                  { key: 'Ctrl+Shift+P', action: 'Open settings panel' },
                ].map(s => (
                  <div key={s.action} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <span className="text-sm">{s.action}</span>
                    <kbd className="px-2 py-1 text-xs rounded bg-slate-200 dark:bg-slate-700 font-mono">{s.key}</kbd>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {section === 'export' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-base font-semibold">Export Subtitles</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <Download size={18} className="text-indigo-500" />
                    <div className="text-left">
                      <p className="text-sm font-medium">SRT Format</p>
                      <p className="text-xs text-slate-400">Standard subtitle format, compatible with all players</p>
                    </div>
                  </div>
                  <span className="text-xs text-indigo-500 font-medium">Download</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <Download size={18} className="text-cyan-500" />
                    <div className="text-left">
                      <p className="text-sm font-medium">TXT Format</p>
                      <p className="text-xs text-slate-400">Plain text format, easy to edit and share</p>
                    </div>
                  </div>
                  <span className="text-xs text-cyan-500 font-medium">Download</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <Languages size={18} className="text-violet-500" />
                    <div className="text-left">
                      <p className="text-sm font-medium">Translated Subtitles (SRT)</p>
                      <p className="text-xs text-slate-400">Exported in your selected target language</p>
                    </div>
                  </div>
                  <span className="text-xs text-violet-500 font-medium">Download</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
