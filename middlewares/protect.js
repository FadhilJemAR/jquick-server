import { verifyToken } from "../helpers/verifyToken.js";

export const protect = async(req,res,next)=>{
    try {  
        if(!accessToken){
            res.status(404).json({message:'Tidak ada token, dilarang masuk'})
        }else{
            const tokenValid = verifyToken(accessToken);
            
            if(!tokenValid){
                res.status(400).json({message:'Token tidak valid atau kedaluwarsa'});
            }else{
                next();
            }
        }
    } catch (error) {
        res.status(500).json({message:'Kesalahan middleware otorisasi' ,error:error.message})
    }
    const accessToken = req.cookies.accessToken;
     
}