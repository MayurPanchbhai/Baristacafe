/** @format */

export type MenuCategory = "coffee" | "cake" | "pastry" | "cold";

export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  category: MenuCategory;
  badge?: string;
}

export const FILTERS: { id: "all" | MenuCategory; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "coffee", label: "Coffee" },
  { id: "cake", label: "Cakes" },
  { id: "pastry", label: "Pastries" },
  { id: "cold", label: "Cold Brew" },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "espresso",
    name: "Signature Espresso",
    desc: "Double ristretto of single-origin Huila with a thick golden crema.",
    price: 3.5,
    img: "/images/coffee-2.jpg",
    category: "coffee",
  },
  {
    id: "cappuccino",
    name: "Velvet Cappuccino",
    desc: "Silky micro-foam, dusted cocoa, poured into warm porcelain.",
    price: 4.8,
    img: "/images/coffee-1.jpg",
    category: "coffee",
    badge: "Best Seller",
  },
  {
    id: "latte",
    name: "Royal Heather Latte",
    desc: "Lavender-kissed steamed milk over a slow-pulled double shot.",
    price: 5.2,
    img: "/images/coffee-3.jpg",
    category: "coffee",
  },
  {
    id: "macchiato",
    name: "Caramel Macchiato",
    desc: "Vanilla-bean milk marked with espresso and burnt caramel.",
    price: 5.0,
    img: "/images/coffee-4.jpg",
    category: "coffee",
  },
  {
    id: "mocha",
    name: "Midnight Mocha",
    desc: "70% dark ganache folded into espresso under a cream cloud.",
    price: 5.4,
    img: "/images/coffee-6.jpg",
    category: "coffee",
  },
  {
    id: "flatwhite",
    name: "Flat White No.7",
    desc: "Double shot, velvet pour, finished with rosetta art.",
    price: 4.6,
    img: "/images/coffee-5.jpg",
    category: "coffee",
  },
  {
    id: "cherry-torte",
    name: "Wild Cherry Torte",
    desc: "Dark sponge, mascarpone cream and macerated wild cherries.",
    price: 5.8,
    img: "/images/cake-1.jpg",
    category: "cake",
    badge: "Chef's Pick",
  },
  {
    id: "honey-cake",
    name: "Honey Layer Cake",
    desc: "Seven caramelised honey layers with a flaky golden crust.",
    price: 5.2,
    img: "/images/cake-2.jpg",
    category: "cake",
  },
  {
    id: "lemon-cake",
    name: "Electric Lemon Slice",
    desc: "Zesty chiffon, torched meringue, a jolt of citrus.",
    price: 4.9,
    img: "/images/cake-3.jpg",
    category: "cake",
  },
  {
    id: "choco-fudge",
    name: "Midnight Choco Fudge",
    desc: "Flourless fudge cake, espresso glaze, cocoa soil.",
    price: 5.5,
    img: "/images/cake-4.jpg",
    category: "cake",
  },
  {
    id: "red-velvet",
    name: "Red Velvet Royale",
    desc: "Classic crimson crumb with whipped cream-cheese frosting.",
    price: 5.5,
    img: "/images/cake-5.jpg",
    category: "cake",
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    desc: "72-hour laminated dough, French butter, shattering crust.",
    price: 3.2,
    img: "/images/pastry-1.jpg",
    category: "pastry",
  },
  {
    id: "almond-croissant",
    name: "Almond Royale",
    desc: "Twice-baked with rum frangipane and toasted flaked almonds.",
    price: 4.1,
    img: "/images/pastry-2.jpg",
    category: "pastry",
  },
  {
    id: "flaky-roll",
    name: "Sunrise Flaky Roll",
    desc: "Morning bun of croissant dough, cinnamon and orange sugar.",
    price: 3.6,
    img: "/images/pastry-3.jpg",
    category: "pastry",
  },
  {
    id: "cold-brew",
    name: "Velvet Cold Brew",
    desc: "18-hour steep, cream cascade, served over hand-cut ice.",
    price: 4.9,
    img: "/images/cold-1.jpg",
    category: "cold",
    badge: "Iced",
  },
  {
    id: "white-iced",
    name: "Porcelain White",
    desc: "Double espresso shaken with milk, soft and snow-white.",
    price: 5.1,
    img: "/images/cold-2.jpg",
    category: "cold",
  },
  {
    id: "aero-chill",
    name: "Aero Chill",
    desc: "Aeropress flash-chilled, brown-sugar syrup, orange mist.",
    price: 4.7,
    img: "/images/cold-3.jpg",
    category: "cold",
  },
];

export interface CarouselItem {
  id: string;
  name: string;
  note: string;
  price: number;
  img: string;
}

export const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: "c1",
    name: "Velvet Cappuccino",
    note: "Silky micro-foam",
    price: 4.8,
    img: "/images/coffee-1.jpg",
  },
  {
    id: "c2",
    name: "Signature Espresso",
    note: "Golden crema",
    price: 3.5,
    img: "/images/coffee-2.jpg",
  },
  {
    id: "c3",
    name: "Royal Heather Latte",
    note: "Lavender kiss",
    price: 5.2,
    img: "/images/coffee-3.jpg",
  },
  {
    id: "c4",
    name: "Caramel Macchiato",
    note: "Burnt caramel",
    price: 5.0,
    img: "/images/coffee-4.jpg",
  },
  {
    id: "c5",
    name: "Flat White No.7",
    note: "Rosetta pour",
    price: 4.6,
    img: "/images/coffee-5.jpg",
  },
  {
    id: "c6",
    name: "Midnight Mocha",
    note: "70% dark ganache",
    price: 5.4,
    img: "/images/coffee-6.jpg",
  },
  {
    id: "c7",
    name: "Gray Day Brew",
    note: "Slow & low",
    price: 4.2,
    img: "/images/coffee-7.jpg",
  },
  {
    id: "c8",
    name: "Velvet Cold Brew",
    note: "18-hour steep",
    price: 4.9,
    img: "/images/cold-1.jpg",
  },
];

export const TORNADO_IMAGES: string[] = [
  "/images/coffee-1.jpg",
  // "/images/coffee-2.jpg",
  "/images/coffee-3.jpg",
  "/images/coffee-4.jpg",
  "/images/coffee-5.jpg",
  "/images/coffee-6.jpg",
  "/images/coffee-7.jpg",
  "/images/cake-1.jpg",
  "/images/cake-2.jpg",
  "/images/pastry-1.jpg",
  "/images/cold-1.jpg",
];
