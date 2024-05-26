const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

function generatePrefixedId(prefix) {
    return `${prefix}-${uuidv4()}`;
}


const UserComplaintsSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    resolvedImage: {
        type: String,
        default: ""
    },
    text: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resolvedOn: {
        type: Date
    },
    complaintId: {
        type: String,
    },
    comments: {
        type: [{
            user: {
                type: String,
            },
            comment: {
                type: String,
            },
            userId: {
                type: String
            }
        }],
        default: []
    }
})
UserComplaintsSchema.pre('save', function(next) {
    if (!this.complaintId) {
        this.complaintId = this._id.toString();
    }
    next();
});
const UserComplaint = mongoose.models.UserComplaint || mongoose.model("usercomplaint", UserComplaintsSchema);

module.exports = UserComplaint;