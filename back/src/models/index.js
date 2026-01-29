import Film from "./Film.js";
import User from "./User.js";
import Tag from "./Tag.js";
import Award from "./Award.js";
import JuryAssignment from "./JuryAssignment.js";
import JuryVote from "./JuryVote.js";
import SiteContent from "./SiteContent.js";

// Film belongs to User
Film.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Film, { foreignKey: "user_id", as: "films" });

// Film <-> Tag (many-to-many)
Film.belongsToMany(Tag, { through: "film_tag", foreignKey: "film_id", otherKey: "tag_id", as: "tags" });
Tag.belongsToMany(Film, { through: "film_tag", foreignKey: "tag_id", otherKey: "film_id", as: "films" });

// Film <-> Award (many-to-many, supports ex-aequo)
Film.belongsToMany(Award, { through: "film_award", foreignKey: "film_id", otherKey: "award_id", as: "awards" });
Award.belongsToMany(Film, { through: "film_award", foreignKey: "award_id", otherKey: "film_id", as: "films" });

// JuryAssignment
JuryAssignment.belongsTo(Film, { foreignKey: "film_id", as: "film" });
JuryAssignment.belongsTo(User, { foreignKey: "jury_id", as: "jury" });
Film.hasMany(JuryAssignment, { foreignKey: "film_id", as: "juryAssignments" });
User.hasMany(JuryAssignment, { foreignKey: "jury_id", as: "juryAssignments" });

// JuryVote
JuryVote.belongsTo(Film, { foreignKey: "film_id", as: "film" });
JuryVote.belongsTo(User, { foreignKey: "jury_id", as: "jury" });
Film.hasMany(JuryVote, { foreignKey: "film_id", as: "juryVotes" });
User.hasMany(JuryVote, { foreignKey: "jury_id", as: "juryVotes" });

export { Film, User, Tag, Award, JuryAssignment, JuryVote, SiteContent };
