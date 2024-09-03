"use client";   
import React, { use }  from 'react'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone';
import { loadStripe } from '@stripe/stripe-js';
import '../ingresos/CSS/Request.css'
import { BackgroundGradientAnimation3 } from '../componentes_css/components/ui/background-gradient-animation3';


export default function Request(){
    const cookieValue = Cookies.get('usuario');
    const [compra, setCompra] = useState([]);
    const [pago, setPago] = useState([]);
    const [numero, setNumero ] = useState("");
    const [tipo, setTipo ] =useState("");
    const [banco, setBanco ] =useState("");
    const [titular, setTitular ] = useState("");
    const [categoria, setCategoria ] =useState("");
    const [completados, setCompletados] = useState([]);

    const handleClick = (index) => {
      setCompletados(prevCompletados => 
        prevCompletados.includes(index) 
          ? prevCompletados.filter(i => i !== index) // Desmarcar si ya está completado
          : [...prevCompletados, index] // Marcar como completado
      );
    };


    useEffect(() => {
      const fetchProductosYPagos = async () => {
        try {
          // Fetch orden de compra
          const responseCompra = await fetch(`http://localhost:1080/api/orden_de_compra/${cookieValue}`, {
            method: "GET",
          });
  
          if (!responseCompra.ok) {
            throw new Error(`HTTP error! status: ${responseCompra.status}`);
          }
  
          const dataCompra = await responseCompra.json();
          setCompra(dataCompra);
        
         

         
       
            
          
   
        } catch (error) {
          console.error("Error fetching products or payments:", error);
        }
      };
  
      fetchProductosYPagos();
    }, [cookieValue]);
  

      const productos = JSON.parse(Cookies.get('productos') || '[]');
      const servicios = JSON.parse(Cookies.get('servicios') || '[]');

      
        for(const article of compra){
          for (const product of productos){
          
            if(article.empresa_id == product.empresa_id && article.articulo_id == product.id){
              article.nombre = product.nombre; 
        
            }
          }
          for (const service of servicios){
            if(article.empresa_id == service.empresa_id && article.articulo_id  == service.id){
              article.nombre = service.nombre; 
            }
          }

        
        }
    



        const pedido = compra.map(item1 => {
          const item2 = pago.find(item => item.id === item1.pago_id);
          return {
            ...item1,
            ...item2
          };
        });
       
     
   const handleSubmit = async (e) =>{
    e.preventDefault();

    const formDataS = new FormData();
    formDataS.append('numero', numero);
    formDataS.append('banco', banco);
    formDataS.append('titular', titular);
    formDataS.append('tipo', tipo);
    formDataS.append('email', cookieValue);

    formDataS.forEach((value, key) => {
      console.log(key, value);
    });
    try {

      const response = await fetch('http://localhost:1080/api/cuenta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Asegúrate de que el Content-Type sea correcto
        },
        body: JSON.stringify({
            numero,
            banco,
            titular,
            tipo,
            email: cookieValue,
        }),
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

    
   }

     
      return <React.Fragment>
        <div className='all_request flex'>
          <div className='left tus_pedidos'>
            <br/>
          <h2 className='poppins-regular text-xl'>Tus pedidos</h2>
          <br/>
          {pedido.map((item, index) => (
            <div key={index}  className={`flex gap-10 request_per ${completados.includes(index) ? 'completed' : ''}`} 
          onClick={() => handleClick(index)}
        > 
            <div> <h3 className='poppins-bold '>{item.nombre} </h3> </div>
            <div> <p className='poppins-regular'>Cantidad requerida: {item.cantidad} </p> </div>
            <div>  <p  className='poppins-regular'> Comprador: Beautychamr</p> </div>
            <div> </div>
         

            </div>
          )) }
          </div>
          <div className='right'>
            <BackgroundGradientAnimation3>
              <div className='m-3'>
               <br/> 
              <h2 className='poppins-regular text-white text-xl '>¡Introduce tus datos de este lado <br/> y empieza a vender!</h2>
            <br/> <br/> <br/>
            <form onSubmit={handleSubmit}>
            <div className='flex gap-5'>
            <div class="w-60 h-12 relative flex rounded-xl">
                  <input 
                    required=""
                    class="peer w-full bg-transparent outline-none px-4 relative  z-10 text-base rounded-xl bg-white border border-[#C9386A] focus:shadow-md"
                    id="address"
                    type="number"
                    style={{
                      color: 'white' ,
                      background: "rgba(255, 255, 255, 0.12)",
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10.7px)",
                      WebkitBackdropFilter: "blur(5.3px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}

                    value={numero} onChange={(e) => setNumero(e.target.value)}  
                  />
                  <label
                      class="absolute top-0 translate-y-[-100%] font-normal z-6 left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#C9386A] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#C9386A] duration-150"
                      htmlFor="address"
                  >
                    Número de cuenta</label>


                    
                </div>
                <div class="w-60 h-12 relative flex rounded-xl">
                  <input
                    required=""
                    class="peer w-full bg-transparent outline-none px-4 relative  z-10 text-base rounded-xl bg-white border border-[#C9386A] focus:shadow-md"
                    id="address"
                    type="text"
                    style={{
                      color: 'white' ,
                      background: "rgba(255, 255, 255, 0.12)",
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10.7px)",
                      WebkitBackdropFilter: "blur(5.3px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                    value={banco} onChange={(e) => setBanco(e.target.value)}  
                  />
                  <label
                      class="absolute top-0 translate-y-[-100%] font-normal z-6 left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#C9386A] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#C9386A] duration-150"
                      htmlFor="address"
                  >
                    Banco</label>


                    
                </div>
            </div>
            <br/>
            <div className='flex gap-5'>
            <div class="w-60 h-12 relative flex rounded-xl">
                  <input
                    required=""
                    class="peer w-full bg-transparent outline-none px-4 relative  z-10 text-base rounded-xl bg-white border border-[#C9386A] focus:shadow-md"
                    id="address"
                    type="text"
                    style={{
                      color: 'white' ,
                      background: "rgba(255, 255, 255, 0.12)",
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10.7px)",
                      WebkitBackdropFilter: "blur(5.3px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                    value={titular} onChange={(e) => setTitular(e.target.value)}  
                  />
                  <label
                      class="absolute top-0 translate-y-[-100%] font-normal z-6 left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#C9386A] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#C9386A] duration-150"
                      htmlFor="address"
                  >
                    Titular de la cuenta</label>


                    
                </div>
                
                <select  className='poppins-thin w-1/2 relative z-10 bg-transparent rounded '
                    style={{
                      color: 'white' ,
                      background: "rgba(255, 255, 255, 0.12)",
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10.7px)",
                      WebkitBackdropFilter: "blur(5.3px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                    value={tipo} onChange={(e) => setTipo(e.target.value)}  
                    >     <option className='poppins-extralight bg-[#C9386A] text-white' value="" disabled selected>Categoría</option>
                    <option className='poppins-extralight bg-[#C9386A]' value="Ahorro">Ahorro</option>
                    <option className='poppins-extralight bg-[#C9386A]' value="Normal">Normal</option>
                    
                  </select>
            </div>
            <button type="submit" className='poppins-semibold' id='button'>Continuar</button>
            
            </form>
          
              </div>
            
            </BackgroundGradientAnimation3>
         
          </div>
        </div>
      </React.Fragment>
}