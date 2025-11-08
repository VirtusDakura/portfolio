# Quick Start Guide - Portfolio Backend

## Installation Steps

### 1. Navigate to backend directory
```bash
cd /home/virtus-dakura/Desktop/WebDev/portfolio/backend
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

Or install individually:
```bash
pip install Django==5.2.8
pip install djangorestframework==3.15.2
pip install django-cors-headers==4.6.0
pip install Pillow==10.4.0
pip install python-decouple==3.8
```

### 3. Run migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create superuser (for admin access)
```bash
python manage.py createsuperuser
```

Follow prompts to set:
- Username
- Email
- Password

### 5. Populate sample data (optional)
```bash
python manage.py populate_data
```

### 6. Start development server
```bash
python manage.py runserver 8000
```

### 7. Access the application

- **API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/
- **API Status**: http://localhost:8000/api/status/

## Testing API Endpoints

### Get all projects
```bash
curl http://localhost:8000/api/projects/
```

### Get skills
```bash
curl http://localhost:8000/api/skills/
```

### Get experience
```bash
curl http://localhost:8000/api/experience/
```

### Submit contact form
```bash
curl -X POST http://localhost:8000/api/contact/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test Message",
    "message": "This is a test message from the API."
  }'
```

## Frontend Connection

Update your frontend `app.config.js`:

```javascript
export const API_CONFIG = {
  baseUrl: 'http://localhost:8000/api',
  // ... rest of config
};
```

## Troubleshooting

### Module not found errors
```bash
pip install -r requirements.txt
```

### Database errors
```bash
python manage.py migrate
```

### Permission errors on setup.sh
```bash
chmod +x setup.sh
```

### Port already in use
```bash
python manage.py runserver 8001  # Use different port
```

## Managing Content

1. Login to admin: http://localhost:8000/admin/
2. Add/Edit:
   - **Projects**: Add portfolio projects with images and technologies
   - **Technologies**: Add skills/tech stack items
   - **Experience**: Add work experience entries
   - **Contact Submissions**: View contact form messages

## Environment Variables

Create a `.env` file (copy from `.env.example`):

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

## Next Steps

1. ✅ Backend is running
2. Configure email settings in `.env`
3. Add your portfolio content via admin panel
4. Connect frontend to API
5. Test all endpoints
6. Deploy to production (Vercel, Heroku, etc.)
