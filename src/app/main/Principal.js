"use client";   
import React  from 'react'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Orders from './Orders'
import '../ingresos/CSS/Principal.css'
import Modal from 'react-modal';
import zIndex from '@mui/material/styles/zIndex';
import { BackgroundGradientAnimation3 } from '../componentes_css/components/ui/background-gradient-animation3';

const ProductCard =  ({ product, openModal }) => (
        <div className="card ml-7 producto_cards"  onClick={() => openModal(product)}>
          <div id='pic_product'>
          <p className='category px-2 pt-2 poppins-regular'>{product.categoria}</p>
          {product.foto && <img src={`http://localhost:1080/${product.foto}`} alt={product.nombre} className="product-image" />}
       
          </div>
       
        <div id='card_product'>
        <h2 className='poppins-semibold text-xl name'>{product.nombre}</h2>
          
       
          <p className='text-xs poppins-light price'>₡{product.precio}</p>
     
        </div>
        <button className='relative z-0  bottom-10 left-3/4'>
        <box-icon name='plus-circle'  style={{width:'50px', height:'50px'}}   type='solid' color='#0d0d13'></box-icon>
      
        </button>
        
        </div>
      );


      const ServiceCard = ({ product, openModal }) =>  (
       <div className="card ml-7 producto_cards" onClick={() => openModal(product)} >
       
         <div >
         <p className='category px-2 pt-2 poppins-regular'>{product.categoria}</p>
         {product.foto && <img src={`http://localhost:1080/${product.foto}`} alt={product.nombre} className="product-image2" />}
       <div  id='card_content'>
       <h2 className='poppins-semibold text-xl name' >{product.nombre}</h2>
         
      
         <p className='text-xs poppins-light  price' >₡{product.precio}</p>
    
       <button className='relative z-0 bottom-5 left-3/4'>
       <box-icon name='plus-circle'  style={{width:'50px', height:'50px'}}   type='solid' color='#DDDDDD'></box-icon>
     
       </button>
       </div>
        
         </div>
      
    
       
       
       </div>
     );
export default function Principal(){
        

        useEffect(() => {
                 import('boxicons');
            }, []);
        
        const [modalIsOpen, setModalIsOpen] = useState(false);
         const [productos, setProductos] = useState([]);
         const [servicios, setServicios] = useState([]);
         const [selectedProduct, setSelectedProduct] = useState(null);
        const [active, setActive] = useState(false);
        const [menu, setMenu] = useState("Principal")
        const cookieValue = Cookies.get('usuario');
        console.log('Valor de la cookie:', cookieValue);
        const btn = async () => {
                setActive(!active)
                console.log(active)
                
        }
        const openModal = (product) => {
          setModalIsOpen(true);
          setSelectedProduct(product);
        };
     
        const Menu = async (newMenu) =>{
                setMenu(newMenu)
        }
        const handleSubmit = () => {

        };
       
       ;

        useEffect(() => {
                const fetchProductos = async () => {
                  try {
                    const response = await fetch('http://localhost:1080/api/productos', {
                      method: 'GET',
                    });
                    const data = await response.json();
                    setProductos(data);
                  } catch (error) {
                    console.error('Error fetching products:', error);
                  }
                };
               
                fetchProductos();
              }, []);
              console.log(productos)
              useEffect(() => {
                const fetchServicio = async () => {
                  try {
                    const response = await fetch('http://localhost:1080/api/servicios', {
                      method: 'GET',
                    });
                    const data = await response.json();
                    setServicios(data);
                  } catch (error) {
                    console.error('Error fetching products:', error);
                  }
                };
               
                fetchServicio();
              }, []);
              const closeModal = () => {
                setModalIsOpen(false);
                setSelectedProduct(null);
                console.log('modalIsOpen', modalIsOpen)
              };
              
        return(
                <React.Fragment>
                         <div className={`sidebar ${active ? 'active' : ''}`}>
                         <div className='logo_content'>
                                        <div className='logo'>
                                                <img src='./img/logo2.png' id='img' />
                                                <div className='logo_name poppins-semibold'>PYEMSPACE</div>

                                        </div>
                                        <button  onClick={btn} >
                                        <box-icon name='menu-alt-left' id='btn' color='white'></box-icon>
                                       
                                        </button>
                                       <ul className='poppins-regular'>
                                                <li>
                                                        <a href='#'>
                                                        <box-icon className='search-alt' name='search-alt' color='white' id='search' ></box-icon>    <input type='text' placeholder='Buscar...'/>
                                                        </a>
                                                        <span className='tooltip'>Buscar</span> 
                                               
                                               </li>

                                               <li onClick={() => Menu('Principal')} >
                                                        <a href='#'>
                                                        <box-icon name='grid-alt' color='white'></box-icon>
                                                        <span className='links_name'>Inicio</span> 
                                                         
                                                        </a>
                                                        <span className='tooltip'>Inicio</span> 
                                               
                                               </li>
                                                 <li   onClick={() => Menu('Orders')}  >
                                                        <a href='#'>
                                                        <box-icon name='shopping-bag' color='white'></box-icon>
                                                          <span className='links_name'>Pedidos</span> 
                                               
                                                        </a>
                                                        <span className='tooltip'>Pedidos</span> 
                                               
                                               </li>  <li>
                                                        <a href='#'>
                                                        <box-icon name='doughnut-chart' color='white'></box-icon>
                                                        <span className='links_name'>Interacción</span> 
                                               
                                                        </a>
                                                        <span className='tooltip'>Interacción</span> 
                                               
                                               </li>  <li>
                                                        <a href='#'>
                                                        <box-icon name='note' color='white'></box-icon>
                                                          <span className='links_name'>PYMESPACE</span> 
                                               
                                                        </a>
                                                        <span className='tooltip'>PYMESPACE</span> 
                                               
                                               </li>  <li>
                                                        <a href='#'>
                                                        <box-icon name='user' color='white'></box-icon>
                                                          <span className='links_name'>Perfil</span> 
                                               
                                                        </a>
                                                        <span className='tooltip'>Perfil</span> 
                                               
                                               </li> 
                                               <li>
                                               <a href='#' id='out'>
                                                        <box-icon name='log-out' color='white' ></box-icon>
                                                        <span className='links_name' color='white' >Log out</span> 
                                               
                                                        </a>
                                                        <span className='tooltip'>Log out</span> 
                                               
                                               </li>
                                                     
                                        </ul>
                                </div>
                        </div>
                       <div className='principal_content'>
                       {menu === 'Principal' && (
                        <div style={{marginLeft: '85px'}} >
                          <button className='absolute bottom-0 right-0 ' id='shop'>
                          <box-icon name='cart' style={{width: "50px", height: "50px"
                           }} color='#0d0d13' 
                           ></box-icon>
              
                          </button>
                            <div className='text'>¡Bienvenida PYME a tu lugar!</div>
                 <div className="product-list flex"  >
                 {productos.map((product) => (
                  <div  key={product.id} >
                     <ProductCard key={product.id} product={product}  openModal={openModal}/>
                   <Modal  className='Modal' isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal de Agregar Producto/Servicio">
                   <button id='x' className='absolute top-3 right-5' onClick={closeModal}><box-icon name='x-circle' color='#cf4e4b' style={{width:'50px', height:'50px'}}  ></box-icon></button>

                    
                  
                      {selectedProduct && (
                        <div className='modalOpen'>
                          <form onSubmit={handleSubmit}>
                            <div id='section' className='section'>
                            
                              <div className='container'>
                                  <div className='left'>
                                  <div className="background-gradient-container">
                                    <img  src="./img/Group 27186 (1).png"  className="full-height"/>
                                  </div>
                                  {selectedProduct && (
                                    <img src={`http://localhost:1080/${selectedProduct.foto}`} alt={selectedProduct.nombre} className="product-image_details" />
                                  )}
                                </div>
                                <div className='right'>
                                  <h1 className='poppins-bold text-4xl ' id='nameProduct' >{selectedProduct.nombre}</h1>
                                  <p className='poppins-light ' id='categoryProduct' >{selectedProduct.categoria}</p>
                                  <p className='text-base poppins-light'>₡{selectedProduct.precio}</p>
                                  <p className='poppins-semibold'>Descripción:</p>
                                  <div id='description_all'>
                                  <box-icon name='circle' type='solid' style={{width:'16px'}} ></box-icon>
                                  <p className='description poppins-regular'>{selectedProduct.descripcion}</p>
                                
                                  </div>
                                 </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      )}
                     
                      
                  
                     
                  
                    
                     
                    </Modal>
                    </div>
                  
                 ))}
               </div>
              
               <div className="product-list flex">
                 {servicios.map((product) => (
                   <ServiceCard key={product.id} product={product} />
                 ))}
               </div>
             
               </div>

               
                          )} {menu === 'Orders' && (
                                <Orders/>
                          )}
                          
                        </div>
                        
                </React.Fragment>
        )
      
       
       
      
}
