import { db } from "../dbConf.js";
import bcrypt from "bcryptjs";
import { tokenGenerator } from "../helpers/jwtTokenGenerator.js";
import jwt from "jsonwebtoken"


export const signin = async (req, res) => {
  try {
    const query1 = "SELECT * FROM user WHERE email=?;";
    let x = null
    await db.execute(query1, [req.body.email], (err, data) => {
      if (data.length == 0) {
        return res.status(401).json("Invalid credentials");
      } else {
        x=data
        nextstep();
      }
    });

    async function nextstep() {
      const result = await bcrypt.compare(req.body.password, x[0].password);
      if(result){
        const token = tokenGenerator(x[0].id,x[0].name);
        return res.json(token)
      }
      else{
        return res.status(401).json("Invalid credentials");
      }
    }
  } catch (error) {}
};

export const signout = async (req, res) => {
  res.json("logout success");
};

export const signup = async (req, res) => {
  try {
    const query1 = "SELECT * FROM user WHERE email=?;";
  
    await db.execute(query1, [req.body.email], (err, data) => {
      if (data.length) {
        return res.status(409).json("This email is taken");
      } else {
        nextstep()
      }
    });

    async function nextstep() {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const query2 =
        "INSERT INTO user(`name`,`email`,`password`) VALUES(?,?,?);";
      const values = [req.body.name, req.body.email, hashPassword];

      await db.execute(query2, values, (err, data) => {
        if (data.affectedRows) {
          return res.json("Your account is created");
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong");
  }
};

export const verify=async (req,res)=>{
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json("Unauthorized access");
    }
    
    const payload = jwt.verify(jwtToken,"thisisthesecret");
    const user={
      id:payload.id,
      name:payload.name
    }
    return res.json(user)
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong")
  }
}
