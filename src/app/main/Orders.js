"use client";   
import React, { useCallback }  from 'react'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../ingresos/CSS/Orders.css'
import Edittion from './Edittion'
import EdittionProduct from './EdittionProduct'
import Modal from 'react-modal';
import Dropzone from 'react-dropzone';
import Especificaciones from './Especificaciones'

const ArticlesP =  ({ product, openModal, shopItems }) =>  (
  <div className="card ml-7 producto_cards" >
  <div  onClick={() => openModal(product)}>
  <div id='pic_product'>
    <p className='category px-2 pt-2 poppins-regular'>{product.categoria}</p>
    {product.foto && <img src={`http://localhost:1080/${product.foto}`} alt={product.nombre} className="product-image" />}
 
    </div>
 
  <div id='card_product'>
  <h2 className='poppins-semibold text-xl name'>{product.nombre}</h2>

 
    <p className='text-xs poppins-light price'>₡{product.precio}</p>

  </div>
  </div>
   
 
  
  </div>
);

const ArticlesS =  ({ product, openModal, shopItems }) =>  (
  <div className="card ml-7 producto_cards" >
       
  <div  onClick={() => openModal(product)} >
  <p className='category px-2 pt-2 poppins-regular'>{product.categoria}</p>
  {product.foto && <img src={`http://localhost:1080/${product.foto}`} alt={product.nombre} className="product-image2" />}
<div  id='card_content'>
<h2 className='poppins-semibold text-xl name' >{product.nombre}</h2>
  

  <p className='text-xs poppins-light  price' >₡{product.precio}</p>
  </div>
  </div>


 





</div>
);


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
   const [modalIsOpen3, setModalIsOpen3] = useState(false);
   const [modalIsOpenS, setModalIsOpenS] = useState(false);
   const [modalIsOpenP, setModalIsOpenP] = useState(false);
   const [images, setImages] = useState([]);
   const [images2, setImages2] = useState([]);

   const [nombreS, setNombreS] = useState("")
   const [descripcionS, setDescripcionS] = useState("")
   const [precioS, setPrecioS] = useState("")
   const [categoriaS, setCategoriaS] = useState("")
   const [imagesS, setImagesS] = useState([]);
   const [images2S, setImages2S] = useState([]);



   const [productos, setProductos] = useState([]);
   const [servicios, setServicios] = useState([]);
   const [selectedService, setSelectedService] = useState(null);
   const [selectedP, setSelectedP] = useState(null);
   const [businessS, setBusinessS] = useState([]);


   const [editing, setIsEditing] = useState(true)
   const [editingP, setIsEditingp] = useState("Orders");
   
     
  

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
      const openModal3 = () => {
        setModalIsOpen3(true);
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


  const openModalS = async(product) => {
    setModalIsOpenS(true);
    setSelectedService(product)
    console.log('el id que envio es:', product.id)
          try {
              const response = await  fetch(`http://localhost:1080/api/empresa-servicio-fotos/${product.id}`);
              const data = await response.json();
              setBusinessS(data);
              console.log('businessS',businessS)
            
          } catch (error) {
              console.error('Error al obtener la empresa:', error);
          }
      



  };
  
  const openModalP = async(product) => {
    setModalIsOpenP(true);
   
    setSelectedService(product)
    console.log('el id que envio es:', product.id)
          try {
              const response = await  fetch(`http://localhost:1080/api/empresa-producto-fotos/${product.id}`);
              const data = await response.json();
              setBusinessS(data);
              console.log('businessS',businessS)
              
            
          } catch (error) {
              console.error('Error al obtener la empresa:', error);
          }
      
  };

const deleteComponent = async(product) =>{

  try {
    const response = await fetch(`http://localhost:1080/api/eliminar_servicio/${product.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Servicio eliminado con éxito');
      setProductoCambiado(!productoCambiado);
      // Cierra el modal después de la eliminación
    } else {
      const errorData = await response.json();
      alert(`Error al eliminar el servicio: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error al eliminar el servicio:', error);
    alert('Error al eliminar el servicio');
  }
} 

const [productoCambiado, setProductoCambiado] = useState(false);

const [productoCambiado2, setProductoCambiado2] = useState(false);
const deleteComponentP = async(product) =>{

  try {
    const response = await fetch(`http://localhost:1080/api/eliminar_producto/${product.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Servicio eliminado con éxito');
      setProductoCambiado(!productoCambiado);
      // Cierra el modal después de la eliminación
    } else {
      const errorData = await response.json();
      alert(`Error al eliminar el servicio: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error al eliminar el servicio:', error);
    alert('Error al eliminar el servicio');
  }
} 


const EditadoP = useCallback(async (newMenu) => {
  setIsEditingp(newMenu);
  console.log(editingP)
 
}, []);
const Editado = useCallback(async (newMenu) => {
  setIsEditingp(newMenu);
  console.log(editingP)
 
}, []);


const EspecificacionesS = useCallback(async (newMenu) => {
  setIsEditingp(newMenu);
  
 
}, []);



const editComponent = async(product) =>{
  Cookies.set('editables', JSON.stringify(product), { path: '/' });
 
} 


const editComponentP = async(product) =>{
  Cookies.set('editablesP', JSON.stringify(product), { path: '/' });
  
} 










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
      const response = await fetch('http://localhost:1080/api/producto', {
          method: 'POST',
          body:formData,
      });

          if (response.ok) {
              const data = await response.json();
         
              setProductoCambiado(!productoCambiado);
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
                setProductoCambiado2(!productoCambiado2);
              
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
        setModalIsOpenP(false);
        setModalIsOpen2(false);
        setModalIsOpenS(false)
      };

  
      useEffect(() => {
        console.log('hola');
        const fetchProductos = async () => {
          try {
            const response = await fetch(`http://localhost:1080/api/articulo-producto/${cookieValue}`, {
              method: 'GET',
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("productos", data);
            setProductos(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
      
        fetchProductos();
      }, [productoCambiado]);

      useEffect(() => {
        console.log('hola');
        const fetchProductos = async () => {
          try {
            const response = await fetch(`http://localhost:1080/api/articulo-servicio/${cookieValue}`, {
              method: 'GET',
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("productos", data);
            setServicios(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
      
        fetchProductos();
      }, []);
      
     
    return (
        <React.Fragment>
          
             {editingP === 'Orders' && ( 
<div>
                 <br/>
            <h1 className='title poppins-bold' id='title'>PYMESPACE quiere verte crecer</h1>
            <p className='title poppins-light'>En este espacio ten la libertad de ver tus artículos y editarlos a tu gusto</p>
            <br/>
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
            <br/>
            <div className='edit flex'>
             
                <div className='articles'>
                  <h2>Tus artículos</h2>
                  <br/>
                  <div className='yours'>
                    {productos.map((product) => (
                  <div  key={product.id} className='flex' >
                     <ArticlesP key={product.id} product={product}  openModal={openModalP}/>
                     <Modal  className='Modal4' isOpen={modalIsOpenP} onRequestClose={closeModal} contentLabel="Modal de tu Producto/Servicio">
                   <button id='x' className='absolute top-3 right-2' onClick={closeModal}><box-icon name='x-circle' color='#CB3769' style={{width:'50px', height:'50px'}}  ></box-icon></button>
                   
                     
                  
                      {selectedService && (
                        <div className='modalOpen'>
                         
                            <div id='section' className='section'>
                            
                              <div className='container'>
                                  <div className='left'>
                                 
                                  {selectedService && (
                                    <img src={`http://localhost:1080/${selectedService.foto}`} alt={selectedService.nombre} className="product-image_details2" />
                                  )}
                                </div>
                                <div className='right'>
                                  <div id='card_no_description'>
                                 <div className='flex items-center'>
                                 <h1 className='poppins-bold text-4xl ' id='nameProduct' >{selectedService.nombre}</h1>
                                  <button id='x' className='relative top-2'  onClick={() => {
                                        editComponentP(selectedService);
                                        EditadoP('Producto');
                                      }}><box-icon name='edit-alt' type='solid' color='#CB3769' style={{width:'50px', height:'50px'}}></box-icon></button>
                              <button id='x'  className='relative top-2'  onClick={() => deleteComponentP(selectedService)}><box-icon type='solid' name='trash-alt' color='#CB3769' style={{width:'50px', height:'50px'}}></box-icon>
                              </button>
                             
                                 </div>
                                
                                  <div className='business_category relative flex top-[-2px] gap-x-2'>
                                    <p>|</p>
                                  <p className='poppins-light ' id='categoryProduct' >{selectedService.categoria}</p>
                                 
                                  </div>
                                  <p className='text-base poppins-light'>₡{selectedService.precio}</p>
                                
                                  </div>
                                  <p className='poppins-semibold'>Descripción:</p>
                                  <div id='description_all'>
                                  <box-icon name='circle' type='solid' style={{width:'16px'}} ></box-icon>
                                  <p className='description poppins-regular'>{selectedService.descripcion}</p>
                                 
                                  </div>
                                  <br/>
                                  <div className='co-images flex h-2/4'>
                               
                                     </div>
                                 </div>
                              </div>
                            </div>
                      
                        </div>
                      )}
                     
                      
                  
                     
                  
                    
                     
                    </Modal>
                    </div>
                
                  
                  
                 ))}
               
                
                   </div>
                   <br/>
                   <br/>
                  


                   <div className='yours'>
                    {servicios.map((product) => (
                  <div  key={product.id} className='flex' >
                     <ArticlesS key={product.id} product={product}  openModal={openModalS}/>
                     <Modal  className='Modal3' isOpen={modalIsOpenS} onRequestClose={closeModal} contentLabel="Modal de tu Producto/Servicio">
                   <button id='x' className='absolute top-3 right-2' onClick={closeModal}><box-icon name='x-circle' color='#1EA4D9' style={{width:'50px', height:'50px'}}  ></box-icon></button>
                   
                     
                  
                      {selectedService && (
                        <div className='modalOpen'>
                         
                            <div id='section' className='section'>
                            
                              <div className='container'>
                                  <div className='left'>
                                 
                                  {selectedService && (
                                    <img src={`http://localhost:1080/${selectedService.foto}`} alt={selectedService.nombre} className="product-image_details2" />
                                  )}
                                </div>
                                <div className='right'>
                                  <div id='card_no_description'>
                                 <div className='flex items-center'>
                                 <h1 className='poppins-bold text-4xl ' id='nameProduct' >{selectedService.nombre}</h1>
                                  <button id='x' className='relative top-2' onClick={() => {
                                        editComponent(selectedService);
                                        Editado('Servicio')}}
                                        ><box-icon name='edit-alt' type='solid' color='#1ea4d9' style={{width:'50px', height:'50px'}}></box-icon></button>
                              <button id='x'  className='relative top-2'  onClick={() => deleteComponent(selectedService)}><box-icon type='solid' name='trash-alt' color='#1ea4d9' style={{width:'50px', height:'50px'}}></box-icon>
                              </button>
                              <button id='x'  className='relative top-2' > <box-icon type='solid' name='file-plus'
                              onClick={() => {
                                editComponent(selectedService);
                                EspecificacionesS('Servicio_add')}}
                              color='#1ea4d9' style={{width:'50px', height:'50px'}}></box-icon>
                              </button>
                              
                             
                                 </div>
                                
                                  <div className='business_category relative flex top-[-2px] gap-x-2'>
                                    <p>|</p>
                                  <p className='poppins-light ' id='categoryProduct2' >{selectedService.categoria}</p>
                                 
                                  </div>
                                  <p className='text-base poppins-light'>₡{selectedService.precio}</p>
                                
                                  </div>
                                  <p className='poppins-semibold'>Descripción:</p>
                                  <div id='description_all'>
                                  <box-icon name='circle' type='solid' style={{width:'16px'}} ></box-icon>
                                  <p className='description poppins-regular'>{selectedService.descripcion}</p>
                                 
                                  </div>
                                  <br/>
                                  <div className='co-images flex h-2/4'>
                                  
                                     </div>
                                 </div>
                              </div>
                            </div>
                      
                        </div>
                      )}
                     
                      
                  
                     
                  
                    
                     
                    </Modal>
                    </div>
                
                  
                  
                 ))}
                   </div>
                   
              </div>
            </div>

            <div className='flex flex-wrap businessss'>
                
                 </div>















      <Modal  className='Modal1' isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal de Agregar Producto/Servicio">
       
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
            <button type="submit" id="button2" >Guardar </button>
           
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
              </div>
              )}
              
            {editingP === 'Servicio' && (
                         <Edittion/>
                          )} 
                           {editingP === 'Producto' && (
                         <EdittionProduct/>
                          )} 

                  {editingP === 'Servicio_add' && (
             <Especificaciones/>
                  )} 
                              
       
           
        </React.Fragment>
    )
  });
  export default Orders;
