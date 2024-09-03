import React, { useCallback, useState } from 'react';
import '../ingresos/CSS/Principal.css';
import Modal from 'react-modal';
import '../ingresos/CSS/Marketing.css';
import FinancialSimulation from './FinancialSimulation';
import Pymespace from './Pymespace';


export default function Fundamentos() {
    const [courseChosen, setCourseChosen] = useState("1");
    const [lessonChosen, setLessonChosen] = useState("1");

    const courseChosenHandler = useCallback(async (option) => {
        setCourseChosen(option);
    }, []);

    const lessonChosenHandler = (lesson) => {
        setLessonChosen(lesson);
    };

    const nextLesson = () => {
        if (lessonChosen < "5") {
            setLessonChosen((prev) => (parseInt(prev) + 1).toString());
        }
    };
    
    const prevLesson = () => {
        if (lessonChosen > "1") {
            setLessonChosen((prev) => (parseInt(prev) - 1).toString());
        }
    };

    const [volver, setVolver] = useState(true);
    const Vuelve = () => {
        setVolver(false);
    };

    return (
        <React.Fragment>
            {volver ? (
                <div className='specific' id='fundamentos'>
                    <div>
                        <button onClick={Vuelve}>
                            <box-icon name='left-arrow-circle' style={{ width: '50px', height: '50px' }}></box-icon>
                        </button>
                    </div>

                    {courseChosen === '1' && (
                        <div className="course-container poppins-regular">
                        <h2 className='poppins-bold text-2xl'>Gestión financiera para PYMES</h2>
                        <div className="lesson-menu">
                               <button onClick={() => lessonChosenHandler("1")}>Lección 1: Introducción a la Gestión Financiera</button>
                                <button onClick={() => lessonChosenHandler("2")}>Lección 2: Control de Flujos de Caja</button>
                                <button onClick={() => lessonChosenHandler("3")}>Lección 3: Planificación Financiera</button>
                            </div>

                            <div className="lesson-content">
                                {lessonChosen === "1" && (
                                    <div>
                                        <h3 className='text-lg poppins-bold'>Lección 1: Introducción a la Gestión Financiera</h3>
                                        <p>La gestión financiera es clave para el éxito de cualquier PYME. En esta lección, aprenderás los fundamentos de cómo manejar y supervisar las finanzas de tu empresa.</p>
                                        <p>Temas clave:</p>

                                        <div className="concept-box">
                                            <h2 className="concept-title poppins-bold text-xl text-[#2151CD]">Activos</h2>
                                            <div className="concept-content">
                                                <p>Definición: Los activos son recursos que una empresa posee y que tienen un valor económico. Estos recursos pueden ser utilizados para generar ingresos o para cumplir con las obligaciones de la empresa.</p>
                                                <p>Ejemplos: Dinero en efectivo, cuentas por cobrar, inventarios, propiedades, maquinaria, y equipos.</p>
                                            </div>
                                        </div>

                                        <div className="concept-box">
                                        <h2 className="concept-title poppins-bold text-xl text-[#2151CD]">Pasivos</h2>
                                            <div className="concept-content">
                                                <p>Definición: Los pasivos son las deudas y obligaciones que una empresa debe pagar en el futuro. Representan lo que la empresa debe a otros, y pueden ser a corto o largo plazo.</p>
                                                <p>Ejemplos: Préstamos bancarios, cuentas por pagar, impuestos por pagar, y obligaciones de alquiler.</p>
                                            </div>
                                        </div>

                                        <div className="concept-box">
                                        <h2 className="concept-title poppins-bold text-xl text-[#2151CD]">Ingresos</h2>
                                            <div className="concept-content">
                                                <p>Definición: Los ingresos son el dinero que una empresa recibe a cambio de sus productos o servicios. Es una medida clave del éxito de la empresa y se utiliza para cubrir los gastos y generar ganancias.</p>
                                                <p>Ejemplos: Ventas de productos, servicios prestados, intereses ganados, y otros ingresos operativos.</p>
                                            </div>
                                        </div>

                                        <div className="concept-box">
                                        <h2 className="concept-title poppins-bold text-xl text-[#2151CD]">Gastos</h2>
                                            <div className="concept-content">
                                                <p>Definición: Los gastos son los costos que una empresa incurre para operar su negocio. Los gastos pueden ser directos, como el costo de los materiales, o indirectos, como el alquiler de la oficina.</p>
                                                <p>Ejemplos: Salarios de empleados, alquiler, servicios públicos, costos de materiales, y gastos de marketing.</p>
                                            </div>
                                        </div>

                                        <ul>
                                          
                                        </ul>
                                    </div>
                                )}

{lessonChosen === "2" && (
    <div>
        <h3>Lección 2: Control de Flujos de Caja</h3>
        <p>El flujo de caja es esencial para mantener la operación diaria de tu PYME. Aquí aprenderás cómo gestionar los ingresos y gastos para asegurar la liquidez.</p>
        <p>Temas clave:</p>

        <div className="concept-box">
            <h2 className="concept-title text-xl">Qué es el flujo de caja y por qué es importante</h2>
            <div className="concept-content">
                <p>El flujo de caja es el movimiento de dinero que entra y sale de una empresa durante un período específico. Es una medida de la liquidez de la empresa, es decir, su capacidad para cubrir sus obligaciones financieras a corto plazo.</p>
            </div>
        </div>

        <div className="concept-box">
        <h2 className="concept-title text-xl">Tipos de flujo de caja</h2>
            <div className="concept-content">
                <p><strong>Flujo de Caja Operativo:</strong> Se refiere al efectivo generado o utilizado en las actividades principales del negocio, como ventas de productos o servicios y pagos a proveedores y empleados.</p>
                <p><strong>Flujo de Caja de Inversión:</strong> Relacionado con la compra y venta de activos a largo plazo, como maquinaria, equipos, o propiedades. Incluye la inversión en proyectos que se espera que generen ingresos en el futuro.</p>
                <p><strong>Flujo de Caja de Financiamiento:</strong> Se refiere a las entradas y salidas de efectivo relacionadas con las actividades de financiamiento, como préstamos, emisión de acciones, o el pago de dividendos.</p>
            </div>
        </div>

        <div className="concept-box">
        <h2 className="concept-title text-xl">Cómo elaborar un flujo de caja</h2>
            <div className="concept-content">
                <p><strong>Paso 1:</strong> Identifica todas las fuentes de ingresos: Esto incluye ventas de productos o servicios, ingresos por intereses, devoluciones de impuestos, etc. Registra las entradas en el mes en que realmente se recibe el dinero.</p>
                <p><strong>Paso 2:</strong> Identifica todos los pagos y gastos: Incluye alquiler, sueldos, pagos a proveedores, impuestos, y otros gastos operativos. Registra las salidas en el mes en que realmente se paga el dinero.</p>
                <p><strong>Paso 3:</strong> Resta las salidas de efectivo de las entradas de efectivo: Si el resultado es positivo, tienes un flujo de caja positivo; si es negativo, tienes un flujo de caja negativo.</p>
                <p><strong>Paso 4:</strong> Revisa el flujo de caja mensualmente: Esto te permitirá identificar patrones y ajustar tu estrategia para mantener un flujo de caja saludable.</p>
            </div>
        </div>
    </div>
)}

{lessonChosen === "3" && (
    <div>
        <h3>Lección 3: Planificación Financiera</h3>
        <p>Una buena planificación financiera es fundamental para el crecimiento sostenible. Aprende cómo planificar y presupuestar para el futuro de tu empresa.</p>
        <p>Temas clave:</p>

        <div className="concept-box">
            <h2 className="concept-title">Pasos para crear un plan financiero</h2>
            <div className="concept-content">
                <p><strong>Paso 1: Proyección de Ingresos</strong></p>
                <p>Definición: Estima la cantidad de dinero que la empresa espera generar en un período específico, generalmente un año.</p>
                <p>Consejo Práctico: Analiza las tendencias de ventas pasadas, investiga el mercado y ajusta tus proyecciones para reflejar las condiciones actuales y futuras.</p>
            </div>
        </div>

        <div className="concept-box">
            <h2 className="concept-title">Proyección de Gastos</h2>
            <div className="concept-content">
                <p><strong>Paso 2: Proyección de Gastos</strong></p>
                <p>Definición: Identifica y calcula todos los gastos que la empresa tendrá que enfrentar, incluidos costos operativos, salarios, alquiler, y suministros.</p>
                <p>Consejo Práctico: No subestimes los gastos; asegúrate de incluir costos inesperados y aumentos en los precios.</p>
            </div>
        </div>

        <div className="concept-box">
            <h2 className="concept-title">Identificación de Fuentes de Financiamiento</h2>
            <div className="concept-content">
                <p><strong>Paso 3: Identificación de Fuentes de Financiamiento</strong></p>
                <p>Definición: Determina cómo la empresa obtendrá los fondos necesarios para cubrir los gastos y financiar el crecimiento.</p>
                <p>Consejo Práctico: Considera todas las opciones, desde fondos propios, préstamos bancarios, hasta financiamiento de inversores. Evalúa las ventajas y desventajas de cada fuente.</p>
            </div>
        </div>

        <div className="concept-box">
            <h2 className="concept-title">Creación del Plan Financiero</h2>
            <div className="concept-content">
                <p><strong>Paso 4: Creación del Plan Financiero</strong></p>
                <p>Definición: Determina cómo la empresa obtendrá los fondos necesarios para cubrir los gastos y financiar el crecimiento.</p>
                <p>Consejo Práctico: Mantén el plan claro y realista. Incluye diferentes escenarios para estar preparado ante cambios en las condiciones del mercado.</p>
            </div>
        </div>
        
        <h3>Simulación de casos</h3>
        <FinancialSimulation/>
    </div>
)}

                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <Pymespace />
            )}
        </React.Fragment>
    );
}
