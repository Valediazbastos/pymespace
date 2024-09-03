    "use client";   
    import React, { useCallback }  from 'react'
    import { useState, useEffect } from 'react';
    import Cookies from 'js-cookie';
    import Modal from 'react-modal';
    import { BackgroundGradientAnimation3 } from '../componentes_css/components/ui/background-gradient-animation3';
    import '../ingresos/CSS/Pymespace.css';
    import Marketing from './Marketing'
    import Fundamentos from './Fundamentos'
    import Finanzas from './Finanzas'

    export default function Pymespace(){
        useEffect(() => {
            import('boxicons');
    }, []);
    
    const completed = Cookies.get('completed') === 'true'; // Verificar si 'completed' es 'true'
    

    const [courseChosen, setCourseChosen] = useState("Pymespace")

    const courseChosenHandler = useCallback(async (option) => {
        setCourseChosen(option);
    }, []);
    
    
    const closeModal2 = () => {        
        setModalIsOpenEco(false);    
    };
    
    
        return <React.Fragment>
            {courseChosen === 'Pymespace'&& (
    <div className='pyme'> 
    <div className='relative flex '>
        <BackgroundGradientAnimation3>
            <div className='flex pymespace1'>
            <div className='left'>
        <h1 className='poppins-bold text-white'>PYMESPACE  APRENDE</h1>
        <p className='text-slate-100 poppins-light'>Bienvenido a PYMESPACE APRENDE: La plataforma dedicada a fortalecer el conocimiento y las habilidades de las PYMES en Costa Rica.
        </p>
        </div>
        <div className='right'>
        <img src='./img/3 (1).png' id='image'/>
        </div>

            </div>
    
        </BackgroundGradientAnimation3>
        
    </div>
    <div className='pymespace2 relative top-3'>
        <h2 className='poppins-semibold text-3xl '>¿Qué preguntas <b id='title_PYME'>PYME</b>  tienes?</h2>
        <div className='questions'>
        <div class="notification">
    <div className="notiglow"></div>
    <div className="notiborderglow"></div>
    <div className='relative left-6 top-5 bottom-5'>
    <box-icon name='sticker' style={{width:'35px', height:'35px',position:'relative'}} color='#32a6ff' ></box-icon>
    </div>

    <div className="notititle poppins-semibold text-2xl relative top-5">¿Cómo renuevo mi sello?</div>
    <div className="notibody poppins-extralight text-xs relative top-5">Según el artículo 26 del Decreto 39295 para su renovación, se requiere únicamente el Formulario de Registro PYME
    </div>
    </div>
    <div class="notification">
    <div className="notiglow"></div>
    <div className="notiborderglow"></div>
    <div className='relative left-6 top-5 bottom-5'>
    <box-icon name='sticker' style={{width:'35px', height:'35px',position:'relative'}} color='#32a6ff' ></box-icon>
    </div>

    <div className="notititle poppins-semibold text-2xl relative top-5">¿Cada cuánto renuevo el sello?
    </div>
    <div className="notibody poppins-extralight text-xs relative top-5">Cada año, para asegurarse de que tu negocio sigue cumpliendo con las normativas vigentes.

    </div>
    </div>

    <div class="notification">
    <div className="notiglow"></div>
    <div className="notiborderglow"></div>
    <div className='relative left-6 top-5 bottom-5'>
    <box-icon name='sticker' style={{width:'35px', height:'35px',position:'relative'}} color='#32a6ff' ></box-icon>
    </div>

    <div className="notititle poppins-semibold text-2xl relative top-5">¿Qué beneficios tiene el sello PYME?
    </div>
    <div className="notibody poppins-extralight text-xs relative top-5">Las PYMES con el sello MEIC pueden acceder a programas de financiamiento, capacitaciones, y apoyo en el desarrollo empresarial, entre otros beneficios que facilitan su crecimiento y competitividad, toca para verlo completo:
    </div>
    </div>
    <div class="notification">
    <div className="notiglow"></div>
    <div className="notiborderglow"></div>
    <div className='relative left-6 top-5 bottom-5'>
    <box-icon name='sticker' style={{width:'35px', height:'35px',position:'relative'}} color='#32a6ff' ></box-icon>
    </div>

    <div className="notititle poppins-semibold text-2xl relative top-5">¿Cómo uso PYMESPACE?
    </div>
    <div className="notibody poppins-extralight text-xs relative top-5">Acceder a recursos y herramientas diseñadas para PYMES.
    Participar en cursos y capacitaciones en línea.
    Conectar con otros emprendedores y expertos en tu industria.

    </div>
    </div>
    <div class="notification">
    <div className="notiglow"></div>
    <div className="notiborderglow"></div>
    <div className='relative left-6 top-5 bottom-5'>
    <box-icon name='sticker' style={{width:'35px', height:'35px',position:'relative'}} color='#32a6ff' ></box-icon>
    </div>

    <div className="notititle poppins-semibold text-2xl relative top-5">¿Cómo me aseguro de hacer bien el pago a Hacienda?
    </div>
    <div className="notibody poppins-extralight text-xs relative top-5">El impuesto o sanción ha sido registrado por la Administración Tributaria.
    El contribuyente presentó la declaración o formulario necesario mediante la Administración Tributaria Virtual (ATV).

    </div>
    </div>
    <div class="notification">
    <div className="notiglow"></div>
    <div className="notiborderglow"></div>
    <div className='relative left-6 top-5 bottom-5'>
    <box-icon name='sticker' style={{width:'35px', height:'35px',position:'relative'}} color='#32a6ff' ></box-icon>
    </div>

    <div className="notititle poppins-semibold text-2xl relative top-5">Acerca de la Ley PYME:
    </div>
    <div className="notibody poppins-extralight text-xs relative top-5">La Ley PYME está diseñada para apoyar y fortalecer a las pequeñas y medianas empresas. Proporciona beneficios fiscales, acceso facilitado a financiamiento, capacitación empresarial, para promover su desarrollo sostenible.

    </div>
    </div>

    <div class="notification">
    <div className="notiglow"></div>
    <div className="notiborderglow"></div>
    <div className='relative left-6 top-5 bottom-5'>
    <box-icon name='sticker' style={{width:'35px', height:'35px',position:'relative'}} color='#32a6ff' ></box-icon>
    </div>

    <div className="notititle poppins-semibold text-2xl relative top-5">¿Qué es PYME?

    </div>
    <div className="notibody poppins-extralight text-xs relative top-5">Son las siglas de Pequeñas y Medianas Empresas. En Costa Rica, se refiere a empresas que tienen un límite específico de ingresos anuales y un cierto número de empleados. 


    </div>
    </div>  
        </div>
        

    </div>
    <div className='value'>
        <div id='left'>
        <img src='./img/sello.png' className='size-100'/>
        </div>
        <div id='rigth' className='w-1/2'>
        <h2 className='poppins-regular text-3xl '>Hablemos de los <b id='title_value'>valores agregados</b> </h2>
        <p className='poppins-light'>
        Las PYMEs pueden obtener un valor agregado
        Hay cuatro colores de sellos disponibles: 
        Azul para calidad (Norma PYME INTE 01-01-09:2013 o ISO 9001).
        Verde para prácticas sostenibles (Norma Carbono Neutral o ISO 14000).
        Naranja para responsabilidad social (ISO 26001).
        Rojo para artesanía verificada por DIGEPYME según criterios UNESCO.

        </p>
        </div>
    </div>
    <div className='us'>
        <BackgroundGradientAnimation3>
        <div className="cards poppins-regular">
    <div className="card red">
    <p className="tip text-2xl">Visión</p>
    <p className="second-text poppins-light text-sm">Llegar a abarcar las pymes del país para que entre estás se den apoyo financiero y crecimiento en ventas de forma nacional, ya que el futuro del país está en sus manos.
    </p>
    </div>
    <div className="card blue">
    <p className="tip text-2xl">Misión</p>
    <p className="second-text poppins-light text-xs">Facilitar el crecimiento y la colaboración de las PYMES en Costa Rica mediante una plataforma digital que permita a las empresas con el sello MEIC vender y comprar productos y servicios entre sí, fomentando la economía local y potenciando su desarrollo económico y social.
    </p>
    </div>
    <div className="card green">
    <p className="tip text-2xl">Valores</p>
    <p className="second-text poppins-light text-sm">Responsabilidad <br/>
    Confianza  <br/>
    Cooperación  <br/>
    Aprendizaje
    </p>
    </div>
    </div>
        </BackgroundGradientAnimation3>
        
    </div>
    <div className='courses'>
    <h2 className='poppins-regular text-3xl '>Cursos para que eleves tu aprendizaje <b id='title_courses'>PYME</b>  </h2>
    <div className='flex poppins-medium gap-2 text-lg all_courses'>
    <div className='course' onClick={() => courseChosenHandler('Marketing')}>
            <h2>Fundamentos del Marketing en Redes Sociales para PYMES</h2>

        </div>
        
        <div className='course' onClick={() => courseChosenHandler('Fundamentos')}>
          
            <h2>Introducción a la gestión financiera para PYMES.</h2>
            
        </div>

        <div className='course' onClick={() => courseChosenHandler('Finanza')}>
        <h2>Fundamentos de las PYMES</h2>
        {completed && <p className='text-green-500'>Completado</p>} {/* Añadir texto "Completado" si la cookie es "true" */}
                
        </div>
    </div>
    </div>
    
    </div>
            )} {courseChosen === 'Marketing' && (
                <Marketing/>
        )} 
         {courseChosen === 'Fundamentos' && (
                <Fundamentos/>
        )} 
         {courseChosen === 'Finanza' && (
                <Finanzas/>
        )} 
        
        </React.Fragment>
    }