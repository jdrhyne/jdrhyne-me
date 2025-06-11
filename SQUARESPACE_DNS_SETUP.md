# Squarespace DNS Setup Guide for jdrhyne.me

## Step-by-Step Instructions

### 1. Log into Squarespace Domains
1. Go to https://domains.squarespace.com
2. Sign in with your account
3. Click on **jdrhyne.me** from your domains list

### 2. Access DNS Settings
1. Once you're viewing the domain, look for **DNS** in the left sidebar menu
2. Click on **DNS Settings** or **Manage DNS Records**

### 3. Remove Conflicting Records (if any)
Before adding new records, check if there are existing A records for @ (root domain):
- If you see any A records for @ that are NOT the GitHub Pages IPs, delete them
- Keep any existing MX, TXT, or other records unless they conflict

### 4. Add GitHub Pages A Records
Click **Add Record** and create FOUR A records:

**First A Record:**
- Type: `A`
- Host: `@` (or leave blank - Squarespace knows @ means root)
- Value: `185.199.108.153`
- TTL: `1 hour` (or default)

**Second A Record:**
- Type: `A`
- Host: `@`
- Value: `185.199.109.153`
- TTL: `1 hour`

**Third A Record:**
- Type: `A`
- Host: `@`
- Value: `185.199.110.153`
- TTL: `1 hour`

**Fourth A Record:**
- Type: `A`
- Host: `@`
- Value: `185.199.111.153`
- TTL: `1 hour`

### 5. Add WWW CNAME Record
Click **Add Record**:
- Type: `CNAME`
- Host: `www`
- Value: `jdrhyne.github.io`
- TTL: `1 hour`

### 6. Add Email MX Records (for ImprovMX)
**First MX Record:**
- Type: `MX`
- Host: `@`
- Mail Server: `mx1.improvmx.com`
- Priority: `10`
- TTL: `1 hour`

**Second MX Record:**
- Type: `MX`
- Host: `@`
- Mail Server: `mx2.improvmx.com`
- Priority: `20`
- TTL: `1 hour`

### 7. Add SPF Record for Email
Click **Add Record**:
- Type: `TXT`
- Host: `@`
- Value: `v=spf1 include:spf.improvmx.com ~all`
- TTL: `1 hour`

### 8. Save All Changes
- Review all records
- Click **Save** or **Save Records**

## Your DNS Records Should Look Like:

```
A     @    185.199.108.153    1 hour
A     @    185.199.109.153    1 hour
A     @    185.199.110.153    1 hour
A     @    185.199.111.153    1 hour
CNAME www  jdrhyne.github.io  1 hour
MX    @    mx1.improvmx.com   10    1 hour
MX    @    mx2.improvmx.com   20    1 hour
TXT   @    v=spf1 include:spf.improvmx.com ~all    1 hour
```

## Next Steps:

### 1. Set up ImprovMX (5 minutes)
1. Go to https://improvmx.com
2. Sign up for free account
3. Add domain: `jdrhyne.me`
4. Create email forward: `hello` → `your-personal-email@gmail.com`

### 2. Configure GitHub Pages (2 minutes)
1. Go to https://github.com/jdrhyne/jdrhyne-me/settings/pages
2. Under "Custom domain", enter: `jdrhyne.me`
3. Click Save
4. Wait for "Enforce HTTPS" checkbox to appear (few minutes)
5. Check "Enforce HTTPS"

### 3. Wait for DNS Propagation
- Changes typically take 1-4 hours
- Maximum 48 hours (rare)
- Check status: https://dnschecker.org/#A/jdrhyne.me

## Troubleshooting:

**If Squarespace shows an error:**
- "Host already exists" - Delete the existing record first
- "Invalid value" - Make sure no extra spaces in IP addresses
- "Proxy/Forwarding enabled" - Disable any domain forwarding first

**If site doesn't load after waiting:**
1. Clear browser cache
2. Try https://jdrhyne.me (not http)
3. Check GitHub Pages settings
4. Verify DNS at: https://mxtoolbox.com/DNSLookup.aspx

## Common Squarespace Quirks:
- Squarespace might show @ as "root" or "apex"
- Some records might take a minute to appear after adding
- If you can't add multiple A records with same host, contact support

Let me know once you've added the records and I'll help verify everything!