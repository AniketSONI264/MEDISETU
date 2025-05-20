import Doctor from "../models/doctorModel.js"
import express from "express";
const router = express.Router();

router.get("/allDoctors",async (req,res) =>{
    try{
        const doctors = await Doctor.find().select("-password");
        res.status(200).json({success:true,"doctors":doctors});
    } catch(err){
        res.status(400).json({message:"Something Went Wrong!!!"});
    }
})


router.get('/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
  
      const doctor = await Doctor.findOne({ slug });
  
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found with that slug',
        });
      }
  
      res.status(200).json({
        success: true,
        data: doctor,
      });
    } catch (err) {
      console.error('Error fetching doctor by slug:', err);
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  });
  
export default router;