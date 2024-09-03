"use client";   
import React, { useCallback }  from 'react'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Orders from './Orders'
import '../ingresos/CSS/Principal.css'
import Modal from 'react-modal';
import zIndex from '@mui/material/styles/zIndex';
import '../ingresos/CSS/Marketing.css'
import Quiz  from './Quiz';
import Pymespace from './Pymespace';


export default function Marketing(){
    const [volver, setVolver] = useState(true)

    const Vuelve = () => {
        setVolver(false)
    }

    return <React.Fragment>
         {volver ? (    

            <div>   <div className='relative left-20'>
            <div>
            <div> <button  onClick={Vuelve}   ><box-icon name='left-arrow-circle'style={{width:'50px', height:'50px'}}></box-icon></button> </div>
                <h2 className='text-2xl relative top-2 poppins-semibold   '>Fundamentos del Marketing en Redes Sociales para PYMES</h2>
               <h3 className='poppins-light'>Principios del marketing</h3>
                <div className='foundations'>
                <div className="myCard relative left-5 top-5" >
                    <div class="innerCard">
                        <div class="frontSide">
                            <p class="title_2 poppins-bold relative top-4"> Orientación al Cliente</p>
                            <p className='poppins-extralight text-xs'>Colocar al cliente en el centro de todas las decisiones y estrategias</p>
                        </div>
                        <div class="backSide">
                            <p class="title_2 poppins-bold "> Ponlo en práctica.</p>
                            <p className='poppins-extralight text-xs relative bottom-5' >Realizar encuestas de satisfacción y adaptar los productos basándose en el feedback de los clientes.</p>
                        </div>
                    </div>
                </div>

                <div className="myCard relative left-5 top-5" >
                    <div class="innerCard">
                        <div class="frontSide">
                            <p class="title_2 poppins-bold relative top-4">Segmentación de Mercado</p>
                            <p className='poppins-extralight text-xs'> Dividir el mercado en grupos más pequeños con características y necesidades similares.</p>
                        </div>
                        <div class="backSide">
                            <p class="title_2 poppins-bold "> Ponlo en práctica.</p>
                            <p className='poppins-extralight text-xs relative bottom-5' > Elige tu primer punto demográfico de ataque, pregúntate ¿Qué clase de población te necesita más? y ¿A cuál le vendes más?.</p>
                        </div>
                    </div>
                </div>

                <div className="myCard relative left-5 top-5" >
                    <div class="innerCard">
                        <div class="frontSide">
                            <p class="title_2 poppins-bold relative top-4">Posicionarse</p>
                            <p className='poppins-extralight text-xs'> Crear una imagen específica de un producto o servicio en la mente del consumidor en relación a la competencia.</p>
                        </div>
                        <div class="backSide">
                            <p class="title_2 poppins-bold "> Ponlo en práctica.</p>
                            <p className='poppins-extralight text-xs relative bottom-5' >Utilizar mensajes de marketing y branding para comunicar las características únicas del producto.</p>
                        </div>
                    </div>
                </div>
                <div className="myCard relative left-5 top-5" >
                    <div class="innerCard">
                        <div class="frontSide">
                            <p class="title_2 poppins-bold relative top-4">Las 4Ps </p>
                            <p className='poppins-extralight text-xs'> <b>Producto: </b> Desarrollo y gestión.
                            <br/><b>Precio:</b>Fija precios para atraer y retener clientes.
                            <br/><b>Plaza:</b> Canales de distribución y logística.
                            <br/><b> Promoción:</b> Comunicación y promoción en el mercado.</p>
                        </div>
                        <div class="backSide">
                            <p class="title_2 poppins-bold "> Ponlo en práctica.</p>
                            <p className='poppins-extralight text-xs relative bottom-5' >Utilizar mensajes de marketing y branding para comunicar las características únicas del producto.</p>
                        </div>
                    </div>
                    
                </div>
                <div className="myCard relative left-5 top-5" >
                    <div class="innerCard">
                        <div class="frontSide">
                            <p class="title_2 poppins-bold relative top-4">Investigación de Mercado </p>
                            <p className='poppins-extralight text-xs'> Recopilar y analizar información relevante sobre el mercado y los consumidores.</p>
                        </div>
                        <div class="backSide">
                            <p class="title_2 poppins-bold "> Ponlo en práctica.</p>
                            <p className='poppins-extralight text-xs relative bottom-5' >Haz estudios de mercado para entender las tendencias de consumo y la competencia.</p>
                        </div>
                    </div>
                    
                </div>


                <div className="myCard relative left-5 top-5" >
                    <div class="innerCard">
                        <div class="frontSide">
                            <p class="title_2 poppins-bold relative top-4">Relaciones a Largo Plazo</p>
                            <p className='poppins-extralight text-xs'>Enfocarse en construir relaciones duraderas con los clientes.</p>
                        </div>
                        <div class="backSide">
                            <p class="title_2 poppins-bold "> Ponlo en práctica.</p>
                            <p className='poppins-extralight text-xs relative bottom-5' >Ofrece descuentos y beneficios exclusivos a clientes recurrentes.</p>
                        </div>
                    </div>
                    
                </div>


                <div className="myCard relative left-5 top-5" >
                    <div class="innerCard">
                        <div class="frontSide">
                            <p class="title_2 poppins-bold relative top-4">Valor al Cliente</p>
                            <p className='poppins-extralight text-xs'>Proporcionar productos y servicios que los clientes perciban como valiosos.</p>
                        </div>
                        <div class="backSide">
                            <p class="title_2 poppins-bold "> Ponlo en práctica.</p>
                            <p className='poppins-extralight text-xs relative bottom-5' >Mejora constantemente el producto basándose en las necesidades de tu cliente para agregar valor.</p>
                        </div>
                    </div>
                    
                </div>

                <div className="myCard relative left-5 top-5" >
                    <div class="innerCard">
                        <div class="frontSide">
                            <p class="title_2 poppins-bold relative top-4"> Cargos: Social y Ética</p>
                            <p className='poppins-extralight text-xs'>Actuar de manera ética y responsable con la sociedad y el medio ambiente.</p>
                        </div>
                        <div class="backSide">
                            <p class="title_2 poppins-bold "> Ponlo en práctica.</p>
                            <p className='poppins-extralight text-xs relative bottom-5' >Utilizar materiales reciclables y apoyar causas sociales.</p>
                        </div>
                    </div>
                    
                </div>

                <div className="myCard relative left-5 top-5" >
                    <div class="innerCard">
                        <div class="frontSide">
                            <p class="title_2 poppins-bold relative top-4">Adaptación y Flexibilidad</p>
                            <p className='poppins-extralight text-xs'> Ser capaz de adaptarse rápidamente a los cambios en el mercado y las demandas de los consumidores.</p>
                        </div>
                        <div class="backSide">
                            <p class="title_2 poppins-bold "> Ponlo en práctica.</p>
                            <p className='poppins-extralight text-xs relative bottom-5' >Ajusta las campañas de marketing digital en tiempo real basándose en el rendimiento y los comentarios.</p>
                        </div>
                    </div>
                    
                </div>
                <div className="myCard relative left-5 top-5" >
                    <div class="innerCard">
                        <div class="frontSide">
                            <p class="title_2 poppins-bold relative top-4">Innovación</p>
                            <p className='poppins-extralight text-xs'>Fomentar la creatividad y la innovación en productos, servicios y procesos de marketing.</p>
                        </div>
                        <div class="backSide">
                            <p class="title_2 poppins-bold "> Ponlo en práctica.</p>
                            <p className='poppins-extralight text-xs relative bottom-5' >Utilizar inteligencia artificial para personalizar las experiencias de los clientes.</p>
                        </div>
                    </div>
                    
                </div>

                    </div>  
                    <div className='relative top-20 '>
                    <h3 className='social poppins-bold text-xl'>¿Qué es el marketing en redes sociales?</h3>   
                    <p  className='social poppins-regular'> Es una técnica que involucra acciones de posicionamiento, difusión <br/> de marca e incluso procesos de venta en redes sociales</p>   
                        <div className='social_media relative top-3 bottom-3 flex gap-6'>
                        <div className="cardSM cardSMF">
                        <box-icon name='facebook-circle' type='logo' color='#ffffff' style={{width:'100px', height:'100px'}} ></box-icon>
                  
                             <div className="cardSM__content">
                            <p className="cardSM__title poppins-bold">Facebook</p>
                            <p className="cardSM__description poppins-light">Demografía: Usuarios de todas las edades, pero especialmente popular entre personas de 25-45 años.</p>
                        </div>
                    </div>
                    <div className="cardSM cardSMX">
                    <box-icon name='twitter' type='logo' color='#ffffff' style={{width:'100px', height:'100px'}}  ></box-icon>
      
                             <div className="cardSM__content">
                            <p className="cardSM__title poppins-bold">X</p>
                            <p className="cardSM__description poppins-light">Usuarios de 18-45 años, con un enfoque en personas interesadas en noticias, tecnología, y tendencias.</p>
                        </div>
                    </div>
                    <div className="cardSM cardSMI">
                    <box-icon name='instagram-alt' type='logo' color='#ffffff' style={{width:'100px', height:'100px'}} ></box-icon>
                             <div className="cardSM__content">
                            <p className="cardSM__title poppins-bold">Instagram</p>
                            <p className="cardSM__description poppins-light">Demografía: Usuarios jóvenes, principalmente de 18-35 años.</p>
                        </div>
                    </div>
                   
                    <div className="cardSM cardSMIN">
                    <box-icon name='linkedin' type='logo' color='#ffffff'  style={{width:'100px', height:'100px'}} ></box-icon>
                             <div className="cardSM__content">
                            <p className="cardSM__title poppins-bold">Linkedin</p>
                            <p className="cardSM__description poppins-light">Demografía: Profesionales y empresas, especialmente en el rango de 25-50 años.</p>
                        </div>
                    </div>
                   
                        </div>
                      <br/>  <br/>
                      <h3 className='poppins-semibold text-2xl'>Actividades</h3>
                      <h2>Actividad de PYME</h2>
                  
              <div className='p-3 poppins-regular'>
    <div>
                      <p>
                      <strong className='text-[#C9386A]'>1-</strong> Si no tienes una cuenta de red social para tu PYME, crea una en una plataforma popular como Facebook, Instagram o LinkedIn.
                      <br/> Si ya tienes una, utilízala para la actividad.

                      </p>
                      </div>
                      <br/>
                   <div>
                   <p><strong className='text-[#C9386A]'>2-</strong> Ahora usa las herramientas de análisis y estadísticas disponibles en la plataforma de redes sociales (por ejemplo, Facebook Insights,
                    <br/> Instagram Analytics, LinkedIn Analytics) para recolectar datos sobre: <br/>
Demografía de los seguidores (edad, género, ubicación). <br/>
Intereses y comportamientos (tipo de contenido que más les gusta, horario de mayor actividad).</p>

                   </div>
              <div>
                       <br/>
<p><strong className='text-[#C9386A]'>3-</strong> Basándote en los datos recolectados, define el perfil del público objetivo ideal para la PYME. Considera:
<br/>Segmentación demográfica (edad, género, ubicación).<br/>
Segmentación psicográfica (intereses, valores).<br/>
Comportamiento (hábitos de compra, interacción con el contenido).</p>
                 
              </div>
              </div>
              <br/>
                   <h2>Quiz que pondrá a prueba tus conocimientos</h2>
                      <Quiz />
                   
                    </div>
                      </div>
                    </div>

                    </div>
         ):(
           <Pymespace/>
         )}
     
    </React.Fragment>
}