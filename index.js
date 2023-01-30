const express = require ("express")
const app = express ()
const helmet = require("helmet");
var morgan = require('morgan')
const mongoose = require ("mongoose")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const postRoute = require ("./routes/post") 
const chatRoute = require("./routes/ChatRoute")

require('dotenv').config()

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL).then(
    console.log("Database connected")).catch(err=>{
        console.log(err);
    })


    const io =  require("socket.io")(8800, {
        cors : {
            origin :"http://localhost:3000"
        }
    })
    
    // const httpServer = require("http").createServer();

    // const io = require("socket.io")(httpServer, {
    //     cors: {
    //     origin :"http://localhost:3000",
    //       methods: ["GET", "POST"]
    //     }
    //   });
    
    let activeUsers = []
    
    io.on("connection" , (socket)=> {
        //add a new user
        socket.on("new-user-add",(newUserId)=> {
            if(!activeUsers.some((user)=> user.userId === newUserId))
            {
                activeUsers.push( {
                    userId:newUserId,
                    sockedId:socket.id
                })
            }
            console.log("Connected users",activeUsers);
            io.emit("get-users",activeUsers)
        })
    
        
        
    
        //send message
    
        socket.on("send-message",(data)=> {
            const {receiverId} = data;
            const user = activeUsers.find((user)=>user.userId === receiverId)
            console.log("sending data fro socket to :", receiverId);
            console.log("data",data);
            if(user) {
                io.to(user.sockedId).emit("receive-message",data)
            }
        })
    
        socket.on("disconnect", ()=> {
            activeUsers = activeUsers.filter((user)=> user.sockedId !== socket.id)
            console.log("User Disconnected", activeUsers);
            io.emit("get-users",activeUsers)
        })
    })






//middlewears
app.use(express())
app.use(helmet())
app.use(morgan('combined'))
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

app.use("/api/user",userRoute)

app.use("/api/auth",authRoute)

app.use("/api/post",postRoute)

app.use("/api/chat",chatRoute)

// app.listen(process.env.PORT || 5000,()=> {
//     console.log("server is up and running at port number 5000");
// })

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});