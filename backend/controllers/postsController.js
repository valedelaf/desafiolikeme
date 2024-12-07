const { agregarPostDB, obtenerPostsDB, modificarPostsDB, eliminarPostsDB } = require('../models/postsModel')


const obtenerPosts = async (req, res) => {
try {
  const posts = await obtenerPostsDB()
    res.status(200).json(posts)
} catch (error) {
    res.status(500).send(error);
}
}

const agregarPost =  async (req, res) => {
   try {
     const { titulo, img, descripcion, likes } = req.body
     await agregarPostDB(titulo, img, descripcion, likes)
     res.status(201).json({success:true, msg: "Post agregado con éxito"});
   } catch (error) {
     res.status(500).send(error);
   }
    }

const modificarPosts= async (req, res) => {
 try {
       const { id } = req.params
       const { likes } = req.query
       const data = await modificarPostsDB(likes, id)
       res.status(200).json(data);
 } catch (error) {
    res.status(500).send(error);
 }
        }

const eliminarPosts= async (req, res) => {
    try {
        const { id } = req.params
        const data = await eliminarPostsDB(id)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {obtenerPosts, agregarPost, modificarPosts, eliminarPosts}
