/* ============================================================
   IYAL VANA – STORE DATA
   ------------------------------------------------------------
   This is the ONLY file you need to edit to change products,
   prices, pictures, phone number, etc. The website reads this
   file and updates itself automatically.

   HOW TO ADD A PRODUCT
     Copy one { ... } block inside "products", paste it below
     the last one and change the values. Put the picture in
     assets/products/  (PNG with transparent background looks
     best – a normal photo also works) and write its file name
     in "image".

   HOW TO REMOVE A PRODUCT
     Delete its { ... } block, or add   hidden: true   to it.

   HOW TO CHANGE A PRICE
     Change the number in "price". "mrp" is the strike-through
     price (optional – set it to 0 to hide it).

   figurines / colours / brushes are shown as the kit contents.

   Keep the commas between blocks and don't delete the quotes.
   ============================================================ */

window.IYAL_DATA = {

  store: {
    name: "IYAL VANA",
    tagline: "DIY painting kits – ready-to-paint figurines, colours and a brush in every box",
    description: "Every Iyal Vana kit is cast and packed by hand in small batches. Inside you get ready-to-paint white figurines, a set of colours and a paintbrush – everything you need to create, paint and explore.",
    whatsapp: "919566987977",          // country code + number, digits only
    phone: "+91 95669 87977",          // shown on the website
    instagram: "https://www.instagram.com/iyal_vana",
    email: "",                         // optional, leave "" to hide
    address: "Tamil Nadu, India",      // optional
    currency: "₹",
    deliveryNote: "Delivery charges will be confirmed on WhatsApp",
    logo: "assets/img/logo.png",       // replace with your own logo file
    heroImages: [                      // pictures floating on the home banner
      "assets/img/hero/dinosaur.png",
      "assets/img/hero/butterfly.png",
      "assets/img/hero/rocket.png",
      "assets/img/hero/teddy.png",
      "assets/img/hero/bus.png"
    ],
    aboutImage: "assets/products/group-2.jpg"
  },

  products: [
    {
      id: "dinosaur-set",
      name: "Dinosaur Set",
      category: "Painting kit",
      tagline: "Five roaring dinos waiting for their colours",
      price: 249, mrp: 0, badge: "Best Seller",
      figurines: 5, colours: 6, brushes: 1,
      image: "assets/products/dinosaur-set.png",
      tip: "Give every dino its own colour – red, green, blue, orange and purple"
    },
    {
      id: "butterfly-set",
      name: "Butterfly Set",
      category: "Painting kit",
      tagline: "Six butterflies, endless wing patterns",
      price: 199, mrp: 0, badge: "",
      figurines: 6, colours: 6, brushes: 1,
      image: "assets/products/butterfly-set.png",
      tip: "Dots, stripes and two-tone wings look amazing"
    },
    {
      id: "transport-set",
      name: "Transport Set",
      category: "Painting kit",
      tagline: "Bus, car, train and more – paint your fleet",
      price: 249, mrp: 0, badge: "",
      figurines: 6, colours: 6, brushes: 1,
      image: "assets/products/transport-set.png",
      tip: "Classic yellow bus, bright red car, deep blue train"
    },
    {
      id: "single-figurine",
      name: "Single Dino / Butterfly / Transport",
      category: "Mini kit",
      tagline: "One figurine, three colours – the perfect first try",
      price: 49, mrp: 0, badge: "Starter",
      figurines: 1, colours: 3, brushes: 1,
      image: "assets/products/single-set.png",
      tip: "Tell us on WhatsApp which one you'd like: dino, butterfly or transport"
    },
    {
      id: "space-kit",
      name: "Space Kit",
      category: "Painting kit",
      tagline: "Rocket, astronaut and planet – 3… 2… 1… paint!",
      price: 99, mrp: 0, badge: "",
      figurines: 3, colours: 3, brushes: 1,
      image: "assets/products/space-kit.png",
      tip: "White rocket with a red nose and a deep blue window"
    },
    {
      id: "fruits-set",
      name: "Fruits Set",
      category: "Painting kit",
      tagline: "Eight juicy fruits to colour",
      price: 79, mrp: 0, badge: "",
      figurines: 8, colours: 3, brushes: 1,
      image: "assets/products/fruits-set.png",
      tip: "Mix colours to make orange, purple and pink"
    },
    {
      id: "flowers-set",
      name: "Flowers Set",
      category: "Painting kit",
      tagline: "A garden of six flowers in bloom",
      price: 79, mrp: 0, badge: "",
      figurines: 6, colours: 3, brushes: 1,
      image: "assets/products/flowers-set.png",
      tip: "Great as fridge magnets once painted"
    },
    {
      id: "fish-set",
      name: "Fish Set",
      category: "Painting kit",
      tagline: "Six little fish for a rainbow aquarium",
      price: 79, mrp: 0, badge: "",
      figurines: 6, colours: 3, brushes: 1,
      image: "assets/products/fish-set.png",
      tip: "Try rainbow stripes on the fins"
    },
    {
      id: "mini-highland-cow",
      name: "Mini Highland Cow",
      category: "Mini kit",
      tagline: "Shaggy fringe, tiny horns, big charm",
      price: 69, mrp: 0, badge: "",
      figurines: 1, colours: 3, brushes: 1,
      image: "assets/products/highland-cow.png",
      tip: "Caramel brown fringe with a pink nose"
    },
    {
      id: "3d-transport-set",
      name: "3D Transport Set",
      category: "Painting kit",
      tagline: "Four chunky vehicles that stand on your desk",
      price: 299, mrp: 0, badge: "New",
      figurines: 4, colours: 6, brushes: 1,
      image: "assets/products/3d-transport-set.png",
      tip: "Paint the windows light blue for a glassy look"
    },
    {
      id: "kpop-set",
      name: "K-Pop Set",
      category: "Painting kit",
      tagline: "Three idols ready for their stage look",
      price: 249, mrp: 0, badge: "Trending",
      figurines: 3, colours: 6, brushes: 1,
      image: "assets/products/kpop-set.png",
      tip: "Pastel hair colours and sparkly outfits"
    },
    {
      id: "frozen-princess-set",
      name: "Frozen Princess Set",
      category: "Painting kit",
      tagline: "Five icy characters from a winter kingdom",
      price: 249, mrp: 0, badge: "",
      figurines: 5, colours: 6, brushes: 1,
      image: "assets/products/frozen-set.png",
      tip: "Ice blue gowns with white snowflake dots"
    },
    {
      id: "puppy-planter",
      name: "Puppy Planter / Pen Holder",
      category: "Décor kit",
      tagline: "A fluffy puppy that holds your pens or a tiny plant",
      price: 329, mrp: 0, badge: "",
      figurines: 1, colours: 6, brushes: 1,
      image: "assets/products/puppy-planter.png",
      tip: "Brown and white patches with a black nose"
    },
    {
      id: "premium-set",
      name: "Premium Set",
      category: "Mega kit",
      tagline: "32 figurines, 15 colours, 3 brushes – the whole studio",
      price: 699, mrp: 0, badge: "Mega",
      figurines: 32, colours: 15, brushes: 3,
      image: "assets/products/premium-set.png",
      tip: "Perfect for birthday parties and family paint nights"
    }
  ]
};
