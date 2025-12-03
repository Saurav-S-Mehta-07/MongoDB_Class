const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const Chat = require("./models/chat.js");

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

app.get("/chats",async (req,res)=>{
   let chats = await Chat.find();
   res.render("index", {chats});
})

app.get("/chats/new",(req,res)=>{
    res.render("new");
})

app.post("/chats",async(req,res)=>{
    let {from, to, message} = req.body;
    let newChat = new Chat({
        from : from,
        to : to,
        message : message,
        created_at : new Date()
    });
    await newChat.save();
    res.redirect("/chats");
})

app.get("/chats/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit",{chat});
})

app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let {message} = req.body;
    let update_time = new Date();

    let chat = await Chat.findByIdAndUpdate(id,{message:message, created_at:update_time},{runValidators:true, new : true});
    res.redirect("/chats");
})

app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

app.get("/",(req,res)=>{
    res.send("This is a home page");
})

app.listen(8080,()=>{
    console.log("Listening to the Port: 8080");
})