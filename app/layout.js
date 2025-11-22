import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header className="p-4 bg-blue-600 text-white">Mi Consulta Psicológica</header>
        <main className="max-w-2xl mx-auto p-8">{children}</main>
      </body>
    </html>
  );
}