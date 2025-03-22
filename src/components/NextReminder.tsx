import { useApp } from '../context/AppContext';
import { format } from 'date-fns';

export default function NextReminder() {
  const { state } = useApp();
  const { nextReminder, loading } = state;

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-100 rounded-lg p-4 mb-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
      </div>
    );
  }

  if (!nextReminder) {
    return (
      <div className="bg-yellow-50 rounded-lg p-4 mb-4">
        <p className="text-yellow-800">
          No upcoming reminders for today.
        </p>
      </div>
    );
  }

  const [hours, minutes] = nextReminder.time.split(':').map(Number);
  const reminderDate = new Date();
  reminderDate.setHours(hours, minutes, 0);

  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-4">
      <h2 className="text-lg font-semibold text-blue-900">
        Next Reminder
      </h2>
      <p className="text-blue-800 mt-1">
        {nextReminder.description} at {format(reminderDate, 'h:mm a')}
      </p>
    </div>
  );
} 