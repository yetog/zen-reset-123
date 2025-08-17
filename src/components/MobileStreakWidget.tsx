import React, { useState, useEffect } from 'react';
import { Flame, Bell, BellOff } from 'lucide-react';
import { StorageService } from '@/services/storageService';
import { NotificationService } from '@/services/notificationService';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const MobileStreakWidget = () => {
  const [streak, setStreak] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('20:00');

  useEffect(() => {
    loadStreakData();
    checkNotificationSettings();
  }, []);

  const loadStreakData = async () => {
    try {
      const currentStreak = await StorageService.getReflectionStreak();
      setStreak(currentStreak);
    } catch (error) {
      console.error('Error loading streak data:', error);
    }
  };

  const checkNotificationSettings = async () => {
    try {
      const storedTime = await NotificationService.getStoredReminderTime();
      if (storedTime) {
        setReminderTime(storedTime);
        setNotificationsEnabled(true);
      }
    } catch (error) {
      console.error('Error checking notification settings:', error);
    }
  };

  const toggleNotifications = async () => {
    try {
      if (notificationsEnabled) {
        await NotificationService.cancelReflectionReminder();
        setNotificationsEnabled(false);
        toast.success('Reminder turned off');
      } else {
        await NotificationService.scheduleReflectionReminder(reminderTime);
        setNotificationsEnabled(true);
        toast.success('Daily reminder set for ' + reminderTime);
      }
    } catch (error) {
      console.error('Error toggling notifications:', error);
      toast.error('Failed to update reminder');
    }
  };

  const handleTimeChange = async (newTime: string) => {
    setReminderTime(newTime);
    if (notificationsEnabled) {
      await NotificationService.scheduleReflectionReminder(newTime);
      toast.success('Reminder updated to ' + newTime);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
            <Flame size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-medium">Reflection Streak</h3>
            <p className="text-purple-200 text-sm">{streak} day{streak !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleNotifications}
          className="text-white hover:bg-white/10"
        >
          {notificationsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
        </Button>
      </div>
      
      {notificationsEnabled && (
        <div className="flex items-center space-x-2">
          <span className="text-purple-200 text-sm">Daily reminder:</span>
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => handleTimeChange(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-md px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
          />
        </div>
      )}
    </div>
  );
};

export default MobileStreakWidget;