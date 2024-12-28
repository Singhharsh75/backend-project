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
        initializedTodoCommand.run(result.lastInsertRowid,defaultTask)


        const token=jwt.sign({id:result.lastInsertRowid},process.env.JWT_SECRET,{expiresIn:'24h'});

        res.json({token})

    } catch (error) {
        console.log(error.message);
        res.sendStatus(503);
    }
});

router.post('/login',(req,res)=>{
    const {username,password}=req.body;
    try {
        const getUser=db.prepare(`SELECT * FROM users WHERE (username)= ?`)
        const user=getUser.get(username);
        if(!user){
            return res.status(401).json({message:'User not found'})
        }

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