const STORAGE_KEY = 'subtitleflow-preferences'

const DEFAULT_PREFS = {
  targetLanguage: 'en',
  autoDetect: true,
  subtitleSize: 24,
  fontFamily: 'Inter',
  textColor: '#ffffff',
  bgColor: '#000000',
  opacity: 85,
  position: 'bottom',
  theme: 'dark',
  highContrast: false,
  dyslexiaFont: false,
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
]

let prefs = { ...DEFAULT_PREFS }
let currentTab = 'translate'

function debounce(fn, ms) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

async function loadPrefs() {
  try {
    const result = await chrome.storage.sync.get([STORAGE_KEY])
    if (result[STORAGE_KEY]) {
      prefs = { ...DEFAULT_PREFS, ...result[STORAGE_KEY] }
    }
  } catch { /* use defaults */ }
}

async function savePrefs() {
  try {
    await chrome.storage.sync.set({ [STORAGE_KEY]: prefs })
  } catch { /* silent fail */ }
}

const savePrefsDebounced = debounce(savePrefs, 300)

function getActiveTab() {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      resolve(tabs[0] || null)
    })
  })
}

function TabButton({ id, label, active }) {
  const btn = document.createElement('button')
  btn.className = `tab-btn${active ? ' active' : ''}`
  btn.textContent = label
  btn.dataset.tab = id
  btn.onclick = () => switchTab(id)
  return btn
}

function switchTab(id) {
  currentTab = id
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === id))
  document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === `tab-${id}`))
  renderContent()
}

function createTranslateTab() {
  const container = document.createElement('div')
  container.id = 'tab-translate'
  container.className = 'tab-content'

  const status = document.createElement('div')
  status.className = 'status-bar'
  status.innerHTML = '<span class="status-dot"></span> No video detected'
  status.id = 'status-bar'
  container.appendChild(status)

  const langGroup = document.createElement('div')
  langGroup.className = 'form-group'
  langGroup.innerHTML = '<label class="form-label">Target Language</label>'
  const select = document.createElement('select')
  select.className = 'form-select'
  select.id = 'target-lang'
  languages.forEach(l => {
    const opt = document.createElement('option')
    opt.value = l.code
    opt.textContent = l.name
    if (l.code === prefs.targetLanguage) opt.selected = true
    select.appendChild(opt)
  })
  select.onchange = () => {
    prefs.targetLanguage = select.value
    savePrefsDebounced()
  }
  langGroup.appendChild(select)
  container.appendChild(langGroup)

  const autoGroup = document.createElement('div')
  autoGroup.className = 'form-group toggle-row'
  autoGroup.innerHTML = `
    <label class="form-label" style="margin:0">Auto-detect source language</label>
    <label class="toggle">
      <input type="checkbox" id="auto-detect" ${prefs.autoDetect ? 'checked' : ''}>
      <span class="toggle-slider"></span>
    </label>`
  autoGroup.querySelector('#auto-detect').onchange = function () {
    prefs.autoDetect = this.checked
    savePrefsDebounced()
  }
  container.appendChild(autoGroup)

  const btnGroup = document.createElement('div')
  btnGroup.style.display = 'flex'
  btnGroup.style.gap = '8px'
  btnGroup.style.marginTop = '12px'

  const enableBtn = document.createElement('button')
  enableBtn.className = 'btn btn-primary'
  enableBtn.innerHTML = '<span class="btn-icon">&#9654;</span> Enable Subtitles'
  enableBtn.id = 'enable-btn'
  enableBtn.onclick = async () => {
    const tab = await getActiveTab()
    if (tab) {
      chrome.tabs.sendMessage(tab.id, {
        type: 'UPDATE_SUBTITLE',
        text: '',
        translation: 'Subtitles enabled',
        config: prefs,
      }).catch(() => {
        status.innerHTML = '<span class="status-dot status-error"></span> Reload the video page'
      })
    }
  }
  btnGroup.appendChild(enableBtn)

  const disableBtn = document.createElement('button')
  disableBtn.className = 'btn btn-secondary'
  disableBtn.innerHTML = 'Disable'
  disableBtn.id = 'disable-btn'
  disableBtn.onclick = async () => {
    const tab = await getActiveTab()
    if (tab) {
      chrome.tabs.sendMessage(tab.id, { type: 'DISABLE_SUBTITLES' }).catch(() => {})
    }
  }
  btnGroup.appendChild(disableBtn)
  container.appendChild(btnGroup)

  return container
}

function createSettingsTab() {
  const container = document.createElement('div')
  container.id = 'tab-settings'
  container.className = 'tab-content'

  const fields = [
    { id: 'subtitle-size', label: 'Subtitle Size', type: 'range', min: 12, max: 48, value: prefs.subtitleSize, key: 'subtitleSize' },
    { id: 'opacity', label: 'Background Opacity', type: 'range', min: 0, max: 100, value: prefs.opacity, key: 'opacity' },
  ]

  fields.forEach(f => {
    const group = document.createElement('div')
    group.className = 'form-group'
    const valDisplay = f.type === 'range' ? ` <span class="range-value" id="${f.id}-val">${f.value}</span>` : ''
    group.innerHTML = `<label class="form-label">${f.label}${valDisplay}</label>`
    const input = document.createElement('input')
    input.type = f.type
    input.id = f.id
    if (f.min !== undefined) input.min = f.min
    if (f.max !== undefined) input.max = f.max
    input.value = f.value
    input.oninput = function () {
      prefs[f.key] = Number(this.value)
      const valEl = document.getElementById(`${f.id}-val`)
      if (valEl) valEl.textContent = this.value
      savePrefsDebounced()
    }
    group.appendChild(input)
    container.appendChild(group)
  })

  const posGroup = document.createElement('div')
  posGroup.className = 'form-group'
  posGroup.innerHTML = '<label class="form-label">Subtitle Position</label>'
  const posSelect = document.createElement('select')
  posSelect.className = 'form-select'
  posSelect.id = 'position'
  const positions = [
    { value: 'bottom', label: 'Bottom' },
    { value: 'top', label: 'Top' },
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-right', label: 'Bottom Right' },
  ]
  positions.forEach(p => {
    const opt = document.createElement('option')
    opt.value = p.value
    opt.textContent = p.label
    if (p.value === prefs.position) opt.selected = true
    posSelect.appendChild(opt)
  })
  posSelect.onchange = function () {
    prefs.position = this.value
    savePrefsDebounced()
  }
  posGroup.appendChild(posSelect)
  container.appendChild(posGroup)

  const toggleFields = [
    { id: 'high-contrast', label: 'High Contrast Mode', key: 'highContrast', checked: prefs.highContrast },
    { id: 'dyslexia-font', label: 'Dyslexia-friendly Font', key: 'dyslexiaFont', checked: prefs.dyslexiaFont },
  ]

  toggleFields.forEach(f => {
    const group = document.createElement('div')
    group.className = 'form-group toggle-row'
    group.innerHTML = `
      <label class="form-label" style="margin:0">${f.label}</label>
      <label class="toggle">
        <input type="checkbox" id="${f.id}" ${f.checked ? 'checked' : ''}>
        <span class="toggle-slider"></span>
      </label>`
    group.querySelector(`#${f.id}`).onchange = function () {
      prefs[f.key] = this.checked
      savePrefsDebounced()
    }
    container.appendChild(group)
  })

  return container
}

function createAboutTab() {
  const container = document.createElement('div')
  container.id = 'tab-about'
  container.className = 'tab-content'

  container.innerHTML = `
    <div style="text-align:center;padding:20px 0">
      <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#6366f1,#06b6d4);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:20px;font-weight:700;color:#fff">S</div>
      <h2 style="font-size:16px;font-weight:700;margin:0 0 4px">SubtitleFlow</h2>
      <p style="font-size:12px;color:#94a3b8;margin:0 0 4px" id="ext-version">v1.0.0</p>
      <p style="font-size:12px;color:#64748b;margin:0">AI-powered real-time subtitle translation</p>
    </div>
    <div style="background:#f8fafc;border-radius:8px;padding:12px;font-size:12px;color:#475569;line-height:1.6" class="dark-bg-adjust">
      <strong style="color:#0f172a" class="dark-text-adjust">Supported Sites:</strong><br>
      YouTube, Coursera, Udemy, Twitch, Vimeo
    </div>
    <div style="margin-top:12px;text-align:center">
      <a href="https://subtitleflow.com/docs" target="_blank" style="color:#6366f1;font-size:12px;text-decoration:none" id="docs-link">View Documentation →</a>
    </div>`

  return container
}

function renderContent() {
  const content = document.getElementById('content-area')
  content.innerHTML = ''
  content.appendChild(currentTab === 'translate' ? createTranslateTab() : currentTab === 'settings' ? createSettingsTab() : createAboutTab())
}

function init() {
  loadPrefs().then(() => {
    const app = document.getElementById('app')

    const header = document.createElement('div')
    header.className = 'header'
    header.innerHTML = '<div style="display:flex;align-items:center;gap:8px"><div style="width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,#6366f1,#06b6d4);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff">S</div><span style="font-weight:700;font-size:14px">SubtitleFlow</span></div>'
    app.appendChild(header)

    const tabs = document.createElement('div')
    tabs.className = 'tabs'
    tabs.appendChild(TabButton({ id: 'translate', label: 'Translate', active: true }))
    tabs.appendChild(TabButton({ id: 'settings', label: 'Settings', active: false }))
    tabs.appendChild(TabButton({ id: 'about', label: 'About', active: false }))
    app.appendChild(tabs)

    const contentArea = document.createElement('div')
    contentArea.id = 'content-area'
    app.appendChild(contentArea)

    renderContent()
  })
}

document.addEventListener('DOMContentLoaded', init)
