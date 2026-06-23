<div align="center">
  <br/>
  <a href="https://github.com/syedsadique-git/SubtitleFlow">
    <img src="public/favicon.svg" alt="SubtitleFlow Logo" width="80" height="80">
  </a>
  <br/>
  <h1>SubtitleFlow</h1>
  <p>
    <strong>AI-Powered Real-Time Subtitle Translation for Any Video on the Web</strong>
  </p>
  <br/>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-browser-extension">Extension</a> •
    <a href="#-api">API</a> •
    <a href="#-contributing">Contributing</a>
  </p>

  <br/>

  <p>
    <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white" alt="Framer Motion">
    <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white" alt="Express">
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL">
  </p>

  <br/>
</div>

---

**SubtitleFlow** is a modern SaaS platform that provides AI-powered real-time subtitle translation for videos across the web through a browser extension. It automatically detects speech in online videos (YouTube, educational platforms, livestreams, recorded videos, etc.), generates highly accurate subtitles, translates them into the user's selected language, and overlays them in real time.

## ✨ Features

### Landing Page
| Section | Description |
|---------|-------------|
| **Hero** | Headline with animated stats (100K+ users, 100+ languages, 99.9% accuracy, <200ms latency), CTA buttons, feature badges |
| **Features** | 8 core feature cards + 4 category sections (Translation Controls, Accessibility, Download Options, Customization) |
| **Browser Support** | Chrome, Edge, Firefox, Brave — with SVG icons and version badges |
| **How It Works** | 4-step visual guide with animated connection line and numbered steps |
| **Pricing** | 3-tier pricing cards (Free / Premium / Enterprise) with comparison table |
| **CTA** | Gradient call-to-action section |

### Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Full landing page with all sections |
| Pricing | `/pricing` | Detailed pricing with plan comparison table |
| Download | `/download` | Browser-specific download cards + installation instructions |
| Documentation | `/docs` | Comprehensive docs with live extension preview inside settings panel |
| FAQ | `/faq` | Searchable FAQ with categorized accordion questions |
| 404 | `*` | Custom not-found page |

### Browser Extension UI
The site includes fully interactive mockups of the extension interface:

- **Popup** — Tabbed interface (Translate / Settings / Style) with language selection, real-time translation status, subtitle preview, SRT/TXT download buttons, subtitle size/opacity sliders, auto-detect toggle, high contrast mode, font family selector, color pickers, position selector, and quick theme presets
- **Settings Panel** — Sidebar-navigated dashboard with 6 sections: Translation, Audio & Speech, Style (full theme customizer), Accessibility, Keyboard Shortcuts, Export (SRT/TXT)
- **Theme Customizer** — Font size, opacity, text/background color, font family, position, saved theme presets, live preview window, reset button

### Accessibility
- High contrast mode
- Dyslexia-friendly fonts (OpenDyslexic)
- Keyboard shortcuts
- ARIA labels on interactive elements
- Focus trap and Escape key for mobile menu
- Screen-reader-friendly form labels
- `prefers-color-scheme` dark mode support

### Technical Features
- Dark/light mode with `localStorage` persistence and system preference detection
- Smooth Framer Motion animations throughout
- Code-split routes with `React.lazy()` and `Suspense`
- Fully responsive (mobile hamburger menu, responsive grids)
- Gradient accents and glassmorphism design
- Error boundaries for theme context

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/syedsadique-git/SubtitleFlow.git
cd SubtitleFlow

# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

The frontend runs at `http://localhost:5173`.

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Start the API server
npm start
```

The API server runs at `http://localhost:3001`.

### Production Build

```bash
npm run build
# Output in ./dist/
```

## 📁 Project Structure

```
SubtitleFlow/
│
├── src/                          # Frontend source
│   ├── components/
│   │   ├── extension/            # Browser extension UI mockups
│   │   │   ├── Popup.tsx         # Extension popup interface
│   │   │   ├── SettingsPanel.tsx # Full settings dashboard
│   │   │   └── ThemeCustomizer.tsx # Subtitle theme editor
│   │   ├── layout/               # Site shell
│   │   │   ├── Navbar.tsx        # Responsive navbar with dark mode toggle
│   │   │   ├── Footer.tsx        # Site footer with links
│   │   │   └── Layout.tsx        # Root layout with Outlet
│   │   └── sections/             # Landing page sections
│   │       ├── Hero.tsx          # Hero with animated stats
│   │       ├── Features.tsx      # Feature cards + categories
│   │       ├── BrowserSupport.tsx # Browser download cards
│   │       ├── HowItWorks.tsx    # 4-step guide
│   │       ├── Pricing.tsx       # 3-tier pricing
│   │       └── CTA.tsx           # Call to action
│   ├── pages/                    # Route pages
│   │   ├── Home.tsx
│   │   ├── PricingPage.tsx       # Full pricing with comparison table
│   │   ├── Download.tsx          # Download per browser
│   │   ├── Documentation.tsx     # Docs with live extension preview
│   │   ├── FAQ.tsx               # Searchable FAQ
│   │   └── NotFound.tsx          # 404 page
│   ├── context/
│   │   └── ThemeContext.tsx      # Dark/light mode context
│   ├── styles/
│   │   └── fonts.css             # Font declarations
│   ├── App.tsx                   # Root with React Router
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Tailwind + global styles
│
├── backend/                      # Node.js + Express API
│   └── src/
│       ├── routes/
│       │   ├── users.js          # Auth endpoints
│       │   ├── translation.js    # Translation API
│       │   └── preferences.js    # User preferences CRUD
│       ├── models/
│       │   └── User.js           # PostgreSQL user model
│       └── middleware/
│           └── auth.js           # JWT authentication middleware
│
├── extension/                    # Browser extension (Manifest V3)
│   ├── manifest.json             # Extension manifest
│   ├── background.js             # Service worker
│   ├── content.js                # Subtitle overlay injection
│   ├── popup.html                # Popup HTML shell
│   ├── styles.css                # Content script styles
│   └── icons/                    # Extension icons (SVG)
│
├── public/
│   └── favicon.svg               # Site favicon
│
├── index.html                    # HTML entry point
├── vite.config.ts                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── package.json                  # Dependencies
```

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vite.dev/) | Build tool & dev server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [Lucide React](https://lucide.dev/) | Icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| [Node.js](https://nodejs.org/) | Runtime |
| [Express](https://expressjs.com/) | Web framework |
| [PostgreSQL](https://www.postgresql.org/) | Database |
| [pg](https://node-postgres.com/) | PostgreSQL client |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | JWT auth |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variables |

### Browser Extension
| Technology | Purpose |
|------------|---------|
| Manifest V3 | Extension architecture |
| Chrome Extensions API | Browser integration |

## 🧩 Browser Extension

The extension is located in the `extension/` directory and uses **Manifest V3**.

### Key Files
- `manifest.json` — Extension configuration with host permissions for YouTube, Coursera, Udemy, Twitch, Vimeo
- `background.js` — Service worker managing lifecycle events and message passing between popup and content scripts
- `content.js` — Injects subtitle overlay into video pages with customizable styles
- `styles.css` — Styling for the subtitle overlay (high contrast, dyslexia-friendly modes)

### Installing the Extension (Development)
1. Open your browser's extension management page (`chrome://extensions/`, `edge://extensions/`, etc.)
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `extension/` directory

### Permissions
- `storage` — Save user preferences and themes
- `activeTab` — Access the current tab's video content
- `scripting` — Inject subtitle overlay
- `tabs` — Tab management

## 🌐 API

The backend provides a RESTful API:

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/users/register` | Create account |
| `POST` | `/api/users/login` | Sign in |
| `POST` | `/api/translate` | Translate text |
| `POST` | `/api/translate/speech-to-text` | Speech recognition |
| `GET` | `/api/preferences/:userId` | Get user preferences |
| `PUT` | `/api/preferences/:userId` | Update user preferences |

### Environment Variables

```env
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/subtitleflow
JWT_SECRET=your-secret-key-change-in-production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ for breaking language barriers</sub>
  <br/>
  <br/>
  <a href="https://github.com/syedsadique-git/SubtitleFlow/issues">Report Bug</a> •
  <a href="https://github.com/syedsadique-git/SubtitleFlow/issues">Request Feature</a>
</div>
