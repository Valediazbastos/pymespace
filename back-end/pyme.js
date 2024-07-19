
const express = require('express');
const app = express();
const PORT = process.env.PORT || 1080;
const db = require('./conexionbd');
const cors = require('cors');  
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'valeriadiazbastos@gmail.com',
            pass: 'xflx snwu lgws pomv', 
        },
    });
    app.get('/', (req, res) => {
        res.send('¡Hola, mundo!');
    });  
    app.use(cors({
      origin: 'http://localhost:3000', 
  }));
  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

  app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 


    app.post('/api/usuarios', (req, res) => {
        const { nombre, email, password, tipo } = req.body;

        if (!nombre || !email || !password || !tipo) {
            return res.status(400).json({ error: 'Los campos son requeridos' });
         }
       console.error('inicio ');
       

    
        const sql = 'INSERT INTO usuarios (nombre, email, password, tipo) VALUES (?, ?, ?, ?)';
        const values = [nombre, email, password, tipo];

        const mailOptions = {
            from: 'valeriadiazbastos@gmail.com',
            to: email,
            subject: 'Registro exitoso',
            text: `Hola ${nombre},\n\nGracias por registrarte en nuestro sitio web.\n\nSaludos,\nEl equipo`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo electrónico: ', error);
                return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
            }
            console.log('Correo electrónico enviado: ' + info.response);
            res.status(200).json({ message: 'Usuario guardado y correo electrónico enviado correctamente' });
        });
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al guardar el usuario: ', err);
                return res.status(500).json({ error: 'Error al guardar el usuario en la base de datos' });
            }

          
        });
      
        });
    
    app.post('/api/login', (req, res) => {
        const { email, password } = req.body;
      
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        db.query(sql, [email], (err, results) => {
          if (err) {
            console.error('Error al buscar usuario en la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
          }
      
          if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
          }
      
          const usuario = results[0];
      
          if (password === usuario.password) {
            res.status(200).json({ authorized: true });
          } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
          }
        });
      });
      app.post('/api/empresa' , upload.single('file'), (req, res) => {   
        console.log('Petición recibida:', req.file);
 
       const { codigo, nombre, direccion, tipo, valor, telefono, fecha } = req.body;
       const file = req.file;
   
       if (!codigo || !nombre || !direccion || !tipo || !valor || !telefono || !fecha) {
           console.error('Campos faltantes en la solicitud:', req.body);
           return res.status(400).json({ error: 'Campos faltantes en la solicitud' });
       }
   
       const sql = 'SELECT id FROM usuarios WHERE nombre = ?';
       db.query(sql, [nombre], (err, results) => {
           if (err) {
               console.error('Error al buscar usuario en la base de datos:', err);
               return res.status(500).json({ error: 'Error interno del servidor' });
           }
   
           if (results.length === 0) {
               console.warn('Usuario no encontrado:', nombre);
               return res.status(401).json({ error: 'Credenciales incorrectas' });
           }
   
           const usuario_id = results[0].id;
           const sql2 = 'INSERT INTO empresas (codigo, nombre, direccion, tipo, valor, telefono, usuario_id, fecha, logo_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
           const values = [codigo, nombre, direccion, tipo, valor, telefono, usuario_id, fecha, file ? file.path : null];
   
           db.query(sql2, values, (err, result) => {
               if (err) {
                   console.error('Error al guardar el usuario:', err);
                   return res.status(500).json({ error: 'Error al guardar el usuario en la base de datos' });
               }
   
               console.log('Usuario guardado exitosamente:', result);
               res.status(201).json({ message: 'Usuario guardado exitosamente' });
           });
       });
   });
   app.post('/api/producto', upload.single('file'), (req, res) => {
    console.log('Petición recibida:', req.file);
    const {nombre, descripcion, precio, categoria ,email} = req.body;
    const foto = req.file;

    if (!nombre || !descripcion || !precio || !categoria) {
        return res.status(400).json({ error: 'Los campos son requeridos' });
     }
   console.log(req.file);
   
   const sql2 = 'SELECT nombre FROM usuarios WHERE email = ?';
   db.query(sql2, [email], (err, results1) => {
       if (err) {
           console.error('Error al buscar usuario en la base de datos:', err);
           return res.status(500).json({ error: 'Error interno del servidor' });
       }

       if (results1.length === 0) {
           console.warn('Usuario no encontrado:', email);
           return res.status(401).json({ error: 'Credenciales incorrectas' });
       }
       const nombre_usuario = results1[0].nombre;
       console.log(nombre_usuario)

       const sql3 = 'SELECT id FROM empresas WHERE nombre = ?';
       db.query(sql3, [nombre_usuario], (err, results) => {
           if (err) {
               console.error('Error al buscar usuario en la base de datos:', err);
               return res.status(500).json({ error: 'Error interno del servidor' });
           }
    
           if (results.length === 0) {
               console.warn('Usuario no encontrado 2:', nombre_usuario);
               return res.status(401).json({ error: 'Credenciales incorrectas' });
           }
    
    const empresa_id = results[0].id;
    const sql = 'INSERT INTO producto (nombre, descripcion, precio, categoria, empresa_id, foto) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [nombre, descripcion, precio, categoria, empresa_id, foto ? foto.path : null];

   
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al guardar el usuario:', err);
            return res.status(500).json({ error: 'Error al guardar el producto en la base de datos' });
        }

        console.log('Usuario guardado exitosamente:', result);
        res.status(201).json({ message: 'Producto guardado exitosamente' });
    });
});
});
    });
    app.post('/api/servicio', upload.single('file'), (req, res) => {
        console.log('Petición recibida:', req.file);
        const {nombre, descripcion, precio, categoria ,email} = req.body;
        const foto = req.file;
    
        if (!nombre || !descripcion || !precio || !categoria) {
            return res.status(400).json({ error: 'Los campos son requeridos' });
         }
       console.log(req.file);
       
       const sql2 = 'SELECT nombre FROM usuarios WHERE email = ?';
       db.query(sql2, [email], (err, results1) => {
           if (err) {
               console.error('Error al buscar usuario en la base de datos:', err);
               return res.status(500).json({ error: 'Error interno del servidor' });
           }
    
           if (results1.length === 0) {
               console.warn('Usuario no encontrado:', email);
               return res.status(401).json({ error: 'Credenciales incorrectas' });
           }
           const nombre_usuario = results1[0].nombre;
           console.log(nombre_usuario)
    
           const sql3 = 'SELECT id FROM empresas WHERE nombre = ?';
           db.query(sql3, [nombre_usuario], (err, results) => {
               if (err) {
                   console.error('Error al buscar usuario en la base de datos:', err);
                   return res.status(500).json({ error: 'Error interno del servidor' });
               }
        
               if (results.length === 0) {
                   console.warn('Usuario no encontrado 2:', nombre_usuario);
                   return res.status(401).json({ error: 'Credenciales incorrectas' });
               }
        
        const empresa_id = results[0].id;
        const sql = 'INSERT INTO servicios (nombre, descripcion, precio, categoria, empresa_id, foto) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [nombre, descripcion, precio, categoria, empresa_id, foto ? foto.path : null];
    
       
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al guardar el usuario:', err);
                return res.status(500).json({ error: 'Error al guardar el producto en la base de datos' });
            }
    
            console.log('Usuario guardado exitosamente:', result);
            res.status(201).json({ message: 'Producto guardado exitosamente' });
        });
    });
    });
        });
    app.post('/api/img_secundarias', upload.single('file'), (req, res) => {
        console.log('Petición recibida:', req.file);
        const {email} = req.body;
        const foto = req.file;
    
       
       const sql2 = 'SELECT nombre FROM usuarios WHERE email = ?';
       db.query(sql2, [email], (err, results1) => {
           if (err) {
               console.error('Error al buscar usuario en la base de datos:', err);
               return res.status(500).json({ error: 'Error interno del servidor' });
           }
    
           if (results1.length === 0) {
               console.warn('Usuario no encontrado:', email);
               return res.status(401).json({ error: 'Credenciales incorrectas' });
           }
           const nombre_usuario = results1[0].nombre;
           console.log(nombre_usuario)
    



           const sql3 = 'SELECT id FROM empresas WHERE nombre = ?';
           db.query(sql3, [nombre_usuario], (err, results) => {
               if (err) {
                   console.error('Error al buscar usuario en la base de datos:', err);
                   return res.status(500).json({ error: 'Error interno del servidor' });
               }
        
               if (results.length === 0) {
                   console.warn('Usuario no encontrado 2:', nombre_usuario);
                   return res.status(401).json({ error: 'Credenciales incorrectas' });
               }
        
        const empresa_id = results[0].id;


        
        const sql4 = 'SELECT id FROM producto WHERE empresa_id = ?';
        db.query(sql4, [empresa_id], (err, results) => {
            if (err) {
                console.error('Error al buscar usuario en la base de datos:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
     
            if (results.length === 0) {
                console.warn('Usuario no encontrado 2:', nombre_usuario);
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }
     
     const producto_id = results[0].id;


        const sql = 'INSERT INTO img_secundarias_producto (imagen_url, producto_id) VALUES (?, ?)';
        const values = [ foto ? foto.path : null, producto_id];
    
       
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al guardar el usuario:', err);
                return res.status(500).json({ error: 'Error al guardar el producto en la base de datos' });
            }
    
            console.log('Usuario guardado exitosamente:', result);
            res.status(201).json({ message: 'Producto guardado exitosamente' });
        });
    });
    });
        });
    });
    
    app.post('/api/img_secundariasS', upload.single('file'), (req, res) => {
        console.log('Petición recibida:', req.file);
        const {email} = req.body;
        const foto = req.file;
    
       
       const sql2 = 'SELECT nombre FROM usuarios WHERE email = ?';
       db.query(sql2, [email], (err, results1) => {
           if (err) {
               console.error('Error al buscar usuario en la base de datos:', err);
               return res.status(500).json({ error: 'Error interno del servidor' });
           }
    
           if (results1.length === 0) {
               console.warn('Usuario no encontrado:', email);
               return res.status(401).json({ error: 'Credenciales incorrectas' });
           }
           const nombre_usuario = results1[0].nombre;
           console.log(nombre_usuario)
    



           const sql3 = 'SELECT id FROM empresas WHERE nombre = ?';
           db.query(sql3, [nombre_usuario], (err, results) => {
               if (err) {
                   console.error('Error al buscar usuario en la base de datos:', err);
                   return res.status(500).json({ error: 'Error interno del servidor' });
               }
        
               if (results.length === 0) {
                   console.warn('Usuario no encontrado 2:', nombre_usuario);
                   return res.status(401).json({ error: 'Credenciales incorrectas' });
               }
        
        const empresa_id = results[0].id;


        
        const sql4 = 'SELECT id FROM servicios WHERE empresa_id = ?';
        db.query(sql4, [empresa_id], (err, results) => {
            if (err) {
                console.error('Error al buscar usuario en la base de datos:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
     
            if (results.length === 0) {
                console.warn('Usuario no encontrado 2:', nombre_usuario);
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }
     
     const servicio_id = results[0].id;


        const sql = 'INSERT INTO img_secundarias_servicio (imagen_url, servicio_id) VALUES (?, ?)';
        const values = [ foto ? foto.path : null, servicio_id];
    
       
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al guardar el usuario:', err);
                return res.status(500).json({ error: 'Error al guardar el servicio en la base de datos' });
            }
    
            console.log('Usuario guardado exitosamente:', result);
            res.status(201).json({ message: 'Servicio guardado exitosamente' });
        });
    });
    });
        });
    });
        
    app.get('/api/productos', (req, res) => {
        const sql = 'SELECT * FROM producto';
        db.query(sql, (err, results) => {
          if (err) {
            console.error('Error al obtener los productos:', err);
            return res.status(500).json({ error: 'Error al obtener los productos' });
          }
          res.json(results);
         
          
        });
      });
      app.get('/api/servicios', (req, res) => {
        const sql = 'SELECT * FROM servicios';
        db.query(sql, (err, results) => {
          if (err) {
            console.error('Error al obtener los productos:', err);
            return res.status(500).json({ error: 'Error al obtener los productos' });
          }
          res.json(results);
         
          
        });
      });
    
    app.listen(PORT, () => {
        console.log(`Servidor corrien   do en http://localhost:${PORT}`);
    });

    process.on('SIGINT', () => {
        db.end((err) => {
            if (err) {
                console.error('Error al cerrar la conexión a la base de datos: ', err);
            } else {
                console.log('Conexión a la base de datos cerrada');
            }
            process.exit();
        });
    });
