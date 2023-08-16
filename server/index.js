const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const mongoDB = require("./db")
const cors = require('cors')
const path = require('path')
app.use(cors());



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
