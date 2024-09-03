"use client";   
import React, { use }  from 'react'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../ingresos/CSS/Edittion.css'

import Modal from 'react-modal';
import Dropzone from 'react-dropzone';


export default function Especificaciones(){
       
    const cookieValue = Cookies.get('usuario');
    const editables = JSON.parse(Cookies.get('editables') || '[]');
    const [cantidad_p, setCantidadP ]  = useState('')
    const [cantidad_d, setCantidadD ]  = useState('')
    const [lugares, setLugares ]  = useState('')
    const [precio, setPrecio ]  = useState('')
    const [idioma, setIdioma ]  = useState('')
    const [horario, setHorario ]  = useState('')
    const [comentarios, setComentarios ]  = useState('')

    const editableId = editables.id

console.log(editableId)
        
    const handleSubmit = async (e) => {
      e.preventDefault();
     
      const formData = {
        cantidad_p,
        cantidad_d,
        lugares,
        precio,
        idioma,
        horario,
        comentarios,
        editableId

      };
      try {
          const response = await fetch('http://localhost:1080/api/especificaciones', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
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
        <div className='specific'>
            <h2 className='poppins-semibold text-2xl'>Aquí podrás agregar tus detalles del servicio que brindas</h2>
     <p className='poppins-light'>Este apartado es opcional, esta diseñado para aquellas actividades que requieren estos <br/> detalles, puedes no realizarla o dejar alguna vacía</p>
   <form onSubmit={handleSubmit}>
   <br/>
      <div className='flex'>
        
      </div>
        <div className='relative'>
        <input
           class=" relative top-5 peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
           id="address"
           
         placeholder='Cantidad de personas'
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
           
          type='text'    value={cantidad_p} // Mostrar 'editables.nombre' si 'nombre' es vacío o nulo
          onChange={(e) => setCantidadP(e.target.value)}/>
          
          <label
                       class="absolute top-5   px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#1EA4D9] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#1EA4D9] font-normal duration-150"
                       htmlFor="address"
                    
                  >
                    Cantidad de personas que pueden realizar la actividad o personal necesario </label>
        </div>
           <br/>
        <div className='relative'>
        <input
           class=" relative top-5 peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
           id="address"
           
         placeholder='Cantidad de tiempo'
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
           
          type='text'    value={cantidad_d} // Mostrar 'editables.nombre' si 'nombre' es vacío o nulo
          onChange={(e) => setCantidadD(e.target.value)}/>
          
          <label
                       class="absolute top-5   px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#1EA4D9] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#1EA4D9] font-normal duration-150"
                       htmlFor="address"
                    
                  >
                    Cantidad de tiempo que se realiza el trabajo o actividad </label>
        </div>

        <br/>
        <div className='relative'>
        <input
           class=" relative top-5 peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
           id="address"
           
         placeholder='Lugares'
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
           
          type='text'    value={lugares} // Mostrar 'editables.nombre' si 'nombre' es vacío o nulo
          onChange={(e) => setLugares(e.target.value)}/>
          
          <label
                       class="absolute top-5   px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#1EA4D9] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#1EA4D9] font-normal duration-150"
                       htmlFor="address"
                    
                  >
                    Lugares que pasan o visitan </label>
        </div>
        <br/>
        <div className='relative'>
        <input
           class=" relative top-5 peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
           id="address"
           
         placeholder='Coloca que no incluye el precio base'
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
           
          type='text'    value={precio} // Mostrar 'editables.nombre' si 'nombre' es vacío o nulo
          onChange={(e) => setPrecio(e.target.value)}/>
          
          <label
                       class="absolute top-5   px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#1EA4D9] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#1EA4D9] font-normal duration-150"
                       htmlFor="address"
                    
                  >
                    Precio puede incrementar debido a... </label>
        </div>
           <br/>
           
           <div className='flex gap-10'>
           <div className='relative'>
        <input
           class=" relative top-5 peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
           id="address"
           
         placeholder='Idiomas'
           style={{
            color: 'white' ,
                    background: "rgba(32,99, 208, 0.5)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10.7px)",
                    WebkitBackdropFilter: "blur(5.3px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    width: '130%',
                      height: '7vh '
             
           }}
           
          type='text'    value={idioma} // Mostrar 'editables.nombre' si 'nombre' es vacío o nulo
          onChange={(e) => setIdioma(e.target.value)}/>
          
          <label
                       class="absolute top-5   px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#1EA4D9] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#1EA4D9] font-normal duration-150"
                       htmlFor="address"
                    
                  >
                    Idiomas brindados</label>
        </div>
           <br/>
           <div className='relative'>
        <input
           class=" relative top-5 peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
           id="address"
           
         placeholder='Horario'
           style={{
            color: 'white' ,
                    background: "rgba(32,99, 208, 0.5)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10.7px)",
                    WebkitBackdropFilter: "blur(5.3px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    width: '115%',
                      height: '7vh '
             
           }}
           
          type='text'    value={horario} // Mostrar 'editables.nombre' si 'nombre' es vacío o nulo
          onChange={(e) => setHorario(e.target.value)}/>
          
          <label
                       class="absolute top-5   px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#1EA4D9] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#1EA4D9] font-normal duration-150"
                       htmlFor="address"
                    
                  >
                    Horaios brindados</label>
        </div>
           </div>

           <br/>
           <div className='relative'>
        <input
           class=" relative top-5 peer w-full bg-transparent outline-none px-4 text-base rounded bg-white border border-[#C9386A] focus:shadow-md"
           id="address"
           
         placeholder='Comentarios'
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
           
          type='text'    value={comentarios} // Mostrar 'editables.nombre' si 'nombre' es vacío o nulo
          onChange={(e) => setComentarios(e.target.value)}/>
          
          <label
                       class="absolute top-5   px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#1EA4D9] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#1EA4D9] font-normal duration-150"
                       htmlFor="address"
                    
                  >
                    Comentarios adicionales importantes </label>
        </div>
        <br/>
        <div className='relative '>
        <button type="submit" className='poppins-semibold' id='button2'>Guardar</button>
        <button  className='poppins-semibold relative top-5' >
            
        <box-icon name='left-arrow-circle' type='solid' color='#8c3586' style={{width:'50px', height:'50px',position:'relative'}} ></box-icon>
          </button>
        </div>
       
   </form>
    
        </div>
        
              
        
    </React.Fragment>


}