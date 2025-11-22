"use client";

import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function BookingForm({ horario, user }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Agrega la reserva en la base de datos
      const { error: insertError } = await supabase
        .from('reservas')
        .insert([
          {
            usuario_id: user.id,
            horario_id: horario.id,
            estado: 'pendiente',
          }
        ]);
      if (insertError) throw insertError;

      // Marca el horario como no disponible
      const { error: updateError } = await supabase
        .from('horarios_disponibles')
        .update({ disponible: false })
        .eq('id', horario.id);
      if (updateError) throw updateError;

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Error al agendar');
    } finally {
      setLoading(false);
    }
  }

  if (success) return <div>¡Reserva realizada con éxito!</div>;

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded my-6">
      <p><b>Reserva:</b> {horario.fecha} a las {horario.hora_inicio.slice(0,5)} - {horario.hora_fin.slice(0,5)}</p>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 mt-2" disabled={loading}>
        {loading ? "Agendando..." : "Confirmar reserva"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}
