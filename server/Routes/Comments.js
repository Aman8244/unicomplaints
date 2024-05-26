const express = require("express");
const router = express.Router();
const UserComplaints = require("../Models/UserComplaints")
router.post("/post/comment", async (req, res) => {
    const { user, comment, complaintId, userId } = req.body;
    const data = await UserComplaints.findOneAndUpdate({ complaintId: complaintId }, {
        $push: {
            comments: {
                user: user,
                comment: comment,
                userId: userId
            }
        }
    }).catch(err => {
        console.log("Error occured ", err)
    })
    res.json({
        data: data
    })
})
router.post("/post/comment/delete", async (req, res) => {
    const { userId, comment } = req.body;
    console.log(req.body)
    const data = await UserComplaints.findOneAndUpdate({
        'comments.userId': userId,
        'comments.comment': comment
    }, {
        $pull: {
            comments: {
                userId: userId,
                comment: comment
            }
        }
    }).catch(err => {
        console.log(err)
    })
    console.log(data)
    res.json({
        data: data
    })
})
module.exports = router