const express = require('express')
const app = express();
const mongoose = require("mongoose");
const methodOverride=require("method-override")
app.use(methodOverride("_method"));

const Chat = require("./models/chat.js")

const path = require("path");
let port = 3000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }));


main().then((res) => { console.log("connected successfully") })
    .catch((err) => { "error in connecting" })
async function main() {
    await mongoose.connect('mongodb://127.0.0.1/whatsapp');
}

// let chat1 = new Chat({
//     from: "kismat",
//     to: "kisan",
//     msg: "hey! how are you",
//     created_at: new Date()
// })
// chat1.save().then((res) => { console.log(res) });


app.get("/", (req, res) => {
    res.send("server working dont worry")
})
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", { chats })
})
app.get("/chats/new", (req, res) => {
    res.render("new.ejs")
})
app.post("/chats", (req, res) => {
    let { from, msg, to } = req.body;
    let newChat = new Chat ({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date(),
    });
    newChat.save().then(res => { console.log(res) });
   res.redirect("/chats");
});
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat})
});
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
   let {msg:newmessage}=req.body;
let upadatedChat=  await Chat.findByIdAndUpdate(id,{msg:newmessage},{runValidators:true,new:true})
res.redirect("/chats")
});

app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedChat= await Chat.findByIdAndDelete (id);
    res.redirect("/chats")

})



app.listen(port, (req, res) => { console.log(`server started successfully`) });


