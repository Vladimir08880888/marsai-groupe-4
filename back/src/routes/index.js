import express from "express";
import userRouter from "./admin/User.route.js";
import videoRouter from "./admin/Video.route.js";
import overviewRouter from "./admin/Overview.route.js";
import authRouter from "./Auth.route.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/videos", videoRouter);
router.use("/overview", overviewRouter);

export default router;
