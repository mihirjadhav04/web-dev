import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Welcome in the Express World!")
})

app.get('/youtube', (req,res) => {
    res.send("Welcome to my Youtube Channel!")
})

app.listen(port, () => {
    console.log(`Server app listening on port ${port}..`);
    
})