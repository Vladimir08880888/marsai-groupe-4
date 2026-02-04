import instance from "./config.js";

async function getVideos() {
  return await instance.get("films");
}

export { getVideos };
