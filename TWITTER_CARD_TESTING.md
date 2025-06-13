# Twitter Card Testing & Cache Busting

Twitter caches card data aggressively. Here are methods to test your updated cards:

## 1. Twitter Card Validator (Official Tool)
Visit: https://cards-dev.twitter.com/validator

- Enter your URL: https://jdrhyne.me
- Click "Preview card"
- This should fetch the latest version

## 2. Add Query Parameters
Twitter treats URLs with different parameters as separate entities:

- https://jdrhyne.me?v=1
- https://jdrhyne.me?refresh=1
- https://jdrhyne.me?update=2024

Each variation will be cached separately.

## 3. Use URL Shorteners
Create a new short URL that redirects to your site:
- bit.ly
- tinyurl.com
- rebrand.ly

## 4. Test Different Pages
If the home page is cached, try:
- https://jdrhyne.me/about
- https://jdrhyne.me/blog
- https://jdrhyne.me/contact

## 5. Wait for Cache Expiry
Twitter's cache typically expires within:
- 7 days for most cards
- 24-48 hours for frequently shared URLs

## 6. Force Refresh via Bot
The Twitter Card Validator usually forces a refresh, but sometimes you need to:
1. Clear your browser cache
2. Use incognito/private mode
3. Try a different browser

## Current Card Settings
- Image: /twitter-card.png (1200x600 PNG)
- Type: summary_large_image
- Title: @jdrhyne
- Description: Code, Curiosity, and Continuous Growth—Scaling Ideas Beyond Paper.

## Verification Steps
1. Check that Vercel deployment completed: https://vercel.com/dashboard
2. Verify image loads: https://jdrhyne.me/twitter-card.png
3. Check meta tags: View page source on https://jdrhyne.me
4. Look for:
   - `<meta name="twitter:card" content="summary_large_image" />`
   - `<meta name="twitter:image" content="https://jdrhyne.me/twitter-card.png" />`