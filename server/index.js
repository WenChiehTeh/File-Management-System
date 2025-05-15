import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const user = process.env.PGUSER;
const host = process.env.PGHOST;
const database = process.env.PGDATABASE;
const password = process.env.PGPASSWORD;
const pgPort = process.env.PGPORT;

const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: pgPort,
});

app.get('/api/getNotes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notes ORDER BY createdAt DESC')
            res.json(result.rows)
    } catch (err) {
        console.log("An error occured: " + err)
        res.status(500).json({ error: 'Failed to fetch notes' })
    }
})

app.post('/api/createNote', async (req, res) => {
    const { title, content } = req.body
    try {
        const result = await pool.query("INSERT INTO notes(title, content) VALUES($1, $2)", [title, content])
        res.status(200).json({ message: 'Note created' });
    } catch (err) {
        console.log("An error occured: " + err)
        res.status(500).json({ error: 'Failed to create note' });
    }
})

app.delete('/api/deleteNote/:id', async (req,res) => {
    const noteID = req.params.id;
    try {
        await pool.query("DELETE FROM notes WHERE id = $1", [noteID])
        res.status(200).json({ message: 'Note deleted' });
    } catch (err) {
        console.log("An error occured: " + err)
        res.status(500).json({ error: 'Failed to delete note' });
    }
})

app.put('/api/updateNote/:id', async (req,res) => {
    const noteID = req.params.id;
    const {title, content} = req.body;
    try {
        await pool.query("UPDATE notes SET title = $2, content = $3, createdat = NOW() WHERE id = $1", [noteID, title, content])
        res.status(200).json({ message: 'Note updated' });
    } catch (err) {
        console.log("An error occured: " + err)
        res.status(500).json({ error: 'Failed to update note' });
    }
})


app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
