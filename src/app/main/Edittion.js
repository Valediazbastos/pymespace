"use client";   
import React, { use }  from 'react'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../ingresos/CSS/Edittion.css'

import Modal from 'react-modal';
import Dropzone from 'react-dropzone';

export default function Edition() {

    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precio, setPrecio] = useState("")
    const [categoria, setCategoria] = useState("")

    const cookieValue = Cookies.get('usuario');
    const editables = JSON.parse(Cookies.get('editables') || '[]');
    const [ images, setImages] = useState([]);
    const handleDrop = (acceptedFiles) => {
        
        setImages(acceptedFiles);
      };

    const   handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('precio', precio);
        formData.append('categoria', categoria);
        formData.append('email', cookieValue);
        
        if (images) {
          formData.append('file', images[0]); // Acá uso useState entonces no ocupo fileInput.files[0]
        }
        formData.forEach((value, key) => {
          console.log(key, value);
        });
        
        try {
            const response = await fetch(`http://localhost:1080/api/servicio-editar/${editables.id}`, {
                method: 'POST',
                body:formData,
            });
      
                if (response.ok) {
                    const data = await response.json();
               
                   
                } else {
                    console.error('Error al guardar el usuario');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud: ', error);
            }
        
         
          }

    return <React.Fragment>
        <div className='editar flex'>
            <div className='left relative '>
                <form onSubmit={handleSubmit}>
                <input
        
        required=""
        class=" relative top-5 peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
        id="address"
        
      
        style={{
          color: 'white' ,
          background: "rgba(201, 56, 106, 0.5)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10.7px)",
          WebkitBackdropFilter: "blur(5.3px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          width: '60%',
            height: '7vh '
          
        }}
        
        placeholder={editables.nombre} type='text'    value={nombre || editables.nombre} // Mostrar 'editables.nombre' si 'nombre' es vacío o nulo
       onChange={(e) => setNombre(e.target.value)}  />
       
       <br/><br/>
        <input
         required=""
         class="peer w-full relative top-5  bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
         id="address"
         style={{
           color: 'white' ,
           background: "rgba(206,73, 82, 0.5)",
           boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
           backdropFilter: "blur(10.7px)",
           WebkitBackdropFilter: "blur(5.3px)",
           border: "1px solid rgba(255, 255, 255, 0.3)",
           width: '60%',
             height: '20vh '
           
         }}
        placeholder={editables.descripcion} type='text' value={descripcion || editables.descripcion}  onChange={(e) => setDescripcion(e.target.value)}  />
       
       <br/>
       <br/>
        <input 
        
        required=""
        class=" relative top-5 peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
        id="address"
        
        style={{
          color: 'white' ,
          background: "rgba(209,84, 67, 0.5)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10.7px)",
          WebkitBackdropFilter: "blur(5.3px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          width: '60%',
            height: '7vh '
          
        }}
        placeholder={editables.precio} type='number'  value={precio || editables.precio} onChange={(e) => setPrecio(e.target.value)}  />
         <br/><br/>
         <br/><br/>
        
        <select  className='poppins-thin relative top-5 '
                style={{
                  color: 'white' ,
                  background: "rgba(217,114, 24, 0.5)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(10.7px)",
                  WebkitBackdropFilter: "blur(5.3px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  width: '60%',
                  height: '7vh ',
                 
                  
                }}  value={categoria} onChange={(e) => setCategoria(e.target.value)}  
                class="peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
            >     <option className='poppins-extralight' value="" disabled selected>Categoría</option>
                  <option className='poppins-extralight' value="Alimentación">Alimentación</option>
                  <option className='poppins-extralight' value="Bancos">Bancos</option>
                  <option className='poppins-extralight' value="Belleza">Belleza</option>
                  <option className='poppins-extralight' value="Contrucción">Contrucción</option>
                  <option className='poppins-extralight' value="Eco-verde">Eco-verde</option>
                  <option className='poppins-extralight' value="Entretenimiento">Entretenimiento</option>
                 <option className='poppins-extralight' value="Hogar">Hogar</option>
                  <option className='poppins-extralight' value="Oficina">Oficina</option>
                  <option className='poppins-extralight' value="Shopping">Shopping</option>
                  <option className='poppins-extralight' value="Salud">Salud</option>
                  <option className='poppins-extralight' value="Servicios">Servicios</option>
                  <option className='poppins-extralight' value="Turismo">Turismo</option>
                  
                </select> <br/>
                <button type="submit" id="button" >Guardar</button>
                </form>
          
            </div>
            <div className='right parte_dos_editar'>
            <Dropzone style={{height: '100%',display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}} onDrop={handleDrop} accept="image/*">
              
              {({ getRootProps, getInputProps }) => (
                <section style={{backgroundColor:'white',width:'90% ', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',padding:'5px', borderRadius:'10px' }}>
                   <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <box-icon name='image-add' type='solid' color='rgba(201,56,106,0.86)' style={{width:'50px', height:'50px',position:'relative'}} ></box-icon>
               
                    <p className='poppins-regular'>Arrastra la imagen principal de tu producto aquí, o haz clic para seleccionar</p>
                  </div>
                  <aside>
                    <h4 className='poppins-bold'>Imágen principal:</h4>
                    <ul>
                {images.map((file, index) => (
                  <li key={index}>
                    {file.name} <img src={URL.createObjectURL(file)} alt="preview" style={{ maxWidth: '200px' }} />
                  </li>
                ))}   
                    </ul>
                  </aside>
                 
                </section>
                
              )}
             
            </Dropzone>
           
           
                  
             
            </div>
       
        </div>
       
    </React.Fragment>
}