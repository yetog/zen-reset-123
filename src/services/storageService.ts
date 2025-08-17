import { Preferences } from '@capacitor/preferences';

export interface Reflection {
  id: string;
  date: string;
  content: string;
  time?: string; // For backward compatibility
  mood?: number; // 1-5 scale
  tags?: string[];
  createdAt: number;
}

export class StorageService {
  private static readonly REFLECTIONS_KEY = 'reflections';
  private static readonly SETTINGS_KEY = 'app_settings';

  // Reflection Management
  static async saveReflection(reflection: Reflection): Promise<void> {
    try {
      const reflections = await this.getReflections();
      const updatedReflections = [reflection, ...reflections.filter(r => r.id !== reflection.id)];
      
      await Preferences.set({
        key: this.REFLECTIONS_KEY,
        value: JSON.stringify(updatedReflections),
      });
    } catch (error) {
      console.error('Error saving reflection:', error);
      throw error;
    }
  }

  static async getReflections(): Promise<Reflection[]> {
    try {
      const result = await Preferences.get({ key: this.REFLECTIONS_KEY });
      return result.value ? JSON.parse(result.value) : [];
    } catch (error) {
      console.error('Error getting reflections:', error);
      return [];
    }
  }

  static async deleteReflection(id: string): Promise<void> {
    try {
      const reflections = await this.getReflections();
      const filtered = reflections.filter(r => r.id !== id);
      
      await Preferences.set({
        key: this.REFLECTIONS_KEY,
        value: JSON.stringify(filtered),
      });
    } catch (error) {
      console.error('Error deleting reflection:', error);
      throw error;
    }
  }

  // Settings Management
  static async saveSettings(settings: Record<string, any>): Promise<void> {
    try {
      await Preferences.set({
        key: this.SETTINGS_KEY,
        value: JSON.stringify(settings),
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  }

  static async getSettings(): Promise<Record<string, any>> {
    try {
      const result = await Preferences.get({ key: this.SETTINGS_KEY });
      return result.value ? JSON.parse(result.value) : {};
    } catch (error) {
      console.error('Error getting settings:', error);
      return {};
    }
  }

  // Streak Tracking
  static async updateReflectionStreak(): Promise<number> {
    try {
      const today = new Date().toDateString();
      const settings = await this.getSettings();
      const lastReflectionDate = settings.lastReflectionDate;
      const currentStreak = settings.reflectionStreak || 0;

      if (lastReflectionDate === today) {
        return currentStreak; // Already reflected today
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toDateString();

      let newStreak: number;
      if (lastReflectionDate === yesterdayString) {
        newStreak = currentStreak + 1; // Continue streak
      } else {
        newStreak = 1; // New streak
      }

      await this.saveSettings({
        ...settings,
        lastReflectionDate: today,
        reflectionStreak: newStreak,
      });

      return newStreak;
    } catch (error) {
      console.error('Error updating reflection streak:', error);
      return 1;
    }
  }

  static async getReflectionStreak(): Promise<number> {
    try {
      const settings = await this.getSettings();
      return settings.reflectionStreak || 0;
    } catch (error) {
      console.error('Error getting reflection streak:', error);
      return 0;
    }
  }
}