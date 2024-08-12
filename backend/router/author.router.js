// router/author.router.js
import express from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author.js';

const authorRouter = express.Router();

authorRouter.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 3;

        const authors = await Author.find({})
            .sort({ nome: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        const totalResults = await Author.countDocuments();
        const totalPages = Math.ceil(totalResults / perPage);

        res.send({
            dati: authors,
            totalPages,
            totalResults,
            page,
        });
    } catch (err) {
        res.status(500).send();
    }
});

authorRouter.get('/:authorId', async (req, res) => {
    try {
        const id = req.params.authorId;

        const author = await Author.findById(id);
        if (!author) res.status(404).send();
        else res.send(author);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Not Found' });
    }
});

authorRouter.post('/', async (req, res) => {
    try {
        const authorData = req.body;
        authorData._id = new mongoose.Types.ObjectId();
        const newAuthor = new Author(authorData);

        const createdAuthor = await newAuthor.save();
        res.status(201).send(createdAuthor);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: 'qualcosa non va' });
    }
});

authorRouter.put('/:authorId', async (req, res) => {
    try {
        const id = req.params.authorId;
        const authorData = req.body;

        const author = await Author.findByIdAndUpdate(id, authorData, { new: true });
        res.send(author);
    } catch (err) {
        res.status(500).send();
    }
});

authorRouter.delete('/:authorId', async (req, res) => {
    try {
        const id = req.params.authorId;
        await Author.findByIdAndDelete(id);
        res.send({ message: 'utente eliminato' });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});


import Blog from '../models/Blog.js';

authorRouter.get('/:authorId/blogPosts', async (req, res) => {
    try {
        const authorId = req.params.authorId;

        const blogPosts = await Blog.find({ author: authorId });

        if (!blogPosts || blogPosts.length === 0) {
            return res.status(404).send({ message: 'Nessun post trovato per questo autore' });
        }

        res.send(blogPosts);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore del server' });
    }
});


export default authorRouter;
