import { apiSlice } from 'services/api';

// we can maintain our end points seperatly and inject to apiSlice like this.
export const userGroupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `/users/${userId}`, // API endpoint URL will be appended to the baseUrl
      providesTags: ['user'], // Tags that the response will be cached
    }),
    addUser: builder.mutation({
      query: (body) => ({ url: '/addUser', method: 'POST', body }),
      invalidatesTags: ['user'], // if we want to call get api after post we need to add this
    }),
  }),
});

export const { useGetUserByIdQuery, useAddUserMutation } = userGroupApi;

// "configuration" refers to the process of setting up and customizing a system or application to make it work as desired in a specific environment or for a particular use case. Configuration involves adjusting various settings and parameters to tailor the behavior and functionality of the software to meet specific requirements.
