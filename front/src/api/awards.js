import instance from "./config";

async function getAwards() {
  return await instance.get("palmares");
}

async function getAwardById(id) {
  return await instance.get(`palmares/${id}`);
}

export { getAwards, getAwardById };
