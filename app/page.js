"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Calendar from '../components/Calendar';
import BookingForm from '../components/BookingForm';

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();
  }, []);

  if (loading) return <div className="text-center mt-10">Cargando...</div>;

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-3xl mb-4">Bienvenido</h1>
        <p className="mb-4">Por favor, inicia sesión o regístrate para agendar una cita.</p>
        <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded">
          Ir a Login/Registro
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl mb-2">Agendar Cita</h1>
      <p className="text-gray-600 mb-6">Hola, {user.email}</p>

      {!horarioSeleccionado ? (
        <>
          <Calendar onSelect={setHorarioSeleccionado} />
          <a href="/login" className="text-blue-600 underline mt-4 block">
            Cerrar sesión
          </a>
        </>
      ) : (
        <>
          <BookingForm horario={horarioSeleccionado} user={user} />
          <button
            className="mt-4 text-gray-700 underline"
            onClick={() => setHorarioSeleccionado(null)}
          >
            Elegir otro horario
          </button>
        </>
      )}
    </div>
  );
}
"" 
