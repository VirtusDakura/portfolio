#!/bin/bash

# Portfolio Full Stack Setup Script
# This script sets up both backend and frontend

echo "🚀 Setting up Full Stack Portfolio Application..."
echo "=================================================="

# Get the script's directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}📦 BACKEND SETUP${NC}"
echo "=================="

cd "$BACKEND_DIR"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}❌ Python 3 not found. Please install Python 3.8+${NC}"
    exit 1
fi

echo "✓ Python found: $(python3 --version)"

# Install backend dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠️  Some dependencies may have failed to install${NC}"
fi

# Create .env if it doesn't exist
if [ ! -f "$BACKEND_DIR/.env" ]; then
    echo "📝 Creating backend .env file..."
    cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
    echo -e "${GREEN}✓ Created .env (please configure it)${NC}"
fi

# Run migrations
echo "🗄️  Running database migrations..."
python manage.py makemigrations
python manage.py migrate

# Create media directory
mkdir -p media/projects

echo ""
echo -e "${BLUE}🎨 FRONTEND SETUP${NC}"
echo "=================="

cd "$FRONTEND_DIR"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}❌ Node.js not found. Please install Node.js 16+${NC}"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"
echo "✓ npm found: $(npm --version)"

# Install frontend dependencies
echo "📦 Installing npm dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠️  Some dependencies may have failed to install${NC}"
fi

# Create .env if it doesn't exist
if [ ! -f "$FRONTEND_DIR/.env" ]; then
    echo "📝 Creating frontend .env file..."
    echo "VITE_API_BASE_URL=http://localhost:8000/api" > "$FRONTEND_DIR/.env"
    echo "VITE_ENABLE_CONTACT_FORM=true" >> "$FRONTEND_DIR/.env"
    echo "VITE_ENABLE_DYNAMIC_PROJECTS=true" >> "$FRONTEND_DIR/.env"
    echo -e "${GREEN}✓ Created frontend .env${NC}"
fi

echo ""
echo "=================================================="
echo -e "${GREEN}✨ Setup Complete!${NC}"
echo "=================================================="
echo ""
echo "📝 Next Steps:"
echo ""
echo "1️⃣  Create Django superuser:"
echo "   cd backend"
echo "   python manage.py createsuperuser"
echo ""
echo "2️⃣  Populate sample data (optional):"
echo "   python manage.py populate_data"
echo ""
echo "3️⃣  Start the backend server (Terminal 1):"
echo "   cd backend"
echo "   python manage.py runserver 8000"
echo ""
echo "4️⃣  Start the frontend server (Terminal 2):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "🌐 Access Points:"
echo "   • Frontend: http://localhost:5173"
echo "   • Backend API: http://localhost:8000/api"
echo "   • Django Admin: http://localhost:8000/admin"
echo ""
echo "📚 Documentation:"
echo "   • See INTEGRATION_GUIDE.md for detailed integration info"
echo "   • See backend/README.md for backend details"
echo "   • See backend/QUICKSTART.md for quick start"
echo ""
