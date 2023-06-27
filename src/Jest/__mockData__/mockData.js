import configureStore from "redux-mock-store";

export const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Andrew" },
];

export const formSubmitMockData = {
  name: "Product Name",
  description: "Product Description",
  price: 100,
  category: "electronics",
  quantity: 1,
};

// create mock store
const createMockStore = configureStore([]);

export const mockStore = createMockStore({
  auth: {
    isLoggedIn: true,
    id: "123",
    name: "John Doe",
    email: "john.doe@example.com",
  },
});

// getservetity

export const mockServity = {
  product1: {
    inventoryStatus: "INSTOCK",
  },
  product2: {
    inventoryStatus: "OUTOFSTOCK",
  },
  product3: {
    inventoryStatus: "LOWSTOCK",
  },
};

// getProduct 1 Product Data

export const mockProductData = {
  data: [
    {
      _id: "64918c5b48f8f38ae1f30854",
      name: "luffy",
      category: "fitness",
      description: "jahsjdas asdfjsajd lksdk",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/",
      quantity: 1,
      price: 1000,
      createdAt: "2023-06-20T11:24:11.440Z",
      updatedAt: "2023-06-21T12:46:21.212Z",
      inventoryStatus: "LOWSTOCK",
    },
  ],
  status: 200,
};
