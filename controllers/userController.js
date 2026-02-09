import  {generateToken}  from '../lib/generateToken.js';
import User from '../models/User.js';
import {hashPassword} from '../helpers/hashPassword.js';
import {comparePassword} from '../helpers/comparePassword.js';
import { cookieOptions } from '../options/cookieOptions.js';
import { verifyToken } from '../helpers/verifyToken.js';
export const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        
        const userExistsInName = await User.findOne({name},).lean();
        if(userExistsInName){
            return res.status(400).json({message:'Nama telah digunakan',nameValid:false,emailValid:null,passwordValid:null});
        }
        //cari tanpa memerhatikan huruf besar atau kecil
        const userExistsInEmail = await  User.findOne({ email: { $regex: new RegExp(`^${req.body.email}$`, 'i')}});

         if(userExistsInEmail){
            return res.status(400).json({message:'Email telah digunakan',nameValid:true,emailValid:false,passwordValid:null});
        }
        const hashedPassword = hashPassword(password);
        const user = await  User.create({name,email,password:hashedPassword});

        if(user){
          const payload = {
            _id:user._id,
            username:user.name,
            email:user.email
          }
          const accessToken = generateToken(payload);
          res.status(201).cookie('accessToken',accessToken,cookieOptions).json({message:'Berhasil mendaftar',nameValid:true,emailValid:true,passwordValid:true})
        }
    } catch (error) {
        res.status(500).json({message:"Gagal mendaftar ",error:error.message});
    }
    
}

export const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email}).lean();
        if(!user){
            res.status(400).json({message:'Email tidak ditemukan',emailValid:false,passwordValid:null})
        }
        const passwordCorrect = comparePassword(password,user.password);
        if(!passwordCorrect){
        res.status(400).json({message:'Kata sandi salah',emailValid:true,passwordValid:false});
        }else{
             const payload = {
                _id:user._id,
                username:user.name,
                email:user.email
             }
            const accessToken = generateToken(payload)
            res.status(201).cookie('accessToken',accessToken,cookieOptions).json({message:"Berhasil masuk",emailValid:true,password:true});
        }
    } catch (error) {
        res.status(500).json({message:'Gagal masuk ', error:error.message});
    }
  

}

export const validateTokenUser = async(req,res)=>{
    try {
        const accessToken = req.cookies.accessToken;
        
        if(accessToken){
            //jika token akses ada maka check kevalidan nnya
            const tokenValid = verifyToken(accessToken);
            if(tokenValid){
                res.json({message:"Akses diterima, anda boleh mengakses sumber daya"})
            }else{
                res.status(401).json({message:'Token tidak valid, dilarang mengaksessumber daya, silahkan masuk kembali'})
            }
        }else{
               res.status(401).json({message:'Token tidak ditemukan, dilarang mengakses sumber daya, silahkan masuk kembali'})
        }

    } catch (error) {
        res.status(500).json({message:'Gagal mengecek token',error:error.message})
    }
}