const mongoose = require("mongoose");
const Chat = require("./models/chat.js")

main().then((res) => { console.log("connected successfully") })
    .catch((err) => { "error in connecting" })
async function main() {
    await mongoose.connect('mongodb://127.0.0.1/whatsapp');
}

let allchats=[{   
    from:"kiss",
to:"kisu",
msg:"hey! how are you bebs",
created_at: new Date()
},
{
    from:"kismat22",
to:"kisan10",
msg:"hey! how are you hero",
created_at: new Date()
},
{
    from:"saubhagya",
to:"sarbesh",
msg:"kay khayaga",
created_at: new Date()
},];
Chat.insertMany(allchats);





Chat.insertMany
    