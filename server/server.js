const express = require("express");
const app = express();
const complaintsRoutes = require("./Routes/Complaints");
const FindComplaintRoutes = require("./Routes/FindComplaint");
const DbConnection = require("./DBConfig/DbConfig");
const isAuthorize = require("./Middleware/IsAuthorize");
const CommentRoutes = require("./Routes/Comments")
const cors = require("cors")
app.use(express.json());
app.use(cors());
const connection =  DbConnection();
if(!connection){
    console.error("database not connected");
}
// app.use(isAuthorize);

app.use(complaintsRoutes);
app.use(FindComplaintRoutes);
app.use(CommentRoutes)
app.listen(8000,()=>{
    console.log("server listening at port 8000")
})