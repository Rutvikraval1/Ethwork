# EthWork — Web3 Jobs Platform (Local Storage MVP)

**Build Web3. Get Paid.**  
EthWork is a modern, task-first Web3 jobs platform featuring milestone-based PYUSD escrow (concept), wallet-ready UI, and a clean developer + employer flow. This repository contains a fully working **frontend MVP** that persists data to **localStorage** so you can demo everything without a backend.

> **Note**: This README targets the local-storage MVP. You can later swap storage for Supabase, a REST API, or an on-chain indexer. The UI is built with Next.js (App Router), Tailwind, and shadcn/ui components.

---

## ✨ Features

- **Modern Landing** with clear value prop, CTAs, and sectioned content
- **Jobs**: list, search, skill-tag filters, salary range filter
- **Job Details**: role, company, skills, description, salary
- **Companies**: list and company profile pages with open roles
- **Post a Job**: functional form that writes to `localStorage` (appears immediately in Jobs)
- **Dashboard**: applications, saved jobs, basic profile (localStorage)
- **Wallet-ready UI**: Wallet badge/button components (plug in your wagmi/ConnectKit/RainbowKit when ready)
- **Responsive, accessible UI**: Tailwind + shadcn/ui + semantic markup
- **Zero backend**: all data persisted in the browser via `localStorage`

---

## 🧱 Tech Stack

- **Next.js** 14+ (App Router)
- **React** 18
- **Tailwind CSS**
- **shadcn/ui** (Radix under the hood)
- **TypeScript**
- **Local Storage** (persistence for MVP)
- *(Optional placeholder)* **wagmi / viem / ConnectKit** — easy to add when you’re ready

---

## ✅ Requirements

- **Node.js ≥ 20.9.0** (recommend **Node 22 LTS**)
- **npm** (or pnpm/yarn if you prefer)

```bash
# Recommended on macOS (zsh)
brew install nvm
mkdir -p ~/.nvm
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && . "/opt/homebrew/opt/nvm/nvm.sh"' >> ~/.zshrc
source ~/.zshrc
nvm install 22 && nvm use 22 && nvm alias default 22
```

---

## 🚀 Quick Start

```bash
# 1) Install dependencies
npm install

# 2) Run dev server
npm run dev
# open http://localhost:3000

# 3) Optional: build & run production
npm run build
npm start
```

You do **not** need any environment variables for the local-storage MVP.

---

## 📁 Project Structure

```
app/
  layout.tsx                 # Root layout & providers
  page.tsx                   # Landing
  how-it-works/page.tsx
  jobs/page.tsx              # Jobs list with filters
  jobs/[id]/page.tsx         # Job details
  companies/page.tsx         # Companies list
  companies/[id]/page.tsx    # Company profile
  post-job/page.tsx          # Post a Job form (writes to localStorage)
  dev/dashboard/page.tsx     # User dashboard (applications/saved/profile)
  impact/page.tsx            # (optional) Impact/charity page
  support/page.tsx           # Support/FAQ
  not-found.tsx, error.tsx

components/
  ui/*                       # shadcn components
  nav/Navbar.tsx
  Footer.tsx
  WalletBadge.tsx            # plug wagmi/ConnectKit when ready
  WalletButton.tsx           # plug wagmi/ConnectKit when ready
  JobCard.tsx
  MilestoneTable.tsx
  StatusChip.tsx
  EmptyState.tsx
  Skeletons.tsx

lib/
  types.ts                   # TS interfaces (User, Job, Milestone, etc.)
  storage.ts                 # Local storage read/write helpers
  featureFlags.ts
  copy.ts
  utils.ts

styles/
  globals.css
```

---

## 🗄️ Local Storage Schema

All data is stored JSON-serialized under these keys (you can change in `lib/storage.ts`):

| Key | Type | Description |
| --- | --- | --- |
| `ethwork_jobs` | `Job[]` | Posted jobs (from Post Job + seed) |
| `ethwork_companies` | `Company[]` | Companies & basic profiles |
| `ethwork_applications` | `Application[]` | Your submitted applications |
| `ethwork_saved_jobs` | `string[]` | Job IDs you saved/bookmarked |
| `ethwork_profile` | `User` | Minimal local user profile |

**Job shape (simplified)**:  
```ts
type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  salary?: string;      // e.g. "$120,000 - $150,000" or "120k–150k"
  tags: string[];       // e.g. ["Solidity", "React"]
  description: string;
  createdAt: string;    // ISO
};
```

Salary filtering uses a robust parser that supports `$120,000 - $150,000`, `120k–150k`, `100k+`, `Up to 90k`, etc., and gracefully handles missing values. If only one number exists, it treats it as exact (`min=max`).

---

## 🧪 Seeding & Sample Data

On first load, the app may seed a few example jobs/companies for demo purposes. You can clear data at any time:

- **Clear all**: open devtools → Application → Local Storage → delete the `ethwork_*` keys.
- Or add a “Reset demo data” button (see `lib/storage.ts` for helpers).

---

## 🧭 Navigation & UX Notes

- **Landing** → “Find Web3 Jobs” goes to `/jobs`.
- **Companies** lists all companies with links to `/companies/[id]`.
- **Post a Job** writes a new job to `localStorage` and redirects to `/jobs`.
- **Dashboard** (dev) shows applications, saved jobs, and a lightweight profile.
- **Wallet** UI components are included; wire up wagmi/ConnectKit when you’re ready.

---

## 🔌 Wallet Integration (Optional)

This MVP includes `WalletBadge`/`WalletButton` shell components. When ready, add:

```bash
npm i wagmi viem @tanstack/react-query
# or ConnectKit / RainbowKit of your choice
```

Then wrap the app with your wallet provider in `app/layout.tsx` and replace the button component with your connect hook. A “Sepolia • Beta” label can be shown when you detect the network id (11155111).

---

## 🛠️ Scripts

```jsonc
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 🧩 Design System

- **Colors**: Primary Indigo (`#6B7CFF`), Accent Green (`#26D07C`), Dark surfaces
- **Typography**: Sora (display), Inter (body), JetBrains Mono (mono)
- **Motion**: Framer Motion-friendly (fade-up, hover lift, subtle transitions)
- **Components**: shadcn/ui; focus rings, accessible labels, skeletons and empty states

---

## 🗺️ Roadmap

- Connect real **escrow** + **PYUSD** approvals on Sepolia
- Employer **verification** workflow
- **Messaging** per job/contract
- **Milestones** submission/review/release UX with receipts
- Admin **disputes** flow
- Public **reputation** badges & on-chain events

---

## 🤝 Contributing

PRs and issues welcome! Please keep PRs small and focused. For larger features, open an issue first to discuss scope & UX.

---

## ⚖️ License

MIT © EthWork contributors

---

## 🧯 Troubleshooting

- **Node version error**: Next.js requires Node ≥ 20.9. Run `node -v`, upgrade via `nvm install 22 && nvm use 22`.
- **Port busy**: `PORT=3001 npm run dev`.
- **Blank data**: Clear `ethwork_*` keys in localStorage or re-seed via `lib/storage.ts` helpers.
- **Type errors**: Ensure TypeScript 5+ and `"strict": true` (recommended) in `tsconfig.json`.
