// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// // Define Address Schema (Embedded Object)
// const addressSchema = new mongoose.Schema({
//   street: { type: String, required: false },
//   city: { type: String, required: false },
//   state: { type: String, required: false },
//   country: { type: String, required: false, default: "India" },
//   postalCode: { type: String, required: false },
// });

// // Define User Schema
// const userSchema = new mongoose.Schema(
//   {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     profilePic: { type: String,default:""}, // Default profile pic
//     address: addressSchema, // Embedded Address Object
//     phone: { type: String, required: false }, 
//     gender: { type: String, enum: ["Male", "Female", "Other"], required: false },
//     dateOfBirth: { type: Date, required: false },
//     role: {
//       type: String,
//       enum: ["user", "admin", "doctor"],
//       default: "user",
//     },

//     // Doctor-Specific Fields (Only for Role: "doctor")
//     specialization: { type: String, required: function () { return this.role === "doctor"; } },
//     experience: { type: Number, required: function () { return this.role === "doctor"; } },
//     availableSlots: [
//       {
//         day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
//         startTime: { type: String },
//         endTime: { type: String },
//       }
//     ],
//     fees: { type: Number, required: function () { return this.role === "doctor"; } },

//   },
//   { timestamps: true }
// );

// // Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Compare password method
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model("User", userSchema);
// export default User;




//New User model according to the Multi model structure of the project.

import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const addressSchema = new mongoose.Schema({
  street:{type:String},
  city:{type:String},
  state:{type:String},
  country:{type:String,default:"India"},
  zipCode:{type:Number},
})

const userSchema = new mongoose.Schema({
    firstName : {type:String,required:true},
    lastName : {type:String,required:true},
    email :{type:String,required:true,unique:true},
    password: {type:String,required:true},
    profilePic:{type:String,default:""},
    address: addressSchema,
    phone:{type:String},
    gender:{type:String,enum:["Male","Female","Other"]},
    dateOfBirth : {type:Date},
    role : {type:String,enum:["user","admin","doctor"],default:"user"},
},
  {timestamps:true},
);

userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt)
  next();

});

userSchema.methods.matchPassword = async function( enteredPassword ){
  return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User",userSchema);
export default User;