require('dotenv').config();

const express = require("express");
const router = express.Router();

const db = require("./db")

const app = express()


app.use(require('./middleware/headers'))
const controllers = require("./controllers")

app.use(express.json());

app.use("/user", controllers.usercontroller)



db.authenticate()
    .then(() => db.sync())
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`[Server: ] App is listening on Port ${process.env.PORT}`))
    })
    .catch((err) => {
        console.log("[Server: ] Server Crashed")
        console.log(err)
    })
