# Raza Furniture

A full-stack website for Raza Furniture, a custom furniture and home decor business established in 1997. Built as a complete rebrand of the business's online presence — customers can browse the catalog with interactive 3D models, request custom pieces, book repair services, and reach the shop directly on WhatsApp.

**Live site:** [razafurniture.com](https://razafurniture.com)

## Features

- Interactive 3D product viewer — every product can be rotated and explored in 360°
- Product catalog organized by category (Kitchen, Bedroom, Living Area, Others)
- Service & repair booking system with status tracking
- "Our Work" gallery showcasing completed projects
- Admin dashboard for managing products, inquiries, and bookings — no code required
- WhatsApp integration for instant customer replies
- Fully responsive, mobile-first design

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Three.js (via react-three-fiber)
**Backend:** Node.js, Express
**Database:** MongoDB
**Hosting:** Vercel (frontend), Render (backend)

## Project Structure

\`\`\`text
raza-furniture/
├── client/     React frontend
└── server/     Express API + MongoDB models
\`\`\`

## Local Development

**Backend:**
```bash
cd server
npm install
npm run dev
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

---

Built by [Misbah Saifi](https://github.com/misbah216).