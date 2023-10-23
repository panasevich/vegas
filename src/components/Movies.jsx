import Movie from './Movie'
import '../styles/movies.scss'
import InfiniteScroll from "./infiniteScroll/infiniteScroll";

const Movies = ({ handlePagination, movies, viewTrailer, closeCard }) => {
    return (
        <InfiniteScroll callback={handlePagination}>
        <div data-testid="movies" className="movies-list">
            {movies?.results?.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                    />
                )
            })}
        </div>
        </InfiniteScroll>
    )
}

export default Movies
