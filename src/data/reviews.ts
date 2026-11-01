export interface Review {
  id: string;
  name: string;
  role: string;
  img: string;
  stars: number;
  quote: string;
  tag: string;
}

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Maya Chen",
    role: "Food Critic · The Daily Grind",
    img: "/images/people/person-2.jpg",
    stars: 5,
    quote:
      "The Velvet Cappuccino is the single best cup in the city. Foam like silk, espresso with real spine. I plan my whole week around this place.",
    tag: "Best cappuccino in town",
  },
  {
    id: "r2",
    name: "Jordan Blake",
    role: "Regular since 2015",
    img: "/images/people/person-1.jpg",
    stars: 5,
    quote:
      "Eleven years, same corner table, same perfect flat white. The crew knows my order before I reach the counter. Barista is my second office and first love.",
    tag: "11-year regular",
  },
  {
    id: "r3",
    name: "Amara Osei",
    role: "Creative Director",
    img: "/images/people/person-3.jpg",
    stars: 5,
    quote:
      "Design heaven. The light, the porcelain cups, the heather-purple details — and the Electric Lemon Slice genuinely rewired my brain chemistry.",
    tag: "Design & cake lover",
  },
  {
    id: "r4",
    name: "Daniel Reyes",
    role: "Architect",
    img: "/images/people/person-4.jpg",
    stars: 5,
    quote:
      "Cold brew that tastes engineered. Consistent every single visit, and the space is built for lingering. Ten out of ten, no notes.",
    tag: "Cold brew devotee",
  },
  {
    id: "r5",
    name: "Sophie Laurent",
    role: "Photographer",
    img: "/images/people/person-5.jpg",
    stars: 5,
    quote:
      "I shoot cafe culture all over Europe and I still come back here. The latte art is gallery-grade and the croissants shatter exactly right.",
    tag: "Latte-art hunter",
  },
  {
    id: "r6",
    name: "Elena Petrova",
    role: "Novelist",
    img: "/images/people/person-6.jpg",
    stars: 5,
    quote:
      "I wrote two novels fueled entirely by their Midnight Mocha. Warm room, warmer people, and never once did anyone rush me out of my chair.",
    tag: "Writes here daily",
  },
];
