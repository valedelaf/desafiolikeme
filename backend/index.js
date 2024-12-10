const { agregarPost, obtenerPosts, eliminarPosts, modificarPosts } = require('./consultas')
const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')

app.listen(3001, console.log("¡Servidor encendido!"))
app.use(cors())
app.use(express.json())

app.get("/posts", async (req, res) => {
const posts = await obtenerPosts()
res.json(posts)
})

app.post("/posts", async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body
    await agregarPost(titulo, img, descripcion, likes)
    res.send("Post agregado con éxito")
    })

app.put("/posts/like/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await modificarPosts(id);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params
    await eliminarPosts(id)
    res.send("Post eliminado con éxito")
})

