import { format } from 'date-fns';
import reminderTimes from '../data/reminder-times.json';

export default function ReminderList() {
  return (
    <div className="border-t border-gray-200 pt-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        All Reminder Times
      </h2>
      <div className="space-y-2">
        {reminderTimes.times.map((reminder) => {
          const [hours, minutes] = reminder.time.split(':').map(Number);
          const reminderDate = new Date();
          reminderDate.setHours(hours, minutes, 0);

          return (
            <div
              key={reminder.id}
              className="bg-gray-50 rounded-lg p-3 flex justify-between items-center"
            >
              <div>
                <p className="text-gray-900 font-medium">
                  {reminder.description}
                </p>
                <p className="text-gray-500 text-sm">
                  {format(reminderDate, 'h:mm a')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 