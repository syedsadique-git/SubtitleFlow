chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    const url = chrome.runtime.getManifest().homepage_url || 'https://subtitleflow.com/install'
    chrome.tabs.create({ url })
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'TRANSLATE_TEXT':
      handleTranslation(message.payload, sendResponse)
      return true
    case 'GET_PREFERENCES':
      getPreferences(sendResponse)
      return true
    case 'SAVE_PREFERENCES':
      savePreferences(message.payload, sendResponse)
      return true
    case 'PING':
      sendResponse({ installed: true, version: chrome.runtime.getManifest().version })
      return true
  }
})

async function handleTranslation(payload, sendResponse) {
  try {
    sendResponse({ success: true, data: { translatedText: '' } })
  } catch (error) {
    sendResponse({ success: false, error: error.message })
  }
}

function getPreferences(sendResponse) {
  chrome.storage.sync.get(['preferences'], (result) => {
    sendResponse(result.preferences || getDefaultPreferences())
  })
}

function savePreferences(preferences, sendResponse) {
  chrome.storage.sync.set({ preferences }, () => {
    sendResponse({ success: true })
  })
}

function getDefaultPreferences() {
  return {
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
}
