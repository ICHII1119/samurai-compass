# SAMURAI in You — Technical Setup Guide

This guide explains how to fork and run your own instance of the SAMURAI in You app.

---

## What This App Does

A 21-day practice PWA for personal development, based on a 5-spirit framework (Pentagon Compass). Users receive daily challenges via LINE, record reflections, and track their progress over a 21-day cycle or a multi-phase "Dojo" program.

**Core user flow:**
1. User takes a diagnostic quiz → assigned a Spirit (e.g. Equanimity, Self-Cultivation)
2. Receives a daily LINE message with today's challenge + practice link
3. Opens the app, records their reflection for the day
4. Admin reviews and can send a "Musashi BOT" AI response via LINE
5. After 21 days → completion report with AI summary

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML / CSS / JavaScript (no framework) |
| Hosting | GitHub Pages (custom domain via CNAME) |
| Database | Firebase Firestore |
| Backend | Firebase Cloud Functions (Node.js 22) |
| Messaging | LINE Messaging API |
| AI | Anthropic Claude API (via Cloud Function proxy) |
| PWA | Service Worker + Web App Manifest |

---

## Repository Structure

```
/
├── diagnostic.html      # Admin panel + Compass diagnostic
├── lite.html            # Onboarding diagnostic (user-facing)
├── practice.html        # 21-day practice log
├── dojo.html            # Multi-phase Dojo practice log
├── dojo-report.html     # Completion report (auto-generated)
├── report.html          # 21-day program report
├── manifest.json        # PWA manifest
├── sw.js                # Service Worker
├── logo.png             # App logo
├── tips/                # Daily challenge card images (spirit_01.png etc.)
└── en/                  # English version (mirrors root structure)
```

---

## Firebase Setup

### 1. Create a new Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project
3. Enable **Firestore Database** (production mode)
4. Enable **Cloud Functions**
5. Register a **Web App** to get your config object

### 2. Firestore Collections

| Collection | Document ID | Key Fields |
|------------|-------------|------------|
| `lite_results` | LINE user ID | `nickname`, `spirit`, `timestamp`, `lineUserId` |
| `practices` | LINE user ID | `entries[]` (array of `{day, text, timestamp, cycle}`) |
| `dojo_practices` | LINE user ID | `entries[]`, `spiritPlan[]`, `currentPhase`, `currentDay`, `phaseStatus` |
| `profiles` | LINE user ID | `displayName`, `pictureUrl` |
| `submissions` | LINE user ID | `counts{}` (spirit → score), `total`, `spirit` |

#### `dojo_practices` entry formats

**Pre-dojo (date-based):**
```json
{
  "spirit": "hei",
  "challengeTitle": "...",
  "challengeBody": "...",
  "reflection": "...",
  "date": "2026-08-03",
  "timestamp": "2026-08-03T10:00:00.000Z"
}
```

**Dojo phase entry:**
```json
{
  "phase": 0,
  "day": 1,
  "spirit": "jiko",
  "text": "...",
  "timestamp": "2026-08-17T12:00:00.000Z"
}
```

#### `dojo_practices` metadata fields

```json
{
  "spiritPlan": ["jiko", "strat", "sei", "flex"],
  "currentPhase": 0,
  "currentDay": 2,
  "phaseStatus": "active",
  "dojoStartedAt": "<Firestore Timestamp>",
  "phaseStartedAt": "<Firestore Timestamp>",
  "phaseCompletedAt": "<Firestore Timestamp>"
}
```

`phaseStatus` values: `"active"` → `"waiting_review"` → `"completed"`

Full completion detected when: `phaseStatus === "completed"` AND `currentPhase > spiritPlan.length`

---

## Cloud Functions

Located in `/functions/index.js`. Deploy with Firebase CLI.

| Function | Trigger | Purpose |
|----------|---------|---------|
| `lineWebhook` | HTTP POST | Receives LINE messages, routes to handlers |
| `dailyTip` | Cron `0 23 * * *` (08:00 JST) | Sends daily challenge to 21-day program users |
| `eveningReminder` | Cron `0 11 * * *` (20:00 JST) | Evening reminder for unrecorded days |
| `dojoEveningReminder` | Cron `0 11 * * *` (20:00 JST) | Evening reminder for Dojo users |
| `morningDojoChallenge` | Cron `0 23 * * *` (08:00 JST) | Sends daily challenge to Dojo users + increments `currentDay` |
| `weeklySummary` | Cron `0 23 * * 6` (Sunday 08:00 JST) | Weekly reflection summary |
| `notifyAdmin` | Firestore trigger | Notifies admin LINE when user submits a reflection |
| `anthropicProxy` | HTTP POST | Proxies Claude API calls (requires admin PIN in Authorization header) |
| `sendComment` | HTTP POST | Sends a facilitator comment to a user via LINE |

### Environment Variables (functions/.env)

```
LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token
LINE_CHANNEL_SECRET=your_line_channel_secret
ADMIN_LINE_USER_ID=your_admin_line_user_id
ANTHROPIC_API_KEY=your_anthropic_api_key
ADMIN_PIN=your_chosen_admin_pin
```

**Never commit this file to git.** Add `.env` to `.gitignore`.

---

## LINE Setup

1. Create a LINE Developers account at [developers.line.biz](https://developers.line.biz)
2. Create a **Messaging API** channel
3. Set the **Webhook URL** to your Cloud Function's `lineWebhook` URL
4. Enable webhooks, disable auto-reply
5. Copy **Channel Access Token** and **Channel Secret** to your `.env`
6. Find your own LINE User ID via the webhook or LINE's debug console (this becomes `ADMIN_LINE_USER_ID`)

---

## Firebase Config in HTML

Each HTML file has a Firebase config block like this. Replace with your own project values:

```javascript
firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
});
```

> Note: Firebase web API keys are safe to include in client-side code — they identify your project but do not grant admin access. Access is controlled by Firestore Security Rules.

---

## Firestore Security Rules

The current setup uses open rules for simplicity. For production, restrict access:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own documents
    match /practices/{userId} {
      allow read, write: if request.auth == null; // adjust for your auth setup
    }
    // Add rules per collection as needed
  }
}
```

---

## Admin Panel Access

The admin panel is at `diagnostic.html#admin`. It requires the `ADMIN_PIN` you set in your environment. Set it to something strong and unique.

---

## The 5 Spirits (Pentagon Compass)

The app is built around 5 spirits from Japanese martial arts philosophy:

| Key | Japanese | English |
|-----|----------|---------|
| `hei` | 平常心 | Equanimity |
| `jiko` | 自己鍛錬 | Self-Cultivation |
| `flex` | 柔軟な適応力 | Flexibility |
| `strat` | 戦略的思考 | Strategic Thinking |
| `sei` | 誠実さ | Integrity |

The diagnostic assigns users to their primary spirit based on their answers. The Dojo program lets facilitators design a custom `spiritPlan` sequence for each user.

---

## Deploying to GitHub Pages

1. Fork the repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, root `/`
4. Add a custom domain in the CNAME file if needed

The app works immediately after deploy — no build step required.

---

## Important: Day Number Calculations

All day number calculations use **JST (Japan Standard Time, UTC+9)** day boundaries:

```javascript
const JST = 9 * 3600000;
const nowJstDay   = Math.floor((Date.now()           + JST) / 86400000);
const startJstDay = Math.floor((startDate.getTime()  + JST) / 86400000);
const dayNum = nowJstDay - startJstDay + 1;
```

Using raw `Date.now() - startDate` without timezone correction causes 1-day offsets for users who start late in the evening. This applies to Cloud Functions as well as client-side code.

---

## Localizing to Another Language

The `/en/` directory is a full English translation of all pages. To add another language:

1. Copy the root HTML files to a new subdirectory (e.g. `/th/` for Thai)
2. Translate all user-facing strings
3. Update image paths: `../logo.png` (one level up from subdirectory)
4. Add a `manifest.json` and `sw.js` in the subdirectory

---

*For questions about the program design or facilitation methodology, contact the original author.*
