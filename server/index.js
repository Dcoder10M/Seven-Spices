const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const mongoDB = require("./db")
const cors = require('cors')
const path = require('path')
app.use(cors());

//mongoose.connect('mongodb://Folapo:Novasquad29@ac-qbujkez-shard-00-00.ir2w7k0.mongodb.net:27017,ac-qbujkez-shard-00-01.ir2w7k0.mongodb.net:27017,ac-qbujkez-shard-00-02.ir2w7k0.mongodb.net:27017/Folapo?ssl=true&replicaSet=atlas-lznhwz-shard-0&authSource=admin&retryWrites=true&w=majority')



mongoDB;
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//serving up static files
app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, "./client/build"))
})
