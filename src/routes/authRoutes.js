import prisma from '../../prismaDb.js'
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const router=express.Router()

router.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    const hashedPassword=bcrypt.hashSync(password);

    try {
        const user=await prisma.user.create({
            data:{
                username,
                password:hashedPassword
            }
        })
        const defaultTask='Enter a task for your to-do list :)'
        
        const todoAdded=await prisma.todo.create({
            data:{
                user_id:user.id,
                task:defaultTask,
            }
        })


        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'24h'});

        res.json({token})

    } catch (error) {
        console.log(error.message);
        res.sendStatus(503);
    }
});

router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    try {
        const user=await prisma.user.findUnique({
            where:{
                username:username
            }
        })

        const isValidPassword=bcrypt.compareSync(password,user.password);
        if(!isValidPassword){
            return res.status(401).json({message:'invalid password'});
        }

        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'24h'});

        res.json({token});

    } catch (error) {
        console.log(error.message);
        res.sendStatus(503);
    }
});

export default router;