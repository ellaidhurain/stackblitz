import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3000';

const getToken = () => {
  const token = getTokenFromLocalStorage(); // Your custom function to get the token from local storage or any other source
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', // You can add other headers here if needed
  };
};

//RTK Query itself provides its own built-in data fetching and caching capabilities, It allows you to use any HTTP client of your choice, including Axios, Fetch API, or any other library that can make HTTP requests.

// This slice will handle API calls and automatically generate the necessary Redux actions and reducers for you.

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    // prepareHeaders: getToken,
  }), // Use Fetch API under the hood
  tagTypes: ['products'],
  endpoints: () => ({}),
});

//createApi({...}): This is a function that creates an API slice. It takes an object as an argument with various configurations to set up the API.

//reducerPath: This is the name of the slice in the Redux store where the API state will be stored.

//baseQuery: This is a function that provides the base configuration for the API calls.
//prepareHeaders: getToken: This is a function that is used to prepare headers for each API request.The name prepareHeaders is not a fixed or default name in Redux Toolkit Query.

//baseUrl: This specifies the base URL for all API calls. It is the starting part of the URL for each request. The actual API endpoint URLs will be appended to this base URL when making API calls.The name baseUrl is not a fixed or default name in Redux Toolkit Query.

//tagTypes: This is an array of tag names that you can use to categorize your endpoints.

//When you define an endpoint (e.g., getUserById as shown in the previous example), you can specify providesTags as an option inside the endpoint configuration. This option tells Redux Toolkit Query which tags should be associated with the data returned by this specific endpoint.

// In the tagTypes array defined when creating the API slice (as you have done with tagTypes: ['user']), you specify the possible tags that can be associated with the data.

// When an API call is made and the response data is received, Redux Toolkit Query stores the data in the cache and associates it with the tags provided in the providesTags option.

// Later, when you make subsequent API calls to the same endpoint with the same parameters (e.g., fetching the same user by ID), Redux Toolkit Query will look in the cache first. If it finds cached data associated with the same tag, it will return the cached data instead of making another network request. This can help reduce unnecessary API calls and improve performance.

//endpoints: This is a callback function that allows you to define individual API endpoints and their configurations.Inside this function, you can use the builder object to define each endpoint

/*
endpoints: (builder) => ({
  getUserById: builder.query({
    query: (userId) => `users/${userId}`,
    providesTags: ["user"],
  }),
}),
In this code block, you are defining an API endpoint named getUserById using the builder.query() function provided by Redux Toolkit Query.

endpoints: (builder) => ({ ... }): This is a callback function that allows you to define individual API endpoints. The builder object passed as an argument allows you to access methods and functions to configure the endpoint.

getUserById: builder.query({ ... }): This is the definition of the getUserById endpoint. You are using the builder.query() method to define a query endpoint. A query endpoint is used for GET requests that fetch data from the server.

query: (userId) => users/${userId}``: This is the query option within the endpoint definition. It specifies the URL of the API endpoint that will be used when making the API call. In this example, the URL is constructed by appending the userId parameter to the base URL. For example, if userId is 123, the API call will be made to http://localhost:3500/users/123.

providesTags: ["user"]: This is an optional property within the endpoint definition that specifies the tags associated with the response data from this endpoint. As explained earlier, tagTypes is defined as ["user"], so this endpoint will cache its response data under the "user" tag. If you make subsequent API calls with the same parameters and the response data is cached under the same tag, Redux Toolkit Query will return the cached data instead of making another network request.

To summarize, this code block defines a single API endpoint named getUserById, which is a query endpoint used for making GET requests to fetch user data based on the userId. The response data from this endpoint will be cached under the "user" tag, making it easily accessible for subsequent requests with the same parameters.
*/

// *********
/*
 RTK Query itself is efficient and powerful even without using Axios. RTK Query is designed to be a standalone data-fetching and caching library that works with any HTTP client or data source. It provides several benefits that make it efficient:

Caching and Automatic Background Data Updates: RTK Query automatically handles caching of API responses, reducing redundant network requests. It also supports automatic background data updates, ensuring that your data stays up to date without having to trigger refreshes manually.

Normalized Data Handling: RTK Query normalizes API responses using Redux's normalized data structure, which can lead to more efficient updates and improved data consistency in your application.

Declarative API Endpoint Definitions: RTK Query allows you to define your API endpoints in a declarative manner using Redux Toolkit's createApi function. This makes it easy to create, maintain, and organize your API calls in a structured way.

Generated Hooks and Types: RTK Query generates custom hooks for each API endpoint, providing you with a type-safe interface to interact with your data. These hooks abstract away the complexity of data fetching and error handling.

Integrated with Redux Toolkit: RTK Query is built on top of Redux Toolkit, which means it integrates seamlessly with Redux-based applications. It leverages Redux's powerful ecosystem, including middleware, reducers, and store configuration.

Support for Paginated Data: RTK Query provides built-in support for handling paginated data, making it easier to work with APIs that return data in chunks.

Optimistic Updates: RTK Query supports optimistic updates, allowing you to update the local state with the expected outcome of a mutation before receiving a response from the server, creating a smoother user experience.

While Axios is a popular choice for making HTTP requests, it's not a requirement for using RTK Query. You can use any HTTP client of your choice, including Fetch API, Axios, or others. RTK Query abstracts away the specific HTTP client implementation, allowing you to focus on defining your API endpoints and managing data without being tied to a specific library.

By using RTK Query, you can benefit from these features regardless of the underlying HTTP client, making it an efficient and versatile solution for data-fetching needs in Redux-based applications.
*/
