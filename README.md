# Mustajab Times Reminder

A Chrome extension that reminds Muslims of special times (mustajab times) that are particularly blessed for making dua/supplication.

## Features

- Time-based dua reminders
- Simple notification system
- Timezone-aware timing
- Clean and minimal UI
- Offline support

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory

## Building for Production

```bash
npm run build
```

The built extension will be in the `dist` directory.

## Tech Stack

- React 18 with TypeScript
- Vite
- Tailwind CSS
- Chrome Extension APIs

## License

MIT
