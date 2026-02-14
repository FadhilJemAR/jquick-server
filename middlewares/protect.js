import { verifyToken } from "../helpers/verifyToken.js";

export const protect = async(req,res,next)=>{
    try {  
        const accessToken = req.cookies.accessToken;
        if(!accessToken){
            res.status(404).json({message:'Tidak ada token, request atau permintaan ditolak'})
        }else{
            const tokenValid = verifyToken(accessToken);
            
            if(!tokenValid){
                res.status(400).json({message:'Token tidak valid atau kedaluwarsa'});
            }else{
                //teruskan data userId yang diambil dari payload hasil decode token JWT
                req.userId = tokenValid._id
                next();
            }
        }
    } catch (error) {
        res.status(500).json({message:'Kesalahan middleware otorisasi' ,error:error.message})
    }
     
}