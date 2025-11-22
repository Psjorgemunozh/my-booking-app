"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAuth(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        const { error: insertError } = await supabase
          .from('usuarios')
          .insert([{ id: data.user.id, email, nombre }]);

        if (insertError) throw insertError;

        alert('¡Registro exitoso! Ahora inicia sesión.');
        setIsRegistering(false);
        setEmail('');
        setPassword('');
        setNombre('');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        alert('¡Sesión iniciada!');
        router.push('/');
      }
    } catch (err) {
      setError(err.message || 'Error en la autenticación');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl mb-4">
        {isRegistering ? 'Registro' : 'Iniciar Sesión'}
      </h1>

      <form onSubmit={handleAuth} className="space-y-4">
        {isRegistering && (
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="border p-2 w-full"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 w-full rounded"
        >
          {loading ? 'Cargando...' : isRegistering ? 'Registrarse' : 'Inicia Sesión'}
        </button>
      </form>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      <button
        onClick={() => setIsRegistering(!isRegistering)}
        className="mt-4 text-blue-600 underline"
      >
        {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  );
}
