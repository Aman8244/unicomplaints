const express = require("express");
const router = express.Router();
const UserComplaint = require("../Models/UserComplaints");

router.get("/complaint/:id",async(req,res)=>{
    const {id} = req.params;
    console.log(id)
    const response = UserComplaint.findOne({complaintId:id})
    const data = await response.then((find)=>{
         return find
    })
    res.json({
        findData:data
    });
})

module.exports = router;