export const validCategories = [
  "electronics",
  "clothing",
  "home",
  "books",
  "books",
  "mobile",
  "accessories",
  "fitness",
];

export const categoryArray = [
  { name: "Electronics", value: "electronics" },
  { name: "Clothing", value: "clothing" },
  { name: "Home", value: "home" },
  { name: "Books", value: "books" },
  { name: "Beauty", value: "beauty" },
  { name: "Mobile", value: "mobile" },
  { name: "Accessories", value: "accessories" },
  { name: "Fitness", value: "fitness" },
];

export const searchQueryObj = {
  search: "",
  offset: 0,
  limit: 10,
  min_price: 0,
  max_price: 10000,
  select: "",
  category: [],
};

export const emptyProduct = {
  name: "",
  image: null,
  description: "",
  category: null,
  price: 0,
  quantity: 0,
  rating: 0,
  inventoryStatus: "INSTOCK",
};
