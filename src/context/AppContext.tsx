import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { AppState, ReminderTime } from '../types';
import reminderTimes from '../data/reminder-times.json';

// Initial state
const initialState: AppState = {
  preferences: {
    notificationsEnabled: true
  },
  nextReminder: null,
  loading: true,
  error: null
};

// Action types
type Action =
  | { type: 'SET_PREFERENCES'; payload: { notificationsEnabled: boolean } }
  | { type: 'SET_NEXT_REMINDER'; payload: ReminderTime | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null
});

// Reducer
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PREFERENCES':
      return {
        ...state,
        preferences: action.payload
      };
    case 'SET_NEXT_REMINDER':
      return {
        ...state,
        nextReminder: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

// Provider component
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Check if running in Chrome extension environment
    if (chrome?.storage?.local) {
      // Load preferences from storage
      chrome.storage.local.get('notificationsEnabled').then((data) => {
        dispatch({
          type: 'SET_PREFERENCES',
          payload: { notificationsEnabled: data.notificationsEnabled ?? true }
        });
        dispatch({ type: 'SET_LOADING', payload: false });
      });
    } else {
      // Development fallback
      dispatch({
        type: 'SET_PREFERENCES',
        payload: { notificationsEnabled: true }
      });
      dispatch({ type: 'SET_LOADING', payload: false });
    }

    // Calculate next reminder
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const nextReminder = reminderTimes.times.find(time => {
      const [hours, minutes] = time.time.split(':').map(Number);
      const reminderTime = hours * 60 + minutes;
      return reminderTime > currentTime;
    });

    if (nextReminder) {
      dispatch({ type: 'SET_NEXT_REMINDER', payload: nextReminder });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 