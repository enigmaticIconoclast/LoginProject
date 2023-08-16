import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import db from "./db/conn.mjs";
import { ObjectId } from "mongodb";


const app = express();

app.use(cors());

app.use(bodyParser.json());

//routes
app.get("/", (req, res) => res.send("Hello, World!"));
app.post("/create", async (req, res)=>{
    let newDocument = {
        username: req.body.userName,
        salt: req.body.saltScore,
        password: req.body.password,
        usertype: req.body.userType,
    };
    let collection = await db.collection("Users");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

app.post('/login-user', async(req,res)=>{
    let collection = await db.collection("Users");
    let query = {username: req.body.username};
    let result = await collection.findOne(query);

    if(!result) res.send({saltScore: null}).status(404);
    else{
        let salt = result.salt;
        res.send({saltScore: salt}).status(200);
    } 
});

app.post('/login-password', async(req,res)=>{
    let collection = await db.collection("Users");
    let query = {username: req.body.userName};
    let result = await collection.findOne(query);

    if(!result) res.send({signedIn: false}).status(404);
    else if(req.body.password === result.password)res.send({signedIn: true}).status(200);
    else res.send({signedIn: false}).status(404);
});
app.listen(4000, ()=>{
    console.log("Server is running on http://localhost:4000")
});