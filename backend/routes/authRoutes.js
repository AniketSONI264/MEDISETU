import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protectUser } from "../middlewares/authMiddleware.js";

const router = express.Router();
const logOutUser = (req, res) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.json({ message: "Logged out Successfully" });
  };

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protectUser, (req, res) => res.json(req.user));
router.post("/logout",logOutUser);

export default router;
 