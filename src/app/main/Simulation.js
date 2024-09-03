"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const scenarios = [
    {
        id: 1,
        description: "Tu PYME está enfrentando una disminución en las ventas. ¿Qué acción tomarías para mejorar la situación?",
        options: [
            { id: 'a', text: "Aumentar el presupuesto de marketing.", result: "bueno" },
            { id: 'b', text: "Reducir el personal para reducir costos.", result: "malo" },
            { id: 'c', text: "Incrementar los precios de tus productos.", result: "neutral" }
        ]
    },
    {
        id: 2,
        description: "Tienes la oportunidad de invertir en un nuevo equipo que podría mejorar la eficiencia. ¿Qué harías?",
        options: [
            { id: 'a', text: "Invertir en el nuevo equipo y solicitar un préstamo.", result: "bueno" },
            { id: 'b', text: "Postergar la inversión y ahorrar el dinero.", result: "neutral" },
            { id: 'c', text: "Invertir sin realizar un análisis detallado de costos.", result: "malo" }
        ]
    },
    {
        id: 3,
        description: "Recibes una oferta de un proveedor para extender el crédito. ¿Cómo procederías?",
        options: [
            { id: 'a', text: "Aceptar la oferta para mejorar el flujo de caja.", result: "bueno" },
            { id: 'b', text: "Rechazar la oferta y pagar de contado.", result: "neutral" },
            { id: 'c', text: "Negociar un descuento por pronto pago.", result: "bueno" }
        ]
    }
];

const getStarRating = (score, total) => {
    // Cambiar el cálculo para permitir una calificación de 0 a 3 estrellas
    const rating = Math.max(0, Math.min(3, Math.round((score / total) * 3)));
    return Array.from({ length: 3 }, (_, index) => index < rating ? '★' : '☆').join(' ');
};


export default function Simulacion() {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(() => {
        // Recupera la puntuación desde la cookie si existe
        const savedScore = Cookies.get('score');
        return savedScore ? parseInt(savedScore, 10) : 0;
    });

    useEffect(() => {
        // Guarda la puntuación en una cookie cada vez que cambie
        Cookies.set('score', score, { expires: 7 }); // La cookie expirará en 7 días
    }, [score]);
    const handleOptionClick = (result) => {
        setScore(0)
        if (result === 'bueno') {
            setScore(prev => prev + 1);
        } if(result ==='malo'){
            setScore(prev => prev - 1);
        }
        
        let feedbackMessage = "";
        switch(result) {
            case 'bueno':
                feedbackMessage = "¡Buena elección! Tu decisión ayudará a mejorar la situación financiera.";
                  break;
            case 'malo':
                feedbackMessage = "Esa opción podría tener consecuencias negativas. Considera otras alternativas.";
                break;
            case 'neutral':
                feedbackMessage = "Esa decisión tiene un impacto neutro. Podrías considerar otras opciones para obtener mejores resultados.";
                break;
            default:
                feedbackMessage = null;
        }

        setFeedback(feedbackMessage);
        
        setTimeout(() => {
            if (currentScenario < scenarios.length - 1) {
                setCurrentScenario(currentScenario + 1);
                setFeedback(null);

            } else {
                setFeedback(`Has completado la simulación. Revisa tus decisiones y aprende de la retroalimentación. Tu puntuación es: ${getStarRating(score, scenarios.length)}`);
                Cookies.set('completed', 'true');
            }
        }, 2000);
    };

    return (
        <div className="simulator-wrapper">
            <h3>Simulación de Casos</h3>
            <p>Puntuación actual: {getStarRating(score, scenarios.length)}</p>

            {feedback ? (
                <div className="response-section">

                    <p>{feedback}</p>
                </div>
            ) : (
                <div className="case-prompt">
                    <p>{scenarios[currentScenario].description}</p>
                    <div className="choices-wrapper">
                        {scenarios[currentScenario].options.map(option => (
                            <button key={option.id} className="choice-btn" onClick={() => handleOptionClick(option.result)}>
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
