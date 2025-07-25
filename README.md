# Serene Chord Scapes

A modern meditation and mindfulness web application built with React, featuring wave frequency sounds, guided meditations, learning modules, and personal reflection tools.

## ✨ Features

- **Wave Frequency Sounds**: Six scientifically-tuned frequencies (Theta, Alpha, Delta, etc.) hosted on S3 with full audio controls
- **Silent Meditation**: Customizable meditation timer with duration selection and completion tracking
- **Learning Center**: Educational content about meditation and mindfulness practices
- **Reflection Journal**: Personal space for meditation insights and thoughts
- **Coming Soon Guided Meditations**: Traditional, cosmic, lucid dreaming, and advanced meditation types
- **Responsive Design**: Beautiful, accessible interface that works across all devices
- **Dark/Light Mode**: Themed using semantic design tokens

## 🛠 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui for consistent, accessible components
- **Routing**: React Router DOM for client-side navigation
- **State Management**: React Query for server state management
- **Audio**: HTML5 Audio API with S3-hosted frequency sounds
- **Deployment**: Docker with Nginx for production serving

## 🚀 Local Development

### Prerequisites

- Node.js 18+ (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or your preferred package manager

### Setup

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Development Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
```

## 🐳 Docker Deployment

### Build and Run Locally

```bash
# Build the Docker image
docker build -t serene-chord-scapes .

# Run the container
docker run -p 8080:80 serene-chord-scapes
```

Access the application at `http://localhost:8080`

### Production Deployment

Create a `docker-compose.yml` for production:

```yaml
version: '3.8'
services:
  serene-chord-scapes:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

Deploy with:
```bash
docker-compose up -d
```

## 🌐 Portfolio Integration

### Option 1: Subdomain (Recommended)
```nginx
server {
    listen 80;
    server_name meditation.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Option 2: Path-based
```nginx
location /meditation {
    proxy_pass http://localhost:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

### Option 3: Direct Link
Simply link to `http://yourdomain.com:8080` from your portfolio.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ComingSoonModal.tsx
│   ├── MeditationTimer.tsx
│   ├── Navigation.tsx
│   └── ...
├── pages/              # Route components
│   ├── Index.tsx       # Landing page
│   ├── WaveFrequencySounds.tsx
│   ├── Meditate.tsx
│   ├── Learn.tsx
│   ├── Reflect.tsx
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## 🎵 Audio Integration

Wave frequency sounds are hosted on AWS S3 with proper CORS configuration:

- **Theta Waves** (4-8 Hz): Deep meditation and creativity
- **Alpha Waves** (8-13 Hz): Relaxation and focus
- **Delta Waves** (0.5-4 Hz): Deep sleep and healing
- **Beta Waves** (13-30 Hz): Active concentration
- **Gamma Waves** (30-100 Hz): Higher consciousness
- **Binaural Beats**: Synchronized brainwave entrainment

Each frequency includes:
- Play/pause controls
- Global mute functionality
- Loading states and error handling
- Single audio playback (others pause when new one starts)

## 🔮 Coming Soon Features

- **Traditional Meditation**: Classic mindfulness practices
- **Cosmic Meditation**: Universe-inspired visualization journeys
- **Lucid Dreaming**: Techniques for conscious dreaming
- **Next Level Thinking**: Advanced cognitive enhancement
- **Training Meditation**: Structured meditation courses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is built with [Lovable](https://lovable.dev) and is available for personal and educational use.

## 🔗 Links

- **Live Demo**: [Lovable Project](https://lovable.dev/projects/ecd22504-79a0-4d57-9413-f33ce6485f84)
- **Development**: Edit directly in Lovable or clone for local development
- **Documentation**: [Lovable Docs](https://docs.lovable.dev/)

---

*Built with ❤️ using React, TypeScript, and modern web technologies*