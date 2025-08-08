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

## 🌐 Portfolio Integration (Path under /zen-reset/)

### Option B: Docker container + NGINX reverse proxy at /zen-reset/
This keeps your portfolio at `/` and mounts this app under `/zen-reset/`.

1) Build and run the container (choose any free host port, e.g., 8080):
```bash
docker build -t zen-reset .
docker run -d --name zen_reset -p 8080:80 zen-reset
```

2) On your main NGINX (fronting the portfolio), add a path-based reverse proxy that STRIPS the `/zen-reset` prefix before forwarding to the container:
```nginx
# HTTP -> HTTPS redirect (if applicable)
server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name yourdomain.com www.yourdomain.com;

  # ... your SSL config and main site root/index ...

  # Path-mounted app
  location /zen-reset/ {
    # Forward to the Docker container
    proxy_pass http://127.0.0.1:8080;    # container host:port
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_redirect off;

    # Strip the prefix so the container receives "/assets/...", "/index.html", etc.
    rewrite ^/zen-reset/(.*)$ /$1 break;
  }
}
```

Why strip? The app is built with `base: "/zen-reset/"`, so the HTML references `/zen-reset/assets/...`. By stripping the prefix, the container serves those as `/assets/...` correctly.

3) Link from your portfolio
Use a normal hyperlink anywhere in your portfolio:
```html
<a href="/zen-reset/" rel="noopener">Zen Reset</a>
```

4) Health checks
```bash
curl -I https://yourdomain.com/zen-reset/
```
You should see `200 OK`. If you get 404s for assets, double-check the Vite `base` and the NGINX `rewrite` rule.

> Note: For local development the app runs at `/` so the Vite dev preview works. In production builds and the Docker image it uses `/zen-reset/` automatically.


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