import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
  const {sellerToken} = req.cookies;

  if(!sellerToken){
    return res.json({success: false, message: 'Not Authorized'});
  }

  try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET)
        //if (!req.body) req.body = {};
        if(tokenDecode.email === process.env.SELLER_EMAIL){
          next();
        }else{
          return res.json({success:false, message: 'Not Authorized'})
        }
        
  
      } catch (error) {
        //console.error(error.message);
          res.json({success:false, message: error.message})
      }

}

export default authSeller;