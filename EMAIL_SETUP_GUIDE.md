# Email Setup Guide for hello@jdrhyne.me

## Option 1: ImprovMX (FREE - Recommended)

ImprovMX offers free email forwarding for custom domains.

### Setup Steps:

1. **Create ImprovMX Account**
   - Go to https://improvmx.com
   - Sign up for free account
   - Add domain: `jdrhyne.me`

2. **Add MX Records at Your DNS Provider**
   ```
   Type: MX
   Host: @
   Priority: 10
   Value: mx1.improvmx.com
   
   Type: MX
   Host: @
   Priority: 20
   Value: mx2.improvmx.com
   ```

3. **Add SPF Record (for better deliverability)**
   ```
   Type: TXT
   Host: @
   Value: v=spf1 include:spf.improvmx.com ~all
   ```

4. **Set Up Forwarding**
   - In ImprovMX dashboard, add alias:
   - Alias: `hello` → Forward to: `your-personal-email@gmail.com`
   - You can add unlimited aliases (info@, support@, etc.)

5. **Send Emails FROM hello@jdrhyne.me**
   - ImprovMX free plan includes SMTP access
   - Configure in Gmail/Outlook as "Send mail as"

### Free Plan Includes:
- ✅ Unlimited forwards
- ✅ 25 emails/day sending
- ✅ SMTP access
- ✅ No credit card required

---

## Option 2: Cloudflare Email Routing (FREE)

If your domain is on Cloudflare (or you can transfer it there):

### Setup Steps:

1. **Add Domain to Cloudflare**
   - Sign up at https://cloudflare.com
   - Add domain and update nameservers

2. **Enable Email Routing**
   - Go to Email > Email Routing
   - Enable email routing
   - Cloudflare adds MX records automatically

3. **Create Routing Rules**
   - Add rule: `hello@jdrhyne.me` → `your-personal-email@gmail.com`
   - Can use wildcards: `*@jdrhyne.me`

### Cloudflare Benefits:
- ✅ Completely free
- ✅ No sending limits
- ✅ Catch-all addresses
- ✅ Also get CDN, security features

---

## Option 3: ForwardEmail (FREE/Paid)

Open source email forwarding service.

### Setup Steps:

1. **No Account Needed for Basic Setup**
   
2. **Add DNS Records**
   ```
   Type: MX
   Host: @
   Priority: 10
   Value: mx1.forwardemail.net
   
   Type: MX
   Host: @
   Priority: 20
   Value: mx2.forwardemail.net
   
   Type: TXT
   Host: @
   Value: forward-email=hello:your-personal-email@gmail.com
   ```

3. **Verify Domain**
   ```
   Type: TXT
   Host: @
   Value: forward-email-site-verification=XXXXXXXXXX
   ```

### Free Features:
- ✅ Basic forwarding
- ✅ No account required
- ✅ Open source

---

## Option 4: Google Workspace (PAID - $6/month)

Professional email with Gmail interface.

### Benefits:
- ✅ Full Gmail features
- ✅ 30GB storage
- ✅ Calendar, Drive, Docs
- ✅ Professional appearance
- ✅ Best deliverability

### Setup:
1. Sign up at https://workspace.google.com
2. Verify domain ownership
3. Add Google's MX records
4. Create hello@jdrhyne.me account

---

## Option 5: Zoho Mail (FREE for 1 user)

Free professional email hosting.

### Free Plan:
- ✅ 5GB storage
- ✅ Web interface
- ✅ Mobile apps
- ✅ IMAP/POP support

### Setup:
1. Sign up at https://www.zoho.com/mail/
2. Add domain
3. Verify ownership
4. Add Zoho's MX records

---

## Testing Your Email

After setup, test your email:

1. **Send Test Email**
   ```bash
   echo "Test email" | mail -s "Test Subject" hello@jdrhyne.me
   ```

2. **Check MX Records**
   ```bash
   dig MX jdrhyne.me
   ```

3. **Online Tools**
   - https://mxtoolbox.com/
   - https://mail-tester.com/

---

## Recommended Setup

For your use case, I recommend:

1. **ImprovMX** for email forwarding (free, reliable, includes SMTP)
2. **Keep GitHub Pages** for hosting (already working, free, simple)

This gives you:
- ✅ Professional email address
- ✅ Free hosting
- ✅ Automatic deployments
- ✅ Minimal complexity

If you need more email features later, upgrade to Google Workspace.