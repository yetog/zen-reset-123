# Mobile App Setup Guide

## Prerequisites

### For Android:
- Android Studio installed
- Android SDK configured

### For iOS:
- macOS with Xcode installed
- iOS Simulator or physical device

## Setup Steps

### 1. Export and Clone Project
1. Click "Export to GitHub" in Lovable
2. Clone your repository locally:
   ```bash
   git clone <your-repo-url>
   cd zen-reset-123
   ```

### 2. Install Dependencies
```bash
npm install
```

### 3. Add Native Platforms

For Android:
```bash
npx cap add android
```

For iOS (requires macOS):
```bash
npx cap add ios
```

### 4. Update Native Dependencies
```bash
npx cap update android
npx cap update ios
```

### 5. Build Web Assets
```bash
npm run build
```

### 6. Sync to Native Platforms
```bash
npx cap sync
```

### 7. Run on Device/Emulator

For Android:
```bash
npx cap run android
```

For iOS:
```bash
npx cap run ios
```

## Development Workflow

### Hot Reload Development
The app is configured to load from the Lovable sandbox URL during development, enabling hot reload:
- Make changes in Lovable
- See updates instantly on your device
- No need to rebuild or sync

### Production Build
When ready for production:
1. Comment out the `server` section in `capacitor.config.ts`
2. Run `npm run build`
3. Run `npx cap sync`
4. Build native apps through Android Studio or Xcode

## Native Features Available

The following Capacitor plugins are installed:
- **Preferences**: Local storage for user settings and reflections
- **Local Notifications**: Meditation reminders
- **Haptics**: Haptic feedback for enhanced UX
- **Status Bar**: Control status bar appearance
- **Splash Screen**: Native splash screen

## Troubleshooting

### Audio Issues on Mobile
- Audio requires user interaction to start (tap to play)
- Ensure proper permissions in native configs
- **FIXED**: Constant spinning loading issue in Wave Frequency Sounds (see MOBILE_AUDIO_FIXES.md)

### Build Errors
- Run `npx cap sync` after any dependency changes
- Clean build folders if issues persist
- Ensure Android Studio / Xcode are up to date

## App Store Deployment

### Android (Google Play)
1. Configure signing in Android Studio
2. Build release APK/AAB
3. Follow Google Play Console submission process

### iOS (Apple App Store)
1. Configure provisioning profiles in Xcode
2. Archive and upload to App Store Connect
3. Follow App Store submission process

## Learn More
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Lovable Mobile Guide](https://lovable.dev/blogs/TODO)
