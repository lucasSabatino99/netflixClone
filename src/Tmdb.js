const API_KEY = "9a672b282873d148b2620112796b6bfd";
const API_BASE = "https://api.themoviedb.org/3";
const LANGUAGE = "pt-BR";

// - Originais da netflix
// - Recomendados para você (trending)
// - Em alta (top rated)
// - ação
// - comedia
// - Terror
// - Romance
// - Documentarios

const basicFetch = async (endpoint) => {
  const url = `${API_BASE}${endpoint}&language=${LANGUAGE}&api_key=${API_KEY}`;
  const req = await fetch(url);
  const json = await req.json();
  return json;
};

export default {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Originais do Netflix",
        items: await basicFetch(`/discover/tv?with_network=213`), // Filtrando filmes da netflix
      },
      {
        slug: "trending",
        title: "Recomendados para Você",
        items: await basicFetch(`/trending/all/week?`),
      },
      {
        slug: "toprated",
        title: "Em Alta",
        items: await basicFetch(`/movie/top_rated?`),
      },
      {
        slug: "action",
        title: "Ação",
        items: await basicFetch(`/discover/movie?with_genres=28`),
      },
      {
        slug: "comedy",
        title: "Comédia",
        items: await basicFetch(`/discover/movie?with_genres=35`),
      },
      {
        slug: "horror",
        title: "Terror",
        items: await basicFetch(`/discover/movie?with_genres=27`),
      },
      {
        slug: "romance",
        title: "Romance",
        items: await basicFetch(`/discover/movie?with_genres=10749`),
      },
      {
        slug: "documentary",
        title: "Documentários",
        items: await basicFetch(`/discover/movie?with_genres=99`),
      },
    ];
  },
  getMovieInfo: async (movieId, type) => {
    let info = {};
    if (movieId) {
      switch (type) {
        case "movie":
          info = await basicFetch(`/movie/${movieId}?`);
          break;
        case "tv":
          info = await basicFetch(`/tv/${movieId}?`);
          break;
      }
    }
    return info;
  },
};
