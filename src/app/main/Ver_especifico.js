"use client";   
import React, { use }  from 'react'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../ingresos/CSS/Edittion.css'

import Modal from 'react-modal';
import Dropzone from 'react-dropzone';
import { FlashAuto } from '@mui/icons-material';
import { Fascinate } from 'next/font/google';
import Principal from './Principal';



const ImgS =  ({ image, openModal, shopItems }) =>  (
    <div className="card ml-7 producto_cards" >
         
    <div  >
   
    {image.imagen_url && <img src={`http://localhost:1080/${image.imagen_url}`} className="product-image2" />}
  
    </div>
  
  
   
  
  
  
  
  
  </div>
  );
export default function Especificaciones(){
       
    const cookieValue = Cookies.get('usuario');
    const elegido_especifico = JSON.parse(Cookies.get('elegido_especifico') || '[]');
    const [businessS, setBusinessS] = useState([]);

    const [Volver, setVolver] = useState(true);
    const [especificaciones, setEspecificaciones] = useState([])
    
    useEffect(() => {
        const fetchProductos = async () => {
            const id = elegido_especifico.id;
          try {
            const response = await fetch(`http://localhost:1080/api/especificaciones/${id}`, {
              method: 'GET',
            });
            const data = await response.json();
            setEspecificaciones(data);
            console.log(setEspecificaciones)
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
       
        fetchProductos();
      }, []);

      useEffect(() => {
        const fetchProductos = async () => {
            const id = elegido_especifico.id;
            try {
                const response = await  fetch(`http://localhost:1080/api/empresa-servicio-fotos/${id}`);
                const data = await response.json();
                setBusinessS(data);
                console.log('businessS',businessS)
              
            } catch (error) {
                console.error('Error al obtener la empresa:', error);
            }
        };
       
        fetchProductos();
      }, []);

        
      console.log(especificaciones)

     
     const volver = () => {
        setVolver(false)
     } 
      
       
    return <React.Fragment>
        {Volver ? (
  <div className=' ver_mas_es p-3'>
  <button onClick={volver}>
      <box-icon name='left-arrow-circle' type='solid' color='#1EA4D9'style={{width:'50px', height:'50px',position:'relative'}}  ></box-icon>
      </button>
      <br/>
      <div className=' flex'>
      
      <div className='left'>
      <br/>
      <br/>
      <br/>
      <h2 className='poppins-semibold text-2xl'>Aquí podrás ver los detalles del servicio </h2>
      {especificaciones.map((especificacion, index) => (
              <div key={index} className='especificacion-item poppins-regular'>
                  
                  <p><strong className='text-[#1EA4D9]'>Cantidad de Personas:</strong> {especificacion.cantidad_personas}</p>
                 
                 <br/> <p><strong className='text-[#1EA4D9]'>Cantidad de Días:</strong> {especificacion.cantidad_dias}</p>
                 <br/>  <p><strong className='text-[#1EA4D9]'>Lugares:</strong> {especificacion.lugares}</p>
                 <br/>  <p><strong className='text-[#1EA4D9]'>Precio/Variación:</strong> {especificacion.precio_variacion}</p>
                 <br/>  <p><strong className='text-[#1EA4D9]'>Idioma:</strong> {especificacion.idioma}</p>
                 <br/>  <p><strong className='text-[#1EA4D9]'>Horarios:</strong> {especificacion.horarios}</p>
                 <br/>  <p><strong className='text-[#1EA4D9]'>Comentarios Adicionales:</strong> {especificacion.comentarios_adicionales}</p>
                
              </div>
          ))}
      </div>
      <div className='right'>
          
          <div className='flex flex-wrap businessss'>
           {businessS.map((image) =>
                           
                           <div  key={image.id}  >
                        <ImgS key={image.id} image={image} className='multiple-images' />
                         </div>

                       )}
           </div> 
      </div>
    
  </div>
  </div>
 
        ):(
            <Principal/>
        )}
      
        
              
        
    </React.Fragment>


}