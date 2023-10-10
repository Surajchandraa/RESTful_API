const express = require("express");
require("./src/db/connection");
const model = require("./src/models/schemas")

const app = express();
app.use(express.json())
const port = process.env.port || 5000;


app.post("/add",async(req,res)=>{
   try{
   let dataset= new model(req.body);
   let data = await dataset.save()
   res.status(201).send(data) //the statuscode 201 is used to indicate when we are sending data to the database
   }
   catch(err){
      res.status(400).send(err)
   }
})


app.get("/",async(req,res)=>{
   try{
      let read=await model.find();
      res.status(201).send(read)
   }
   catch(e){
      res.status(400).send(e)
   }
})

app.put("/update/:ranking",async(req,res)=>{
   try{
      let read = await model.updateOne(
         {ranking: req.params.ranking},
         {$set: req.body}
      );

      res.status(201).send(read)
   }
   catch(err){
   res.send(req.params.ranking)
      res.status(400).send(err)
   }


})

app.delete("/delete/:ranking",async(req,res)=>{
   try{
      let del = await model.deleteOne({
         ranking:req.params.ranking
      }
      )
      res.status(201).send(del)
   }
   catch(err){
      res.status(400).send(err)
   }
})

 app.listen(port,()=>{
   console.log("running at http://localhost:5000")
 })