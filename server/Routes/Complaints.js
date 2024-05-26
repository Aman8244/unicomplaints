const express = require("express");

const router = express.Router();
const UserComplaints = require("../Models/UserComplaints");

router.get("/complaints", async(req, res) => {
    // if(!req.auth){
    //     res.json({
    //         message:"Not Authorized"
    //     })
    // }
    const query = UserComplaints.find({})
    const data = await query.then(response=>{
        return response
    })
    res.json({
        complaints:data
    }).status(200)
})
router.post("/complaints", async (req, res) => {
    // if(!req.auth){
    //     res.json({
    //         message:"Not Authorized"
    //     })
    // }
    const data =  req.body;
    const complaint = new UserComplaints({...data});
    await complaint.save();
    
    res.json({
        message: "Complaints Registered!!"
    }).status(200)
})
router.put("/complaints",async(req,res)=>{
    const {image,status,complaintId} = req.body;
    const data = await UserComplaints.findOneAndUpdate({complaintId:complaintId},{
        status:status,
        resolvedImage:image,
    })
    res.json({
        data:data
    })
})

module.exports = router;