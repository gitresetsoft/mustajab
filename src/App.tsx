import { AppProvider } from './context/AppContext';
import NextReminder from './components/NextReminder';
import Settings from './components/Settings';
import ReminderList from './components/ReminderList';

function App() {
  return (
    <AppProvider>
      <div className="min-w-[300px] max-w-md mx-auto p-4 bg-white">
        <h1 className="text-2xl font-bold mb-4" style={{ background: 'linear-gradient(135deg, #D3D3D3 0%, #A9A9A9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          Waktu Mustajab
        </h1>
        <NextReminder />
        <Settings />
        <ReminderList />
      </div>
    </AppProvider>
  );
}

export default App;
