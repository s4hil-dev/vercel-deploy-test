# MERN Deployment to Vercel (What Worked + What Not To Do)

This guide is based on the exact setup that worked for this project:
- `client` (Vite React) on Vercel
- `server` (Express + MongoDB) on Vercel Serverless

## 1) Project Structure

```text
rbac-basic-project-1/
  client/
  server/
```

Deploy as **2 separate Vercel projects** from the same repo:
1. Backend project root: `server`
2. Frontend project root: `client`

## 2) Backend Code Requirements

### `server/config/db.js`
- Must use `process.env.MONGO_URI`
- Must not use hardcoded localhost Mongo URI
- Add timeout + connection-ready check

### `server/controllers/authController.js`
- JWT must use `process.env.JWT_SECRET`
- Cookie must be production-safe:
  - `httpOnly: true`
  - `secure: process.env.NODE_ENV === "production"`
  - `sameSite: "none"` in production

### `server/middleware/auth.js`
- JWT verify must use `process.env.JWT_SECRET`

### `server/app.js`
- Enable proxy trust: `app.set("trust proxy", 1)`
- Use CORS with:
  - `origin: process.env.CLIENT_URL`
  - `credentials: true`

### `server/api/index.js` (Vercel function entry)
- Connect DB before handling request
- Reuse DB connect promise
- Export handler function

## 3) Backend `vercel.json` (Important)

Create `server/vercel.json`:

```json
{
  "version": 2,
  "builds": [
    { "src": "api/index.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/api/index.js" }
  ]
}
```

Important: `dest` must be `"/api/index.js"` (with leading slash).

## 4) Backend Vercel Deployment Steps

1. Push backend changes to GitHub.
2. Vercel -> New Project -> import repo.
3. Set **Root Directory** = `server`.
4. Add Environment Variables in backend project:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLIENT_URL=https://<your-frontend>.vercel.app`
   - `NODE_ENV=production`
5. Deploy.
6. Open backend URL:
   - `https://<backend>.vercel.app/`
   - Should return API response (not infinite loading).

## 5) Frontend Vercel Deployment Steps

1. Vercel -> New Project -> import same repo.
2. Set **Root Directory** = `client`.
3. Add frontend env:
   - `VITE_API_URL=https://<your-backend>.vercel.app`
4. Deploy.

## 6) Final Wiring (Very Important)

After frontend deploy is done:
1. Copy frontend production URL.
2. Update backend env `CLIENT_URL` to exact frontend URL.
3. Redeploy backend.
4. Redeploy frontend once.

Then test:
1. Register/Login
2. Protected route (`/auth/me`)
3. Logout

## 7) What Not To Do (Common Failures)

1. Do not use hardcoded Mongo URI like `mongodb://127.0.0.1:27017/...` on Vercel.
2. Do not hardcode JWT secret as `"secret"`.
3. Do not keep cookie config as `secure: false` in production.
4. Do not set wrong CORS origin; `CLIENT_URL` must exactly match frontend domain.
5. Do not forget `withCredentials: true` in frontend axios.
6. Do not use invalid runtime config in `vercel.json`.
7. Do not set backend/frontend root directory incorrectly in Vercel.
8. Do not expect `app.listen(...)` logs in serverless mode.
9. Do not ignore missing dependency errors in logs (example: `ERR_MODULE_NOT_FOUND`).
10. Do not leave typo config files (like `verel.json`) in deploy path.

## 8) Quick Troubleshooting

1. If backend hangs/buffers:
   - Check Vercel Function logs
   - Check `MONGO_URI` and Atlas network access
2. If auth fails in browser:
   - Check `CLIENT_URL`
   - Check cookie flags (`sameSite`, `secure`)
   - Check frontend `VITE_API_URL`
3. If 500 on all routes:
   - Recheck `server/vercel.json`
   - Recheck missing packages in `server/package.json`

---

Use this as a template for similar MERN apps with split `client`/`server` folders.
