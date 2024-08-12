import express from 'express';
import mongoose from 'mongoose';
import Blog from '../models/Blog.js';

const blogRouter = express.Router();

// Rotta per cercare blog per titolo
blogRouter.get('/blogPosts', async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).send({ message: 'Titolo non fornito' });
        }

        // Trova il blog post con il titolo specificato
        const blogPost = await Blog.findOne({ title: title });

        if (!blogPost) {
            return res.status(404).send({ message: 'Nessun post trovato con questo titolo' });
        }

        res.send(blogPost);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore del server' });
    }
});

// Rotta per ottenere tutti i blog, con paginazione
blogRouter.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 3;

        const blogs = await Blog.find({})
            .sort({ title: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        const totalResults = await Blog.countDocuments();
        const totalPages = Math.ceil(totalResults / perPage);

        res.send({
            dati: blogs,
            totalPages,
            totalResults,
            page,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore del server' });
    }
});

// Rotta per ottenere un blog tramite ID
blogRouter.get('/:blogId', async (req, res) => {
    try {
        const id = req.params.blogId;

        const blog = await Blog.findById(id);
        if (!blog) res.status(404).send({ message: 'Blog non trovato' });
        else res.send(blog);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore del server' });
    }
});

// Rotta per creare un nuovo blog
blogRouter.post('/', async (req, res) => {
    try {
        const blogData = req.body;
        blogData._id = new mongoose.Types.ObjectId();
        const newBlog = new Blog(blogData);

        const createdBlog = await newBlog.save();
        res.status(201).send(createdBlog);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: 'Errore nella creazione del blog' });
    }
});

// Rotta per aggiornare un blog tramite ID
blogRouter.put('/:blogId', async (req, res) => {
    try {
        const id = req.params.blogId;
        const blogData = req.body;

        const blog = await Blog.findByIdAndUpdate(id, blogData, { new: true });
        if (!blog) res.status(404).send({ message: 'Blog non trovato' });
        else res.send(blog);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore del server' });
    }
});

// Rotta per eliminare un blog tramite ID
blogRouter.delete('/:blogId', async (req, res) => {
    try {
        const id = req.params.blogId;
        await Blog.findByIdAndDelete(id);
        res.send({ message: 'Blog eliminato' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore del server' });
    }
});

export default blogRouter;
