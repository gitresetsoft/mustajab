export interface ReminderTime {
  id: string;
  time: string; // 24hr format "HH:mm"
  description: string;
}

export interface ReminderData {
  version: string;
  lastUpdated: string;
  times: ReminderTime[];
}

export interface UserPreferences {
  notificationsEnabled: boolean;
  lastNotificationTime?: string;
}

export interface AppState {
  preferences: UserPreferences;
  nextReminder: ReminderTime | null;
  loading: boolean;
  error: string | null;
} 