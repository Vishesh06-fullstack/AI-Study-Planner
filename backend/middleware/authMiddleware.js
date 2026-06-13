const jwt = require("jsonwebtoken");

const protect = (req , res , next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        console.log(req.headers.authorization);
        if(!token){
            return res.status(401).json({message : "Not authorized" })
        }
        const decord = jwt.verify(token , process.env.JWT_SECRET);
        console.log(decord);
        req.user = decord;
        console.log(req.user);
        next();

    }catch (err){
        return res.status(401).json({message : "Not authorized"})
    }
}
module.exports = protect;