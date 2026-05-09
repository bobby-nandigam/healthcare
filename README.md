# 🏥 HealthSaaS — B2B Healthcare Management Platform

A production-grade B2B Healthcare SaaS UI built with React, TypeScript, Zustand, Firebase Authentication, and Service Workers. Designed with a dark, clinical aesthetic optimized for healthcare professionals.

---

## 📸 Preview

| Page | Description |
|---|---|
| **Login** | Firebase Auth with Google SSO + demo mode |
| **Dashboard** | Real-time stats, trend charts, recent patients table |
| **Analytics** | Revenue charts, department breakdown, performance radar |
| **Patients (Grid)** | Card-based view with vitals, status indicators |
| **Patients (List)** | Compact tabular view with quick scan info |
| **Patient Detail** | Full profile: vitals, medications, clinical notes |
| **Notifications** | Push notification center with browser SW integration |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>= 18.x`
- npm or yarn
- A Firebase project (free tier is sufficient)

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/healthsaas-b2b.git
cd healthsaas-b2b
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → Sign-in method → **Email/Password** and **Google**
4. Go to Project Settings → General → Your apps → Add Web App
5. Copy your config values

### 3. Configure Environment Variables

```bash
cp .env .env
```

Edit `.env` with your Firebase values:

```env
REACT_APP_FIREBASE_API_KEY=your_actual_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

> **Demo Mode:** If Firebase isn't configured, the app automatically falls back to demo mode — just click "Sign In to Dashboard" with the pre-filled credentials.

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   └── ProtectedRoute.tsx       # Route guard with auth check
│   └── Layout/
│       ├── AppLayout.tsx            # Main shell wrapper
│       ├── Sidebar.tsx              # Collapsible navigation sidebar
│       └── Header.tsx               # Top bar with search + notifications
│
├── pages/
│   ├── LoginPage.tsx                # Firebase auth + Google SSO
│   ├── DashboardPage.tsx            # Overview with charts & stats
│   ├── AnalyticsPage.tsx            # Deep analytics (4 chart types)
│   ├── PatientsPage.tsx             # Grid/List view with filtering
│   ├── PatientDetailPage.tsx        # Full patient profile
│   └── NotificationsPage.tsx        # Push notification center
│
├── store/
│   └── useAppStore.ts               # Zustand global state
│
├── services/
│   ├── firebase.ts                  # Firebase initialization
│   ├── mockData.ts                  # 8 detailed mock patients + analytics
│   └── notifications.ts             # SW registration + push utils
│
├── types/
│   └── index.ts                     # TypeScript interfaces
│
├── styles/
│   └── globals.css                  # CSS variables, animations, utilities
│
├── hooks/
│   └── useAuth.ts                   # Firebase auth state hook
│
├── App.tsx                          # Router + auth listener
└── index.tsx                        # Entry point

public/
├── sw.js                            # Service Worker (cache + push)
├── manifest.json                    # PWA manifest
└── index.html
```

---

## ✨ Features

### 🔐 Authentication
- Firebase Email/Password login
- Google OAuth via popup
- Persistent auth state (Zustand persisted)
- Demo mode fallback (no config needed)
- Form validation + error states

### 📊 Dashboard
- 4 KPI stat cards with trend indicators
- Patient volume + appointment area chart (Recharts)
- Patient status distribution with animated bars
- Average vitals summary
- Recent patients table with click-through

### 📈 Analytics
- Revenue trend area chart
- Appointments vs Patients grouped bar chart
- Multi-dimensional performance radar chart
- Department breakdown table with visual bar indicators
- Recovery rate sparkline

### 👥 Patient Management
- **Grid View**: Visual cards with vitals, status badges, blood type
- **List View**: Compact table for quick scanning
- Real-time search across name, condition, ID, doctor
- Status filter tabs (All / Active / Stable / Critical / Discharged)
- Critical patient pulse animation
- View toggle persisted in localStorage

### 👤 Patient Detail
- Full demographic info (contact, insurance, admission)
- 6-panel vitals display with color coding
- Current medications with dosage & frequency
- Clinical notes section
- Quick action panel
- Breadcrumb navigation

### 🔔 Notifications (Service Worker)
- Browser push notification permission request
- Service Worker registration + caching strategy
- Notification center with read/unread states
- Test triggers for different alert types
- SW feature detection (Support, Push API, Permission)
- Background sync support

### 🗂️ State Management (Zustand)
- Single unified store with clear slices
- Auth state, patient data, UI preferences
- Notification queue management
- Persistent middleware for view preferences

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.2 | UI framework |
| TypeScript | 5.3 | Type safety |
| Zustand | 4.5 | State management |
| React Router | 6.x | Client-side routing |
| Firebase | 10.x | Authentication |
| Recharts | 2.x | Data visualizations |
| Lucide React | 0.344 | Icon system |
| Service Worker | Native | Push notifications & caching |

---

## 📦 Build for Production

```bash
npm run build
```

The `build/` folder is ready to deploy.

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

> **Important for SPA routing on Netlify:** Add a `public/_redirects` file:
> ```
> /*  /index.html  200
> ```

---

## 🧩 Architecture Notes

### Micro-Frontend Readiness
Each page module (`Dashboard`, `Analytics`, `Patients`, `Notifications`) is self-contained:
- Independent data fetching from the store
- No cross-module direct imports
- Easy to extract into separate micro-frontends using Module Federation

### Reusable Components
- `StatCard` — KPI display with icon, value, trend
- `VitalCard` — Individual vital metric display
- `PatientGridCard` / `PatientListRow` — View-mode-aware renderers
- `ProtectedRoute` — Auth guard wrapper
- `AppLayout` — Shell with sidebar + header

### Performance
- Zustand `persist` middleware with selective hydration
- `useMemo` for expensive patient filtering
- CSS-only animations (no JS animation libraries)
- Lazy-loadable page structure (ready for `React.lazy`)
- Service Worker with network-first caching

---

## 🔑 Environment Variables Reference

| Variable | Description |
|---|---|
| `REACT_APP_FIREBASE_API_KEY` | Firebase Web API Key |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | `project.firebaseapp.com` |
| `REACT_APP_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | `project.appspot.com` |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Cloud Messaging Sender ID |
| `REACT_APP_FIREBASE_APP_ID` | Firebase App ID |

---

## 📝 License

MIT — free to use for assignment evaluation and personal projects.

---

## 👨‍💻 Developer Notes

- All patient data is **mock/synthetic** — no real PHI
- The app operates fully in **demo mode** without Firebase credentials
- Notifications fall back gracefully if the browser doesn't support them
- The UI is optimized for 1280px+ screens with mobile-responsive layouts
