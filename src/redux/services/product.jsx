import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:5000";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "multipart/form-data");
      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => {
        return "/product";
      },
      onError: (error) => {
        // Custom error handling logic for getData endpoint
        console.error("An error occurred while fetching data:", error);
      },
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      async queryFn(product) {
        // todo: loop function
        if (product) {
          const formData = new FormData();
          formData.append("name", product.name);
          formData.append("category", product.category);
          formData.append("quantity", product.quantity);
          formData.append("description", product.description);
          formData.append("price", product.price);

          formData.append("image", product.image, product.image.name);

          const response = await axios
            .post(`${baseUrl}/product/create`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .catch((error) => toast?.error(error?.response?.data?.message));

          if (response) {
            toast.success(response?.data?.message);
            return response.data;
          }
        }
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      async queryFn(changeObj) {
        console.log(changeObj, "----------sad");


        if (changeObj) {
          const formData = new FormData();

          for (let i in changeObj) {
            if (changeObj[i] && i !== "id") {
              if (changeObj[i] && i === "image") {
                formData.append(i, changeObj[i], changeObj[i].name);
              } else {
                formData.append(i, changeObj[i]);
              }
            }
          }

          const response = await axios
            .put(`${baseUrl}/product/${changeObj?.id}`, formData,{
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .catch((error) => toast?.error(error?.response?.data?.message));

          if (response) {
            toast.success(response?.data?.message);
            return response.data;
          }
        }
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Product"],
    }),
    searchAndFilter: builder.mutation({
      query: (searchQuery) => {
        return {
          url: `/product/search?${searchQuery || ""}`,
          method: "get",
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useSearchAndFilterMutation,
  useUpdateProductMutation,
} = productAPI;
