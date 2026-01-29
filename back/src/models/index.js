import Film from "./Film.js";
import User from "./User.js";
import Tag from "./Tag.js";
import Award from "./Award.js";
import JuryAssignment from "./JuryAssignment.js";
import JuryVote from "./JuryVote.js";
import SiteContent from "./SiteContent.js";

// Film belongs to User
Film.belongsTo(User, { foreignKey: "id_utilisateur", as: "user" });
User.hasMany(Film, { foreignKey: "id_utilisateur", as: "films" });

// Film <-> Tag (many-to-many)
const FilmTag = Film.belongsToMany(Tag, { through: "film_tag", foreignKey: "id_film", otherKey: "id_tag", as: "tags" });
Tag.belongsToMany(Film, { through: "film_tag", foreignKey: "id_tag", otherKey: "id_film", as: "films" });

// Film <-> Award (many-to-many, supports ex-aequo)
const FilmAward = Film.belongsToMany(Award, { through: "film_award", foreignKey: "id_film", otherKey: "id_award", as: "awards" });
Award.belongsToMany(Film, { through: "film_award", foreignKey: "id_award", otherKey: "id_film", as: "films" });

// JuryAssignment
JuryAssignment.belongsTo(Film, { foreignKey: "id_film", as: "film" });
JuryAssignment.belongsTo(User, { foreignKey: "id_jury", as: "jury" });
Film.hasMany(JuryAssignment, { foreignKey: "id_film", as: "juryAssignments" });
User.hasMany(JuryAssignment, { foreignKey: "id_jury", as: "juryAssignments" });

// JuryVote
JuryVote.belongsTo(Film, { foreignKey: "id_film", as: "film" });
JuryVote.belongsTo(User, { foreignKey: "id_jury", as: "jury" });
Film.hasMany(JuryVote, { foreignKey: "id_film", as: "juryVotes" });
User.hasMany(JuryVote, { foreignKey: "id_jury", as: "juryVotes" });

export { Film, User, Tag, Award, JuryAssignment, JuryVote, SiteContent };
