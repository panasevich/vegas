import api from "../api";
import tags from "../tags";
import {API_KEY, ENDPOINT_DISCOVER, ENDPOINT_SEARCH} from "../../constants";

export const movies = api("movies").injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getMovieItem: build.query({
      query: ({ id }) => {
        return {
          url: `/movie/${id}?api_key=${API_KEY}&append_to_response=videos`,
          method: "get",
        };
      },
    }),
    getMovies: build.query({
      query: ({ search, page }) => {
        return {
          url: search ? ENDPOINT_SEARCH: ENDPOINT_DISCOVER,
          method: "get",
          params: search ? { query: search } : {page},
        };
      },
      transformResponse: (response, req, args) => {
        return {...response, search: args.search};
      },
      providesTags: [tags.GET_MOVIES_LIST],
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs };
        if (newQueryArgs.page) {
          delete newQueryArgs.page;
        }
        return newQueryArgs;
      },
      merge: (currentCache, newItems) => {
        if (currentCache.results) {
          return {
            ...currentCache,
            ...newItems,
            results: [...currentCache.results, ...newItems.results]
          };
        }
        return newItems;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      }
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieItemQuery } = movies;
