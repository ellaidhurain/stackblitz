import { apiSlice } from '/src/services/api/apiSlice';

// we can maintain our end points seperatly and inject to apiSlice like this.
export const productGroupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => `/products`, // API endpoint URL will be appended to the baseUrl
      providesTags: ['products'], // Tags that the response will be cached
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`, // API endpoint URL will be appended to the baseUrl
      providesTags: ['products'], // Tags that the response will be cached
    }),
    getProductBySearch: builder.query({
      query: (searchTerm) =>
        `/products?search=${encodeURIComponent(searchTerm)}`, // Append searchTerm as a query parameter
      providesTags: ['products'], // Tags that the response will be cached
    }),
    addProduct: builder.mutation({
      query: (body) => ({ url: '/addUser', method: 'POST', body }),
      invalidatesTags: ['products'], // if we want to call get api after post we need to add this. it automatically fetch
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductByIdQuery,
  useGetProductBySearchQuery,
  useAddUserMutation,
} = productGroupApi;

// "configuration" refers to the process of setting up and customizing a system or application to make it work as desired in a specific environment or for a particular use case. Configuration involves adjusting various settings and parameters to tailor the behavior and functionality of the software to meet specific requirements.
