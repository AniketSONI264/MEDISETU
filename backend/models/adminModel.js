import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
    userId:{type :mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    permissions:[{type:String}],
})
const Admin = mongoose.model("Admin",adminSchema);
export default Admin;