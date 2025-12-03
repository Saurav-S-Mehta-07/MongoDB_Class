const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));

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

app.get("/",(req,res)=>{
    res.send("This is a home page");
})

app.listen(8080,()=>{
    console.log("Listening to the Port: 8080");
})