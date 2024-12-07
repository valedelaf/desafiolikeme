const { Pool } = require('pg');
const axios = require('axios'); 

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'trufa1507',
  database: 'likeme',
  allowExitOnIdle: true
});

const getDB = async () => {
  const result = await pool.query("SELECT NOW()");
  console.log(result.rows, "Conexión exitosa");
}
getDB();


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

  const shortImg = await acortarUrl(img);

  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, shortImg, descripcion, likes];
  const result = await pool.query(consulta, values);
  console.log("Post agregado");
}

const obtenerPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  console.log(rows);
  return rows;
}

obtenerPosts();

const modificarPosts = async (likes, id) => {
  const consulta = "UPDATE posts SET likes = $1 WHERE id = $2"
  const values = [likes, id]
  const result = await pool.query(consulta, values)
  console.log("Like agregado")
  }
  
const eliminarPosts = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1"
  const values = [id]
  const result = await pool.query(consulta, values)
    }
    

module.exports = { agregarPost, obtenerPosts, modificarPosts, eliminarPosts };
