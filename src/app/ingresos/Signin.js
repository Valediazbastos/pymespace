  "use client";   
  import React, { useEffect }  from 'react'
  import { useState } from 'react';
  import Cookies from 'js-cookie';
  import Signinpyme from './Signinpyme';
  import './CSS/Signin.css'
  import IconButton from '@mui/material/IconButton';
  import { TextGenerateEffect } from '../componentes_css/components/ui/text-generate-effect';
  import { cn } from '../utils';
  import { BackgroundGradientAnimation2 } from '../componentes_css/components/ui/background-gradient-animation2';
import Login from './Login';




  export default function Signin() {
    const words = `¡Bienvenida pyme! ¿lista para crecer?`;
      const [nombre, setNombre] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [tipo, setTipo] = useState('empresa');
      const [go_login, setGo_Login] = useState(false);
  
      const [usuarioGuardado, setUsuarioGuardado] = useState(false);
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };  
    
      const login = () => {
        setGo_Login(true)
      }
    
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

              if(go_login == true){
              return  <React.Fragment>
                  <Login/>
                </React.Fragment>
              } else {
                return <React.Fragment>
                <BackgroundGradientAnimation2>
    
               
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
                      class="absolute top-0 translate-y-[-100%] font-normal  left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#C9386A] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#C9386A] duration-150"
                      htmlFor="address"
                  >
                    Nombre de tu empresa</label>
                </div>
            
              <br />     <br />
            
                <div class="w-60 h-12 relative flex rounded-xl">
                  <input
                    required=""
                    class="peer w-full bg-transparent outline-none px-4 text-base rounded-xl  border border-[#C9386A] focus:shadow-md"
                    id="address"
                    type="text"
                    value={email} onChange={(e) => setEmail(e.target.value)}  
                    style={{
                      color: 'white' ,
                      background: "rgba(255, 255, 255, 0.12)",
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10.7px)",
                      WebkitBackdropFilter: "blur(5.3px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  />
                  <label
                      class="absolute top-0 font-normal translate-y-[-100%]  left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#C9386A] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#C9386A] duration-150"
                      htmlFor="address"
                  >
                    Email empresarial o personal</label>
                </div>
             
              
                              
                  <br />      <br />
                  <label>
                 
                <div class="w-60 h-12 relative flex rounded-xl">
                  <input
                    required=""
                    class="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#C9386A] focus:shadow-md"
                    id="address"
                  type='password'
                  style={{
                    color: 'white' ,
                    background: "rgba(255, 255, 255, 0.12)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10.7px)",
                    WebkitBackdropFilter: "blur(5.3px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                  value={password} onChange={(e) => setPassword(e.target.value)}  
                  />  
                  <label
                       class="absolute top-0 translate-y-[-100%]  left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#C9386A] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#C9386A] font-normal duration-150"
                       htmlFor="address"
                    
                  >
                    Contraseña </label>
                </div>
              
                    </label>
                  <br />      <br />
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
                      <button className='poppins-light' onClick={login}>Haz click aquí para el log in</button>
                    
                        </div>
                    </div>
              
                  </div>
                </div>
                </BackgroundGradientAnimation2>
            </React.Fragment>
              }
          
  }