import bcrypt from 'bcrypt'
import validator from 'validator'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'
//  api for adding doctors

const addDoctors= async (req,res)=>{
  try {
    const { name,email,password,speciality,degree,experience,about,fees,address}=req.body
    const imageFile= req.file

   if(!name || !email || ! password || !speciality || !degree || !experience || !about || !fees || !address){
    return res.json({ success :false ,message : 'Missing Details'})
   }
   if(!validator.isEmail(email)){
    return res.json({ success:false,message :"plese enter a valid email"})

   }
   if( password.length < 8 ){
    return res.send({ success: false , message: "Enter a strong password"})
   }
    
   const salt = await bcrypt.genSalt(10)
   const hashPassword = await bcrypt.hash(password,salt)

   const imageUpload= await cloudinary.uploader.upload(imageFile.path ,{resource_type:'image'})
   const imageUrl=  imageUpload.secure_url
   const doctorData= {
    name,
    email,
    password:hashPassword,
    image:imageUrl,
    degree,
    experience,
    fees,
    speciality,
    about,
    address:JSON.parse(address),
    date:Date.now()
   }

   const newDoctor = new doctorModel(doctorData)
   await newDoctor.save()
   res.json({ success: true ,message:'Doctor Added'})


    
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
  }
}

const adminLogin= async(req,res)=>{
  try {
    const {email,password}= req.body
    if( email === process.env.ADMIN_EMAIL &&  password=== process.env.ADMIN_PASSWORD){
      const token =  jwt.sign(email+password,process.env.JWT_SECRET)
       res.json({success:true,token:token})
    }
    else{
      res.json({success:false,message:'Invalid credentials'})
      
    }
  } catch (error) {
    res.json({success:false,message:error.message})
    
  }
}
//API to get all doctors list 
const getAllDoctors = async (req,res)=>{
  try {
    const doctors= await doctorModel.find({}).select('-password')
    res.json({success:true ,doctors})
  } catch (error) {
    return res.json({success:false,message:error.message})
    
  }

}
const getAdminAppointments= async ( req,res)=>{

  try {
    const appointments= await appointmentModel.find({})
    if(appointments.length === 0 || !appointments ){
      return res.json({success:false ,message:'No appointments booked '})
    }

    res.json( {success :true, appointments})

  } catch (error) {
    console.log(error.message)
    res.json({success:false,message:error.message})
  }

}

const cancleAppointment = async ( req,res)=>{
  try {
    const {appointmentId}=req.body
    const appointmentData=await appointmentModel.findById(appointmentId)
   
    await appointmentModel.findByIdAndUpdate(appointmentId,{canclled:true})
    

  //releasing slot 
  const {docId,slotDate,slotTime}= appointmentData
  
  const docData=await doctorModel.findById(docId)
  const slots_booked = docData.slots_booked

  slots_booked[slotDate]= slots_booked[slotDate].filter(e=>e!==slotTime)
  await doctorModel.findByIdAndUpdate(docId,{slots_booked}) 
  res.json({success:true,message:'Appointment Cancled'})   
  } catch (error) {
    console.log(error.message)
    res.json({success:false,message:error.message})
  }
}

const getDashbordData= async ( req,res)=>{
try {
  const  doctors= await doctorModel.find({})
  const users= await userModel.find({})
  const appointments= await appointmentModel.find({})
  const dashBordData= {
    doctors:doctors.length,
    users:users.length,
    appointments:appointments.length,

    latestAppointments: appointments.reverse().slice(0,5)


  }

  res.json({ success:true,dashBordData})
} catch (error) {
  res.json({success:false,message:error.message})
}

}

export {addDoctors,adminLogin,getAllDoctors,getAdminAppointments,cancleAppointment,getDashbordData}