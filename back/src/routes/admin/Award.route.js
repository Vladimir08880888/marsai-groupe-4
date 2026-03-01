import express from "express";
import AwardController from "../../controllers/AwardController.js";
import AuthMiddleware from "../../middlewares/AuthMiddleware.js";

const awardRouter = express.Router();

awardRouter.use((req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]));

awardRouter.get("/", AwardController.listAwards);
awardRouter.get("/:id", AwardController.getAwardById);
awardRouter.post("/", AwardController.createAward);
awardRouter.put("/:id", AwardController.updateAward);
awardRouter.delete("/:id", AwardController.deleteAward);

export default awardRouter;
