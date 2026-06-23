import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Languages, Settings, Palette, Mic2, Download,
  Globe, Type, Sun
} from 'lucide-react'

const fonts = ['Inter', 'Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'OpenDyslexic']

export default function ExtensionPopup() {
  const [activeTab, setActiveTab] = useState<'translate' | 'settings' | 'customize'>('translate')
  const [subtitleSize, setSubtitleSize] = useState(24)
  const [opacity, setOpacity] = useState(85)
  const [textColor, setTextColor] = useState('#ffffff')
  const [bgColor, setBgColor] = useState('#000000')
  const [font, setFont] = useState('Inter')
  const [contrast, setContrast] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [sourceLang, setSourceLang] = useState('auto-detect')
  const [targetLang, setTargetLang] = useState('de')
  const [autoDetect, setAutoDetect] = useState(true)

  return (
    <div className="w-[380px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="font-bold text-sm">SubtitleFlow</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500" />
          </label>
        </div>

        {/* Language selector */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <label htmlFor="source-lang" className="sr-only">Source language</label>
            <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              id="source-lang"
              value={sourceLang}
              onChange={e => setSourceLang(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 appearance-none cursor-pointer"
            >
              <option value="auto-detect">Auto-detect</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="ar">Arabic</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
          <div className="flex items-center">
            <Languages size={14} className="text-slate-400 mx-2 shrink-0" />
          </div>
          <div className="flex-1 relative">
            <label htmlFor="target-lang" className="sr-only">Target language</label>
            <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
            <select
              id="target-lang"
              value={targetLang}
              onChange={e => setTargetLang(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 appearance-none cursor-pointer text-indigo-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="ar">Arabic</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'translate' as const, icon: Languages, label: 'Translate' },
          { id: 'settings' as const, icon: Settings, label: 'Settings' },
          { id: 'customize' as const, icon: Palette, label: 'Style' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-indigo-500'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide">
        {activeTab === 'translate' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Status indicator */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                Speech detected — translating in real-time
              </span>
            </div>

            {/* Current subtitle preview */}
            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 mb-1">Source (EN):</p>
              <p className="text-sm mb-3">Welcome to our tutorial on machine learning fundamentals.</p>
              <p className="text-xs text-indigo-500 mb-1">Translation (DE):</p>
              <p className="text-sm font-medium">Willkommen zu unserem Tutorial über die Grundlagen des maschinellen Lernens.</p>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-xs font-medium">
                <Download size={14} className="text-indigo-500" />
                Download SRT
              </button>
              <button className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-xs font-medium">
                <Download size={14} className="text-cyan-500" />
                Download TXT
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Subtitle size */}
            <div>
              <label htmlFor="subtitle-size" className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium">Subtitle Size</span>
                <span className="text-xs text-slate-400">{subtitleSize}px</span>
              </label>
              <input
                id="subtitle-size"
                type="range"
                min={12}
                max={48}
                value={subtitleSize}
                onChange={e => setSubtitleSize(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            {/* Opacity */}
            <div>
              <label htmlFor="bg-opacity" className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium">Background Opacity</span>
                <span className="text-xs text-slate-400">{opacity}%</span>
              </label>
              <input
                id="bg-opacity"
                type="range"
                min={0}
                max={100}
                value={opacity}
                onChange={e => setOpacity(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            {/* Toggle options */}
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Mic2 size={14} className="text-slate-400" />
                  <span className="text-xs font-medium">Auto-detect language</span>
                </div>
                <input type="checkbox" checked={autoDetect} onChange={() => setAutoDetect(!autoDetect)} className="accent-indigo-500" />
              </label>
              <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Sun size={14} className="text-slate-400" />
                  <span className="text-xs font-medium">High contrast mode</span>
                </div>
                <input
                  type="checkbox"
                  checked={contrast}
                  onChange={() => setContrast(!contrast)}
                  className="accent-indigo-500"
                />
              </label>
            </div>
          </motion.div>
        )}

        {activeTab === 'customize' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Font */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Type size={14} className="text-slate-400" />
                <span className="text-xs font-medium">Font Family</span>
              </div>
              <select
                value={font}
                onChange={e => setFont(e.target.value)}
                className="w-full p-2 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                {fonts.map(f => (
                  <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
                ))}
              </select>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs font-medium block mb-2">Text Color</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={textColor}
                    onChange={e => setTextColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border border-slate-200 dark:border-slate-700"
                  />
                  <span className="text-xs text-slate-400">{textColor}</span>
                </div>
              </div>
              <div>
                <span className="text-xs font-medium block mb-2">Background</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={e => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border border-slate-200 dark:border-slate-700"
                  />
                  <span className="text-xs text-slate-400">{bgColor}</span>
                </div>
              </div>
            </div>

            {/* Position */}
            <div>
              <span className="text-xs font-medium block mb-2">Subtitle Position</span>
              <div className="grid grid-cols-3 gap-1">
                {['Top', 'Middle', 'Bottom'].map(pos => (
                  <button
                    key={pos}
                    className="py-2 px-3 text-xs rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme presets */}
            <div>
              <span className="text-xs font-medium block mb-2">Quick Themes</span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Light', bg: '#ffffff', text: '#000000' },
                  { label: 'Dark', bg: '#000000', text: '#ffffff' },
                  { label: 'Yellow', bg: '#000000', text: '#fbbf24' },
                  { label: 'Green', bg: '#000000', text: '#34d399' },
                ].map(theme => (
                  <button
                    key={theme.label}
                    onClick={() => { setBgColor(theme.bg); setTextColor(theme.text) }}
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors text-center"
                  >
                    <div className="flex gap-0.5 justify-center mb-1">
                      <div className="w-3 h-3 rounded" style={{ background: theme.text }} />
                      <div className="w-3 h-3 rounded" style={{ background: theme.bg }} />
                    </div>
                    <span className="text-[10px] text-slate-400">{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                const theme = { font, textColor, bgColor, subtitleSize, opacity }
                localStorage.setItem('subtitleflow-theme-custom', JSON.stringify(theme))
              }}
              className="w-full py-2.5 rounded-lg bg-indigo-500 text-white text-xs font-medium hover:bg-indigo-600 transition-colors"
            >
              Save Theme
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
