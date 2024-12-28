import db from "../db.js";
import express from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router=express.Router();

router.get('/',(req,res)=>{
    const todosPrepare=db.prepare(`SELECT * FROM todos WHERE (user_id) = ?`);
    const todos=todosPrepare.all(req.userId);
    res.json(todos);
})

router.post('/',(req,res)=>{
    
})

router.put('/:id',(req,res)=>{})

router.delete('/:id',(req,res)=>{})

export default router;