import instance from "./config";

async function createReservation(data) {
  return await instance.post("reservations", data);
}

async function getReservations() {
  return await instance.get("reservations");
}

export { createReservation, getReservations };
