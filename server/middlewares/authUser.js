import jwt from 'jsonwebtoken';

const authUser = async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
      return res.json({success:false, message: 'Not Authorized'})
    }

    try {
      const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
      if (!req.body) req.body = {};
      if(tokenDecode.id){
        req.body.userId = tokenDecode.id;
      }else{
        return res.json({success:false, message: 'Not Authorized'})
      }
      next();

    } catch (error) {
      console.error(error.message);
        res.json({success:false, message: error.message})
    }
}

export default authUser;