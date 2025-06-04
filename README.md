This project implements a **React-based skip hire selection interface** that allows users to browse available skips by size, filter by skip characteristics (e.g., road-allowed or heavy waste), and proceed with a booking. It's part of a larger multi-step booking flow for a skip hire web application.

---

## 🚀 Overview

The `SkipGrid` component fetches skip data from a remote API based on postcode and area, presents the user with a grid of available skip sizes, and enables filtering and selection of the appropriate skip. The selected skip is shown in a fixed panel at the bottom, with options to proceed to booking.

---

## 🧱 Tech Stack

- **React (with Next.js App Directory structure)**  
- **TailwindCSS** for styling  
- **Fetch API** for server communication  
- **Optional: Next.js Dynamic Routes** for multi-step navigation

---

## 🧩 Features

| Feature                      | Description                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| ✅ Skip Data Fetching        | Loads skips by postcode/area via `fetch()`                                  |
| ✅ VAT Calculation           | Computes final prices by adding VAT to base price                          |
| ✅ Loading Indicator         | Displays spinner and message while data is loading                         |
| ✅ Filter Tabs               | Users can filter skips by "All", "Road Allowed", or "Heavy Waste"          |
| ✅ Selection UI              | Visually highlights selected skip and disables unavailable options         |
| ✅ Progress Indicator        | Shows booking progress (6-step horizontal stepper)                         |
| ✅ Sticky Action Panel       | Displays selected skip at bottom of screen with action buttons             |

---

## 🧠 Design Decisions

- **Component-Scoped State:**  
  All state (loading, skips, filters, selection) is locally managed via `useState` and `useEffect`.

- **Data Processing:**  
  On load, skip data is processed to:
  - Add VAT to prices
  - Format final, original, and savings prices
  - Enrich with human-readable skip names

- **Resilience:**  
  Handles loading, fetch errors, and forbidden skips gracefully.

- **Responsive UI:**  
  Uses Tailwind's responsive grid (`xl:grid-cols-3`, `lg:grid-cols-2`) and mobile-friendly layout.

---

## 📦 Data Model

Each skip fetched from the API is processed into the following structure:

```ts
{
  id: string,
  size: number,
  hire_period_days: number,
  allowed_on_road: boolean,
  allows_heavy_waste: boolean,
  forbidden: boolean,
  price: number,           // Final price with VAT
  originalPrice: number,   // Marked-up price (e.g., 20% more)
  savings: number,         // Discount shown to user
  name: string             // Human-friendly name, e.g., "8 Yard Skip"
}


<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# grid
>>>>>>> 0baacc0b2cf01114d113783417cff1d11e0e198b
