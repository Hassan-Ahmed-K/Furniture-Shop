const products = [
  // Decor
  {
    name: "Elegant Wall Clock",
    description: "A stylish wall clock to enhance your decor.",
    category: "Decor",
    variations: [
      {
        color: "Black",
        orignal_price: 29.99,
        sell_price: 29.99,
        stock: 50,
        image: "product1.jpg",
      },
      {
        color: "White",
        orignal_price: 32.99,
        sell_price: 32.99,
        stock: 40,
        image: "product2.jpg",
      },
      {
        color: "Gold",
        orignal_price: 35.99,
        sell_price: 35.99,
        stock: 30,
        image: "product3.jpg",
      },
    ],
  },
  {
    name: "Vintage Table Lamp",
    description: "A beautiful vintage lamp for your bedside or living room.",
    category: "Decor",
    variations: [
      {
        color: "Bronze",
        orignal_price: 49.99,
        sell_price: 49.99,
        stock: 20,
        image: "product4.jpg",
      },
    ],
  },
  {
    name: "Abstract Wall Art",
    description: "A modern abstract wall painting to enhance your space.",
    category: "Decor",
    variations: [
      {
        color: "Blue",
        orignal_price: 79.99,
        sell_price: 79.99,
        stock: 10,
        image: "product5.jpg",
      },
      {
        color: "Red",
        orignal_price: 89.99,
        sell_price: 89.99,
        stock: 8,
        image: "product6.jpg",
      },
      {
        color: "Green",
        orignal_price: 85.99,
        sell_price: 85.99,
        stock: 12,
        image: "product7.jpg",
      },
    ],
  },
  {
    name: "Minimalist Vase",
    description: "A simple yet elegant vase for flowers or decor.",
    category: "Decor",
    variations: [
      {
        color: "Ceramic White",
        orignal_price: 25.99,
        sell_price: 25.99,
        stock: 20,
        image: "product8.jpg",
      },
    ],
  },
  {
    name: "Decorative Mirror",
    description: "A round mirror that enhances your room’s aesthetics.",
    category: "Decor",
    variations: [
      {
        color: "Silver Frame",
        orignal_price: 59.99,
        sell_price: 59.99,
        stock: 10,
        image: "product9.jpg",
      },
      {
        color: "Gold Frame",
        orignal_price: 69.99,
        sell_price: 69.99,
        stock: 7,
        image: "product10.jpg",
      },
    ],
  },
  {
    name: "Wall Hanging Shelf",
    description: "A stylish wooden shelf for small decorative items.",
    category: "Decor",
    variations: [
      {
        color: "Walnut",
        orignal_price: 39.99,
        sell_price: 39.99,
        stock: 15,
        image: "product11.jpg",
      },
      {
        color: "Oak",
        orignal_price: 42.99,
        sell_price: 42.99,
        stock: 12,
        image: "product12.jpg",
      },
      {
        color: "Mahogany",
        orignal_price: 45.99,
        sell_price: 45.99,
        stock: 10,
        image: "product13.jpg",
      },
    ],
  },

  // Office
  {
    name: "Ergonomic Office Chair",
    description: "Comfortable and adjustable office chair for long hours.",
    category: "Office",
    variations: [
      {
        color: "Black",
        orignal_price: 149.99,
        sell_price: 149.99,
        stock: 20,
        image: "product14.jpg",
      },
    ],
  },
  {
    name: "Standing Desk",
    description:
      "Adjustable height standing desk for a healthier work routine.",
    category: "Office",
    variations: [
      {
        color: "White",
        orignal_price: 249.99,
        sell_price: 249.99,
        stock: 15,
        image: "product15.jpg",
      },
      {
        color: "Brown",
        orignal_price: 239.99,
        sell_price: 239.99,
        stock: 12,
        image: "product16.jpg",
      },
    ],
  },
  {
    name: "LED Desk Lamp",
    description: "A modern LED desk lamp with adjustable brightness.",
    category: "Office",
    variations: [
      {
        color: "Black",
        orignal_price: 59.99,
        sell_price: 59.99,
        stock: 25,
        image: "product17.jpg",
      },
      {
        color: "Silver",
        orignal_price: 64.99,
        sell_price: 64.99,
        stock: 20,
        image: "product18.jpg",
      },
      {
        color: "White",
        orignal_price: 69.99,
        sell_price: 69.99,
        stock: 18,
        image: "product19.jpg",
      },
    ],
  },
  {
    name: "Office Bookshelf",
    description: "A sturdy bookshelf to keep your books and office supplies.",
    category: "Office",
    variations: [
      {
        color: "Oak",
        orignal_price: 129.99,
        sell_price: 129.99,
        stock: 10,
        image: "product1.jpg",
      },
      {
        color: "Mahogany",
        orignal_price: 139.99,
        sell_price: 139.99,
        stock: 8,
        image: "product2.jpg",
      },
    ],
  },
  {
    name: "File Cabinet",
    description: "A lockable office cabinet to store important documents.",
    category: "Office",
    variations: [
      {
        color: "Gray",
        orignal_price: 89.99,
        sell_price: 89.99,
        stock: 15,
        image: "product3.jpg",
      },
      {
        color: "Black",
        orignal_price: 99.99,
        sell_price: 99.99,
        stock: 12,
        image: "product4.jpg",
      },
      {
        color: "White",
        orignal_price: 94.99,
        sell_price: 94.99,
        stock: 10,
        image: "product5.jpg",
      },
    ],
  },
  {
    name: "Office Chair Mat",
    description: "Protect your floor with this durable office chair mat.",
    category: "Office",
    variations: [
      {
        color: "Transparent",
        orignal_price: 49.99,
        sell_price: 49.99,
        stock: 20,
        image: "product6.jpg",
      },
    ],
  },

  // Bedroom
  {
    name: "Wooden Bed Frame",
    description: "Durable and stylish wooden bed frame for your bedroom.",
    category: "Bedroom",
    variations: [
      {
        color: "Brown",
        orignal_price: 499.99,
        sell_price: 499.99,
        stock: 10,
        image: "product7.jpg",
      },
      {
        color: "White",
        orignal_price: 399.99,
        sell_price: 399.99,
        stock: 15,
        image: "product8.jpg",
      },
      {
        color: "Gray",
        orignal_price: 459.99,
        sell_price: 459.99,
        stock: 7,
        image: "product9.jpg",
      },
    ],
  },
  {
    name: "Memory Foam Mattress",
    description: "A comfortable memory foam mattress for restful sleep.",
    category: "Bedroom",
    variations: [
      {
        color: "Queen",
        orignal_price: 599.99,
        sell_price: 599.99,
        stock: 10,
        image: "product10.jpg",
      },
    ],
  },
  {
    name: "Nightstand",
    description: "A compact nightstand with storage space.",
    category: "Bedroom",
    variations: [
      {
        color: "Oak",
        orignal_price: 89.99,
        sell_price: 89.99,
        stock: 20,
        image: "product11.jpg",
      },
      {
        color: "Walnut",
        orignal_price: 99.99,
        sell_price: 99.99,
        stock: 15,
        image: "product12.jpg",
      },
    ],
  },
  {
    name: "Dresser with Mirror",
    description: "A stylish dresser with a large mirror.",
    category: "Bedroom",
    variations: [
      {
        color: "White",
        orignal_price: 299.99,
        sell_price: 299.99,
        stock: 8,
        image: "product13.jpg",
      },
    ],
  },
  {
    name: "Bedside Lamp",
    description: "A warm bedside lamp for nighttime reading.",
    category: "Bedroom",
    variations: [
      {
        color: "Gold",
        orignal_price: 45.99,
        sell_price: 45.99,
        stock: 15,
        image: "product14.jpg",
      },
      {
        color: "Silver",
        orignal_price: 49.99,
        sell_price: 49.99,
        stock: 12,
        image: "product15.jpg",
      },
    ],
  },
];

export default products;
