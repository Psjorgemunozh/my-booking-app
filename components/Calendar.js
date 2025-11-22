"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Calendar({ onSelect }) {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Trae los horarios disponibles desde Supabase
    async function fetchHorarios() {
      setLoading(true);
      const { data, error } = await supabase
        .from('horarios_disponibles')
        .select('*')
        .eq('disponible', true)
        .gt('fecha', new Date().toISOString().slice(0, 10))
        .order('fecha', { ascending: true })
        .order('hora_inicio', { ascending: true });
      setHorarios(data || []);
      setLoading(false);
    }
    fetchHorarios();
  }, []);

  if (loading) return <div>Cargando calendario...</div>;
  if (!horarios.length) return <div>No hay horarios disponibles</div>;

  return (
    <div className="my-6">
      <h2 className="text-xl mb-2">Horarios disponibles</h2>
      <ul>
        {horarios.map(horario => (
          <li key={horario.id} className="mb-3">
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
              onClick={() => onSelect(horario)}
            >
              {horario.fecha} - {horario.hora_inicio.slice(0,5)} a {horario.hora_fin.slice(0,5)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
