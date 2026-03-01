import instance from "./config";

// films pour la gallerie publique
async function listFilms(page = 1, limit = 6){
  return await instance.get(`gallerie?page=${page}&limit=${limit}`);
}

async function getFilmById(id) {
  return await instance.get(`gallerie/${id}`);
}

export { listFilms, getFilmById };