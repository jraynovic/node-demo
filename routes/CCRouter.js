const express = require("express");
const CCRouter = express.Router(); //create instance of router
const Application = require('../models/ApplicationModel')

CCRouter.route('/') // set router to base of route from server.js
.get( async(req,res)=>{
  const applications = await Application.findAll()
  res.status(200).send(applications)
})
.post(async (req,res)=>{
  if(!req.body.company || !req.body.applicationDate){
    return res.status(400).json({ error: 'company and application date are required' });
  }
  const application = await Application.create(req.body)
  res.status(200).send(application)
})
.put(async (req,res)=>{
    if(!req?.body?.application?.id){
        return res.status(400).json({ error: 'id is required' });
    }
    const updatedApplication = await Application.update(req.body.application,{where:{id:req.body.application.id}})
    res.status(200).send(updatedApplication)
})
.delete(async (req,res)=>{
    if(!req?.body?.id){
        return res.status(400).json({ error: 'id is required' });
    }
    await Application.destroy({where:{id:req?.body?.id}})
    res.sendStatus(200)
})

//delete using route params
CCRouter.route('/:id')
.delete(async (req,res)=>{
    if(!req?.params?.id){
        return res.status(400).json({ error: 'id is required' });
    }
    await Application.destroy({where:{id:req?.params?.id}})
    res.sendStatus(200)
})

module.exports = CCRouter;