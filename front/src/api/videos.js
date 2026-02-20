import instance from "./config.js";

async function getVideos(page = 1, limit = 6) {
  return await instance.get(`films?page=${page}&limit=${limit}`);
}

async function deleteVideo(id) {
  return await instance.delete(`films/${id}`);
}

export { getVideos, deleteVideo };
