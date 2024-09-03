
const express = require('express');
const app = express();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Pr1wWP1oZy8fzGPu6fOz61T9TIia1CInL8EUngPzJ1FFM9wkkKAGnJER8FZ2nz25r2wQw0RZlPVK8bKWOIuGkOt00XnbHI1oq');
const PORT = process.env.PORT || 1080;
const db = require('./conexionbd');
const cors = require('cors');  
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

const key = crypto.randomBytes(32); 
const iv = crypto.randomBytes(16); 


    function encrypt(text) {
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
    
        return `${iv.toString('hex')}:${encrypted}`;
    }

    function decrypt(encryptedText) {
        const [ivHex, encrypted] = encryptedText.split(':');
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(ivHex, 'hex'));
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'diazbastosv@gmail.com',
            pass: 'fsgh bdpa jaok kugh', 
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



    app.post('/api/pago', async (req, res) => {
        console.log('aca llego');
        const { amount, currency, paymentMethodId, cookieValue, cartItems } = req.body;

    try {
        // Crea un PaymentIntent
        console.log("amount", amount);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: paymentMethodId,
        });

        const fechaPago = new Date();
        const sql = 'SELECT id FROM usuarios WHERE email = ?';
        db.query(sql, [cookieValue], (err, results) => {
            if (err) {
                console.error('Error al buscar usuario en la base de datos:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }

            const usuario = results[0].id;

            const sql2 = 'INSERT INTO pagos (monto, fecha, comprador_id, intencion_pago_id) VALUES (?, ?, ?, ?)';
            const values2 = [amount, fechaPago, usuario, paymentIntent.id];
            db.query(sql2, values2, (err, result) => {
                if (err) {
                    console.error('Error al insertar pago en la base de datos:', err);
                    return res.status(500).json({ error: 'Error interno del servidor' });
                }

                const pago_id = result.insertId;

               const sql3 = 'INSERT INTO compra (articulo_id, empresa_id, pago_id, cantidad) VALUES ?';
                const values3 = cartItems.map(item => [item.id, item.empresa_id, pago_id, item.quantity]);
                db.query(sql3, [values3], (err, result) => {
                    if (err) {
                        console.error('Error al insertar compra en la base de datos:', err);
                        return res.status(500).json({ error: 'Error interno del servidor' });
                    }

                    const doc = new PDFDocument();
                    
                    const filePath = path.join(__dirname, '..', 'public', 'facturas', `factura_${pago_id}.pdf`);

                    doc.pipe(fs.createWriteStream(filePath)); // toma el contenido y lo guarda en el proyecto
                    console.log('Directorio actual:', __dirname);
                    console.log('Ruta del archivo:', filePath);
                    doc.image('../public/img/logos.png', 20, 20, { width: 50 }); // Asegúrate de tener la ruta correcta del logo

                    doc.font('Helvetica-Bold').fontSize(25).text('Factura de Pago', { align: 'center' });
                    doc.fontSize(16).text(`ID de Pago: ${pago_id}`);
                    doc.text(`Monto: ${amount}`);
                    doc.text(`Moneda: ${currency}`);
                    doc.text(`ID de Método de Pago: ${paymentIntent.id}`);
                    doc.text(`Comprador: ${usuario}`);
                    doc.text(`Fecha de Pago: ${fechaPago.toISOString()}`);
            
                    doc.moveDown().fontSize(20).text('Artículos Comprados:', { underline: true });

                    // Cada artículo 
                    cartItems.forEach(item => {
                        doc.moveDown().fontSize(16).text(`- ${item.nombre}`);
                        doc.fontSize(14).text(`  Cantidad: ${item.quantity}`);
                        doc.fontSize(14).text(`  Precio: ${item.precio}`);
                    });
                  


                    doc.end();
                            
                    res.json({ clientSecret: paymentIntent.client_secret, message: 'Compra y pago registrados exitosamente',   invoiceUrl: `/facturas/factura_${paymentIntent.id}.pdf`
                  
      

                    });
                    const mailOptions = {
                        from: 'diazbastosv@gmail.com',
                        to: cookieValue,
                        subject: 'Factura exitosa',
                        text: `Hola PYME esta es tu factura gracias`,
                        attachments: [
                            {
                                filename: `factura_${pago_id}.pdf`, // Nombre del archivo en el correo
                                path: filePath, // Ruta del archivo en tu sistema
                                contentType: 'application/pdf' // Tipo de contenido
                            }
                        ]
                    };
                            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error al enviar el correo electrónico: ', error);
                        return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
                    }
                    console.log('Correo electrónico enviado: ' + info.response);
                    res.status(200).json({ message: 'Usuario guardado y correo electrónico enviado correctamente' });
                });
                });
            }); 
        });

    } catch (error) {
        console.error('Error creando PaymentIntent:', error);
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/orden_de_compra/:cookieValue', (req, res) => {
        
    const cookieValue = req.params.cookieValue; // los parámetros del req del email
  
     const sql2 = 'SELECT nombre FROM usuarios WHERE email = ?';
     db.query(sql2, [cookieValue], (err, results1) => {
         if (err) {
             console.error('Error al buscar usuario en la base de datos:', err);
             return res.status(500).json({ error: 'Error interno del servidor' });
         }
  
         if (results1.length === 0) {
             console.warn('Usuario no encontrado:', cookieValue);
             return res.status(401).json({ error: 'Credenciales incorrectas' });
         }
         const nombre_usuario = results1[0].nombre;


        
  
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
      
      const empresas_id = results[0].id;
     const sql = `
         SELECT * FROM compra WHERE empresa_id = ?
     `;
 
     db.query(sql, [empresas_id], (err, results) => {
         if (err) throw err;
         res.json(results);
         console.log(results)
      
     });

    });
    });
 });
      
 

app.get('/api/orden_de_pago/:pago_id', (req, res) => {
        
    const pago_id = req.params.pago_id; // los parámetros del req del email
     const sql2 = 'SELECT * FROM pagos WHERE id = ?';
     db.query(sql2, [pago_id], (err, results1) => {
         if (err) {
             console.error('Error al buscar pago en la base de datos:', err);
             return res.status(500).json({ error: 'Error interno del servidor' });
         }
  
         if (results1.length === 0) {
             console.warn('Pago no encontrado:', pago_id);
             return res.status(401).json({ error: 'Credenciales incorrectas' });
         }
      
      
    });
 });
      
 app.get('/api/comprador', (req, res) => {

    const sql = `
        SELECT usuarios.nombre FROM usuarios 
    `;

    db.query(sql,  (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

app.get('/api/pagos', (req, res) => {

    const sql = `
        SELECT * FROM pagos 
    `;

    db.query(sql,  (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});



    app.post('/api/cuenta', (req, res) => {
    
        const {numero, banco, titular, tipo ,email} = req.body;
        console.log(req.body)
        const numeroCuentaCifrada = encrypt(numero);
        console.log(numeroCuentaCifrada)
    
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
        const sql = 'INSERT INTO cuenta (numero_cuenta, tipo, banco, titular, empresa_id) VALUES (?, ?, ?, ?, ?)';
        const values = [numeroCuentaCifrada, tipo, banco, titular, empresa_id];
    
       
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


    
  





//Usuarios y ordenes 
app.delete('/api/eliminar_servicio/:id', (req, res) => {
 
    const Id = req.params.id; 
   
        // Primero elimina las imágenes secundarias relacionadas
        const deleteImagesSql = `
            DELETE FROM img_secundarias_servicio WHERE servicio_id = ?
        `;
    
        db.query(deleteImagesSql, [Id], (err, results) => {
            if (err) throw err;
    
            // Luego elimina el producto
            const deleteProductSql = `
                DELETE FROM servicios WHERE id = ?
            `;
    
            db.query(deleteProductSql, [Id], (err, results) => {
                if (err) throw err;
                res.json(results);
                console.log(results);
            });
        });

    });     
     
    app.delete('/api/eliminar_producto/:id', (req, res) => {

        const Id = req.params.id;
    
        // Primero elimina las imágenes secundarias relacionadas
        const deleteImagesSql = `
            DELETE FROM img_secundarias_producto WHERE producto_id = ?
        `;
    
        db.query(deleteImagesSql, [Id], (err, results) => {
            if (err) throw err;
    
            // Luego elimina el producto
            const deleteProductSql = `
                DELETE FROM producto WHERE id = ?
            `;
    
            db.query(deleteProductSql, [Id], (err, results) => {
                if (err) throw err;
                res.json(results);
                console.log(results);
            });
        });
    });
     
     

    app.post('/api/usuarios', (req, res) => {
        const { nombre, email, password, tipo } = req.body;

        if (!nombre || !email || !password || !tipo) {
            return res.status(400).json({ error: 'Los campos son requeridos' });
         }
       console.error('inicio ');
       

    
        const sql = 'INSERT INTO usuarios (nombre, email, password, tipo) VALUES (?, ?, ?, ?)';
        const values = [nombre, email, password, tipo];

        const mailOptions = {
            from: 'diazbastosv@gmail.com',
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

      app.get('/api/usuarios/:email', (req, res) => {
        const email = req.params.email; // los parámetros del req del id 
        const sql = `
            SELECT * FROM usuarios WHERE email = ?
        `;
    
        db.query(sql, [email], (err, results) => {
            if (err) throw err;
            res.json(results[0]);
            
            console.log(results[0])


        });
       

      });

   
      
        app.delete('/api/eliminar_usuario/:email', (req, res) => {
        
            const email = req.params.email; 
            const sql = `
                DELETE FROM servicios WHERE email = ?
            `;

            db.query(sql, [email], (err, results) => {
                if (err) throw err;
                res.json(results);
                console.log(results)
            });

            });     




      app.get('/api/empresa-producto/:id', (req, res) => {
        const Id = req.params.id; // los parámetros del req del id 
        const sql = `
            SELECT empresas.nombre FROM empresas JOIN producto ON producto.empresa_id = empresas.id WHERE producto.id = ?
        `;
    
        db.query(sql, [Id], (err, results) => {
            if (err) throw err;
            res.json(results[0]);
        });
    });

    app.get('/api/empresa-servicio/:id', (req, res) => {
        const Id = req.params.id; // los parámetros del req del id 
        const sql = `
            SELECT empresas.nombre FROM empresas JOIN servicios ON servicios.empresa_id = empresas.id WHERE servicios.id = ?
        `;
    
        db.query(sql, [Id], (err, results) => {
            if (err) throw err;
            res.json(results[0]);
        });
    });

    app.get('/api/empresa-servicio-fotos/:id', (req, res) => {
        const Id = req.params.id; // los parámetros del req del id 
        const sql = `
            SELECT * FROM img_secundarias_servicio WHERE img_secundarias_servicio.servicio_id = ?
        `;
    
        db.query(sql, [Id], (err, results) => {
            if (err) throw err;
            res.json(results);
            console.log(results)
        });
    });


    app.get('/api/empresa-producto-fotos/:id', (req, res) => {
        const Id = req.params.id; // los parámetros del req del id 
        const sql = `
            SELECT * FROM img_secundarias_producto WHERE img_secundarias_producto.producto_id = ?
        `;
    
        db.query(sql, [Id], (err, results) => {
            if (err) throw err;
            res.json(results);
            console.log(results)
        });
    });

    app.get('/api/articulo-producto/:email', (req, res) => {
        
       const email = req.params.email; // los parámetros del req del email
     
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
         
         const empresas_id = results[0].id;
        const sql = `
            SELECT * FROM producto WHERE empresa_id = ?
        `;
    
        db.query(sql, [empresas_id], (err, results) => {
            if (err) throw err;
            res.json(results);
           
        });

       });
       });
    });
    app.get('/api/articulo-servicio/:email', (req, res) => {
        
        const email = req.params.email; // los parámetros del req del email
      
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
          
          const empresas_id = results[0].id;
         const sql = `
             SELECT * FROM servicios WHERE empresa_id = ?
         `;
     
         db.query(sql, [empresas_id], (err, results) => {
             if (err) throw err;
             res.json(results);
             console.log(results)
         });
 
        });
        });
     });

     app.get('/api/empresas/:email', (req, res) => {
        const email = req.params.email;
        const sql = `SELECT id FROM usuarios WHERE email = ?`;
    
  
        db.query(sql, [email], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Database query failed' });
            }
    
            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            const usuario_id = results[0].id;
            const sql2 = `SELECT * FROM empresas WHERE usuario_id = ?`;
    
            // Ejecuté la segunda consulta
            db.query(sql2, [usuario_id], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return res.status(500).json({ error: 'Database query failed' });
                }
    
                if (results.length === 0) {
                    return res.status(404).json({ error: 'Company not found' });
                }
    
              
                res.json(results[0]);
            });
        });
    });
    

    app.post('/api/servicio-editar/:id',  upload.single('file'), (req, res) => {
        console.log('Petición recibida:', req.file);
        const {nombre, descripcion, precio, categoria ,email} = req.body;
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
         
         const empresa_id = results[0];
         console.log(empresa_id)
         const Id = req.params.id; 
                const sql = `
                    UPDATE servicios
                    SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, foto = ?
                    WHERE id = ?;
                `;
        
       db.query(sql,[nombre, descripcion, precio, categoria,  foto ? foto.path : null, Id], (err, results) => {
           if (err) throw err;
           res.json(results);
           console.log(results)
       });
     });
     });
       
    });



    app.post('/api/producto-editar/:id',  upload.single('file'), (req, res) => {
        console.log('Petición recibida:', req.file);
        const {nombre, descripcion, precio, categoria ,email} = req.body;
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
         
         const empresa_id = results[0];
         console.log(empresa_id)
         const Id = req.params.id; 
                const sql = `
                    UPDATE producto
                    SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, foto = ?
                    WHERE id = ?;
                `;
        
       db.query(sql,[nombre, descripcion, precio, categoria,  foto ? foto.path : null, Id], (err, results) => {
           if (err) throw err;
           res.json(results);
           console.log(results)
       });
     });
     });
       
    });






     
    app.post('/api/especificaciones',  (req, res) => {
        console.log('Petición recibida:', req.file);
        const {
            cantidad_p,
            cantidad_d,
            lugares,
            precio,
            idioma,
            horario,
            comentarios,
            editableId} = req.body;
       
       
     
        
        const sql = 'INSERT INTO especificaciones_servicios (cantidad_personas,cantidad_dias, lugares, precio_variacion, idioma, horarios, comentarios_adicionales, servicio_id) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
        const values = 
    [
        cantidad_p,
        cantidad_d,
        lugares,
        precio,
        idioma,
        horario,
        comentarios,
        editableId
    ];
    
       
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al guardar el usuario:', err);
                return res.status(500).json({ error: 'Error al guardar el producto en la base de datos' });
            }
    
            console.log('Usuario guardado exitosamente:', result);
            res.status(201).json({ message: 'Producto guardado exitosamente' });
        });
    });

    
    
    app.get('/api/especificaciones/:id',  (req, res) => {
        const Id = req.params.id; 
        const sql2 = 'SELECT * FROM especificaciones_servicios WHERE servicio_id = ?';
        db.query(sql2, [Id], (err, results1) => {
            if (err) {
                console.error('Error al buscar usuario en la base de datos:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
     
            if (results1.length === 0) {
                console.warn('Usuario no encontrado:');
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }
          
            res.json(results1);
           
     });
    });
    

    app.post('/api/usuario_editar',  (req, res) => {
        
        const {id, nombre, email, password} = req.body;
        console.log('Petición recibida:', req.body);
       
     
                const sql = `
                    UPDATE usuarios
                    SET nombre = ?, email = ?, password = ?
                    WHERE id = ?;
                `;
        
       db.query(sql,[nombre, email, password, id], (err, results) => {
           if (err) throw err;
           res.json(results);
           console.log(results)
      
   
     });
       
    });


    
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
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
