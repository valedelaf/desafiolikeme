const pool = require("../db/conexion");
const axios = require('axios'); 

  
const acortarUrl = async (url) => {
    try {
      const response = await axios.get(`https://api.tinyurl.com/create?url=${encodeURIComponent(url)}`, {
        headers: {
          'Authorization': `Bearer YOUR_TINYURL_API_KEY`  
        }
      });
      return response.data.data.tiny_url; 
    } catch (error) {
      console.error('Error al acortar la URL:', error);
      return url;  
    }
  }
  
  const agregarPostDB = async (titulo, img, descripcion, likes) => {
  
    const shortImg = await acortarUrl(img);
  
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
    const values = [titulo, shortImg, descripcion, likes];
    const result = await pool.query(consulta, values);
    console.log("Post agregado");
  }
  
  const obtenerPostsDB = async () => {
    const consulta = "SELECT * FROM posts;";
    const { rows, rowCount } = await pool.query(consulta);
    return rows;
  }
  
  
  const modificarPostsDB = async (likes, id) => {
    const consulta = "UPDATE posts SET likes = $1 WHERE id = $2"
    const values = [likes, id]
    const result = await pool.query(consulta, values)
    console.log("Like agregado")
    }
    
  const eliminarPostsDB = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1"
    const values = [id]
    const result = await pool.query(consulta, values)
      }
      
  
  module.exports = { agregarPostDB, obtenerPostsDB, modificarPostsDB, eliminarPostsDB };
  