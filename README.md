# Eco Yachts — Sustainable Yacht Charter Platform

A production-grade web platform for a sustainable yacht charter business, built with **Next.js 16 (App Router)**, **React 19**, and **TypeScript**. The project ships a full public-facing marketing/booking site — with **Stripe-powered checkout** and a **Socket.IO real-time support chat** — alongside a self-service **admin dashboard (CMS)** that lets non-technical staff manage every piece of content and run live customer support, without touching code.

---

## Overview

| | |
|---|---|
| **Type** | Full-stack frontend (Next.js) consuming a REST API |
| **Audience** | Public marketing/booking site + internal content-management dashboard |
| **Stack** | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Redux Toolkit |
| **Rendering** | App Router with route groups for layout separation |

The codebase is organized into two clearly separated experiences under a single Next.js App Router instance:

- **`(withCommonLayout)`** — the public site: Home, Yachts, Destinations, Experiences, Crew Services, Contact, and the full booking funnel (`/booking/confirmation`, `/booking/cancelled`, `/my-bookings`), Privacy Policy, Terms & Conditions, Refund Policy.
- **`(dashboardLayout)`** — the internal CMS: authenticated staff tooling for managing every content type on the public site (hero sections, yachts/services, destinations, blog, gallery, video gallery, testimonials, FAQs, employees, roles/permissions), plus operational tooling — **bookings**, **payments**, a **live support chat inbox**, and account settings.

This route-group pattern keeps public and authenticated experiences on independent layouts, navigation, and data-fetching strategies while sharing the same build and deployment pipeline.

---

## Tech Stack

**Core**
- [Next.js 16](https://nextjs.org/) — App Router, file-based routing, image optimization, server/client component split
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/) — strict typing across pages, components, hooks, and API layer

**State & Data**
- [Redux Toolkit](https://redux-toolkit.js.org/) + `react-redux` — global state, RTK Query API slices
- `redux-persist` — persisted client state (e.g. auth session)
- [Axios](https://axios-http.com/) — typed HTTP client / API service layer
- `js-cookie` / `cookies-next` — cookie-based session handling
- `jwt-decode` — client-side token inspection

**Payments & Real-Time**
- [Stripe Checkout](https://stripe.com/) — redirect-based deposit/balance payment flow (no card data touches the client)
- [Socket.IO Client](https://socket.io/) — persistent WebSocket connection (`/chat` namespace) powering the live support chat widget and staff inbox, with typing indicators, read receipts, and presence

**UI & Forms**
- [Tailwind CSS 4](https://tailwindcss.com/) — utility-first styling
- [react-hook-form](https://react-hook-form.com/) — form state and validation
- [react-datepicker](https://reactdatepicker.com/), `react-paginate`, `lucide-react`, `react-icons`
- `sweetalert2`, `react-toastify` — user feedback / alerts
- `recharts` — dashboard analytics and charts
- `html2canvas` + `jspdf` — client-side document/PDF export (e.g. prescriptions)

**Tooling**
- ESLint 9 (flat config) with `eslint-config-next`
- `date-fns` for date formatting/manipulation

---

## Project Structure

```
src/
├── app/
│   ├── (withCommonLayout)/
│   │   ├── booking/confirmation/  # Post-Stripe-Checkout success landing
│   │   ├── booking/cancelled/     # Stripe Checkout cancel/expiry landing
│   │   ├── my-bookings/           # Customer's charter + payment history
│   │   └── yachts/ destinations/ experiences/ contact/ ...
│   ├── (dashboardLayout)/
│   │   └── dashboard/
│   │       ├── bookings/          # Staff booking management
│   │       ├── payments/          # Payment/transaction records
│   │       ├── support-chat/      # Live Socket.IO staff inbox
│   │       ├── account/           # Profile & account settings
│   │       └── ...                # CMS modules for every public content type
│   └── login/ signup/ otp/        # Authentication flows (shared by customers & staff)
├── components/
│   ├── Common/                    # Shared form controls, modals, auth UI
│   ├── Shared/
│   │   ├── MessageWidget/         # Floating real-time chat widget (public site)
│   │   └── Navbar/ Footer/ PageHero/ Logo
│   └── Ui/
│       ├── HomePage/              # Hero, Destinations, Featured Yachts, Sustainability, FAQ, etc.
│       └── Dashboard/
│           ├── Bookings/ Payments/ Account/  # Operational dashboard modules
│           ├── SupportChat/                  # Staff chat inbox UI
│           └── ...                           # One module per CMS content type
├── redux/
│   ├── api/                    # RTK Query API slices (incl. chatApi)
│   └── features/auth/          # Auth state slice
├── services/                   # API service functions (Axios)
├── hooks/
│   └── useChatSocket.ts        # Socket.IO connection, message state, typing/read-receipt logic
├── helpers/ lib/ utils/        # Utilities, providers, shared constants/data
└── types/                      # Shared TypeScript types
```

Each CMS module under `dashboard/` follows a consistent **add / all / edit** pattern (e.g. `hero/add-hero`, `hero/all-hero`, `hero/edit-hero/[id]`), giving content editors a predictable CRUD workflow across every content type.

---

## Key Features

- **Public marketing & booking site** — yacht search, destination browsing, featured yachts, sustainability messaging, testimonials, and a contact/inquiry flow.
- **End-to-end yacht booking & Stripe payments** — date/capacity-aware booking requests, redirect-based Stripe Checkout for the deposit and remaining balance, and a `/my-bookings` page where customers track charter status and payment history in one place.
- **Real-time support chat (Socket.IO)** — a floating chat widget on the public site for customers, and a live multi-conversation inbox in the staff dashboard, with typing indicators, read receipts, unread badges, and online presence — all over a persistent WebSocket connection authenticated off the existing session cookie.
- **Full CMS/admin dashboard** — role-based staff access to manage hero content, yachts/services, destinations, blog (with categories), gallery and video gallery, testimonials, FAQs (Q&A), employees, bookings, and payments — no code changes required to update the live site.
- **Authentication & accounts** — email/OTP-based signup and login, JWT session handling (HTTP-only cookies), protected dashboard routes, and self-service account/profile settings for both customers and staff.
- **Role & permission management** — configurable staff roles for dashboard access control, enforced consistently across REST calls and the chat gateway.
- **Document generation** — client-side PDF export (e.g. prescriptions) via `html2canvas` + `jspdf`, including tokenized public share links.
- **Optimized media delivery** — Next.js `Image` component with remote patterns configured for Cloudinary and other CDNs.

---

## Booking, Payments & Real-Time Chat

**Booking & Stripe Checkout**
1. A guest submits a booking request for a yacht and date range from the public site; the API rejects overlapping or over-capacity requests before any payment is attempted.
2. The client calls the payments API to open a **Stripe Checkout Session** for the 30% deposit and redirects the browser to Stripe — no card data is ever handled directly by this app.
3. Stripe redirects back to `/booking/confirmation` or `/booking/cancelled` depending on the outcome; the booking's real status is only ever set server-side via a signature-verified Stripe webhook, not by the redirect itself.
4. `/my-bookings` (customer) and `dashboard/bookings` + `dashboard/payments` (staff) read the same booking/payment records, so status is always consistent across both surfaces.
5. Once the deposit clears, the customer can pay the remaining balance through the same Checkout flow.

**Real-Time Chat**
- `useChatSocket` (`src/hooks/useChatSocket.ts`) owns a single `socket.io-client` connection to the backend's `/chat` namespace, authenticated via the existing HTTP-only session cookie (`withCredentials: true`) — no extra login step for chat.
- **Customers** get one persistent thread, surfaced through the floating `MessageWidget` on the public site. **Staff** get a live inbox (`dashboard/support-chat`) of every open conversation, gated by the same role/permission system used elsewhere in the dashboard.
- The hook merges REST-fetched message history (for reload/reconnect) with live socket events (`message:new`, `typing`, `conversation:read`, `conversation:updated`) so the UI never shows stale or duplicate messages, and tracks per-thread unread counts locally.

---

## Getting Started

### Prerequisites
- Node.js 18.18+ (recommended: latest LTS)
- npm (project is committed with `package-lock.json`)
- A running instance of the backend API

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_API_URL=https://your-api-host/api
```

The Socket.IO client derives its connection origin from this same variable (stripping the `/api/v1` suffix), so no separate chat/socket URL needs to be configured.

### Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public site, and `/dashboard` for the CMS (requires authentication).

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## Deployment

The app builds as a standard Next.js application and deploys cleanly to [Vercel](https://vercel.com/) or any Node-compatible host. Ensure `NEXT_PUBLIC_API_URL` and any additional remote image hostnames (see `next.config.ts` → `images.remotePatterns`) are configured per environment.

---

## Author

Built and maintained by **Zamirul Kabir** — frontend engineer specializing in Next.js/React platforms with integrated CMS tooling for non-technical stakeholders.
