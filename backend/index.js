const express = require('express')
const app = express()
const cors = require('cors')
const { agregarPost, obtenerPosts, modificarPosts, eliminarPosts } = require('./controllers/postsController')

app.use(cors())
app.use(express.json())

app.listen(3001, () => {
    console.log("Server is running on port 3001 :)");
});

app.get("/posts", async (req, res) => {
await obtenerPosts(req, res)
});

app.post("/posts", async (req, res) => {
await agregarPost(req,res)
})

app.put("/posts/:id", async (req, res) => {
await modificarPosts(req, res)
});

app.delete("/posts/:id", async (req, res) => {
await eliminarPosts(req, res)
})

