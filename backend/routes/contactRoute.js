// import express from "express";
// import Contact from "../models/contactModel";

// const router = express.Router();

// router.post("/", async(req,res)=>{
//     try{
//         const { name,email,phone, message }=req.body;

//         if(!name || !email || !phone || !message){
//             return res.status(400).json({error:"All fields are required!"});
//         }
//         const newContact = new Contact({name,email,phone,message});
//         await newContact.save();
//         res.status(201).json({message:"Message sent successfully!"});
//     } catch(error){
//         res.status(500).json({error:"Internal Server Error!"});
//     }
// });
// export default router;

import express from "express";
import Contact from "../models/contactModel.js"; // Ensure the correct file extension if using ES modules

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();

        res.status(201).json({ message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error!" });
    }
});

export default router;
