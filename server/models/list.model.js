const mongoose=require("mongoose")

const listschema=mongoose.Schema({
    title:{
        type:String,
        required:true
    }
},{
    timestamps:false,
    versionKey:false
})
const Listmodel=mongoose.model("List",listschema)

module.exports=Listmodel