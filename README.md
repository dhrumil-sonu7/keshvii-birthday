# 💗 Happy Birthday Keshvii – Interactive Animated Letter

A mobile-first, single-page birthday website built as an **interactive animated letter** for Keshvii's 25th birthday.

## ✨ Features

- 🎀 Pastel envelope with 3D flap-opening animation
- 📸 5 photo slides with unique transitions (liquid wipe, heart reveal, card flip, whirl zoom, diagonal sweep)
- ✍️ Typewriter caption effect
- 🎊 Confetti, falling hearts, and balloon finale
- 🎵 Background music (What Makes You Beautiful)
- 💝 Hidden secret message (tap the heart on the finale screen!)
- 📱 Mobile-first design (optimized for 360px+)
- 🎨 Liquid neon blob backgrounds with floating hearts & cakes

## 🛠️ Tech Stack

- **Vite** – lightning-fast dev server & build
- **React 19** – component architecture
- **Framer Motion** – animations & transitions
- **Google Fonts** – Caveat + Quicksand

## 📁 Project Structure

```
keshvii/
├── public/
│   ├── photos/          # 1.jpeg – 5.jpeg
│   └── music.mp3        # Background music
├── src/
│   ├── components/
│   │   ├── AmbientParticles.jsx   # Floating hearts & cakes
│   │   ├── BackgroundBlobs.jsx    # Neon blob background
│   │   ├── Confetti.jsx           # Canvas confetti effect
│   │   ├── Envelope.jsx           # Pastel envelope with flaps
│   │   ├── Finale.jsx             # Birthday finale & secret
│   │   ├── ProgressHearts.jsx     # 5-heart progress bar
│   │   ├── SlideCard.jsx          # Photo card with doodles
│   │   └── Typewriter.jsx         # Character-by-character text
│   ├── hooks/
│   │   └── useMusic.js            # Audio playback hook
│   ├── content.js                 # ← ALL EDITABLE CONTENT HERE
│   ├── transitions.js             # 5 unique slide transitions
│   ├── App.jsx                    # Main orchestrator
│   ├── index.css                  # Design system & styles
│   └── main.jsx                   # React entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser (typically http://localhost:5173)
```

### Build for Production

```bash
npm run build
```

The output goes to `dist/`.

## 📝 Editing Content

All text, photos, and configuration are in **one file**: `src/content.js`.

- Add more slides by appending objects to the `slides` array
- Change the name, pet name, intro hint, finale text
- Update the secret message
- Adjust music volume

## 🌐 Deploy to Netlify

### Option A: Drag & Drop

1. Run `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder onto the page

### Option B: Git Integration

1. Push your repo to GitHub
2. Go to [netlify.com](https://netlify.com) → New Site from Git
3. Settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy!

## 🌐 Deploy to Vercel

### Option A: CLI

```bash
npx -y vercel --prod
```

### Option B: Dashboard

1. Push your repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import
3. Vercel auto-detects Vite. Just click **Deploy**.
4. Settings (auto-detected):
   - **Framework:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`

## 💡 Tips

- **Music:** Place `music.mp3` in the `public/` folder. If missing, the app works fine without it.
- **Photos:** Place JPEG/PNG files in `public/photos/` and reference them in `content.js` as `/photos/filename.jpeg`.
- **Performance:** Images are preloaded one slide ahead. The app targets 60fps on mobile.
- **Accessibility:** Respects `prefers-reduced-motion` — all animations are disabled for users who prefer it.

---

Made with 💗
