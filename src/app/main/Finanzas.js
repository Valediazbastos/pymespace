"use client";
import React, { useCallback, useState } from 'react';
import '../ingresos/CSS/Principal.css';
import Modal from 'react-modal';
import '../ingresos/CSS/Marketing.css';
import Simulacion from './Simulation'; // Asegúrate de que esta ruta sea correcta
import Quiz  from './Quiz';
import Pymespace from './Pymespace';



export default function Finanzas() {
    const [courseChosen, setCourseChosen] = useState("1");
    const [lessonChosen, setLessonChosen] = useState("1"); // Estado para la lección seleccionada

    const courseChosenHandler = useCallback(async (option) => {
        setCourseChosen(option);
    }, []);

    const lessonChosenHandler = (lesson) => {
        setLessonChosen(lesson);
    };

    const nextLesson = () => {
        if (lessonChosen < "3") { // Cambia "3" al número total de lecciones
            setLessonChosen((prev) => (parseInt(prev) + 1).toString());
        }
    };

    const prevLesson = () => {
        if (lessonChosen > "1") {
            setLessonChosen((prev) => (parseInt(prev) - 1).toString());
        }
    };
    const [volver, setVolver] = useState(true)

    const Vuelve = () => {
        setVolver(false)
    }

    return (

        <React.Fragment>
             {volver ? (
                <div>
                     <div className='specific' id='fundamentos'>
                     <div> <button  onClick={Vuelve}   ><box-icon name='left-arrow-circle'style={{width:'50px', height:'50px'}}></box-icon></button> </div>
       
                {courseChosen === '1' && (
                    <div className="course-container poppins-regular">
                        <h2 className='poppins-bold text-2xl'>Fundamentos de las PYMES</h2>
                        <div className="lesson-menu">
                            <button onClick={() => lessonChosenHandler("1")}>Lección 1: Introducción a las PYMES</button>
                            <button onClick={() => lessonChosenHandler("2")}>Lección 2: Creación y Gestión de una PYME</button>
                            <button onClick={() => lessonChosenHandler("3")}>Lección 3: Planificación Estratégica para PYMES</button>
                        </div>

                        <div className="lesson-content">
                        {lessonChosen === "1" && (
    <div>
        <h3>Lección 1: Introducción a las PYMES</h3>
        <p>Las pequeñas y medianas empresas (PYMES) juegan un papel crucial en la economía global. En esta lección, aprenderás los conceptos básicos sobre qué son las PYMES y por qué son importantes.</p>
        <div className='flex flex-wrap gap-5 poppins-regular' >
        <div className="key-concept">
            <h4 className='text-[#1EA4D9]'>Definición de PYME</h4>
            <p>Las PYMES son empresas que tienen un tamaño reducido en comparación con las grandes corporaciones. Se definen generalmente por el número de empleados, el volumen de negocios, o los activos.</p>
        </div>

        <div className="key-concept">
        <h4 className='text-[#1EA4D9]'>Importancia de las PYMES</h4>
            <p>Las PYMES son fundamentales para la economía debido a su capacidad para generar empleo, innovar y contribuir al desarrollo económico local y regional.</p>
        </div>

        <div className="key-concept">
        <h4 className='text-[#1EA4D9]'>Tipos de PYMES</h4>
            <p>Las PYMES pueden clasificarse en pequeños negocios, medianas empresas y empresas familiares. Cada tipo tiene sus propias características y desafíos.</p>
        </div>

        <div className="key-concept">
        <h4 className='text-[#1EA4D9]'>Desafíos comunes para las PYMES</h4>
            <p>Entre los desafíos más comunes se encuentran la gestión de flujo de caja, el acceso a financiamiento, y la competencia con grandes empresas.</p>
        </div>
        </div>
      
    </div>
)}


{lessonChosen === "2" && (
    <div>
        <h3>Lección 2: Creación y Gestión de una PYME</h3>
        <p>Crear y gestionar una PYME requiere planificación y habilidades específicas. En esta lección, exploraremos el proceso de establecer y administrar una PYME con éxito.</p>
        <div className='flex flex-wrap gap-5 poppins-regular' >
        <div className="key-concept">
        <h4 className='text-[#1EA4D9]'>Pasos para crear una PYME</h4>
            <p>Incluye investigación de mercado, elaboración del plan de negocios, registro de la empresa, y obtención de financiamiento.</p>
        </div>

        <div className="key-concept">
        <h4 className='text-[#1EA4D9]'>Gestión operativa de una PYME</h4>
            <p>Implica la administración diaria de las operaciones, la gestión de recursos humanos, y la optimización de procesos.</p>
        </div>

        <div className="key-concept">
           <h4 className='text-[#1EA4D9]'>Importancia del marketing para las PYMES</h4>
            <p>Un buen marketing puede ayudar a atraer clientes, aumentar las ventas y construir una marca sólida.</p>
        </div>

        <div className="key-concept">
        <h4 className='text-[#1EA4D9]'>Desarrollo y retención de clientes</h4>
            <p>Crear relaciones sólidas con los clientes y mantenerlos satisfechos es esencial para el crecimiento de la PYME.</p>
        </div>
             </div>
       
    </div>
)}


{lessonChosen === "3" && (
    <div>
         <div className='flex flex-wrap gap-5 poppins-regular' >
         <h3>Lección 3: Planificación Estratégica para PYMES</h3>
        <p>La planificación estratégica es clave para el éxito a largo plazo de una PYME. Aquí aprenderás cómo desarrollar una estrategia efectiva para tu empresa.</p>
        
        <div className="key-concept">
        <h4 className='text-[#1EA4D9]'>Desarrollo de un plan estratégico</h4>
            <p>Incluye la definición de la visión, misión, y objetivos a largo plazo, así como la identificación de estrategias para alcanzarlos.</p>
        </div>

        <div className="key-concept">
        <h4 className='text-[#1EA4D9]'>Análisis FODA (Fortalezas, Oportunidades, Debilidades y Amenazas)</h4>
            <p>El análisis FODA ayuda a identificar las áreas en las que la empresa puede mejorar y las oportunidades que puede aprovechar.</p>
        </div>

        <div className="key-concept">
        <h4 className='text-[#1EA4D9]'>Establecimiento de metas y objetivos</h4>
            <p>Define metas claras y alcanzables para la empresa y establece un plan para alcanzarlas.</p>
        </div>

        <div className="key-concept">
        <h4 className='text-[#1EA4D9]'>Monitoreo y ajuste de la estrategia</h4>
            <p>Es importante revisar periódicamente la estrategia y hacer ajustes en función de los cambios en el mercado y el desempeño de la empresa.</p>
        </div>
        
        <Simulacion />
         </div>
       
    </div>
)}

                        </div>
                    </div>
                )}
            </div>
                </div>
               ):(
                <Pymespace/>
              )}
           
        </React.Fragment>
    );
}