const express = require("express")
const { addTodo, deleteTodo, editTodo, getTodoList } = require("../controllers/list.contollres")

const listrouter = express.Router()

//post todo list
listrouter.post("/create",addTodo)

//get todolist
listrouter.get("/",getTodoList)

//edit
listrouter.patch("/edit/:listId",editTodo)

//delete
listrouter.delete("/delete/:listId",deleteTodo)

module.exports=listrouter