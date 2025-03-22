import { useApp } from '../context/AppContext';
import { Switch } from '@headlessui/react';

export default function Settings() {
  const { state, dispatch } = useApp();
  const { notificationsEnabled } = state.preferences;

  const toggleNotifications = async (enabled: boolean) => {
    if (chrome?.storage?.local) {
      await chrome.storage.local.set({ notificationsEnabled: enabled });
    }
    dispatch({
      type: 'SET_PREFERENCES',
      payload: { notificationsEnabled: enabled }
    });
  };

  return (
    <div className="border-t border-gray-200 pt-4 mb-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Settings
      </h2>
      <div className="flex items-center justify-between">
        <span className="text-gray-700">Enable Notifications</span>
        <Switch
          checked={notificationsEnabled}
          onChange={toggleNotifications}
          className={`${
            notificationsEnabled ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </div>
  );
} 