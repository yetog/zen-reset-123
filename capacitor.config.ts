import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ae5f004cb90f41e993a1a60a8ffcf7de',
  appName: 'zen-reset-123',
  webDir: 'dist',
  server: {
    url: 'https://ae5f004c-b90f-41e9-93a1-a60a8ffcf7de.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1a1f2e",
      showSpinner: false,
      androidSpinnerStyle: "small",
      iosSpinnerStyle: "small"
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#1a1f2e'
    }
  }
};

export default config;
