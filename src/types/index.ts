export interface ReminderTime {
  id: number;
  time: string; // 24hr format "HH:mm"
  date: string | null;
  description: string;
  dua: string | null;
  dalil: string;
  strength: string | null;
  recurring: boolean;
  remark: string;
}

export interface ReminderData {
  version: string;
  lastUpdated: string;
  timezone: string;
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