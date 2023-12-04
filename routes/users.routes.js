const express = require("express");
const { UserModel } = require("../model/user.model");

const userRouter = express.Router();

// Get all users route based on queries
userRouter.get("/contacts", async(req,res)=>{
    const {} = req.query;
    const filter = {};
    try {
        const users = await UserModel.find(filter);
        console.log(users);
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong, plz try again later!!"});
    }
})


// Getting Single User Route
userRouter.get("/contacts/:id", async(req,res)=>{
    const id = req.params.id;
    try {
        const users = await UserModel.findById(id)
        console.log(users);
        res.status(200).send(users ? users : {});
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong, plz try again later!!"});
    }
})

userRouter.post("/contacts", async (req,res)=> {
    const payload = req.body;
    const {name, email, phone, label} = payload;
    if(!name || !email || !phone || !label){
        return res.status(400).send({"msg": "please fill all the fields before creating new user"});
    }
    try {
        const new_user = new UserModel(payload);
        await new_user.save();
        console.log(new_user);
        res.status(200).send(new_user);
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong, plz try again later!!"});
    }
})

userRouter.delete("/contacts/:id", async (req, res)=>{
    const id = req.params.id;
    if(!id){
       return res.status(400).send({"msg":"please provide the id before deleting"});
    }
    try {
        const deleted = await UserModel.findByIdAndDelete(id);
        console.log(deleted);
        res.status(200).send(deleted && {});
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong, plz try again later!!"});
    }
    
})

userRouter.patch("/contacts/:id", async(req,res)=> {
    const id = req.params.id;
    const payload = req.body;
    const {name, email, phone, label} = payload;
    if(!name || !email || !phone || !label){
        return res.status(400).send({"msg": "please fill all the fields before updating the user"});
    }
    try {
        const updated_data = await UserModel.findByIdAndUpdate({_id:id}, payload);
        console.log(updated_data);
        res.status(200).send({"msg":"user updated successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({"msg":"something went wrong, plz try again later!!"});
    }
})


module.exports={
    userRouter
}