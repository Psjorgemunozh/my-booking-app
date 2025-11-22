"use client";

import { useState } from 'react';

export default function PaymentButton({ bookingId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handlePayment() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/pagos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });
      const data = await res.json();

      if (!data.url) throw new Error('No se pudo obtener la URL de pago');
      window.location.href = data.url;
    } catch (err) {
      setError('Error iniciando el pago. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="my-4">
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? 'Redirigiendo...' : 'Pagar y reservar'}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}