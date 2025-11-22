"use client";

import { useState } from 'react';

export default function BookingForm() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    alert('Reserva enviada');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} className="border p-2 w-full"/>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full"/>
      <button className="bg-blue-600 text-white px-4 py-2" type="submit">Agendar</button>
    </form>
  );
}