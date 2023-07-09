const express =  require('express');
const app = express()
const port = 5000;
const mongoDB = require("./db")

mongoDB();


app.get('/', function (req , res) {
    res.send("hello shweta")
    
})

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next(); 
  });

app.use(express.json());
app.use('/api', require("./routes/Createuser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData"));



app.listen(port , function () {
    console.log(`Server is running on port ${port}`)
})