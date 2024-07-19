"use client";   
import React, { useEffect }  from 'react'
import { useState } from 'react';
import Cookies from 'js-cookie';
import Signinpyme from './Signinpyme';
import './CSS/Signin.css'
import IconButton from '@mui/material/IconButton';
import { TextGenerateEffect } from '../componentes_css/components/ui/text-generate-effect';
import { cn } from '../utils';


export default function Signin() {
  const words = `¡Bienvenida pyme! ¿lista para crecer?`;
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tipo, setTipo] = useState('empresa');

    const [usuarioGuardado, setUsuarioGuardado] = useState(false);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };  
  
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:1080/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, email, password, tipo:"empresa" }),
            });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setUsuarioGuardado(true);
                } else {
                    console.error('Error al guardar el usuario');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud: ', error);
            }
        

      
            };

        return <React.Fragment>
          <div className='signin-container'>
            <div className='signin-box'>
            <div className="signin-left">
            {!usuarioGuardado ? (
          <form onSubmit={handleSubmit} id='form' >
          <div></div>
           
          <div class="w-60 h-12 relative flex rounded-xl">
            <input
              required=""
              class="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#C9386A] focus:shadow-md"
              id="address"
              type="text"
              value={nombre} onChange={(e) => setNombre(e.target.value)}  
            />
            <label
              class="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#C9386A] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#C9386A] duration-150"
              for="address"
            >
              Nombre de tu empresa</label>
          </div>
      
        <br />
      
          <div class="w-60 h-12 relative flex rounded-xl">
            <input
              required=""
              class="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#C9386A] focus:shadow-md"
              id="address"
              type="text"
              value={email} onChange={(e) => setEmail(e.target.value)}  
            />
            <label
              class="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#C9386A] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#C9386A] duration-150"
              for="address"
            >
              Email empresarial o personal</label>
          </div>
       
        
                        
            <br />
            <label>
           
          <div class="w-60 h-12 relative flex rounded-xl">
            <input
              required=""
              class="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#C9386A] focus:shadow-md"
              id="address"
            type='password'
            value={password} onChange={(e) => setPassword(e.target.value)}  
            />  
            <label
              class="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#C9386A] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#C9386A] duration-150"
              for="address"
              
            >
              Contraseña </label>
          </div>
        
              </label>
            <br />
            <label>
            
                  </label>
          
            
            <button type="submit" className='poppins-semibold' id='button'>Continuar</button>
          </form>       
        ) : (
          <Signinpyme email={email} />
        )}
                    
                </div>
                <div className='signin-right'>
                  <div className='text'>
                    <div className={cn( 'text-white', 'p-4', 'text-xs')}>
                    <TextGenerateEffect words={words} />
                    </div>
                
                <h1 className='poppins-bold'>Sign in</h1>
              
                <p className='poppins-thin' id='account'>¿Ya tienes cuenta?</p>  
                <button className='poppins-light'>Haz click aquí para el log in</button>
              
                  </div>
              </div>
        
            </div>
          </div>
      
      </React.Fragment>
}