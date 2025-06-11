# Deployment Guide for jdrhyne.me

## Current Setup
- ✅ GitHub Actions workflow configured for automatic deployment
- ✅ CNAME file added with `jdrhyne.me`
- ✅ Site configuration updated for custom domain
- ✅ All internal links updated for root domain

## Steps to Complete Setup

### 1. Configure DNS Records
At your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare), add these DNS records:

**Option A: Using A Records (Recommended)**
```
Type: A
Host: @
Value: 185.199.108.153
TTL: Automatic

Type: A
Host: @
Value: 185.199.109.153
TTL: Automatic

Type: A
Host: @
Value: 185.199.110.153
TTL: Automatic

Type: A
Host: @
Value: 185.199.111.153
TTL: Automatic

Type: CNAME
Host: www
Value: jdrhyne.github.io
TTL: Automatic
```

**Option B: Using CNAME (if your DNS provider supports CNAME flattening)**
```
Type: CNAME
Host: @
Value: jdrhyne.github.io
TTL: Automatic

Type: CNAME
Host: www
Value: jdrhyne.github.io
TTL: Automatic
```

### 2. Enable GitHub Pages
1. Go to https://github.com/jdrhyne/jdrhyne-me/settings/pages
2. Under "Source", select "GitHub Actions" (should already be selected)
3. Under "Custom domain", enter `jdrhyne.me`
4. Check "Enforce HTTPS" (may take a few minutes to be available)

### 3. Wait for DNS Propagation
- DNS changes can take 1-48 hours to propagate
- You can check status at: https://dnschecker.org/#A/jdrhyne.me

### 4. Verify Deployment
- The GitHub Action will run automatically on push to main branch
- Check deployment status at: https://github.com/jdrhyne/jdrhyne-me/actions
- Once DNS propagates, site will be available at: https://jdrhyne.me

## Alternative Hosting Options

### Vercel (Recommended for Astro)
1. Go to https://vercel.com
2. Sign in with GitHub
3. Import the jdrhyne-me repository
4. Deploy (automatic)
5. Add custom domain in Vercel dashboard

### Netlify
1. Go to https://netlify.com
2. Sign in with GitHub
3. Import the jdrhyne-me repository
4. Deploy (automatic)
5. Add custom domain in Netlify dashboard

### Cloudflare Pages
1. Go to https://pages.cloudflare.com
2. Connect GitHub account
3. Select jdrhyne-me repository
4. Build settings:
   - Build command: `pnpm run build`
   - Build output directory: `dist`
5. Add custom domain

## Email Setup (hello@jdrhyne.me)
To receive emails at hello@jdrhyne.me, you'll need:
- Email hosting service (e.g., Google Workspace, Zoho Mail, FastMail)
- MX records configured at your DNS provider
- Or use email forwarding service (e.g., ImprovMX, ForwardEmail)

## Monitoring
- GitHub Actions: https://github.com/jdrhyne/jdrhyne-me/actions
- Uptime monitoring: Consider adding UptimeRobot or similar
- Analytics: Consider adding Plausible, Fathom, or Google Analytics