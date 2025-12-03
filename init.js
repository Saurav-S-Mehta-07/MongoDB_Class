const mongoose  = require("mongoose");
const Chat = require("./models/chat.js");

main().then(()=>{
    console.log("MongoDB connected successfully");
}).catch(err=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let chats = [
    {
        from : "Saurav",
        to : "Mayank",
        message : "hello",
        created_at : new Date()
    },
        {
        from : "Gaurav",
        to : "Mayank",
        message : "hello",
        created_at : new Date()
    },
        {
        from : "Sharma",
        to : "mehta",
        message : "hello",
        created_at : new Date()
    },
        {
        from : "karan",
        to : "rohit",
        message : "hello",
        created_at : new Date()
    },
        {
        from : "sachin",
        to : "rahul",
        message : "hello",
        created_at : new Date()
    },
        {
        from : "neha",
        to : "nidhi",
        message : "hello",
        created_at : new Date()
    },
        {
        from : "suresh",
        to : "harry",
        message : "hello",
        created_at : new Date()
    }
];

Chat.insertMany(chats);