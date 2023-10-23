import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT } from "../constants";
import tags from "./tags";

const api = (reducerPath) =>
  createApi({
    reducerPath,
    tagTypes: Object.keys(tags),
    baseQuery: fetchBaseQuery({ baseUrl: ENDPOINT }),
    endpoints: () => ({}),
  });

export default api;
