# probattle (mobile wrapper)

This repository scaffolds a simple Capacitor wrapper app named **probattle** that opens https://probattle.com inside a native WebView (Android & iOS).

## What this scaffold contains
- `capacitor.config.json` — appId `com.probattle.app`, server configured to load `https://probattle.com`.
- `www/index.html` — fallback/landing page.
- `package.json` — scripts and Capacitor dependencies.

## Prerequisites
- Node.js + npm
- For Android: Java JDK and Android Studio
- For iOS: Xcode on macOS (required to build/run iOS)
- Capacitor CLI will be used via `npx` (no global install required)

## Quick setup (on your dev machine)
1. Install dependencies:

```powershell
npm install
```

2. Sync Capacitor and add platforms:

```powershell
npx cap sync
npx cap add android
# On macOS only (for iOS)
npx cap add ios
```

3. Open platform projects in their IDEs:

```powershell
npx cap open android
npx cap open ios
```

4. Build and run from Android Studio / Xcode. For Android you can generate an APK from Android Studio.

## Important notes about downloads & installs
- Android: If the website provides a direct `.apk` download, users must allow installs from unknown sources on their device. Some webviews block downloads — if an APK download link does not work inside the app, the easiest solution is to open such links in the system browser.

  To force APK links to open in the system browser, you can add a small JS snippet on the website that detects links ending with `.apk` and opens them via `window.open(url, '_system')` (or use Capacitor Browser plugin to open external URLs).

  Alternatively, you can modify the Android native project to handle WebView downloads by adding a `DownloadListener` in `MainActivity` which opens the URL using an `Intent`.

- iOS: Installing apps outside the App Store/TestFlight is restricted. You cannot sideload ordinary iOS apps for general users. Use TestFlight / App Store for distribution.

## Next recommended steps (I can do these for you if you want)
- Add proper app icons and splash images (provide an icon image and I will generate the asset set).
- Implement a small JS bridge to open `.apk` links in the system browser (so downloads work reliably on Android).
- Build a release-signed APK (I can add signing config instructions if you provide keystore info or want guidance).

If you want, I can now:
- Generate icon assets (attach a square PNG icon), and
- Add a small JS handler that opens `.apk` links in the system browser so downloads work reliably on Android.

Which should I do next?