"use client";   
import React, { useCallback }  from 'react'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Orders from './Orders'
import '../ingresos/CSS/Principal.css'
import Modal from 'react-modal';
import zIndex from '@mui/material/styles/zIndex';
import { BackgroundGradientAnimation3 } from '../componentes_css/components/ui/background-gradient-animation3';
import Login from '../ingresos/Login';
import Pymespace from './Pymespace'
import Pay from './Pay'
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Request  from './Request';
import Profile from './Profile'
import Ver_especifico from './Ver_especifico'

const stripePromise = loadStripe('pk_test_51Pr1wWP1oZy8fzGPp12l76VE6XpxzmRPW8TrE3mkqONMFI1IcDNj4DjGCXcixGRbnZg49u9AWlygBOb3kdnEAszJ00Xgg5gH16');


const ProductCard =  ({ product, openModal, shopItems }) =>  (
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
         
        <button onClick={() => shopItems(product)} className='relative z-0  bottom-10 left-3/4'>
        <box-icon name='plus-circle'  style={{width:'50px', height:'50px'}}   type='solid' color='#0d0d13'></box-icon>
      
        </button>
        
        </div>
      );


      const ServiceCard = ({ product, openModal, shopItems }) =>  (
       <div className="card relative ml-7 producto_cards" >
       
         <div  onClick={() => openModal(product)} >
         <p className='category px-2 pt-2 poppins-regular'>{product.categoria}</p>
         {product.foto && <img src={`http://localhost:1080/${product.foto}`} alt={product.nombre} className="product-image2" />}
       <div  id='card_content'>
       <h2 className='poppins-semibold text-xl name' >{product.nombre}</h2>
         
      
         <p className='text-xs poppins-light  price' >₡{product.precio}</p>
         </div>
         </div>
       <button className='absolute z-0  right-6'  onClick={() => shopItems(product)}>
       <box-icon name='plus-circle'  style={{width:'50px', height:'50px'}}   type='solid' color='#DDDDDD'></box-icon>
     
       </button>
     
        
      
      
    
       
       
       </div>
     );
export default function Principal(){

  const [esVisible, setEsVisible] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario enviado');
   


};
useEffect(() => {
                 import('boxicons');
            }, []);
         const [cartItems, setCartItems] = useState([]);
         const [modalIsOpen, setModalIsOpen] = useState(false);
         const [modalIsOpenS, setModalIsOpenS] = useState(false);
         const [modalIsOpenShop, setModalIsOpenShop] = useState(false);
         const [productos, setProductos] = useState([]);
         const [servicios, setServicios] = useState([]);
         const [selectedProduct, setSelectedProduct] = useState(null);
         const [selectedService, setSelectedService] = useState(null);
         const [active, setActive] = useState(false);
         const [menu, setMenu] = useState("Principal")
         const [business, setBusiness] = useState(null);
         const [menus, setMenus] = useState(null);
         const [modalShop, setModalShop] = useState(false)
         const [businessS, setBusinessS] = useState(null);

         const cookieValue = Cookies.get('usuario');
        
         Cookies.set('productos', JSON.stringify(productos), { path: '/' });
         Cookies.set('servicios', JSON.stringify(servicios), { path: '/' });
         
         const btn = useCallback(() => {
          setActive(prevActive => !prevActive);
        }, []);

        const openModal = async(product) => {
          setModalIsOpen(true);
      
          setSelectedProduct(product)
                try {
                    const response = await  fetch(`http://localhost:1080/api/empresa-producto/${product.id}`);
                    const data = await response.json();
                    setBusiness(data.nombre);
                    console.log("empresa", data)
                } catch (error) {
                    console.error('Error al obtener la empresa:', error);
                }
            
    
    
  
        };

        const openModalS = async(product) => {
          setModalIsOpenS(true);
          setSelectedService(product)
                try {
                    const response = await  fetch(`http://localhost:1080/api/empresa-servicio/${product.id}`);
                    const data = await response.json();
                    setBusinessS(data.nombre);
                    console.log("empresa", data)
                } catch (error) {
                    console.error('Error al obtener la empresa:', error);
                }
            
    
    
  
        };
        const openModalShop = useCallback(() => {
          setModalIsOpenShop(prev => !prev);
        }, []);

        const openModalShopP = useCallback(() => {
          Menu('Payment');
          console.log("cartItems before saving to cookie:", cartItems);
          Cookies.set('cartItems', JSON.stringify(cartItems), { path: '/' });
        }, [cartItems]);
        
      
        
        const Menu = useCallback(async (newMenu) => {
          setMenu(newMenu);
          if (newMenu === 'Logout') {
            Cookies.remove("usuario");
          }
        }, []);
      
    
      
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
              },  [menu, active])
            
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
              }, [menu, active])
              const closeModal = () => {
                setModalIsOpen(false);
                setSelectedProduct(null);
                setModalIsOpenS(false);
                
                setSelectedService(null);
                console.log('modalIsOpen', modalIsOpen)
              };
              const closeModal2 = () => {
               
                setModalIsOpenShop(false);
                
              };
              

              const shopItems = (product) => {
                console.log('Adding product:', product);
                setCartItems(prevProducts => {
                  console.log('Previous cart items:', prevProducts);
                  const existingItem = prevProducts.find(i => i.id === product.id);
                  if (existingItem) {
                    const updatedItems = prevProducts.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
                    console.log('Updated cart items:', updatedItems);
                    return updatedItems;
                  } else {
                    const newItems = [...prevProducts, { ...product, quantity: 1 }];
                    console.log('New cart items:', newItems);
                    return newItems;
                  }
                });
              };
              const removeItem = (itemId) => {
                setCartItems(prevItems => {
                  const existingItem = prevItems.find(i => i.id === itemId);
                  if (existingItem.quantity > 1) {
                    return prevItems.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
                  } else {
                    return prevItems.filter(i => i.id !== itemId);
                  }
                });
              };
            
              const clearCart = useCallback(() => {
                setCartItems([]);
              }, []);


              const ver = (product) => {
                Cookies.set('elegido_especifico', JSON.stringify(product), { path: '/' });
                Menu('Ver_especifico')
              }

              
const [searchTerm, setSearchTerm] = useState('');
    
const filteredProducts = searchTerm 
? productos.filter(product => 
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )
: productos; // Mostrar todos si no hay búsqueda

const filteredServices = searchTerm 
? servicios.filter(service => 
    service.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )
: servicios; 

        return(
          
        
                <React.Fragment>
                  {esVisible ? (
                    <div >
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
                                                        <box-icon className='search-alt' name='search-alt' color='white' id='search' ></box-icon>    <input type='text'
                                                          value={searchTerm}
                                                          onChange={e => setSearchTerm(e.target.value)}   
                                                        placeholder='Buscar...'/>
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
                                                          <span className='links_name'>Artículos</span> 
                                               
                                                        </a>
                                                        <span className='tooltip'>Artículos</span> 
                                               
                                               </li>  <li  onClick={() => Menu('Request')} >
                                                        <a href='#'>
                                                        <box-icon name='doughnut-chart' color='white'></box-icon>
                                                        <span className='links_name'>Pedidos</span> 
                                               
                                                        </a>
                                                        <span className='tooltip'>Pedidos</span> 
                                               
                                               </li>  <li  onClick={() => Menu('Pymespace')}>
                                                        <a href='#'>
                                                        <box-icon name='note' color='white'></box-icon>
                                                          <span className='links_name'>PYMESPACE</span> 
                                               
                                                        </a>
                                                        <span className='tooltip'>PYMESPACE</span> 
                                               
                                               </li>  <li onClick={() => Menu('Perfil')}>
                                                        <a href='#'>
                                                        <box-icon name='user' color='white'></box-icon>
                                                          <span className='links_name'>Perfil</span> 
                                               
                                                        </a>
                                                        <span className='tooltip'>Perfil</span> 
                                               
                                               </li> 
                                               <li  onClick={() => setEsVisible(!esVisible)} >
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



                   <Modal  className='ModalShop absolute bottom-20 right-5' isOpen={modalIsOpenShop} onRequestClose={closeModal2} contentLabel="Modal de Agregar Producto/Servicio">
                   <div className="modal">
                <h2 className='poppins-semibold title_shop'>Tú carrito PYME</h2>
                <br/>
                <ul >
                  {cartItems.map(item => (
                    <li id='cartItem' key={item.id}>
                      <p className='poppins-bold item_shop item-name'>
                      {item.nombre} 
                      </p> <p className='poppins-regular' style={{color:'#AB35A3'}}>
                          x
                        </p>
                      <p className='poppins-light item_shop'>
                       {item.quantity}
                      </p>
                    
                      <button id='remove' className='absolute right-2 ' onClick={() => removeItem(item.id)}><box-icon  style={{width:'25px', height:'25px'}} name='minus-circle' color='#ab35a3' ></box-icon></button>
                    </li>
                  ))}
                </ul>
                <div className='button'>
                <button onClick={clearCart} id='button' className='poppins-light' >Eliminar</button>
                <button  onClick={openModalShopP}id='button' className='poppins-light'>Pagar</button>
              
                </div>
               
              </div>
                     
                    </Modal>
                          <button className='absolute bottom-0 right-0 ' id='shop' onClick={openModalShop}>
                          <box-icon name='cart' style={{width: "50px", height: "50px"
                           }} color='#0d0d13' 
                           ></box-icon>
                          <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
                          </button>





                            <div className='text'>¡Bienvenida PYME a tu lugar!</div>
                 <div className="product-list flex"  >
                 {filteredProducts.map(product => (
          <div key={product.id}> 
         
                  
                     <ProductCard key={product.id} product={product}  openModal={openModal} shopItems={shopItems}/>
                   <Modal  className='Modal' isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal de Agregar Producto/Servicio">
                   <button id='x' className='absolute top-3 right-5' onClick={closeModal}><box-icon name='x-circle' color='#cf4e4b' style={{width:'50px', height:'50px'}}  ></box-icon></button>

                    
                  
                      {selectedProduct && (
                        <div className='modalOpen'>
                          <form onSubmit={handleSubmit}>
                            <div id='section' className='section'>
                            
                              <div className='container'>
                                  <div className='left'>
                                  <div className="background-gradient-container">
                                    <img  src="./img/Group 27190 (1).png"  className="h-dvh"/>
                                  </div>
                                  {selectedProduct && (
                                    <img src={`http://localhost:1080/${selectedProduct.foto}`} alt={selectedProduct.nombre} className="product-image_details" />
                                  )}
                                </div>
                                <div className='right'>
                                  <div id='card_no_description'>

                                  <h1 className='poppins-bold text-4xl ' id='nameProduct' >{selectedProduct.nombre}</h1>
                                  <div className='business_category relative flex gap-x-2'>
                                  <div className='business poppins-light'><p id='business'>{business} </p>  </div>
                                  <p>|</p>
                                  <p className='poppins-light ' id='categoryProduct' >{selectedProduct.categoria}</p>
                                 
                                  </div>
                                  <p className='text-base poppins-light'>₡{selectedProduct.precio}</p>
                                
                                  </div>
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
                  
               
          </div> ))}
               
               </div>
              
               <div className="product-list flex">
                 {filteredServices.map((product) => (
                  <div key={product.id}>
         <ServiceCard key={product.id} product={product} openModal={openModalS}  shopItems={shopItems}/>
                    <Modal  className='Modal3' isOpen={modalIsOpenS} onRequestClose={closeModal} contentLabel="Modal de Agregar Producto/Servicio">
                   <button id='x' className='absolute top-3 right-5' onClick={closeModal}><box-icon name='x-circle' color='#1EA4D9' style={{width:'50px', height:'50px'}}  ></box-icon></button>

                    
                  
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

                                  <h1 className='poppins-bold text-4xl ' id='nameProduct' >{selectedService.nombre}</h1>
                                  <div className='business_category relative flex gap-x-2'>
                                  <div className='business poppins-light'><p id='business2'>{businessS} </p>  </div>
                                  <p>|</p>
                                  <p className='poppins-light ' id='categoryProduct2' >{selectedService.categoria}</p>
                                 
                                  </div>
                                  <p className='text-base poppins-light'>₡{selectedService.precio}</p>
                                
                                  </div>
                                  <p className='poppins-semibold'>Descripción:</p>
                                  <div id='description_all'>
                                  <box-icon name='circle' type='solid' style={{width:'16px'}} ></box-icon>
                                  <p className='description poppins-regular'>{selectedService.descripcion}</p>
                                
                                  </div><br/>
                                  <button id='button_more'  onClick={() => ver(selectedService)}className='poppins-regular'><p>Ver fotografías y detalles</p></button>   
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

               
                          )} {menu === 'Orders' && (
                                <Orders/>
                          )} 
                            {menu === 'Pymespace' && (

                        <Pymespace/>
                  )} {menu === 'Payment' && (
                      <Elements stripe={stripePromise}>
                      <Pay/>
                      </Elements>
                                        
                    )}
                     {menu === 'Request' && (
                        <Request/>
                        )}  
                          {menu === 'Perfil' && (
                        <Profile/>
                        )}  
                          {menu === 'Ver_especifico' && (
                        <Ver_especifico/>
                        )}  
                        </div>
                    </div>
      ) : (
       <Login/>
      )}
                        
                        
                </React.Fragment>
        )
      
       
       
      
}
