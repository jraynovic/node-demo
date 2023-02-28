1.) Create out package.json the "-y" flag is a shortcut to answer yes to everything
```
npm init -y
```

2.) Set up basic express app 
- express is what handles our requests
- nodemon watches the files for changes and reloads when found
```
npm i express nodemon
```

3.) Add a script to our package.json to run nodemon on start
```
 "scripts": { 
    "test": "echo \"Error: no test specified\" && exit 1", 
    "server":"nodemon server.js" 
  },
```
4.) Create our server.js and the basic express app
```
const express = require("express"); //import express 
const app = express(); //create instance of express 
const PORT = 5001  // assign a port number 
// start our server listening for request
app.listen(PORT, () => { 
    console.log(`App listening on PORT: ${PORT}`); 
});
```
5.) Create first route
```
const express = require("express"); 
const app = express(); 
const PORT = 5001 
app.get('/',(req,res)=>{ 
  res.send('HELLO CODE CONNECTOR!') 
}) 
app.listen(PORT, () => { 
    console.log(`App listening on PORT: ${PORT}`); 
  });
```
6.)Break our routes for organization 
- create new folder in root "routes" then add new file "CCRouter.js"
```
const express = require("express"); 
const CCRouter = express.Router(); //create instance of router 
CCRouter.route('/') // set router to base of route from server.js 
// create get request 
.get((req,res)=>{ 
  res.send('Hello from CCRouter!') 
}) 
module.exports = CCRouter;
```
- in server.js import CCRouter and register route with express app
```
...
const CCRouter = require('./routes/CCRoute');
...
app.use('/cc', CCRouter);
```
7.) Test with application of choice PostMan or ThunderClient 
8.) Add body-parser 
```
npm i body-parser
```
- register body-parser in server.js 
```
...
const bodyparser = require("body-parser");
...
app.use(bodyparser.urlencoded({ extended: false })); 
app.use(bodyparser.json());
```
9.) Create remaining CRUD routes
```
// routes/CCRoute,js
.get((req,res)=>{ 
  res.send('Hello from CCRouter!') 
}) 
.post((req,res)=>{ 
  console.log(req.body) 
  res.send('success') 
}) 
.put((req,res)=>{ 
    console.log(req.body) 
    res.send('success') 
}) 
.delete((req,res)=>{ 
    console.log(req.body) 
    res.send('success') 
})
```
10.) test routes 
11.) add sequelize and sqlite3
```
npm i sequelize sqlite3
```
12.) Create db connection and register with server
- create new file "database.js" in root dir 
```
//database.js
const { Sequelize } = require("sequelize"); 
const sequelize = new Sequelize("codeConnecter", "user", "password", { 
  dialect: "sqlite", 
  host: "./codeConnecterDb.sqlite", 
}); 
module.exports = sequelize;
```
- register in server.js when ran this will create the db if it doesn't exist. It will also sync changes to the models

```
//server.js
...
const sequelize = require('./database')
...
app.use(bodyparser.json());
sequelize.sync().then(() => console.log("db is ready"));
```
13.) Create model for db
- Create dir in root "models"
- inside "models" create "ApplicationModel.js
```
//ApplicationModel.js
const { Model, DataTypes } = require("sequelize"); 
const sequelize = require("../database"); 
class Application extends Model {} 
Application.init( 
  { 
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true,  
    }, 
    company:{ 
      type: DataTypes.STRING, 
      allowNull: false, 
    }, 
    applicationDate:{ 
        type: DataTypes.DATE 
    }, 
    contactName:{ 
      type: DataTypes.STRING, 
    }, 
    contactEmail:{ 
      type: DataTypes.STRING, 
    }, 
    followUpFrequency:{ 
      type: DataTypes.NUMBER, 
    }, 
    lastFollowUp:{ 
        type: DataTypes.DATE 
    }, 
    notes:{ 
      type: DataTypes.STRING, 
    } 
  }, 
  { 
    sequelize, 
    modelName: "Applications", 
  } 
); 
module.exports = Application;
```
14.)Update post route
```
.post(async (req,res)=>{ 
  if(!req.body.company || !req.body.applicationDate){ 
    return res.status(400).json({ error: 'company and application date are required' }); 
  } 
  const application = await Application.create(req.body) 
  res.status(200).send(application) 
})
```
15.) Update get route
```
.get( async(req,res)=>{ 
  const applications = await Application.findAll() 
  res.status(200).send(applications) 
})
```
16.) Update update route
```
.put(async (req,res)=>{ 
    if(!req?.body?.application?.id){ 
        return res.status(400).json({ error: 'id is required' }); 
    } 
    const updatedApplication = await Application.update(req.body.application,{where:{id:req.body.application.id}}) 
    res.status(200).send(updatedApplication) 
})
```
17.) Update delete route
```
.delete(async (req,res)=>{ 
    if(!req?.body?.id){ 
        return res.status(400).json({ error: 'id is required' }); 
    } 
    await Application.destroy({where:{id:req?.body?.id}}) 
    res.sendStatus(200) 
})
```
18.) use route params to delete. Same as above just a different way of handling it. 
```
//delete using route params
CCRouter.route('/:id')
.delete(async (req,res)=>{
    if(!req?.params?.id){
        return res.status(400).json({ error: 'id is required' });
    }
    await Application.destroy({where:{id:req?.params?.id}})
    res.sendStatus(200)
})
```