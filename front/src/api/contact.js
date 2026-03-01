import instance from "./config";

async function sendContact(data) {
  return await instance.post("contact", data);
}

export { sendContact };
