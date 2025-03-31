// import express from "express";
// import { registerUser, loginUser } from "../controllers/authController.js";
// import { protect } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// // router.get("/profile", protect, (req, res) => res.json(req.user)); // Protected Route
// router.get("/me", protect, (req, res) => {
//     res.json(req.user); // `req.user` is set by `protect` middleware
//   });

// export default router;



import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, (req, res) => res.json(req.user));
export const logOutUser= (req,res) =>{
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0),
    })
    res.json({message:"Logged out Successfully"});
}

router.post("/logout",logOutUser);

export default router;
 