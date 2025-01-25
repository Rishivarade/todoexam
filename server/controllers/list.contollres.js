const Listmodel = require("../models/list.model")
//add controller
const addTodo = async (req, res) => {
    const { title } = req.body
    if (!title) (
        res.status(400).json({ message: "Please enter a title" })
    )
    try {
        await Listmodel.create({ title })
        res.status(201).json({ message: "Todo list created successfully" })
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: error })

    }

}
//delete controller
const deleteTodo = async (req, res) => {
    const { listId } = req.params
    try {
        const isIdExist = await Listmodel.findById({ listId })
        if (!isIdExist) {
            res.status(404).json({ message: "List not found" })
        }
        await Listmodel.findByIdAndDelete(listId)
        res.status(201).json({ message: "Todo deleted successfully" })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error })

    }

}
//edit controller
const editTodo = async (req, res) => {
    const { listId } = req.params
    const { title } = req.body
    try {
        const isIdExist = await Listmodel.findById({ listId })
        if (!isIdExist) {
            res.status(404).json({ message: "List not found" })
        }
        await Listmodel.findByIdAndUpdate(listId, { title })
        res.status(201).json({ message: "Todo updated successfully" })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error })

    }
}
//get todo list
const getTodoList = async (req, res) => {
    try {
        const list = await Listmodel.find()
        res.status(200).json({ message: "Todo list get successfully", List: list })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error })

    }
}


module.exports = { addTodo, deleteTodo, editTodo, getTodoList }