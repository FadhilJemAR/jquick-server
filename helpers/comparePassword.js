import bcrypt from  'bcrypt';

export const comparePassword = (password,hashedPassword)=>{
    return bcrypt.compareSync(password,hashedPassword);
}