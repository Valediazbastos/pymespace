// src/components/Quiz.js
import React, { useState } from 'react';
import '../ingresos/CSS/Quiz.css'
const questions = [
  {
    question: "¿Qué es la segmentación de mercado?",
    options: ["Dividir el mercado en grupos más pequeños", "Crear una imagen específica del producto", "Actuar de manera ética", "Mejorar el producto constantemente"],
    answer: "Dividir el mercado en grupos más pequeños",
  },
  {
    question: "¿Cuál es una de las 4Ps del marketing?",
    options: ["Segmentación", "Valor al Cliente", "Precio", "Adaptación"],
    answer: "Precio",
  },
  {
    "question": "¿Qué es la orientación al cliente?",
    "options": [
      "Colocar al cliente en el centro de todas las decisiones y estrategias",
      "Desarrollar productos innovadores",
      "Crear una imagen específica del producto",
      "Actuar de manera ética"
    ],
    "answer": "Colocar al cliente en el centro de todas las decisiones y estrategias"
  },
  {
    "question": "¿Qué es la investigación de mercado?",
    "options": [
      "Actuar de manera ética y responsable",
      "Desarrollar productos y servicios innovadores",
      "Recopilar y analizar información relevante sobre el mercado y los consumidores",
      "Utilizar redes sociales para promocionar productos"
    ],
    "answer": "Recopilar y analizar información relevante sobre el mercado y los consumidores"
  },
  {
    "question": "¿Cuál es un principio clave del marketing socialmente responsable?",
    "options": [
      "Maximizar las ventas a corto plazo",
      "Utilizar materiales reciclables y apoyar causas sociales",
      "Segmentar el mercado en grupos más pequeños",
      "Fijar precios competitivos"
    ],
    "answer": "Utilizar materiales reciclables y apoyar causas sociales"
  },
  {
    "question": "¿Qué implica la adaptación y flexibilidad en marketing?",
    "options": [
      "Crear una imagen de marca única",
      "Actuar de manera ética y responsable",
      "Ajustarse rápidamente a los cambios en el mercado y las demandas de los consumidores",
      "Recopilar datos de los clientes"
    ],
    "answer": "Ajustarse rápidamente a los cambios en el mercado y las demandas de los consumidores"
  },
  {
    "question": "¿Cuál es el enfoque de las relaciones a largo plazo en marketing?",
    "options": [
      "Ofrecer descuentos y beneficios exclusivos a clientes recurrentes",
      "Lanzar nuevas campañas publicitarias",
      "Desarrollar nuevos productos",
      "Segmentar el mercado"
    ],
    "answer": "Ofrecer descuentos y beneficios exclusivos a clientes recurrentes"
  },
  {
    "question": "¿Qué es el valor al cliente en marketing?",
    "options": [
      "Mejorar constantemente el producto basándose en las necesidades de tu cliente",
      "Maximizar las ganancias",
      "Reducir costos de producción",
      "Ampliar la gama de productos"
    ],
    "answer": "Mejorar constantemente el producto basándose en las necesidades de tu cliente"
  }
  
];

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    if (option === question.answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div>
      {!isFinished ? (
        <div>
          <h2 className='poppins-regular'>{question.question}</h2>
          <div className='place-content-center'>
            {question.options.map((option) => (
              <button  id="button4"
                key={option}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedOption && (
            <div>
              <p>{selectedOption === question.answer ? 'Correcto!' : 'Incorrecto!'}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>¡Quiz terminado!</h2>
          <p className='poppins-regular text-2xl relative '>Tu puntuación es {score} de {questions.length}</p>
       <br/>  <br/>  <br/>
        </div>
      )}
    </div>
  );
}

export default Quiz;
