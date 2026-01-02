# 🚀 BuildEstate Deployment Guide

This document provides step-by-step instructions to deploy the BuildEstate Real Estate Platform to production.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] **MongoDB Atlas** account with a cluster ready
- [ ] **ImageKit** account for image storage
- [ ] **Brevo (SendinBlue)** account for email notifications
- [ ] **Vercel** account (for frontend & admin panel)
- [ ] **Render** account (for backend API)

---

## 🗄️ Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with a secure password
4. Whitelist IP addresses (use `0.0.0.0/0` for all IPs in production)
5. Get your connection string and save it

**Connection String Format:**
```
mongodb+srv://<username>:<password>@cluster.mongodb.net/buildestate?retryWrites=true&w=majority
```

---

## 🖼️ Step 2: Set Up ImageKit

1. Go to [ImageKit.io](https://imagekit.io/) and create a free account
2. Navigate to **Dashboard > Developer Options**
3. Copy these values:
   - **Public Key**
   - **Private Key**
   - **URL Endpoint**

---

## 📧 Step 3: Set Up Email Service (Brevo)

1. Go to [Brevo](https://www.brevo.com/) and create a free account
2. Navigate to **SMTP & API > SMTP**
3. Generate SMTP credentials
4. Copy:
   - **SMTP Server**: smtp-relay.brevo.com
   - **Port**: 587
   - **Login** (SMTP_USER)
   - **Password** (SMTP_PASS)

---

## ⚙️ Step 4: Deploy Backend to Render

### 4.1 Prepare Backend

1. Navigate to the backend folder
2. Copy `.env.production.example` to `.env.local`
3. Fill in all required values

### 4.2 Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New > Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `buildestate-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   
5. Add Environment Variables:
   | Variable | Value |
   |----------|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `MONGO_URI` | Your MongoDB connection string |
   | `JWT_SECRET` | Your secure JWT secret (32+ chars) |
   | `SMTP_USER` | Your Brevo SMTP login |
   | `SMTP_PASS` | Your Brevo SMTP password |
   | `EMAIL` | Your notification email |
   | `ADMIN_EMAIL` | Admin login email |
   | `ADMIN_PASSWORD` | Admin login password |
   | `WEBSITE_URL` | Your frontend URL (add after frontend deploy) |
   | `IMAGEKIT_PUBLIC_KEY` | Your ImageKit public key |
   | `IMAGEKIT_PRIVATE_KEY` | Your ImageKit private key |
   | `IMAGEKIT_URL_ENDPOINT` | Your ImageKit URL endpoint |

6. Click **Create Web Service**
7. Wait for deployment to complete
8. Copy the deployed URL (e.g., `https://buildestate-backend.onrender.com`)

---

## 🌐 Step 5: Deploy Frontend to Vercel

### 5.1 Prepare Frontend

1. Open `frontend/.env.production`
2. Update `VITE_API_BASE_URL` with your Render backend URL:
   ```
   VITE_API_BASE_URL=https://buildestate-backend.onrender.com
   ```

### 5.2 Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New > Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   
5. Add Environment Variable:
   | Variable | Value |
   |----------|-------|
   | `VITE_API_BASE_URL` | Your Render backend URL |

6. Click **Deploy**
7. Copy the deployed URL (e.g., `https://buildestate.vercel.app`)

---

## 👨‍💼 Step 6: Deploy Admin Panel to Vercel

### 6.1 Prepare Admin

1. Open `admin/.env.production`
2. Update `VITE_BACKEND_URL` with your Render backend URL:
   ```
   VITE_BACKEND_URL=https://buildestate-backend.onrender.com
   ```

### 6.2 Deploy to Vercel

1. In Vercel Dashboard, click **Add New > Project**
2. Import the same repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `admin`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   
4. Add Environment Variable:
   | Variable | Value |
   |----------|-------|
   | `VITE_BACKEND_URL` | Your Render backend URL |

5. Click **Deploy**
6. Copy the deployed URL (e.g., `https://buildestate-admin.vercel.app`)

---

## 🔄 Step 7: Update Backend CORS

After deploying frontend and admin, update your Render backend:

1. Go to Render Dashboard > Your Backend Service
2. Go to **Environment** tab
3. Update `WEBSITE_URL` with your frontend URL
4. The backend will auto-redeploy

---

## ✅ Post-Deployment Verification

### Test Backend API
```bash
curl https://your-backend-url.onrender.com/status
```
Expected response: `{ "status": "ok" }`

### Test Frontend
1. Open your frontend URL
2. Verify properties load correctly
3. Test user registration/login

### Test Admin Panel
1. Open your admin URL
2. Login with admin credentials
3. Verify dashboard loads correctly

---

## 🔧 Troubleshooting

### Backend not starting
- Check Render logs for errors
- Verify all required environment variables are set
- Ensure MongoDB IP whitelist includes `0.0.0.0/0`

### Frontend shows network errors
- Verify `VITE_API_BASE_URL` is correct
- Check browser console for CORS errors
- Ensure backend is running and accessible

### Images not loading
- Verify ImageKit credentials are correct
- Check ImageKit dashboard for upload errors

---

## 📊 Deployment URLs Summary

After deployment, you should have:

| Service | URL |
|---------|-----|
| **Frontend** | `https://your-app.vercel.app` |
| **Admin Panel** | `https://your-admin.vercel.app` |
| **Backend API** | `https://your-backend.onrender.com` |

---

## 🔒 Security Reminders

1. **Never commit `.env.local` files** - They contain secrets
2. **Use strong passwords** - Especially for admin and JWT secret
3. **Enable 2FA** on all platform accounts
4. **Regularly rotate credentials** - Update API keys periodically
5. **Monitor logs** - Check for suspicious activity

---

## 📞 Support

For deployment issues, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
