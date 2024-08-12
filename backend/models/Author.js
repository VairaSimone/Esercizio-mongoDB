// models/Author.js
import mongoose, { Schema, model } from 'mongoose';

const authorSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        nome: {
            type: String,
            minLength: 3,
            maxLength: 20,
        },
        cognome: {
            type: String,
            minLength: 3,
            maxLength: 20,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        dataNascita: {
            type: Date,
        },
        avatar: {
            type: String,
        },
    },
    {
        collection: 'author',
    }
);

const Author = model('Author', authorSchema);
export default Author;
