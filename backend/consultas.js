const { Pool } = require('pg');
const axios = require('axios'); 

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'trufa1507',
  database: 'likeme',
  allowExitOnIdle: true
});


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

const agregarPost = async (titulo, img, descripcion, likes) => {

  try {
    const shortImg = await acortarUrl(img);
  
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
    const values = [titulo, shortImg, descripcion, likes];
    const result = await pool.query(consulta, values);
    console.log("Post agregado");
  } catch (error) {
    if (error.code === '23502')
      res.status(500).json({msg:'Faltan datos obligatorios'});
  else
      res.status(500).send(error);
  }
}

const obtenerPosts = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    console.log(rows);
    return rows;
  } catch (error) {
    res.status(500).send(error);
  }
}


const modificarPosts = async (id) => {
  try {
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1"
    const values = [id]
    const { rows } = await pool.query(consulta, values);
    return rows;
  } catch(err) {
    res.status(500).send(error);
  }
};
  
const eliminarPosts = async (id) => {
 try {
   const consulta = "DELETE FROM posts WHERE id = $1"
   const values = [id]
   const result = await pool.query(consulta, values)
 } catch (error) {
  res.status(500).send(error);
 }
    }
    

module.exports = { agregarPost, obtenerPosts, modificarPosts, eliminarPosts };
