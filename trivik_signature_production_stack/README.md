# Trivik Signature Production Stack

This package contains:

- `frontend/` — React + Vite public website and customer dashboard UI.
- `backend/` — Node + Express demo customer portal API.

## Demo login

Email: `john.doe@gmail.com`  
Password: `johndoe`

## Local development

Open two terminals.

### Terminal 1 — backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Terminal 2 — frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open the frontend URL shown by Vite, usually `http://localhost:5173`.

## Production deployment

Deploy frontend separately to Netlify/Vercel.
Deploy backend separately to Render/Railway/Hostinger VPS.
Set `VITE_API_URL` in the frontend to your backend URL.
Set `CORS_ORIGIN` in the backend to your frontend URL.
