import { LocalNotifications } from '@capacitor/local-notifications';
import { Preferences } from '@capacitor/preferences';

export class NotificationService {
  static async requestPermission(): Promise<boolean> {
    try {
      const result = await LocalNotifications.requestPermissions();
      return result.display === 'granted';
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }

  static async scheduleReflectionReminder(time: string): Promise<void> {
    try {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) return;

      const [hours, minutes] = time.split(':').map(Number);
      const now = new Date();
      const scheduledTime = new Date();
      scheduledTime.setHours(hours, minutes, 0, 0);

      // If the time has passed today, schedule for tomorrow
      if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Time to Reflect',
            body: 'Take a moment to reflect on your day and practice mindfulness.',
            id: 1,
            schedule: { at: scheduledTime, repeats: true },
            actionTypeId: 'REFLECTION_REMINDER',
          },
        ],
      });

      // Store the reminder time
      await Preferences.set({
        key: 'reflectionReminderTime',
        value: time,
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  static async cancelReflectionReminder(): Promise<void> {
    try {
      await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
      await Preferences.remove({ key: 'reflectionReminderTime' });
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  }

  static async getStoredReminderTime(): Promise<string | null> {
    try {
      const result = await Preferences.get({ key: 'reflectionReminderTime' });
      return result.value;
    } catch (error) {
      console.error('Error getting stored reminder time:', error);
      return null;
    }
  }
}