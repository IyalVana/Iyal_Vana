# IYAL VANA – website

A small, fast storefront for Iyal Vana's handcrafted DIY figurines.
Customers browse the figurines with a 3D scroll experience, add them to a
cart, and place the order through WhatsApp (no payment gateway needed).

* **Pure HTML / CSS / JavaScript** – no build step, no server, works on any free static host.
* **One file to edit** for products, prices, pictures and contact details: `data/products.js`.

---

## 1. Updating products, prices and pictures

Open **`data/products.js`** in any text editor (Notepad, VS Code, GitHub's web editor).

```js
{
  id: "butterfly",                        // unique, letters and dashes only
  name: "Butterfly",                      // shown on the site
  category: "Garden friends",
  tagline: "Spread your wings in any colour you like",
  price: 149,                             // selling price
  mrp: 199,                               // strike-through price (0 = hide)
  badge: "Best Seller",                   // small label ("" = none)
  image: "assets/products/butterfly.png", // picture file
  highlights: ["Hand-cast, smooth finish", "Approx. 9 cm wide"],
  tip: "Try two-tone wings with dots and stripes"
},
```

* **Change a price** – edit the `price` number. Save. Done.
* **Add a product** – copy one `{ ... },` block, paste it after the last one, change the values,
  and put the picture in `assets/products/`.
* **Remove a product** – delete its block, or add `hidden: true,` inside it.
* **Reorder** – move the blocks around; the site shows them in the same order.
* **Pictures** – a PNG with a transparent background looks best in the 3D stage
  (free tool: https://www.remove.bg). A normal JPG photo also works.
  Keep pictures roughly square and under ~500 KB.

The top of the same file has the **store settings**: WhatsApp number, phone,
Instagram link, tagline, logo file, hero / about pictures.

```js
whatsapp: "919566987977",   // country code + number, digits only
phone: "+91 95669 87977",   // what visitors see
```

> After editing, just reload the website. If it is hosted on GitHub Pages,
> commit the change and the site updates in about a minute.

## 2. Changing the logo

Replace `assets/img/logo.svg` with your own logo (SVG or PNG), or change the
`logo:` line in `data/products.js` to point to your file. A square image works best.

## 3. How ordering works

1. Customer taps **Add to cart** on any figurine (or **Order now** for a single item).
2. The cart drawer shows the items, quantity and total, plus optional name / address fields.
3. **Place order on WhatsApp** opens WhatsApp (app or web) with a ready-made message
   to the number in `data/products.js`, e.g.

   ```
   🌸 New order – IYAL VANA
   1. Butterfly
       ₹149 × 2 = ₹298
   2. Dinosaur
       ₹199 × 1 = ₹199
   Total: ₹497
   👤 Name: Priya
   📍 Address / note: Anna Nagar, Chennai 600040
   ```
4. You reply on WhatsApp to confirm payment and delivery.

The cart is saved in the visitor's browser, so it survives page reloads.

## 4. Running it locally

Just open `index.html` in a browser – no server needed.
(For the smoothest experience use a tiny local server, e.g. `python3 -m http.server`.)

## 5. Hosting for free (GitHub Pages)

1. Push this repository to GitHub.
2. In the repo go to **Settings → Pages**.
3. Under *Build and deployment* choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. After ~1 minute the site is live at `https://<username>.github.io/iyal_vana/`.

Every later change pushed to `main` is published automatically. A custom
domain (e.g. `iyalvana.in`) can be added on the same settings page.

Other free options that work with the same files: Netlify Drop, Vercel, Cloudflare Pages.

## 6. Project layout

```
index.html            page structure
css/style.css         all styling (colours live in :root at the top)
js/app.js             cart, WhatsApp ordering, 3D scroll animations
data/products.js      ← products, prices, store details (edit this)
assets/products/      product pictures
assets/img/           logo, brush / palette graphics, favicon
```

## 7. Credits

Animation: [GSAP + ScrollTrigger](https://gsap.com) (loaded from a CDN).
Fonts: Playfair Display & Poppins (Google Fonts).
Current product pictures are AI-generated placeholders – replace them with real photos when ready.
