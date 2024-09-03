"use client";   
import React ,  { useEffect } from 'react'
import { useState } from 'react';
import Cookies from 'js-cookie';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';



export default function Signinpyme() {
        const [codigo, setCodigo] = useState('');
        const [nombre, setNombre] = useState('');
        const [direccion, setDireccion] = useState('');
        const [tipo, setTipo] = useState('');
        const [valor, setValor] = useState(''); // valor agregado
        const [telefono, setTelefono] = useState('');
        const [usuario_id, setUsuario_id]  = useState('');
        const [fecha, setFecha]  = useState('');
        
    
    

        const handleSubmit = async (e) => {

            e.preventDefault();

            const formData = new FormData();
            formData.append('codigo', codigo);
            formData.append('nombre', nombre);
            formData.append('direccion', direccion);
            formData.append('tipo', tipo);
            formData.append('valor', valor);
            formData.append('telefono', telefono);
            formData.append('fecha', fecha);
        
            const fileInput = document.getElementById('file');
            if (fileInput.files.length > 0) {
                formData.append('file', fileInput.files[0]);
            }

            try {
                console.log('Datos a enviar:', { codigo, nombre, direccion, tipo, valor, telefono, fecha });

                const response = await fetch('http://localhost:1080/api/empresa', {
                    method: 'POST',
                   
                    body:formData,
                });

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data, "listo");
                        
                    } else {
                        console.error('Error al guardar el usuario');
                    }
                } catch (error) {
                    console.error('Error al enviar la solicitud: ', error);
                }
            };

            return <React.Fragment>
               
                <form onSubmit={handleSubmit} className='mt-8 '>
             
                    <div id='row1' className='px-2 ' >
                   
          <div class="w-60 h-12 relative flex rounded-xl">
            <input
              required=""
              class="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#C9386A] focus:shadow-md"
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
              value={nombre} onChange={(e) => setNombre(e.target.value)}  
            />
            <label
              class="absolute top-0 translate-y-[-100%] left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#C9386A] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#C9386A] duration-150"
              for="address"
            >
              Nombre de tu empresa</label>
          </div>
     
                  <label id='label1'>
                  
                     
                       <div class="w-60 h-12 relative flex rounded-xl">
                         <input
                           required=""
                           class="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#C9386A] focus:shadow-md"
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
                           value={direccion} onChange={(e) => setDireccion(e.target.value)}  
                         />
                         <label
                           class="absolute top-0 translate-y-[-100%]  left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#C9386A] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#C9386A] duration-150"
                           for="address"
                         >
                          Dirección (cantón y provincia) </label>
                       </div>
                    
                         <p className='text-sm text-white poppins-extralight'>(Si no tienes local coloca: no)</p>
             
             
                                             </label>   
                    </div>
             

                    <label  className='poppins-extralight text-[#C9386A] px-2'>
                        Tipo:
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={tipo}
                           className='text-white poppins-extralight'
                            onChange={(e) => setTipo(e.target.value)}>
                            <FormControlLabel  value="Microempresa"  control={<Radio sx={{ '&.Mui-checked': { color: '#C9386A' } }} />}  label="Microempresa" />
                            <FormControlLabel value="Pequeña empresa" control={<Radio sx={{ '&.Mui-checked': { color: '#C9386A' } }} />}   label="Pequeña empresa" />
                            <FormControlLabel value="Mediana empresa" control={<Radio sx={{ '&.Mui-checked': { color: '#C9386A' } }} />}  label="Mediana empresa" />
                        </RadioGroup>
                </label>
                <br/>  
                <label>
                <div id='row1' className='px-2' >
            <div class="w-60 h-12 relative flex rounded-xl">
            <input
              required=""
              class="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#C9386A] focus:shadow-md"
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
              value={valor} onChange={(e) => setValor(e.target.value)}  
            />
            <label
              class="absolute top-0 translate-y-[-100%]  left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#C9386A] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#C9386A] duration-150"
              for="address"
            >
            Valor </label>
          </div>
          <div class="w-60 h-12 relative flex rounded-xl">
            <input
              required=""
              class="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#C9386A] focus:shadow-md"
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
              value={telefono} onChange={(e) => setTelefono(e.target.value)}  
            />
            <label
              class="absolute top-0 translate-y-[-100%]  left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#C9386A] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#C9386A] duration-150"
              for="address"
            >
            Telefono empresarial</label>
          </div>
            </div>
        
     
                   </label>
                
          <br/> <br/>
         <div id='row1' className='px-2' >
              <div class="w-60 h-12 relative flex rounded-xl">
            <input
              required=""
              class="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#C9386A] focus:shadow-md"
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
              value={codigo} onChange={(e) => setCodigo(e.target.value)}  
            />
            <label
              class="absolute top-0 translate-y-[-100%] left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#C9386A] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#C9386A] duration-150"
              for="address"
            >
            Código PYME</label>
          </div>
          <label className='text-[#C9386A] poppins-extralight' >
                    fecha:
                    <input type="date" 
                     style={{
                      color: 'white' ,
                      background: "rgba(255, 255, 255, 0.12)",
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10.7px)",
                      WebkitBackdropFilter: "blur(5.3px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                    value={fecha} onChange={(e) => setFecha(e.target.value)} />
                </label>
              </div>
                  
              
              <br/>
                
               <div className='px-2'>
               <input type="file" id="file" name="file" accept="image/*"
                 style={{
                  color: 'white' ,
                  background: "rgba(255, 255, 255, 0.12)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(10.7px)",
                  WebkitBackdropFilter: "blur(5.3px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
                className='poppins-extralight ' />
               </div>
        
                <button type="submit" className='mt-5 poppins-semibold' id='button'>Guardar Usuario</button>
    
               </form>
    </React.Fragment>
}