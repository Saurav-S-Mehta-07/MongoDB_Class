const mongoose = require('mongoose');

main().then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age : Number
});

const User = mongoose.model("User",userSchema);

User.insertMany([
    {name:"gaurav",email:"gaurav@gmail.com", age : 22},
    {name: "mayank",email:"mayank@gmail.com",age:21},
    {name:"harry",email: "harry@gmail.com",age:30}
])
.then((res)=>{
    console.log(res);
})
.catch(err=>console.log(err));


User.find().then((data)=>{
    console.log(data);
})

User.findById({_id:"692d4c7204469094dfeabfa1"})
.then(data=>console.log(data));