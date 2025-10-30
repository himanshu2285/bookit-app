# BookIt: Experiences & Slots

A fullstack web application for booking travel experiences with real-time slot availability.

## 🚀 Features

- **Browse Experiences**: View curated travel experiences with detailed information
- **Real-time Availability**: Check slot availability for different dates and times
- **Smart Booking**: Select number of people and time slots
- **Promo Codes**: Apply discount codes during checkout
- **Responsive Design**: Mobile-friendly interface built with TailwindCSS

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite
- React Router v6
- Axios
- TailwindCSS

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL
- Sequelize ORM

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🔧 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd bookit-app
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your PostgreSQL credentials
# DB_NAME=bookit_db
# DB_USER=postgres
# DB_PASSWORD=your_password
# DB_HOST=localhost
# PORT=5000
```

### 3. Database Setup

Create a PostgreSQL database:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE bookit_db;

# Exit
\q
```

### 4. Seed the Database

In `backend/src/server.ts`, uncomment the seed line:

```typescript
// Uncomment this line:
await seedDatabase();
```

### 5. Start Backend Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

After seeding is complete, comment out the seed line again to prevent re-seeding.

### 6. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env if needed
# VITE_API_URL=http://localhost:5000/api
```

### 7. Start Frontend Development Server

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
bookit-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   └── index.ts
│   │   ├── models/
│   │   │   └── index.ts
│   │   ├── routes/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── seed.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── index.ts
    │   ├── components/
    │   │   ├── Header.tsx
    │   │   ├── Loading.tsx
    │   │   └── ExperienceCard.tsx
    │   ├── pages/
    │   │   ├── Home.tsx
    │   │   ├── ExperienceDetails.tsx
    │   │   ├── Checkout.tsx
    │   │   └── Result.tsx
    │   ├── types/
    │   │   └── index.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── package.json
    ├── tailwind.config.js
    └── .env
```

## 🔌 API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience details with available slots

### Bookings
- `POST /api/bookings` - Create a new booking

### Promo Codes
- `POST /api/promo/validate` - Validate and apply promo code

## 💳 Available Promo Codes

- `SAVE10` - 10% discount
- `FLAT100` - $100 flat discount
- `WELCOME20` - 20% discount

## 🌐 Deployment

### Backend Deployment (Render/Railway)

1. Push code to GitHub
2. Create new Web Service
3. Set environment variables:
   - `DB_NAME`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_HOST`
   - `PORT`
4. Build command: `npm run build`
5. Start command: `npm start`

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import project to Vercel
3. Set environment variable:
   - `VITE_API_URL=<your-backend-url>/api`
4. Deploy

### Database Hosting

Use services like:
- Render PostgreSQL
- Railway PostgreSQL
- Supabase
- AWS RDS

## 🧪 Testing

### Test the booking flow:

1. Visit homepage
2. Select an experience
3. Choose date and time slot
4. Enter number of people
5. Proceed to checkout
6. Fill contact information
7. Apply promo code (optional)
8. Complete booking
9. View confirmation

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify database credentials in `.env`
- Ensure database exists

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check CORS is enabled
- Verify `VITE_API_URL` in frontend `.env`

### Database seed fails
- Check database connection
- Verify tables don't already exist
- Use `{ force: true }` in sequelize.sync() for development

## 📝 License

MIT

## 👥 Contributing

Pull requests are welcome. For major changes, please open an issue first.

## 📧 Contact

For questions or support, please open an issue on GitHub.