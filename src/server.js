import express from "express";
import path,{dirname} from 'node:path'
import { fileURLToPath } from "node:url";
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

const app=express();
const PORT=process.env.PORT||5001;

const _filename=fileURLToPath(import.meta.url);

const _dirname=dirname(_filename);

app.use(express.static(path.join(_dirname,'../public')));
app.use(express.json());


app.get('/',(req,res)=>{
    res.sendFile(path.join(_dirname,'../public','index.html'));
})

app.use('/auth',authRoutes);
app.use('/todo',todoRoutes);

app.listen(PORT,()=>{
    console.log(`Server listening to PORT : ${PORT}`);
})