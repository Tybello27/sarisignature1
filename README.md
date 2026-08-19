# Sarisignature — Website Concept

A premium, responsive website concept for Sarisignature in Victoria Island, Lagos and Wuse 2, Abuja.

## Verified information included

- Business name: Sarisignature
- Phone: 08027970777
- Phone: 07018799879
- Verified WhatsApp: +234 806 666 0002
- Lagos: 269A Patience Coker Street, Victoria Island, Lagos 106104, Lagos, Nigeria
- Abuja: The Ruby Centre, No. 762 Aminu Kanu Crescent, Wuse 2, Abuja, Nigeria

Official opening hours are displayed and enforced by the booking-hours rule: Monday–Saturday, 10:00 AM–7:00 PM; Sunday, 12:00 PM–7:00 PM. Branch directions links remain omitted because they were not provided. No embedded or static map is used.

## Included

- Official uploaded Sarisignature logo in the navigation, mobile header, favicon and footer
- Luxury black, gold and warm-cream visual system preserved from the original concept
- Responsive desktop, tablet and mobile layouts
- Home, About, Services, Shop, Our Work, Gallery, Testimonials, Booking and Contact sections
- All original supplied Sarisignature imagery plus the five newly supplied production image assets
- Accessible gallery lightbox
- Full, unedited customer reviews supplied by the client
- Five-step, two-branch appointment flow
- Verified WhatsApp actions
- n8n-ready booking payload
- Local-business structured metadata for both branches

## Media note

No video files were attached to the update request. The user selected “Proceed without videos”, so the production site contains no broken or temporary video references. Video assets can be added later when supplied.

## Editing services and the booking connection

Open `script.js` and update the `SITE_CONFIG` block at the top. Service names, descriptions, prices, verified durations, booking-hours rules and both optional n8n webhook endpoints are managed there.

Because verified service durations have not been supplied, selectable times are intentionally blocked. This prevents the interface from offering a start time that might finish after 7:00 PM. Once a verified `durationMinutes` value is added to a service, the frontend can calculate hours-based request times. These are clearly labelled as preferred request times—not confirmed availability. Alternatively, a configured `n8nAvailabilityWebhook` can return explicitly confirmed slots.

The optional availability endpoint is expected to return `{ "slots": [...] }`. A slot is displayed only when it includes `available: true`, a valid `time` such as `"10:00 AM"` or numeric `startMinutes`, and a positive verified service or slot duration. The frontend rejects any returned slot that starts before opening or finishes after 7:00 PM.

## n8n booking payload

When `SITE_CONFIG.integrations.n8nBookingWebhook` is set, the booking form sends a `POST` request with JSON containing:

- Selected branch ID, city, area and verified address
- Selected service ID, name and verified duration when configured
- Preferred date and time
- Slot source and the opening-hours rule applied to the selected date
- Customer name, phone and email
- Optional notes
- Consent status
- Submission timestamp

The interface only displays a sent confirmation when the configured webhook returns an HTTP success status. Without a webhook, it explicitly says the request was prepared but not sent.

## Files

- `index.html` — semantic page structure and SEO metadata
- `styles.css` — complete visual and responsive system
- `script.js` — configuration, interactions and integration-ready booking flow
- `assets/images/` — production-safe supplied Sarisignature assets
