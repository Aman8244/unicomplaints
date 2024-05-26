
const {ClerkExpressWithAuth} = require("@clerk/clerk-sdk-node");

const isAuthorize = (req,res,next)=>{
    ClerkExpressWithAuth({});
    next();
}
module.exports = isAuthorize;