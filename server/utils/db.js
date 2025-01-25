const mongoose=require("mongoose")

const connection=mongoose.connect("mongodb+srv://varadehrushikesh87:mongodb@cluster0.k1vrx.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0")

module.exports=connection

