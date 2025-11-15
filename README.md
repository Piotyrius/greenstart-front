# GREWECO Frontend

Next.js frontend for the GREWECO Green Web3 CO₂ Removal Platform.

## Overview

A modern, responsive dashboard for developers, apartment buyers, and public certificate viewing. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Developer Dashboard**: Overview of buildings, apartments, and certificates
- **Building Management**: Register and manage construction projects
- **Apartment Tracking**: View apartments with CO₂ absorption data
- **Plantation Maps**: Interactive Google Maps with plantation polygons and CO₂ overlays
- **Certificate Viewer**: Public certificate display with QR codes and PDF download
- **Analytics Dashboard**: CO₂ absorption charts and visualizations
- **Responsive Design**: Mobile-first design with green theme based on logo

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Query (@tanstack/react-query)
- Google Maps API (@react-google-maps/api)
- Recharts for analytics
- Zustand for state management

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Maps API key

### Local Development

1. **Clone the repository**
   ```bash
   cd greweco-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
greweco-front/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   ├── buildings/
│   │   │   ├── plantations/
│   │   │   └── analytics/
│   │   ├── certificate/[id]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── CO2Display.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   └── maps/
│   │       └── MapView.tsx
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   └── endpoints.ts
│   │   └── auth/
│   │       └── store.ts
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── globals.css
├── package.json
├── tailwind.config.js
└── next.config.js
```

## Pages

### Public Pages

- **Home** (`/`): Landing page with login/signup links
- **Certificate Viewer** (`/certificate/[id]`): Public certificate display with QR code

### Authentication

- **Login** (`/login`): Developer login page
- **Signup** (`/signup`): Developer registration

### Dashboard (Protected)

- **Dashboard** (`/dashboard`): Overview with statistics and quick actions
- **Buildings** (`/buildings`): List of all buildings
- **New Building** (`/buildings/new`): Register a new building
- **Apartments** (`/buildings/[id]/apartments`): List apartments for a building
- **Plantations** (`/plantations`): Interactive map with plantation polygons
- **Analytics** (`/analytics`): CO₂ absorption charts and visualizations

## Design System

Colors based on GREWECO logo:
- **Primary Green**: `#2D5016` - Buttons, headers, accents
- **Secondary Green**: `#4A7C2E` - Hover states
- **Light Green**: `#6BA84F` - Secondary elements
- **Grey**: `#808080` - Borders, secondary text
- **White**: Backgrounds

## Google Maps Integration

1. **Get API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps JavaScript API
   - Create API key
   - Restrict to your domain (optional)

2. **Configure**
   - Add key to `.env.local`:
     ```env
     NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key
     ```

3. **Usage**
   - The `MapView` component automatically loads the API
   - Plantation polygons are displayed on the map
   - Click polygons to view details

## API Integration

The frontend uses React Query for data fetching and caching. All API calls are handled through:

- `src/lib/api/client.ts` - Axios instance with JWT token management
- `src/lib/api/endpoints.ts` - API endpoint functions

### Authentication Flow

1. User logs in via `/login`
2. JWT tokens stored in localStorage
3. Tokens automatically added to API requests
4. Token refresh handled automatically
5. Logout clears tokens and redirects

## Deployment

### Vercel (Recommended)

1. **Connect repository to Vercel**
2. **Set environment variables**:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
3. **Deploy**

### Google Cloud Run

1. **Build Docker image**
   ```bash
   docker build -t gcr.io/PROJECT_ID/greweco-front .
   ```

2. **Push to Container Registry**
   ```bash
   docker push gcr.io/PROJECT_ID/greweco-front
   ```

3. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy greweco-front \
     --image gcr.io/PROJECT_ID/greweco-front \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://your-backend-url
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NODE_ENV=production
```

## Features in Detail

### CO₂ Display Component

Reusable component for displaying CO₂ values:
```tsx
<CO2Display value={1234.56} size="lg" showLabel={true} />
```

### Protected Routes

Dashboard pages are protected and require authentication:
- Automatically redirects to login if not authenticated
- Checks for JWT token in localStorage

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- All pages optimized for mobile and desktop

## Google Maps Platform Credits

With Google for Startups Cloud Program, you receive:
- $200 monthly free usage
- 28,500 map loads per month
- Perfect for MVP and early growth

## Future Improvements

- Dark mode support
- Real-time CO₂ updates via WebSocket
- NFT certificate integration
- Mobile app (React Native)
- Advanced analytics and reporting
- Multi-language support

## Troubleshooting

### Maps not loading
- Check Google Maps API key is set correctly
- Verify API key has Maps JavaScript API enabled
- Check browser console for errors

### API connection issues
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings on backend
- Ensure backend is running

### Authentication issues
- Clear localStorage and try again
- Check token expiration
- Verify backend JWT settings

## License

Proprietary - GREWECO Platform
