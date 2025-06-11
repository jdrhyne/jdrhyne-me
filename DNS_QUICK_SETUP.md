# Quick DNS Setup for jdrhyne.me

## Complete DNS Configuration

Add these records at your domain registrar:

### For GitHub Pages Hosting:
```
Type: A      | Host: @   | Value: 185.199.108.153
Type: A      | Host: @   | Value: 185.199.109.153
Type: A      | Host: @   | Value: 185.199.110.153
Type: A      | Host: @   | Value: 185.199.111.153
Type: CNAME  | Host: www | Value: jdrhyne.github.io
```

### For Email (ImprovMX):
```
Type: MX     | Host: @   | Priority: 10 | Value: mx1.improvmx.com
Type: MX     | Host: @   | Priority: 20 | Value: mx2.improvmx.com
Type: TXT    | Host: @   | Value: v=spf1 include:spf.improvmx.com ~all
```

## Setup Order:

1. **Add DNS records above** at your registrar
2. **Configure ImprovMX**:
   - Sign up at https://improvmx.com
   - Add domain jdrhyne.me
   - Create forward: hello@ → your-email@gmail.com
3. **Configure GitHub Pages**:
   - Go to repo settings → Pages
   - Add custom domain: jdrhyne.me
   - Wait for HTTPS to enable
4. **Wait 1-24 hours** for DNS propagation

## Verify Everything Works:
- Website: https://jdrhyne.me
- Email: Send test to hello@jdrhyne.me
EOF < /dev/null