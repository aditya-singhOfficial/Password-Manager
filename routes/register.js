const express = require("express");
const Router= express.Router();

Router.use(express.json());
Router.use(express.urlencoded({extended:true}));

Router.post("/register", (req, res)=>{
    
})