"use client";   
import React, { use }  from 'react'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../ingresos/CSS/Orders.css'

import Modal from 'react-modal';
import Dropzone from 'react-dropzone';


const Orders = React.memo(() => {

     const cookieValue = Cookies.get('usuario');
    useEffect(() => {
        import('boxicons');
   }, []);
   const [nombre, setNombre] = useState("")
   const [descripcion, setDescripcion] = useState("")
   const [precio, setPrecio] = useState("")
   const [categoria, setCategoria] = useState("")
   const [imagepage1, setImagepage1] = useState(false)
  
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [modalIsOpen2, setModalIsOpen2] = useState(false);
   const [images, setImages] = useState([]);
   const [images2, setImages2] = useState([]);

   const [nombreS, setNombreS] = useState("")
   const [descripcionS, setDescripcionS] = useState("")
   const [precioS, setPrecioS] = useState("")
   const [categoriaS, setCategoriaS] = useState("")
   const [imagesS, setImagesS] = useState([]);
   const [images2S, setImages2S] = useState([]);

  const NextPage = (e) => {
    e.preventDefault(); 
    setImagepage1(!imagepage1);
};
    const handleButtonClick = () => {
        closeModal();
    };
    const openModal = () => {
        setModalIsOpen(true);
      };

      const openModal2 = () => {
        setModalIsOpen2(true);
      };
      const handleDrop = (acceptedFiles) => {
        
        setImages(acceptedFiles);
      };
      const handleDrop2 = (acceptedFiles) => {  
      
        setImages2([...images2, ...acceptedFiles]);
        console.log(images2)
      };
    const removeImage2 = (indexToRemove) => {
    setImages2(prevImages2 => prevImages2.filter((_, index) => index !== indexToRemove));
};

  const handleDropS = (acceptedFiles) => {
          
    setImagesS(acceptedFiles);
  };
  const handleDrop2S = (acceptedFiles) => {  

    setImages2S([...images2S, ...acceptedFiles]);
    console.log(images2S)
  };
  const removeImage2S = (indexToRemove) => {
  setImages2S(prevImages2 => prevImages2.filter((_, index) => index !== indexToRemove));
  };

const handleSubmit = async (e) => {
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
      const response = await fetch('http://localhost:1080/api/producto', {
          method: 'POST',
          body:formData,
      });

          if (response.ok) {
              const data = await response.json();
              console.log(data);
             
          } else {
              console.error('Error al guardar el usuario');
          }
      } catch (error) {
          console.error('Error al enviar la solicitud: ', error);
      }
  
      for(const image of images2){
        const formDataImageS = new FormData();
        formDataImageS.append('email', cookieValue);
        formDataImageS.append('file', image);

        try{
          const responseI = await fetch('http://localhost:1080/api/img_secundarias',{
            method: 'POST',
            body:formDataImageS,
          });

          if (responseI.ok) {
            const dataImage = await responseI.json();
            console.log('Imagen secundaria guardada:', dataImage);

          } else {
            console.error('Error al guardar la imagen secundaria');
          
         } 
        } catch (error) {
            console.error('Error al enviar la solicitud de imagen secundaria: ', error);
          }
   
      


      };
    }




      
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const formDataS = new FormData();
    formDataS.append('nombre', nombreS);
    formDataS.append('descripcion', descripcionS);
    formDataS.append('precio', precioS);
    formDataS.append('categoria', categoriaS);
    formDataS.append('email', cookieValue);
    
    if (images) {
      formDataS.append('file', imagesS[0]); // Acá uso useState entonces no ocupo fileInput.files[0]
    }
    formDataS.forEach((value, key) => {
      console.log(key, value);
    });
    
    try {
        const response = await fetch('http://localhost:1080/api/servicio', {
            method: 'POST',
            body:formDataS,
        });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
              
            } else {
                console.error('Error al guardar el usuario');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud: ', error);
        }
    
        for(const image of images2S){
          const formDataImageS2 = new FormData();
          formDataImageS2.append('email', cookieValue);
          formDataImageS2.append('file', image);

          try{
            const responseI = await fetch('http://localhost:1080/api/img_secundariasS',{
              method: 'POST',
              body:formDataImageS2,
            });

            if (responseI.ok) {
              const dataImage = await responseI.json();
              console.log('Imagen secundaria guardada:', dataImage);

            } else {
              console.error('Error al guardar la imagen secundaria');
            
          } 
          } catch (error) {
              console.error('Error al enviar la solicitud de imagen secundaria: ', error);
            }
    
        


        };
      }


      const closeModal = () => {
        setModalIsOpen(false);
        setModalIsOpen2(false);
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
              
                    <button onClick={openModal2} style={{backgroundColor:"black"}} > <box-icon name='plus-circle' id='icon'  type='solid' color='#2069d0' >
                    </box-icon> </button>
                    
                    </div>
          
            </div>

      <Modal  className='Modal' isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal de Agregar Producto/Servicio">
       
     <div className='modalOpen'>
      <form  onSubmit={handleSubmit} >
        <div id='section' className='section mt-5 ml-5'>
        <h2 className='poppins-semibold text-xl '  >Agrega en esta sección tu producto </h2>
       
        <button id='x' onClick={closeModal}><box-icon  name='x-circle' color='#cf4e4b' style={{width:'50px', height:'50px',position:'relative'}}  ></box-icon></button>
     
       
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
                  <option className='poppins-extralight' value="Contrucción">Contrucción</option>
                  <option className='poppins-extralight' value="Eco-verde">Eco-verde</option>
                  <option className='poppins-extralight' value="Entretenimiento">Entretenimiento</option>
                 <option className='poppins-extralight' value="Hogar">Hogar</option>
                  <option className='poppins-extralight' value="Oficina">Oficina</option>
                  <option className='poppins-extralight' value="Shopping">Shopping</option>
                  <option className='poppins-extralight' value="Salud">Salud</option>
                  <option className='poppins-extralight' value="Servicios">Servicios</option>
                  <option className='poppins-extralight' value="Turismo">Turismo</option>
                  
                </select>
          
              <br/>
          <button type="submit" id="button" >Guardar</button>
         
              </div>

              <div className='column2'>
                {!imagepage1 ? (
                  <div className='imagepage1'>
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
            <button  id='arrow'  onClick={NextPage} >
            <box-icon name='right-arrow-circle' color='#cb3769' style={{width:'50px', height:'50px',position:'relative'}}  ></box-icon>
            </button>
           
                  </div>
                ) : (
                  <div className='imagepage2'>
 <Dropzone style={{height: '100%',display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}} onDrop={handleDrop2} accept="image/*">
              
              {({ getRootProps, getInputProps }) => (
                <section style={{width:'90% ', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',padding:'5px', borderRadius:'10px' }}>
                   <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <box-icon name='image-add' type='solid' color='rgba(201,56,106,0.86)' style={{width:'50px', height:'50px',position:'relative'}} ></box-icon>
               
                    <p className='poppins-regular'>Arrastra la imágenes secundarias de tu producto aquí, o haz clic para seleccionar</p>
                  </div>
                  <aside>
                    <h4 className='poppins-bold'>Imágenes (máximo 5):</h4>
                    <ul style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {images2.map((file, index) => (
                  <li key={index}>
                   <img src={URL.createObjectURL(file)} alt="preview" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                   <button onClick={() => removeImage2(index)} >  <box-icon name='trash' color='#d97218' ></box-icon>
                  </button>
                   
                  </li>
                ))}   
                    </ul>
                  </aside>
                </section>
              )}
            </Dropzone>
            <button  onClick={NextPage} >
            <box-icon style={{width:'50px', height:'50px',position:'relative'}}  type='solid' color='#cb3769' name='left-arrow-circle'></box-icon>
          
            </button>
            
                  </div>
                )}
            
         
              </div>
          


            </div>
           
        </form>
      
        </div>  
       
      
       
      </Modal>











      
      <Modal  className='Modal2' isOpen={modalIsOpen2} onRequestClose={closeModal} contentLabel="Modal de Agregar Producto/Servicio">
       
       <div className='modalOpen'>
        <form  onSubmit={handleSubmit2} >
          <div id='section' className='section mt-5 ml-5'>
          <h2 className='poppins-semibold text-xl '  >Agrega en esta sección tu servicio </h2>
         
          <button id='x' onClick={closeModal}><box-icon  name='x-circle' color='#1EA4D9' style={{width:'50px', height:'50px',position:'relative'}}  ></box-icon></button>
       
         
          </div>
       
              <div className='box'>
                  
              <div className='row1'>
             
              <input
                  required=""
                  class="peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
                  id="address"
                  type="text"
                  placeholder='Nombre del servicio'
                  style={{
                    color: 'white' ,
                    background: "rgba(30, 164, 217, 0.53)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10.7px)",
                    WebkitBackdropFilter: "blur(5.3px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    width: '60%',
                      height: '7vh '
                    
                  }}
  
                  value={nombreS} onChange={(e) => setNombreS(e.target.value)}  
                />
                
              
              <br/>  <br/>
              <input
                  required=""
                  class="peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
                  id="address"
                  type="text"
                  placeholder='Descripción del servicio'
                  style={{
                    color: 'white' ,
                    background: "rgba(31,128, 212, 0.5)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10.7px)",
                    WebkitBackdropFilter: "blur(5.3px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    width: '60%',
                      height: '20vh '
                    
                  }}
                  value={descripcionS} onChange={(e) => setDescripcionS(e.target.value)}  
                />
           
              
            <br/>  <br/>
              <input
                  required=""
                  class="peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
                  id="address"
                  type="number"
                  placeholder='₡ Precio del servicio'
                  style={{
                    color: 'white' ,
                    background: "rgba(32,99, 208, 0.5)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10.7px)",
                    WebkitBackdropFilter: "blur(5.3px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    width: '60%',
                      height: '7vh '
                    
                  }}
                  value={precioS} onChange={(e) => setPrecioS(e.target.value)}    
                />
                  <br/>  <br/>
                  <select  className='poppins-thin'
                  style={{
                    color: 'white' ,
                    background: "rgba(33,81, 205, 0.5)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10.7px)",
                    WebkitBackdropFilter: "blur(5.3px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    width: '60%',
                    height: '7vh ',
                   
                    
                  }}  value={categoriaS} onChange={(e) => setCategoriaS(e.target.value)}  
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
                    
                  </select>
            
                <br/>
            <button type="submit" id="button2" >Guardar</button>
           
                </div>
  
                <div className='column2'>
                  {!imagepage1 ? (
                    <div className='imagepage1'>
              <Dropzone style={{height: '100%',display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}} onDrop={handleDropS} accept="image/*">
                
                {({ getRootProps, getInputProps }) => (
                  <section style={{backgroundColor:'white',width:'90% ', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',padding:'5px', borderRadius:'10px' }}>
                     <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <box-icon name='image-add' type='solid' color='#1EA4D9' style={{width:'50px', height:'50px',position:'relative'}} ></box-icon>
                 
                      <p className='poppins-regular'>Arrastra la imagen principal de tu producto aquí, o haz clic para seleccionar</p>
                    </div>
                    <aside>
                      <h4 className='poppins-bold'>Imágen principal:</h4>
                      <ul>
                  {imagesS.map((file, index) => (
                    <li key={index}>
                      {file.name} <img src={URL.createObjectURL(file)} alt="preview" style={{ maxWidth: '200px' }} />
                    </li>
                  ))}   
                      </ul>
                    </aside>
                   
                  </section>
                  
                )}
               
              </Dropzone>
              <button  id='arrow'  onClick={NextPage} >
              <box-icon name='right-arrow-circle' color='#1EA4D9' style={{width:'50px', height:'50px',position:'relative'}}  ></box-icon>
              </button>
             
                    </div>
                  ) : (
                    <div className='imagepage2'>
              <Dropzone style={{height: '100%',display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}} onDrop={handleDrop2S} accept="image/*">
                
                {({ getRootProps, getInputProps }) => (
                  <section style={{width:'90% ', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',padding:'5px', borderRadius:'10px' }}>
                     <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <box-icon name='image-add' type='solid' color='#1EA4D9' style={{width:'50px', height:'50px',position:'relative'}} ></box-icon>
                 
                      <p className='poppins-regular'>Arrastra la imágenes secundarias de tu producto aquí, o haz clic para seleccionar</p>
                    </div>
                    <aside>
                      <h4 className='poppins-bold'>Imágenes (máximo 5):</h4>
                      <ul style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  {images2S.map((file, index) => (
                    <li key={index}>
                     <img src={URL.createObjectURL(file)} alt="preview" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                     <button onClick={() => removeImage2S(index)} >  <box-icon name='trash' color='#AB35A3' ></box-icon>
                    </button>
                     
                    </li>
                  ))}   
                      </ul>
                    </aside>
                  </section>
                )}
              </Dropzone>
              <button  onClick={NextPage} >
              <box-icon style={{width:'50px', height:'50px',position:'relative'}}  type='solid' color='#1EA4D9' name='left-arrow-circle'></box-icon>
            
              </button>
              
                    </div>
                  )}
              
           
                </div>
            
  
  
              </div>
             
          </form>
        
          </div>  
         
        
         
        </Modal>
        </React.Fragment>
    )
  });
  export default Orders;
