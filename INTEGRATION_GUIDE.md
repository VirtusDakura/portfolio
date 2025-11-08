# Frontend-Backend Integration Guide

## ✅ What Was Updated

### 1. **API Configuration** (`frontend/src/config/app.config.js`)
- ✅ Changed `baseUrl` from `http://localhost:3001/api` to `http://localhost:8000/api`
- ✅ API now points to Django backend

### 2. **Contact Component** (`frontend/src/components/Contact.jsx`)
- ✅ Added import for `apiService`
- ✅ Updated `handleSubmit` to call Django backend API
- ✅ Replaced simulated API call with real API integration
- ✅ Added proper error handling

### 3. **Environment Configuration** (`frontend/.env`)
- ✅ Created `.env` file with `VITE_API_BASE_URL=http://localhost:8000/api`
- ✅ Configured feature flags for development

## 🚀 How to Run

### Backend (Terminal 1)
```bash
cd /home/virtus-dakura/Desktop/WebDev/portfolio/backend

# Install dependencies (if not already installed)
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (first time only)
python manage.py createsuperuser

# Populate sample data (optional)
python manage.py populate_data

# Start Django server
python manage.py runserver 8000
```

Backend will be available at: http://localhost:8000/api/

### Frontend (Terminal 2)
```bash
cd /home/virtus-dakura/Desktop/WebDev/portfolio/frontend

# Install dependencies (if not already installed)
npm install

# Start Vite dev server
npm run dev
```

Frontend will be available at: http://localhost:5173/

## 🔌 API Integration Status

### ✅ Currently Connected to Backend:
1. **Contact Form** - Sends submissions to Django backend
   - Endpoint: `POST /api/contact/`
   - Frontend: `Contact.jsx` uses `apiService.sendContactForm()`

### 🔄 Ready to Connect (API Service Available):
2. **Projects** - Can fetch from backend
   - Endpoint: `GET /api/projects/`
   - API Method: `apiService.getProjects()`
   - Component: `Projects.jsx` (currently uses static data)

3. **Skills** - Can fetch from backend
   - Endpoint: `GET /api/skills/`
   - API Method: `apiService.getSkills()`
   - Component: Can be integrated into tech stack display

4. **Experience** - Can fetch from backend
   - Endpoint: `GET /api/experience/`
   - API Method: `apiService.getExperience()`
   - Component: Can create Experience component

## 📝 Testing the Integration

### Test Contact Form
1. Start both backend and frontend servers
2. Navigate to http://localhost:5173/
3. Scroll to Contact section
4. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test Message
   - Message: This is a test message
5. Submit the form
6. Check Django admin at http://localhost:8000/admin/ to see the submission

### Test API Endpoints
```bash
# Test API status
curl http://localhost:8000/api/status/

# Test projects list
curl http://localhost:8000/api/projects/

# Test skills
curl http://localhost:8000/api/skills/

# Test experience
curl http://localhost:8000/api/experience/
```

## 🎯 Next Steps: Making Components Dynamic

### Option 1: Update Projects to Use Backend Data

Update `frontend/src/components/Projects.jsx`:

```jsx
import React, { useState, useEffect } from 'react';
import { apiService } from '../utils/api';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const result = await apiService.getProjects();
                if (result.success) {
                    setProjects(result.data.results || result.data);
                } else {
                    setError(result.error);
                }
            } catch (err) {
                setError('Failed to load projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <div>Loading projects...</div>;
    if (error) return <div>Error: {error}</div>;

    // Rest of your component...
};
```

### Option 2: Use the Custom Hook

The API utility includes a custom `useApi` hook:

```jsx
import { useApi, apiService } from '../utils/api';

const Projects = () => {
    const { loading, data, error, execute } = useApi(apiService.getProjects);

    useEffect(() => {
        execute();
    }, []);

    // Use loading, data, and error states
};
```

## 🔧 Configuration Files

### Frontend Environment Variables
File: `frontend/.env`
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_ENABLE_CONTACT_FORM=true
VITE_ENABLE_DYNAMIC_PROJECTS=true
```

### Backend Environment Variables
File: `backend/.env` (create from `.env.example`)
```env
SECRET_KEY=your-secret-key
DEBUG=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

## 🐛 Troubleshooting

### CORS Errors
**Problem:** Browser console shows CORS errors

**Solution:** Check that Django backend has CORS configured in `settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite dev server
    "http://127.0.0.1:5173",
]
```

### Connection Refused
**Problem:** Frontend can't connect to backend

**Solution:** 
1. Ensure backend is running: `python manage.py runserver 8000`
2. Check backend URL in `frontend/.env`: `VITE_API_BASE_URL=http://localhost:8000/api`
3. Restart frontend after changing `.env` file

### 404 Not Found
**Problem:** API endpoints return 404

**Solution:**
1. Check endpoint URLs match Django URL patterns
2. Verify migrations are applied: `python manage.py migrate`
3. Check backend logs for errors

### Contact Form Not Submitting
**Problem:** Form submits but no data in backend

**Solution:**
1. Check browser console for errors
2. Verify backend is receiving the request (check terminal logs)
3. Check Django admin to see if submission was saved
4. Verify CSRF exemption in Django settings for API endpoints

## 📊 Current Architecture

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND                          │
│              (React + Vite)                         │
│              Port: 5173                             │
│                                                     │
│  ┌──────────────┐        ┌──────────────┐         │
│  │  Contact.jsx │───────▶│ apiService   │         │
│  │  (Connected) │        │              │         │
│  └──────────────┘        └──────┬───────┘         │
│                                  │                  │
│  ┌──────────────┐               │                  │
│  │ Projects.jsx │               │                  │
│  │ (Static)     │               │                  │
│  └──────────────┘               │                  │
└──────────────────────────────────┼──────────────────┘
                                   │
                                   │ HTTP Requests
                                   │
┌──────────────────────────────────▼──────────────────┐
│                   BACKEND                           │
│             (Django + DRF)                          │
│              Port: 8000                             │
│                                                     │
│  ┌──────────────────────────────────┐             │
│  │         API Endpoints            │             │
│  │  • POST /api/contact/  ✅        │             │
│  │  • GET  /api/projects/ ✅        │             │
│  │  • GET  /api/skills/   ✅        │             │
│  │  • GET  /api/experience/ ✅      │             │
│  └──────────────────────────────────┘             │
│                                                     │
│  ┌──────────────────────────────────┐             │
│  │         Database (SQLite)         │             │
│  │  • Projects                       │             │
│  │  • Technologies                   │             │
│  │  • Experience                     │             │
│  │  • ContactSubmissions             │             │
│  └──────────────────────────────────┘             │
└─────────────────────────────────────────────────────┘
```

## ✨ Features Now Available

### Backend Features:
- ✅ RESTful API with Django REST Framework
- ✅ CORS configured for frontend
- ✅ Contact form submissions stored in database
- ✅ Email notifications (when configured)
- ✅ Admin panel for content management
- ✅ Sample data population command
- ✅ API documentation and testing endpoints

### Frontend Features:
- ✅ Environment-based configuration
- ✅ API service with retry logic
- ✅ Error handling
- ✅ Loading states
- ✅ Contact form connected to backend

## 🎉 Success Criteria

Your integration is successful when:
1. ✅ Backend server runs without errors on port 8000
2. ✅ Frontend server runs without errors on port 5173
3. ✅ Contact form submissions appear in Django admin
4. ✅ No CORS errors in browser console
5. ✅ API endpoints return data (test with curl or browser)

## 📚 Additional Resources

- Backend API docs: http://localhost:8000/api/
- Django admin: http://localhost:8000/admin/
- Frontend config: `frontend/src/config/app.config.js`
- Backend settings: `backend/core/settings.py`
- API utility: `frontend/src/utils/api.js`

---

**Need Help?** Check the browser console and Django terminal for error messages.
