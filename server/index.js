const express = require("express")
const connection = require("./utils/db")
const listrouter = require("./routes/list.routes")
const cors=require("cors")
const app = express()


app.use(express.json())
app.use(cors())
const port = 3000
app.use("/todo",listrouter)

app.listen(port, async () => {
    try {
        await connection
        console.log("connected to db")
        console.log(`Server is running on port ${port}`)
    } catch (error) {
        console.log(error)

    }

})