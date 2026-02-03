import  {generateToken}  from '../lib/generateToken.js';
import User from '../models/User.js';
import {hashPassword} from '../helpers/hashPassword.js';
import {comparePassword} from '../helpers/comparePassword.js';
import { cookieOptions } from '../options/cookieOptions.js';
export const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        
        const userExists = await User.findOne({email}).lean();
        if(userExists){
            return res.status(400).json({message:'Pengguna sudah ada atau Email sudah digunakan'});
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
          res.status(201).cookie('accessToken',accessToken,cookieOptions).json({message:'Berhasil mendaftar'})
        }else{
            res.status(400).json({message:'Data tidak valid'});
        }
    } catch (error) {
        res.status(500).json({message:"Gagal mendaftar ",error:error.message});
    }
    
}

export const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email}).lean();

        const passwordCorrect = comparePassword(password,user.password);
        if(!passwordCorrect){
        res.status(400).json({message:'Kata sandi salah'});
        }else{
             const payload = {
                _id:user._id,
                username:user.name,
                email:user.email
             }
            const accessToken = generateToken(payload)
            res.status(201).cookie('accessToken',accessToken,cookieOptions).json({message:"Berhasil masuk"})
        }
    } catch (error) {
        res.status(500).json({message:'Gagal masuk ', error:error.message});
    }
  

}