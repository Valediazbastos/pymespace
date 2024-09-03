"use client";   
import React, { use }  from 'react'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../ingresos/CSS/Orders.css'

import Modal from 'react-modal';
import Dropzone from 'react-dropzone';


export default function One(){
 

    const cookieValue = Cookies.get('usuario');
    useEffect(() => {
        import('boxicons');
   }, []);
   const [nombre, setNombre] = useState("")
   const [descripcion, setDescripcion] = useState("")
   const [precio, setPrecio] = useState("")
   const [categoria, setCategoria] = useState("")
  
   const [modalIsOpen, setModalIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [images2, setImages2] = useState([]);

 
    const handleButtonClick = () => {
        closeModal();
    };
    const openModal = () => {
        setModalIsOpen(true);
      };
      const handleDrop = (acceptedFiles) => {
       
        setImages(acceptedFiles);
      };
      const handleDrop2 = (acceptedFiles) => {  
        setImages2([...images2, ...acceptedFiles]);
        console.log(images2)
      };

      const closeModal = () => {
        setModalIsOpen(false);
      };
    return (
        <React.Fragment>
            <br/>
            <h1 className='title'>PYMESPACE quiere verte crecer</h1>
            <br/>
            
            <div className='add' >
                    <div id='product' className='px-10 py-5' >
                        <h2 className='poppins-bold text-2xl'>Agregar Productos</h2>
                        <p className='poppins-light text-xs' id='text2'>Puedes agregar todos tus productos PYME en esta sección (tus productos son aquellos artículos tangibles, que se pueden tocar) como electrodomésticos, dispositivos tecnológicos, suministros de oficina, maquillaje, comida, etc</p>
                            <button onClick={openModal}   > <box-icon name='plus-circle' id='icon'  type='solid' color='#d15343' ></box-icon>
                    </button>
                    
                        </div>
                      
                    <div id='service' className='px-10 py-5' >
                    <h2 className='poppins-bold text-2xl'>Agregar Servicios</h2>
                    <p className='poppins-light text-xs' id='text3'>Puedes agregar todos tus servicios PYME en esta sección (tus servicios son aquellos artículos intangible, que no se pueden tocar) como serivcios tecnológicos, contables, turísticos, administrativos, hotelería, construcción, educación, entrenamiento, etc</p>
              
                    <button onClick={handleButtonClick} style={{backgroundColor:"black"}} > <box-icon name='plus-circle' id='icon'  type='solid' color='#2069d0' >
                    </box-icon> </button>
                    
                    </div>
          
            </div>

      <Modal  className='Modal' isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal de Agregar Producto/Servicio">
       
     <div className='modalOpen'>
      <form  >
        <div className='section mt-5 ml-5'>
        <h2 className='poppins-semibold text-xl '  >Agrega en esta sección tu producto </h2>
        <button onClick={closeModal}><box-icon name='x-circle' color='#cf4e4b' ></box-icon></button>
     
        </div>
     
            <div className='box'>
                
            <div className='row1'>
           
            <input
                required=""
                class="peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
                id="address"
                type="text"
                placeholder='Nombre del producto'
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

                value={nombre} onChange={(e) => setNombre(e.target.value)}  
              />
              
            
            <br/>  <br/>
            <input
                required=""
                class="peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
                id="address"
                type="text"
                placeholder='Descripción del producto'
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
                value={descripcion} onChange={(e) => setDescripcion(e.target.value)}  
              />
         
            
          <br/>  <br/>
            <input
                required=""
                class="peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
                id="address"
                type="number"
                placeholder='₡ Precio del producto'
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
                value={precio} onChange={(e) => setPrecio(e.target.value)}    
              />
                <br/>  <br/>
                <select  className='poppins-thin'
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
                  <option className='poppins-extralight' value="Eco-verde">Eco-verde</option>
                  <option className='poppins-extralight' value="Entretenimiento">Entretenimiento</option>
                  <option className='poppins-extralight' value="Contrucción">Contrucción</option>
                  <option className='poppins-extralight' value="Shopping">Shopping</option>
                  <option className='poppins-extralight' value="Salud">Salud</option>
                  <option className='poppins-extralight' value="Servicios">Servicios</option>
                  <option className='poppins-extralight' value="Turismo">Turismo</option>
                  
                </select>
          
              <br/>
          <button type="submit" id="button" >Guardar</button>
              </div>

              <div className='column2'>
           
              <Dropzone style={{height: '100%',backgroundColor:'white',display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}} onDrop={handleDrop} accept="image/*">
              
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
                  {file.name} <img src={URL.createObjectURL(file)} alt="preview" style={{ maxWidth: '100px' }} />
                </li>
              ))}   
                  </ul>
                </aside>
               
              </section>
              
            )}
           
          </Dropzone>
          <box-icon name='right-arrow-circle' color='#cb3769' ></box-icon>
          <Dropzone style={{height: '100%',display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}} onDrop={handleDrop2} accept="image/*">
              
              {({ getRootProps, getInputProps }) => (
                <section style={{width:'90% ', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',padding:'5px', borderRadius:'10px' }}>
                   <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <box-icon name='image-add' type='solid' color='rgba(201,56,106,0.86)' style={{width:'50px', height:'50px',position:'relative'}} ></box-icon>
               
                    <p className='poppins-regular'>Arrastra la imagen principal de tu producto aquí, o haz clic para seleccionar</p>
                  </div>
                  <aside>
                    <h4 className='poppins-bold'>Imágen principal:</h4>
                    <ul>
                {images2.map((file, index) => (
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
           
        </form>
      
        </div>  
       
      
       
      </Modal>
        </React.Fragment>
    )
}
