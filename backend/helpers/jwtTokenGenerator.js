import jwt from "jsonwebtoken"

export const tokenGenerator=(id,name)=>{
    
    return jwt.sign({id,name},"thisisthesecret",{expiresIn:3600})
}