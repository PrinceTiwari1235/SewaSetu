#!/bin/bash
# SewaSetu - Quick Setup Script
# Run this after extracting the project folder

echo "🇳🇵 Setting up SewaSetu..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy env file
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "⚙️  Created .env.local — please update DATABASE_URL and NEXTAUTH_SECRET"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Edit .env.local with your database URL"
echo "  2. Run: npm run dev"
echo "  3. Open: http://localhost:3000"
echo ""
echo "Happy building! 🚀"
