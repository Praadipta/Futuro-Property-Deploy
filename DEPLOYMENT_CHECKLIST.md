# 🚀 BuildEstate Deployment Checklist

Use this checklist to track your deployment progress.

---

## Pre-Deployment Setup

### External Services
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB database user created
- [ ] MongoDB IP whitelist configured
- [ ] ImageKit account created
- [ ] ImageKit API keys obtained
- [ ] Brevo (SendinBlue) account created
- [ ] Brevo SMTP credentials obtained

### Platform Accounts
- [ ] Vercel account ready
- [ ] Render account ready
- [ ] GitHub repository connected to both platforms

---

## Environment Configuration

### Backend (.env.production.example → .env.local)
- [ ] `MONGO_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Secure secret (32+ characters)
- [ ] `SMTP_USER` - Brevo SMTP login
- [ ] `SMTP_PASS` - Brevo SMTP password
- [ ] `EMAIL` - Notification sender email
- [ ] `ADMIN_EMAIL` - Admin login email
- [ ] `ADMIN_PASSWORD` - Secure admin password
- [ ] `IMAGEKIT_PUBLIC_KEY` - ImageKit public key
- [ ] `IMAGEKIT_PRIVATE_KEY` - ImageKit private key
- [ ] `IMAGEKIT_URL_ENDPOINT` - ImageKit URL endpoint

### Frontend (.env.production)
- [ ] `VITE_API_BASE_URL` - Production backend URL

### Admin (.env.production)
- [ ] `VITE_BACKEND_URL` - Production backend URL

---

## Deployment Steps

### Backend (Render)
- [ ] Created web service on Render
- [ ] Set root directory to `backend`
- [ ] Added all environment variables
- [ ] Deployment successful
- [ ] Health check passing (`/status` endpoint)
- [ ] Copied backend URL: ______________________

### Frontend (Vercel)
- [ ] Created project on Vercel
- [ ] Set root directory to `frontend`
- [ ] Added `VITE_API_BASE_URL` environment variable
- [ ] Deployment successful
- [ ] Copied frontend URL: ______________________

### Admin Panel (Vercel)
- [ ] Created project on Vercel
- [ ] Set root directory to `admin`
- [ ] Added `VITE_BACKEND_URL` environment variable
- [ ] Deployment successful
- [ ] Copied admin URL: ______________________

---

## Post-Deployment Configuration

- [ ] Updated backend `WEBSITE_URL` with frontend URL
- [ ] Backend redeployed after update

---

## Verification Tests

### Backend API
- [ ] `/status` endpoint returns `{ "status": "ok" }`
- [ ] Can create new user via API
- [ ] Can login via API

### Frontend
- [ ] Homepage loads correctly
- [ ] Properties display correctly
- [ ] User registration works
- [ ] User login works
- [ ] Property search works

### Admin Panel
- [ ] Login page loads
- [ ] Admin login works
- [ ] Dashboard displays data
- [ ] Can manage properties
- [ ] Can view users

---

## Final URLs

| Service | Production URL |
|---------|---------------|
| Frontend | |
| Admin | |
| Backend API | |

---

## Notes

_Add any deployment notes or issues encountered here:_

