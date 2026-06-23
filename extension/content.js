// SubtitleFlow Content Script
// Injects subtitle overlay into video pages

let subtitleOverlay = null;
let currentSubtitle = null;

function initialize() {
  subtitleOverlay = document.createElement('div');
  subtitleOverlay.id = 'subtitleflow-overlay';
  subtitleOverlay.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999999;
    text-align: center;
    pointer-events: none;
    transition: all 0.3s ease;
  `;
  document.body.appendChild(subtitleOverlay);
}

function updateSubtitle(text, translation, config) {
  if (!subtitleOverlay) return;

  subtitleOverlay.innerHTML = `
    <div style="
      display: inline-block;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: ${config.subtitleSize || 24}px;
      font-family: ${config.fontFamily || 'Inter'}, sans-serif;
      color: ${config.textColor || '#ffffff'};
      background: ${config.bgColor || '#000000'}${Math.round((config.opacity || 85) * 2.55).toString(16).padStart(2, '0')};
      max-width: 80vw;
      backdrop-filter: blur(4px);
    ">
      ${translation || text}
    </div>
  `;
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'UPDATE_SUBTITLE') {
    updateSubtitle(message.text, message.translation, message.config);
  }
});

initialize();
