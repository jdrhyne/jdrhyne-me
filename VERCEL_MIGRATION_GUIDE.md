# Complete Vercel Migration Guide

## Why Switch to Vercel?
- ⚡ **Faster deployments** (usually under 1 minute)
- 🌍 **Better performance** (global edge network)
- 👀 **Preview deployments** for every PR
- 📊 **Analytics** (with free tier)
- 🚀 **Zero-config** for Astro projects
- 🔧 **Better DX** with instant rollbacks

## Migration Steps Overview
1. Create Vercel account and import repository
2. Deploy to Vercel
3. Update DNS records from GitHub Pages to Vercel
4. Remove GitHub Pages configuration
5. Delete GitHub Actions workflow

---

## Step 1: Create Vercel Account

1. Go to https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account
4. You'll be taken to the Vercel dashboard

---

## Step 2: Import Your Repository

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **`jdrhyne-me`** and click **"Import"**

### Configuration Screen:
You'll see a configuration page. Here's what to set:

**Project Name**: `jdrhyne-me` (or leave default)

**Framework Preset**: Vercel should auto-detect "Astro" ✓

**Root Directory**: `.` (leave as is)

**Build and Output Settings**:
- **Build Command**: `pnpm run build` (or `npm run build`)
- **Output Directory**: `dist`
- **Install Command**: `pnpm install` (or `npm install`)

**Environment Variables**: None needed for now

4. Click **"Deploy"**

---

## Step 3: Wait for Initial Deployment

- Vercel will clone your repo
- Install dependencies
- Build your site
- Deploy it (usually takes 30-60 seconds)
- You'll get a preview URL like: `jdrhyne-me-xxx.vercel.app`

**✅ Check your site at the preview URL to make sure it works!**

---

## Step 4: Add Custom Domain in Vercel

1. After deployment succeeds, go to your project dashboard
2. Click **"Settings"** tab
3. Click **"Domains"** in the left sidebar
4. Click **"Add"**
5. Enter: `jdrhyne.me`
6. Click **"Add"**

### Vercel will show you two options:
- **Option A**: Use Vercel DNS (requires changing nameservers)
- **Option B**: Add records to existing DNS (recommended) ✓

Choose **Option B** - we'll update Squarespace DNS

---

## Step 5: Update DNS Records in Squarespace

Go back to Squarespace DNS settings for jdrhyne.me

### Delete These Records:
1. **Delete all 4 A records** pointing to GitHub Pages IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

2. **Delete the CNAME** for www pointing to `jdrhyne.github.io`

### Add New Records for Vercel:

**For root domain (@):**
1. Click **Add Record**
2. Type: `A`
3. Host: `@`
4. Value: `76.76.21.21`
5. TTL: `1 hour`

**For www:**
1. Click **Add Record**
2. Type: `CNAME`
3. Host: `www`
4. Value: `cname.vercel-dns.com`
5. TTL: `1 hour`

### Keep These Records (don't delete):
- ✓ MX records (for email)
- ✓ TXT record (for email SPF)

---

## Step 6: Configure Domain in Vercel

1. Back in Vercel, after adding DNS records
2. Click **"Refresh"** to verify DNS
3. Once verified, Vercel will automatically:
   - Provision SSL certificate
   - Set up redirects (www → root)
   - Configure edge network

---

## Step 7: Update Project Configuration

### Remove GitHub Pages Config:

1. **Delete CNAME file**:
```bash
rm public/CNAME
git add -A
git commit -m "Remove GitHub Pages CNAME file"
git push
```

2. **Update astro.config.mjs** (already correct for Vercel):
```js
export default defineConfig({
  site: 'https://jdrhyne.me',
  // No base path needed
});
```

3. **Delete GitHub Actions workflow**:
```bash
rm -rf .github/workflows/deploy.yml
git add -A
git commit -m "Remove GitHub Actions workflow - using Vercel now"
git push
```

---

## Step 8: Configure Vercel Settings (Optional)

In Vercel project settings, you can:

1. **Set up redirects** (Settings → Redirects)
   - Redirect www to root (automatic)

2. **Environment variables** (Settings → Environment Variables)
   - Add any API keys if needed later

3. **Custom headers** (vercel.json)
   - Security headers, caching, etc.

---

## Step 9: Disable GitHub Pages

1. Go to https://github.com/jdrhyne/jdrhyne-me/settings/pages
2. Under "Source", select **"None"**
3. Click **"Save"**

---

## Final DNS Records

Your Squarespace DNS should now have:

```
A     @    76.76.21.21         1 hour     (Vercel)
CNAME www  cname.vercel-dns.com 1 hour    (Vercel)
MX    @    mx1.improvmx.com    10  1 hour (Email)
MX    @    mx2.improvmx.com    20  1 hour (Email)
TXT   @    v=spf1 include:spf.improvmx.com ~all  1 hour (Email)
```

---

## Verification Checklist

- [ ] Vercel deployment successful
- [ ] Custom domain added in Vercel
- [ ] DNS records updated in Squarespace
- [ ] Old GitHub Pages A records deleted
- [ ] CNAME file removed from repo
- [ ] GitHub Actions workflow deleted
- [ ] GitHub Pages disabled
- [ ] Site loads at https://jdrhyne.me
- [ ] Email still works at hello@jdrhyne.me

---

## Benefits You Now Have

1. **Instant deployments** - Push to GitHub, live in ~30 seconds
2. **Preview deployments** - Every PR gets a unique URL
3. **Rollback** - One-click rollback to any previous deployment
4. **Analytics** - Basic analytics in free tier
5. **Performance** - Global CDN with edge functions
6. **Free SSL** - Automatic HTTPS with Let's Encrypt

---

## Troubleshooting

**Site not loading?**
- Check DNS propagation: https://dnschecker.org/#A/jdrhyne.me
- Should show: 76.76.21.21

**SSL certificate error?**
- Wait 10 minutes for Vercel to provision certificate
- Check domain verification in Vercel dashboard

**Email not working?**
- Don't delete MX records!
- Email should continue working unchanged

---

## Need Help?

Let me know at which step you are and I'll help troubleshoot!