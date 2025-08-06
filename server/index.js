const express = require("express");
const app = express();
const cors = require("cors");
const Database = require("./Database/Database");
const Allrouters = require("./router/Router");

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/product', express.static("./Uploads"));


app.listen(5555, () => {
    Database()
    console.log(`${5555} is connected`)
})

app.use("/", Allrouters)

app.get("/Veda_global",  (req, res) => {
 
    res.send("Dosel Technologies")
})