import { movies } from "./services/movies";

export const reducers = {
    [movies.reducerPath]: movies.reducer,
};

export const middlewares = [
    movies.middleware,
];

export const rtkQueryErrorLogger = () => (next) => (action) => {
    return next(action);
};