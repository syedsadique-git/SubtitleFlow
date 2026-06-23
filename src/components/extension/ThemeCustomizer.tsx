import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Download, RotateCcw } from 'lucide-react'

interface Theme {
  id: string
  name: string
  textColor: string
  bgColor: string
  fontSize: number
  opacity: number
  fontFamily: string
  position: 'top' | 'middle' | 'bottom'
}

const defaultThemes: Theme[] = [
  {
    id: '1',
    name: 'Classic Light',
    textColor: '#000000',
    bgColor: '#ffffff',
    fontSize: 24,
    opacity: 85,
    fontFamily: 'Inter',
    position: 'bottom',
  },
  {
    id: '2',
    name: 'Cinema Dark',
    textColor: '#ffffff',
    bgColor: '#000000',
    fontSize: 28,
    opacity: 80,
    fontFamily: 'Inter',
    position: 'bottom',
  },
  {
    id: '3',
    name: 'High Contrast',
    textColor: '#ffffff',
    bgColor: '#000000',
    fontSize: 32,
    opacity: 95,
    fontFamily: 'Inter',
    position: 'bottom',
  },
]

export default function ThemeCustomizer() {
  const [themes, setThemes] = useState<Theme[]>(defaultThemes)
  const [selectedTheme, setSelectedTheme] = useState<string>('2')
  const [editing, setEditing] = useState<Theme>(defaultThemes[1])

  const currentTheme = themes.find(t => t.id === selectedTheme) || themes[0]

  const updateTheme = (updates: Partial<Theme>) => {
    setEditing(prev => ({ ...prev, ...updates }))
    setThemes(prev => prev.map(t =>
      t.id === selectedTheme ? { ...t, ...updates } : t
    ))
  }

  return (
    <div className="space-y-6">
      {/* Theme selector */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Saved Themes</h3>
        <div className="grid grid-cols-3 gap-2">
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => {
                setSelectedTheme(theme.id)
                setEditing(theme)
              }}
              className={`p-3 rounded-xl border-2 transition-all text-center ${
                selectedTheme === theme.id
                  ? 'border-indigo-500 bg-indigo-500/5'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex gap-0.5 justify-center mb-1.5">
                <div className="w-4 h-4 rounded" style={{ background: theme.textColor }} />
                <div className="w-4 h-4 rounded" style={{ background: theme.bgColor }} />
              </div>
              <span className="text-[10px] font-medium">{theme.name}</span>
              <span className="text-[10px] text-slate-400 block">{theme.fontSize}px · {theme.fontFamily}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-400 mb-2">Preview</p>
        <div className="aspect-video rounded-lg bg-slate-900 flex items-end justify-center p-4 relative overflow-hidden">
          <motion.div
            className="px-4 py-2 rounded-lg text-center max-w-xs"
            style={{
              color: currentTheme.textColor,
              backgroundColor: `${currentTheme.bgColor}${Math.round(currentTheme.opacity * 2.55).toString(16).padStart(2, '0')}`,
              fontSize: `${currentTheme.fontSize}px`,
              fontFamily: currentTheme.fontFamily,
            }}
            animate={{
              y: currentTheme.position === 'top' ? -40 : currentTheme.position === 'middle' ? 0 : 40,
            }}
          >
            This is how subtitles will appear
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium block mb-1">Font Size ({editing.fontSize}px)</label>
          <input
            type="range"
            min={12}
            max={48}
            value={editing.fontSize}
            onChange={e => updateTheme({ fontSize: Number(e.target.value) })}
            className="w-full accent-indigo-500"
          />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1">Opacity ({editing.opacity}%)</label>
          <input
            type="range"
            min={0}
            max={100}
            value={editing.opacity}
            onChange={e => updateTheme({ opacity: Number(e.target.value) })}
            className="w-full accent-indigo-500"
          />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1">Text Color</label>
          <input
            type="color"
            value={editing.textColor}
            onChange={e => updateTheme({ textColor: e.target.value })}
            className="w-full h-8 rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1">Background</label>
          <input
            type="color"
            value={editing.bgColor}
            onChange={e => updateTheme({ bgColor: e.target.value })}
            className="w-full h-8 rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1">Font</label>
          <select
            value={editing.fontFamily}
            onChange={e => updateTheme({ fontFamily: e.target.value })}
            className="w-full p-2 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            {['Inter', 'Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'OpenDyslexic'].map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium block mb-1">Position</label>
          <select
            value={editing.position}
            onChange={e => updateTheme({ position: e.target.value as Theme['position'] })}
            className="w-full p-2 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            <option value="top">Top</option>
            <option value="middle">Middle</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-indigo-500 text-white text-xs font-medium hover:bg-indigo-600 transition-colors">
          <Save size={14} />
          Save Theme
        </button>
        <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <Download size={14} />
        </button>
        <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  )
}
