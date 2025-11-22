export async function POST(req) {
  const data = await req.json();
  // Aquí la lógica para guardar la reserva en Supabase
  return Response.json({ success: true, reserva: data });
}