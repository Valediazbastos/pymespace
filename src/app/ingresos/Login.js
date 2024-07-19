"use client";   
import React, { use }  from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import "./CSS/Login.css" 
import { BackgroundGradientAnimation } from '../componentes_css/components/ui/background-gradient-animation';
import Cookies from 'js-cookie';
import Principal from '../main/Principal'
import Signin from './Signin'
 

export default function Login(){
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signin, setSignin] = useState(false)
    const [permisoconcedido, setPermisoConcedido] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    function Signinfunction() {
      setSignin(true)
    }
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const Petition = async () => {
        try {
            const response = await fetch('http://localhost:1080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
             
                if (data.authorized) {
                    setPermisoConcedido(true);
                    Cookies.set('usuario', email, { expires: 7, path: '/' });
                          } else {
                    alert("Credenciales incorrectas");
                }
            } else {
                alert("Error al iniciar sesión");
            }
        } catch (error) {
            console.error('Error al enviar la solicitud: ', error);
            alert("Error de red");
        }
    };
 
    if(signin == true){
      return <React.Fragment>
        <Signin/>
      </React.Fragment>
    }
        return <React.Fragment>
          {!permisoconcedido ? (
          <BackgroundGradientAnimation  >
          <div className="absolute z-50 inset-0 flex items-center justify-center text-white  px-4 l text-center  ">
          <div className='login-container'>
            <div className='login-form'>
            <img src="./img/logo.png"  className='mx-auto w-1/4 md:w-1/6'/>
            <h2 className='poppins-semibold text-xl'>¡Bienvenida de vuelta PYME! ¿Lista para empezar?</h2>
            <TextField id="standard-basic" 
               value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="standard"  InputLabelProps={{ className: 'poppins-medium', style: { color: '#C9386A', backgroundColor:"none" } }} /> 
         
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel className='poppins-medium'  htmlFor="standard-adornment-password" style={{color:"#C9386A"}} >Contraseña</InputLabel>
          <Input 
          value={password} onChange={(e) => setPassword(e.target.value)}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  style={{color:"#C9386A"}}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <br/>
          <div className='space-y-[-4]'>
          <p className='poppins-thin text-sm '>¿No tienes cuenta aún?</p>
          <button className='poppins-regular text-sm  space-y-0' onClick={Signinfunction}>Haz click acá para registrarte</button>
      
          </div>
            </FormControl>
            <button type="submit" onClick={Petition}  id='button' >Entrar</button>
           
            </div>
          </div>
      </div>
         
          </BackgroundGradientAnimation>
         
        ) : (<Principal/> )}
        </React.Fragment>
    


}