const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const Chat = require("./models/chat.js");
const ExpressError = require('./ExpressError');

app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("MongoDB connected successfully");
}).catch(err=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}



app.get("/chats",asyncWrap(async (req,res,next)=>{
     let chats = await Chat.find();
     res.render("index", {chats});
}));


app.get("/chats/new",(req,res)=>{
    res.render("new");
})

app.post("/chats",asyncWrap(async(req,res,next)=>{
     let {from, to, message} = req.body;
     let newChat = new Chat({
        from : from,
        to : to,
        message : message,
        created_at : new Date()
     });
     await newChat.save();
     res.redirect("/chats");
}));

app.get("/chats/:id/edit",asyncWrap(async(req,res,next)=>{
        let {id} = req.params;
        let chat = await Chat.findById(id);
        res.render("edit",{chat});
}));

app.put("/chats/:id",asyncWrap(async(req,res,next)=>{
    let {id} = req.params;
    let {message} = req.body;
    let update_time = new Date();

    let chat = await Chat.findByIdAndUpdate(id,{message:message, created_at:update_time},{runValidators:true, new : true});
    res.redirect("/chats");
}))

app.delete("/chats/:id",asyncWrap(async(req,res,next)=>{
        let {id} = req.params;
        await Chat.findByIdAndDelete(id);
        res.redirect("/chats");
}));
 
//show route
app.get("/chats/:id",asyncWrap(async(req,res,next)=>{
        let {id} = req.params;
        let chat = await Chat.findById(id);
        if(!chat){
          return next(new ExpressError(404, "Chat not found"));
        }
        res.render("show.ejs",{chat});
}));


app.get("/",(req,res)=>{
    res.send("This is a home page");
})

//error handler
function asyncWrap(fn){
    return function (req,res,next){
        fn(req,res,next).catch(err => next(err));
    }
}

//

const handleValidationError = (err)=>{
     console.log("This was a Validation Error. Please follow roules");
     console.log(err.message);
     return err;
}

//error handling middleware
app.use((err,req,res,next)=>{
    if(err.name === "ValidationError"){
       err = handleValidationError(err);
    }
    next(err);
})
//error handling middleware
app.use((err,req,res,next)=>{
    let {status = 500, message = "some error occured"} = err;
    res.status(status).send(message);
})

app.listen(8080,()=>{
    console.log("Listening to the Port: 8080");
})