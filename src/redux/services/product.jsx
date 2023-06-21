import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { toast } from "react-toastify";
import { APP_CONFIG } from "../../app.config";
import { FormDataGeneratorFun } from "../../utlis";
import { axiosInstance } from "../../utlis/axiosInstance";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APP_CONFIG.APP_URL,
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
        if (product) {
          const formData = FormDataGeneratorFun(product);

          const response = await axiosInstance
            .post("/product/create", formData, {
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
        if (changeObj) {
          const formData = FormDataGeneratorFun(changeObj);
          const response = await axiosInstance
            .put(`/product/${changeObj?.id}`, formData, {
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
