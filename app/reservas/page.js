import Calendar from '../components/Calendar';
import BookingForm from '../components/BookingForm';

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl mb-4">Reserva tu hora</h1>
      <Calendar />
      <BookingForm />
    </div>
  );
}