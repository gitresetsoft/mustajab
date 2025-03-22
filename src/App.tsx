import { AppProvider } from './context/AppContext';
import NextReminder from './components/NextReminder';
import Settings from './components/Settings';
import ReminderList from './components/ReminderList';

function App() {
  return (
    <AppProvider>
      <div className="min-w-[300px] max-w-md mx-auto p-4 bg-white">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Mustajab Times
        </h1>
        <NextReminder />
        <Settings />
        <ReminderList />
      </div>
    </AppProvider>
  );
}

export default App;
