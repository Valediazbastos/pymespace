"use client";
import React, { useState } from 'react';

const scenarios = [
  {
    id: 1,
    title: 'Crecimiento Inesperado de Ventas',
    description: 'Tu PYME ha experimentado un crecimiento inesperado en ventas durante el último trimestre. Las operaciones actuales están alcanzando su límite, y necesitas decidir cómo manejar esta oportunidad.',
    options: [
      { id: 'A', text: 'Reinvertir todo el beneficio en aumentar la capacidad de producción.', feedback: 'Bueno: Aumentar la capacidad es positivo, pero cuidado con no tener reservas para contingencias.' },
      { id: 'B', text: 'Reservar una parte del beneficio como fondo de emergencia y reinvertir el resto.', feedback: 'Muy Bueno: Equilibrio entre crecimiento y seguridad financiera.' },
      { id: 'C', text: 'Expandir inmediatamente a nuevos mercados sin reservar beneficios.', feedback: 'Malo: Expansión rápida sin reservas puede poner en riesgo la estabilidad.' }
    ]
  },
  {
    id: 2,
    title: 'Reducción de Ingresos',
    description: 'Enfrentas una disminución significativa en los ingresos debido a una recesión económica. Tienes que tomar medidas para mantener la solvencia de la empresa.',
    options: [
      { id: 'A', text: 'Reducir el personal inmediatamente para reducir costos.', feedback: 'Malo: Reducir personal puede afectar la moral y la productividad.' },
      { id: 'B', text: 'Negociar con los proveedores para extender los términos de pago.', feedback: 'Muy Bueno: Negociar términos te da más tiempo para recuperarte.' },
      { id: 'C', text: 'Solicitar un préstamo bancario para cubrir las operaciones a corto plazo.', feedback: 'Bueno: Un préstamo puede ser útil, pero ten en cuenta el interés y las condiciones.' }
    ]
  },
  {
    id: 3,
    title: 'Oportunidad de Expansión',
    description: 'Tienes la oportunidad de expandir tu negocio a una nueva región. Sin embargo, los costos iniciales son altos y la demanda es incierta.',
    options: [
      { id: 'A', text: 'Realizar un estudio de mercado antes de decidir.', feedback: 'Muy Bueno: Tomar decisiones informadas reduce riesgos.' },
      { id: 'B', text: 'Tomar la oportunidad y ajustar el plan financiero después.', feedback: 'Malo: Expandirse sin datos sólidos es arriesgado.' },
      { id: 'C', text: 'Posponer la expansión y enfocar los recursos en consolidar el mercado actual.', feedback: 'Bueno: Consolidar puede ser prudente, pero podrías perder la oportunidad.' }
    ]
  }
];

export default function FinancialSimulation() {
  const [currentScenario, setCurrentScenario] = useState(scenarios[0]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const feedbackMessage = currentScenario.options.find(o => o.id === option).feedback;
    setFeedback(feedbackMessage);
  };

  const handleNextScenario = () => {
    const currentIndex = scenarios.findIndex(s => s.id === currentScenario.id);
    const nextScenario = scenarios[currentIndex + 1] || scenarios[0];
    setCurrentScenario(nextScenario);
    setSelectedOption(null);
    setFeedback('');
  };

  return (
    <div className="financial-simulation poppins-regular">
      <h2 className='poppins-bold'>{currentScenario.title}</h2>
      <p>{currentScenario.description}</p>
      <div className="options">
        {currentScenario.options.map(option => (
          <button 
            key={option.id} 
            onClick={() => handleOptionSelect(option.id)}
            className={`option-button ${selectedOption === option.id ? 'selected' : ''}`}
          >
            {option.text}
          </button>
        ))}
      </div>
      {selectedOption && (
        <div className="feedback">
          <h3>Feedback:</h3>
          <p>{feedback}</p>
          <button onClick={handleNextScenario} className="next-scenario-button">Siguiente Escenario</button>
        </div>
      )}
    </div>
  );
}
