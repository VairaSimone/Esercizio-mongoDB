// server.js
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import authorRouter from './router/author.router.js';
import blogRouter from './router/blog.router.js';

const port = process.env.PORT || 5000;

const app = express();

mongoose
    .connect(process.env.MONGO_STRING)
    .then(() => console.log('Database connesso!'))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/authors', authorRouter);
app.use('/blogs', blogRouter);

app.listen(port, () => {
    console.log(`Server avviato su ${process.env.HOST}:${port}`);
});
