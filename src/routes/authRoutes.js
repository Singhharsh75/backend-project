import db from '../db.js'
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const router=express.Router()

router.post('/register',(req,res)=>{
    const {username,password}=req.body;
    const hashedPassword=bcrypt.hashSync(password);

    try {
        const initializingCommand=db.prepare(`
            INSERT INTO users (username,password) VALUES (?,?)     
        `);

        const result=initializingCommand.run(username,hashedPassword);
        const defaultTask='Enter a task for your to-do list :)'
        const initializedTodoCommand=db.prepare(`
            INSERT INTO todos (user_id,task) VALUES(?,?)
        `)
        const final=initializedTodoCommand.run(result.lastInsertRowid,defaultTask)


        const token=jwt.sign({id:result.lastInsertRowid},process.env.JWT_SECRET,{expiresIn:'24h'});

        res.json({token})

    } catch (error) {
        console.log(error.message);
        res.sendStatus(503);
    }
});

router.post('/login',(req,res)=>{
    res.sendStatus(200)
});

export default router;