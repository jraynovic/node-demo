const express = require("express");
const CCRouter = require('./routes/CCRoute');
const bodyparser = require("body-parser");
const sequelize = require('./database')
const app = express();

const PORT = 5001

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

sequelize.sync().then(() => console.log("db is ready"));

app.use('/cc', CCRouter)

app.get('/',(req,res)=>{
  res.send('HELLO CODE CONNECTOR!')
})

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});