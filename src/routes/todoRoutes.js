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
    const {task}=req.body;
    const insertTodo=db.prepare('INSERT INTO todos (user_id,task) VALUES (?,?)');
    const result=insertTodo.run(req.userId,task);
    res.status(201).json({message:'Todo added',id:result.lastInsertRowid,task,completed:0});
})

router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {task,completed}=req.body;
    const putTodo=db.prepare(`UPDATE todos SET completed=? WHERE id=?`);
    putTodo.run(completed,id);

    res.json({"message":'Todo completed'})
})

router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    const deleteTodo=db.prepare('DELETE FROM todos WHERE id=? AND user_id=?');
    deleteTodo.run(id,req.userId);
    res.json({"message":'Todo deleted'});
})

export default router;