import express from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from "../../prismaDb.js";


const router=express.Router();

router.get('/',async(req,res)=>{
    const todos=await prisma.todo.findMany({
        where:{
            user_id:req.userId
        }
    })
    res.json(todos);
})

router.post('/',async(req,res)=>{
    const {task}=req.body;
    const result=await prisma.todo.create({
        data:{
            user_id:req.userId,
            task,
        }
    })
    res.status(201).json({message:'Todo added',id:result.lastInsertRowid,task,completed:0});
})

router.put('/:id',async(req,res)=>{
    const {id}=req.params;
    const {task,completed}=req.body;
    const putTodo=await prisma.todo.update({
        where:{
            user_id:req.userId,
            id:parseInt(id)
        },
        data:{
            completed:!!completed
        }
    })

    res.json({"message":'Todo completed'})
})

router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    await prisma.todo.delete({
        where:{
            id:parseInt(id),
            user_id:req.userId
        }
    })
    res.json({"message":'Todo deleted'});
})

export default router;