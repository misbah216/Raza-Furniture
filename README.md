# Raza Furniture — Full Stack Website

Furniture aur home decor ke liye 3D-animated website. React + Three.js (frontend) aur
Node/Express (backend) se bana hai.

## Kya-kya hai isme

- 🪑 3D hero section + har product ka 360° drag-to-rotate viewer (Three.js / react-three-fiber)
- 🛋️ Product catalog with categories (Sofas, Beds, Dining, Chairs, Home Decor)
- 📝 Contact/inquiry form (customer papa ko WhatsApp/phone/email se contact kar sakte hain)
- 🔐 Admin dashboard — papa khud login karke products add/edit/delete kar sakte hain aur
  customer inquiries dekh sakte hain
- 📱 Fully responsive (mobile, tablet, desktop)

## Folder Structure

```
raza-furniture/
├── client/     → React frontend (Vite + Tailwind + Three.js)
└── server/     → Express backend + JSON database (lowdb)
```

## Local Setup (apne computer par chalane ke liye)

### 1. Backend start karein

```bash
cd server
npm install
cp .env.example .env
```

`.env` file kholkar ye cheezein change karein:
- `JWT_SECRET` — koi bhi lamba random string
- `ADMIN_EMAIL` aur `ADMIN_PASSWORD` — papa ka login (jo admin panel me use hoga)

Phir sample products daalne ke liye:
```bash
npm run seed
```

Server start karein:
```bash
npm run dev
```
Backend `http://localhost:4000` par chalega.

### 2. Frontend start karein (naya terminal window)

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Website `http://localhost:5173` par khulegi.

### 3. Admin panel

`http://localhost:5173/admin/login` par jaake `.env` me diya email/password daalein.
Yahan se products add/edit/delete kar sakte hain aur customer inquiries dekh sakte hain.

## Apna khud ka data daalna

- **Products**: Admin panel se add karein, ya `server/seed.js` edit karke apne asli
  products (naam, price, material, description) daal dein aur `npm run seed` chalayein.
- **Real product photos/3D models**: Abhi 3D preview parametric shapes (chair/sofa/bed/table/
  decor) se ban raha hai — koi image chahiye nahi. Agar aap chahte hain ki asli furniture ka
  photo-realistic 3D model dikhe, to us product ka `.glb` file bana kar
  (Blender ya kisi 3D scanning app se) `FurnitureModel3D.jsx` me use kiya ja sakta hai.
  Ye upgrade hai — abhi ke design se site turant chal jayegi.
- **Contact info**: `client/src/components/Footer.jsx`, `Navbar.jsx` (WhatsApp number) aur
  `client/src/pages/Contact.jsx` me apna asli phone/email/address daal dein.

## Deployment (domain khareedne ke baad)

1. **Domain khareedein** — GoDaddy, Namecheap, ya Hostinger se (jaise `razafurniture.com`
   ya `razafurniture.in`)

2. **Backend deploy karein** — [Render.com](https://render.com) ya [Railway.app](https://railway.app)
   par free/cheap plan available hai:
   - GitHub par code push karein
   - Render/Railway par "New Web Service" banayein, `server` folder ko root set karein
   - Environment variables (`JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLIENT_URL`) daalein
   - Deploy hone ke baad aapko ek URL milega jaise `https://raza-furniture-api.onrender.com`

3. **Frontend deploy karein** — [Vercel.com](https://vercel.com) sabse aasaan hai:
   - GitHub par code push karein (agar nahi kiya to)
   - Vercel par "New Project" → `client` folder select karein
   - Environment variable `VITE_API_URL` me backend ka URL daalein
     (e.g. `https://raza-furniture-api.onrender.com/api`)
   - Deploy karein

4. **Domain connect karein** — Vercel project settings me "Domains" section me jaake apna
   khareeda hua domain add karein. Vercel aapko DNS records dega jo aapko domain provider
   (GoDaddy/Namecheap) ke dashboard me daalne honge. 15-30 minute me live ho jayega.

Agar chahiye to main deployment ke waqt step-by-step help kar sakta hoon jab aap ready ho.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, React Router |
| 3D | Three.js via @react-three/fiber + @react-three/drei |
| Backend | Node.js, Express |
| Database | lowdb (JSON file — koi separate DB server install nahi karna padega) |
| Auth | JWT (admin login) |
