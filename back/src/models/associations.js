import User from "./User.js";
import Film from "./Video.js";
import FilmsJury from "./FilmsJury.js";
import Award from "./Award.js";
import Reservation from "./Reservation.js";
import Event from "./Event.js";

// Define all associations here after all models are loaded
export function setupAssociations() {
  // Film -> User (belongsTo)
  Film.belongsTo(User, { foreignKey: "user_id", as: "user" });

  // Film <-> User (many-to-many through FilmsJury)
  Film.belongsToMany(User, {
    through: FilmsJury,
    foreignKey: "film_id",
    otherKey: "user_id",
    as: "juryMembers",
  });

  User.belongsToMany(Film, {
    through: FilmsJury,
    foreignKey: "user_id",
    otherKey: "film_id",
    as: "assignedFilms",
  });

  // FilmsJury associations
  FilmsJury.belongsTo(Film, { foreignKey: "film_id", as: "film" });
  FilmsJury.belongsTo(User, { foreignKey: "user_id", as: "jury" });

  // Award -> Film
  Award.belongsTo(Film, { foreignKey: "film_id", as: "film" });
  Film.hasMany(Award, { foreignKey: "film_id", as: "awards" });

  // Reservation -> Event
  Reservation.belongsTo(Event, { foreignKey: "event_id", as: "event" });
  Event.hasMany(Reservation, { foreignKey: "event_id", as: "reservations" });
}
