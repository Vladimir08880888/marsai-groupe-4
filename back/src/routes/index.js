import express from "express";
import userRouter from "./User.route.js";
import authRouter from "./Auth.route.js";
import filmRouter from "./Film.route.js";
import evenementRouter from "./Evenement.route.js";
import reservationRouter from "./Reservation.route.js";
import tagRouter from "./Tag.route.js";
import awardRouter from "./Award.route.js";
import juryRouter from "./Jury.route.js";
import siteContentRouter from "./SiteContent.route.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/films", filmRouter);
router.use("/evenements", evenementRouter);
router.use("/reservations", reservationRouter);
router.use("/tags", tagRouter);
router.use("/awards", awardRouter);
router.use("/jury", juryRouter);
router.use("/content", siteContentRouter);

export default router;
