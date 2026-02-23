import MovieModel from '../models/movie.js';

const movieResolvers = {
  Query: {
    getAllMovies: async () => {
      return await MovieModel.find();
    },

    getMovieById: async (_, { id }) => {
      return await MovieModel.findById(id);
    },

    getMoviesByDirector: async (_, { director_name }) => {
      return await MovieModel.find({ director_name });
    }
  },

  Mutation: {
    insertMovie: async (_, { movie }) => {
      const newMovie = new MovieModel(movie);
      return await newMovie.save();
    },

    updateMovie: async (_, { id, movie }) => {
      return await MovieModel.findByIdAndUpdate(
        id,
        movie,
        { new: true }
      );
    },

    deleteMovieById: async (_, { id }) => {
      await MovieModel.findByIdAndDelete(id);
      return true;
    }
  }
};

export default movieResolvers;