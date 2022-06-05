const jwt = require('jsonwebtoken');
const User = require('../model/UserSchema');


require('dotenv').config();

module.exports = async (req, res ,next) => {
    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({_id: verifyToken._id , "Tokens:token" : token});

        if(!rootUser){
            throw new Error('User not Found');
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    }
    catch(error){
            res.status(404).json({
                error: "You need to login first"
            })
    }
    
}
