import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import fs from 'fs';
import Post from './models/Post.js';
import User from './models/User.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const upload = multer({dest:'uploads/'});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());

dotenv.config();


const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET;
const salt = bcrypt.genSaltSync(10);


//REGISTER
app.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);
    } catch (error) {
        console.error(error);
        res.status(500).json('An error occurred while registering the user');
    }
})

//LOGIN
app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const userDoc = await User.findOne({username});
        if(!userDoc) {
            return res.status(400).json('User not found');
        }

        const passOk = bcrypt.compareSync(password, userDoc.password);

        if(passOk) {
            jwt.sign({ username, id: userDoc._id }, SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json({
                    id: userDoc._id,
                    username
                });
            })
        } else {
            res.status(400).json('Wrong credentials');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('An error occurred during login');
    }
})

//PROFILE
app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, SECRET, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    })
})

//LOGOUT
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

//READ
app.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json('An error occurred while fetching the posts');
    }
});

//CREATE
app.post('/create', upload.single('picture'), async (req, res) => {
    try {
        const { description } = req.body;
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        const newPath = path+'.'+ext;
        fs.renameSync(path,newPath)

        const newPost = new Post({
            description,
            picturePath: newPath
        });
        await newPost.save();
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (error) {
        console.error(error)
        res.status(500).json('An error occurred while creating the post');
    }
});

//DELETE
app.post('/delete', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.body._id);
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json('An error occurred while deleting the post');
    }
})

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    });
