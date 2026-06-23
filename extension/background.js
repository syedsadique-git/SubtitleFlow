// SubtitleFlow Background Service Worker
// Handles extension lifecycle, message passing, and API communication

const API_BASE_URL = 'https://api.subtitleflow.com';

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: 'https://subtitleflow.com/welcome' });
  }
});

// Listen for messages from popup and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'TRANSLATE_TEXT':
      handleTranslation(message.payload, sendResponse);
      return true;
    case 'GET_PREFERENCES':
      getPreferences(sendResponse);
      return true;
    case 'SAVE_PREFERENCES':
      savePreferences(message.payload, sendResponse);
      return true;
  }
});

async function handleTranslation(payload, sendResponse) {
  try {
    // TODO: Call SubtitleFlow API or translation service
    sendResponse({ success: true, data: { translatedText: '' } });
  } catch (error) {
    sendResponse({ success: false, error: error.message });
  }
}

function getPreferences(sendResponse) {
  chrome.storage.sync.get(['preferences'], (result) => {
    sendResponse(result.preferences || getDefaultPreferences());
  });
}

function savePreferences(preferences, sendResponse) {
  chrome.storage.sync.set({ preferences }, () => {
    sendResponse({ success: true });
  });
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
  };
}
