import instance from "./config.js";

async function getJurys() {
  return await instance.get("users");
}

async function createJury(juryData) {
  return await instance.post("users", { ...juryData, role: "JURY" });
}

async function updateJury(id, juryData) {
  return await instance.put(`users/${id}`, { ...juryData, role: "JURY" });
}

async function deleteJury(id) {
  return await instance.delete(`users/${id}`);
}

export { getJurys, createJury, updateJury, deleteJury };