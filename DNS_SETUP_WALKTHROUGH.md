# DNS Setup Walkthrough for jdrhyne.me

## Step 1: Identify Your Domain Registrar

First, I need to know where you registered jdrhyne.me. Common registrars include:
- GoDaddy
- Namecheap
- Google Domains (now Squarespace Domains)
- Cloudflare
- Porkbun
- Name.com
- Domain.com

**Where did you register jdrhyne.me?**

---

## Step 2: Access DNS Management

Once you tell me your registrar, I'll guide you to the DNS management page. Generally:

### Common Paths to DNS Settings:
- **GoDaddy**: My Products → Domains → Manage → DNS
- **Namecheap**: Domain List → Manage → Advanced DNS
- **Cloudflare**: Select domain → DNS
- **Porkbun**: Domain Management → DNS
- **Squarespace**: Domains → Select domain → DNS Settings

---

## Step 3: Records You'll Need to Add

### For Website (GitHub Pages):
| Type | Name/Host | Value/Points to | TTL |
|------|-----------|-----------------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| CNAME | www | jdrhyne.github.io | 3600 |

### For Email (ImprovMX):
| Type | Name/Host | Priority | Value/Points to | TTL |
|------|-----------|----------|-----------------|-----|
| MX | @ | 10 | mx1.improvmx.com | 3600 |
| MX | @ | 20 | mx2.improvmx.com | 3600 |
| TXT | @ | - | v=spf1 include:spf.improvmx.com ~all | 3600 |

---

## Important Notes:

### About the Name/Host Field:
- **@** means the root domain (jdrhyne.me)
- Some registrars want you to leave it blank for root
- Some want the full domain name
- **www** means www.jdrhyne.me

### About TTL:
- TTL = Time To Live (in seconds)
- 3600 = 1 hour (standard)
- Some registrars use "Automatic" or "Default"
- Lower values = faster updates but more DNS queries

---

## What I Need From You:

1. **Which registrar are you using?**
2. **Can you access the DNS management page?**
3. **Do you see any existing records?** (besides default ones)

Once you tell me your registrar, I'll give you exact click-by-click instructions!