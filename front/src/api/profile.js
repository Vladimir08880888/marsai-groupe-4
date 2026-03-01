import instance from "./config";

async function getMe() {
  return await instance.get("profile/me");
}

async function updateMe(data) {
  return await instance.put("profile/me", data);
}

export { getMe, updateMe };
