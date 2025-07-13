import React, { useState } from 'react';
import './pagSuporte.css';

const Suporte = () => {
  const [otherError, setOtherError] = useState(false);
  const [message, setMessage] = useState('');

  const errorOptions = [
    'Não consegui adicionar um item',
    'Não está aparecendo certo item',
    'Não consigo remover um item',
    'Quantidade incorreta',
    'Erro de carregamento de página',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedError = e.target.elements.error.value;
    const payload = { error: selectedError, message };
    // Simulação de envio de e-mail
    console.log('Enviando solicitação de suporte:', payload);
    alert('Sua solicitação foi enviada! Obrigado.');
  };

  return (
    <div className="support-page">
      <h2>Suporte</h2>
      <form className="support-form" onSubmit={handleSubmit}>
        <label>DESEJA CONTATAR O SUPORTE POR?</label>
        <div className="options">
          {errorOptions.map((opt, idx) => (
            <div key={idx} className="option">
              <input type="radio" id={`opt${idx}`} name="error" value={opt} required />
              <label htmlFor={`opt${idx}`}>{opt}</label>
            </div>
          ))}
        </div>
        <div className="other-error">
          <label>
            <input type="checkbox" checked={otherError} onChange={() => setOtherError(!otherError)} />
            Não encontrou seu erro?
          </label>
          {otherError && (
            <textarea
              name="message"
              placeholder="Descreva seu problema aqui..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          )}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
    );
};

export default Suporte;