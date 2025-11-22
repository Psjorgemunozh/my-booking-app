"use client";

import { useState } from 'react';
import Calendar from '../components/Calendar';
import BookingForm from '../components/BookingForm';

export default function HomePage() {
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  // Simulación de usuario (reemplaza por datos reales de autenticación luego)
  const user = { id: "user-id-desde-supabase-auth" };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl mb-6">Agendar Hora</h1>
      {!horarioSeleccionado ? (
        <Calendar onSelect={setHorarioSeleccionado} />
      ) : (
        <BookingForm horario={horarioSeleccionado} user={user} />
      )}
      <button className="mt-4 text-gray-700 underline" onClick={() => setHorarioSeleccionado(null)}>
        Elegir otra hora
      </button>
    </div>
  );
}
