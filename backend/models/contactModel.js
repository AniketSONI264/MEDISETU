// import mongoose from "mongoose";

// const contactSchema = new mongoose.Schema({
//     name : {type:String,required:true},
//     email : {type:String,required:true},
//     phone: {type:Number,required:true},
//     message : {type:String,required:true},
// },
// {timestamps:true},);

// const Contact = mongoose.model("Contact",contactSchema);
// export default Contact;


import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true },
        message: { type: String, required: true },
    },
    { timestamps: true } // Fixed typo
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
