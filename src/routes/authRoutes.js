import db from '../db.js'
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const router=express.Router()

router.post('/register',(req,res)=>{res.sendStatus(200)});

router.post('/login',(req,res)=>{res.sendStatus(200)});

export default router;