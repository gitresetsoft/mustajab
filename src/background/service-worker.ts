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
    
    console.log("Current Time:", currentTime);  // Log current time

    // Find if there's a reminder for current time
    const reminder = cachedTimes?.times.find(time => time.time === currentTime);
    console.log("Reminder Found:", reminder);  // Log found reminder

    if (reminder) {
      // Show desktop notification with a link to view the dua
      chrome.notifications.create(reminder.id.toString(), {
        type: 'basic',
        iconUrl: '/src/assets/icon-128.png',
        title: 'Time for Doa!',
        message: reminder.description + "\n <a href='https://example.com/view-dua'>Click to view the dua!</a>",
        priority: 2,
        requireInteraction: true,  // Keep notification visible until user interacts
        silent: false,  // Allow sound
        buttons: [{
          title: "View Dua",
          iconUrl: '/src/assets/icon-128.png'
        }]
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