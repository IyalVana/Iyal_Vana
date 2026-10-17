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

   Keep the commas between blocks and don't delete the quotes.
   ============================================================ */

window.IYAL_DATA = {

  store: {
    name: "IYAL VANA",
    tagline: "Handcrafted DIY figurines you colour yourself",
    description: "Every Iyal Vana figurine is cast and finished by hand in small batches. It reaches you plain white – a blank canvas – so you can colour it exactly the way you imagine and keep it as your own little piece of art.",
    whatsapp: "919566987977",          // country code + number, digits only
    phone: "+91 95669 87977",          // shown on the website
    instagram: "https://www.instagram.com/iyal_vana",
    email: "",                         // optional, leave "" to hide
    address: "Tamil Nadu, India",      // optional
    currency: "₹",
    deliveryNote: "Delivery charges will be confirmed on WhatsApp",
    logo: "assets/img/logo.svg",       // replace with your own logo file
    heroFigurines: ["dinosaur", "butterfly", "rocket", "teddy-bouquet", "school-bus"],  // shown floating on the home banner
    aboutImage: "assets/products/group-2.jpg"
  },

  products: [
    {
      id: "butterfly",
      name: "Butterfly",
      category: "Garden friends",
      tagline: "Spread your wings in any colour you like",
      price: 149,
      mrp: 199,
      badge: "Best Seller",
      image: "assets/products/butterfly.png",
      highlights: ["Hand-cast, smooth finish", "Easy to colour – big flat wings", "Approx. 9 cm wide"],
      tip: "Try two-tone wings with dots and stripes"
    },
    {
      id: "teddy-bouquet",
      name: "Teddy with Bouquet",
      category: "Characters",
      tagline: "A warm hug and a bunch of flowers",
      price: 229,
      mrp: 289,
      badge: "Gift pick",
      image: "assets/products/teddy.png",
      highlights: ["Teddy holding a rose bouquet", "Lots of petals to colour", "Approx. 9 cm tall"],
      tip: "Brown teddy with a rainbow of roses"
    },
    {
      id: "cow",
      name: "Little Cow",
      category: "Farm friends",
      tagline: "Big eyes, pink cheeks and a lot of charm",
      price: 199,
      mrp: 249,
      badge: "",
      image: "assets/products/cow.png",
      highlights: ["Chubby 3D figurine", "Stands on its own", "Approx. 7 cm tall"],
      tip: "Patches of brown with a pink nose look adorable"
    },
    {
      id: "dinosaur",
      name: "Dinosaur",
      category: "Kids' favourites",
      tagline: "Roar! A friendly dino ready for your colours",
      price: 199,
      mrp: 249,
      badge: "Kids love it",
      image: "assets/products/dinosaur.png",
      highlights: ["Detailed scales & spikes", "Stands on its own", "Approx. 9 cm tall"],
      tip: "Bright red body with yellow spikes"
    },
    {
      id: "rocket",
      name: "Space Rocket",
      category: "Kids' favourites",
      tagline: "3… 2… 1… colour and lift off",
      price: 179,
      mrp: 229,
      badge: "",
      image: "assets/products/rocket.png",
      highlights: ["Round window & fins", "Stands upright", "Approx. 10 cm tall"],
      tip: "White body, red nose and a deep blue window"
    },
    {
      id: "school-bus",
      name: "School Bus",
      category: "Vehicles",
      tagline: "The cutest ride to school",
      price: 169,
      mrp: 219,
      badge: "",
      image: "assets/products/bus.png",
      highlights: ["Windows & wheels in relief", "Flat back – great as a fridge magnet", "Approx. 9 cm long"],
      tip: "Classic yellow with sky-blue windows"
    },
    {
      id: "train",
      name: "Toy Train",
      category: "Vehicles",
      tagline: "Choo choo! All aboard the colour express",
      price: 169,
      mrp: 219,
      badge: "",
      image: "assets/products/train.png",
      highlights: ["Engine with chimney & cabin", "Flat back – great as a fridge magnet", "Approx. 8 cm long"],
      tip: "Red roof, blue cabin and a yellow chimney"
    },
    {
      id: "mini-car",
      name: "Mini Car",
      category: "Vehicles",
      tagline: "A tiny classic car with lots of detail",
      price: 169,
      mrp: 219,
      badge: "New",
      image: "assets/products/car.png",
      highlights: ["Headlights, grille & windscreen", "Stands on its own", "Approx. 8 cm long"],
      tip: "Glossy red with a white windscreen"
    },
    {
      id: "builder",
      name: "Mr. Builder",
      category: "Characters",
      tagline: "Helmet, moustache and a big smile",
      price: 189,
      mrp: 239,
      badge: "",
      image: "assets/products/builder.png",
      highlights: ["Chubby standing character", "Lots of small details to colour", "Approx. 8 cm tall"],
      tip: "Yellow helmet, blue overalls and a red bow tie"
    },
    {
      id: "cool-girl",
      name: "Cool Girl",
      category: "Characters",
      tagline: "Sunglasses on, ready for the weekend",
      price: 189,
      mrp: 239,
      badge: "",
      image: "assets/products/girl.png",
      highlights: ["Chubby standing character", "Sunglasses, bow & skirt details", "Approx. 8 cm tall"],
      tip: "Green skirt, red bow and jet-black shades"
    },
    {
      id: "puppy",
      name: "Fluffy Puppy",
      category: "Farm friends",
      tagline: "Curly ears and the happiest face",
      price: 199,
      mrp: 249,
      badge: "",
      image: "assets/products/dog.png",
      highlights: ["Curly fur texture", "Sits on its own", "Approx. 8 cm tall"],
      tip: "Brown curls, white face and a yellow flower"
    },
    {
      id: "sunflower",
      name: "Sunflower",
      category: "Garden friends",
      tagline: "A little sunshine for your desk",
      price: 99,
      mrp: 129,
      badge: "",
      image: "assets/products/sunflower.png",
      highlights: ["Textured petals & seeds", "Flat back – great as a fridge magnet", "Approx. 6 cm wide"],
      tip: "Bright yellow petals with a brown centre"
    },
    {
      id: "fish",
      name: "Rainbow Fish",
      category: "Garden friends",
      tagline: "Swim through every colour of the rainbow",
      price: 99,
      mrp: 129,
      badge: "",
      image: "assets/products/fish.png",
      highlights: ["Scales & fins in relief", "Flat back – great as a fridge magnet", "Approx. 7 cm long"],
      tip: "Pastel rainbow stripes look magical"
    }
  ]
};
