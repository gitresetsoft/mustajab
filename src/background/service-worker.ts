import type { ReminderData } from '../types';
import reminderTimes from '../data/reminder-times.json';

// Cache reminder times in memory
let cachedTimes: ReminderData | null = null;

// Initialize alarms
chrome.runtime.onInstalled.addListener(() => {
  // Load reminder times into cache
  cachedTimes = reminderTimes;
  
  // Set up daily alarm for checking times
  chrome.alarms.create('checkTimes', {
    periodInMinutes: 1 // Check every minute
  });
});

// Handle alarms
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'checkTimes') {
    const result = await chrome.storage.local.get('notificationsEnabled');
    const notificationsEnabled = result.notificationsEnabled ?? true;
    
    if (!notificationsEnabled) return;
    
    const now = new Date();
    // Convert to Malaysia time
    const malaysiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' }));
    const currentTime = `${String(malaysiaTime.getHours()).padStart(2, '0')}:${String(malaysiaTime.getMinutes()).padStart(2, '0')}`;
    
    // Find if there's a reminder for current time
    const reminder = cachedTimes?.times.find(time => time.time === currentTime);
    
    if (reminder) {
      // Show desktop notification
      chrome.notifications.create(reminder.id, {
        type: 'basic',
        iconUrl: '/src/assets/icon-128.png',
        title: 'Time for Dua',
        message: reminder.description + " " + Date.now().toString(),
        priority: 2,
        requireInteraction: true,  // Keep notification visible until user interacts
        silent: false  // Allow sound
      });
      
      // Store last notification time
      await chrome.storage.local.set({
        lastNotificationTime: new Date().toISOString()
      });
    }
  }
});

// Handle notification clicks
chrome.notifications.onClicked.addListener((notificationId) => {
  // Clear the notification
  chrome.notifications.clear(notificationId);
}); 