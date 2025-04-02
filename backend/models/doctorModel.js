import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId , ref:"User", required:true},
    specialization:[{type:String,required:true}],
    experience:{type:Number, required:true},
    availableSlots : [
       { 
        day:{
            type:String,
            enum:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        },
        startTime:{type:String},
        endTime:{type:String},
    }
    ],
    fees:{type:Number,required:true},
    isVerified:{type:Boolean,default:false},
});
const Doctor = mongoose.model("Doctor",doctorSchema);
export default Doctor;