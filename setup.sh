#!/bin/bash

echo "🚀 Setting up BookIt Application..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Backend Setup
echo -e "${BLUE}📦 Setting up Backend...${NC}"
cd backend
npm install
cp .env.example .env
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

# Frontend Setup
echo -e "${BLUE}📦 Setting up Frontend...${NC}"
cd ../frontend
npm install
cp .env.example .env
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

cd ..

echo -e "${GREEN}"
echo "=========================================="
echo "✓ Setup Complete!"
echo "=========================================="
echo -e "${NC}"
echo ""
echo "📝 Next Steps:"
echo "1. Update backend/.env with your PostgreSQL credentials"
echo "2. Create database: createdb bookit_db"
echo "3. Start backend: cd backend && npm run dev"
echo "4. Start frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Application will be available at:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
echo ""