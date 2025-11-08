# Portfolio Backend API

Django REST API backend for the Virtus Dakura Portfolio website.

## Features

- **RESTful API** with Django REST Framework
- **Project Management** - Showcase portfolio projects with technologies
- **Skills/Technologies** - Display technical skills grouped by category
- **Work Experience** - Professional experience timeline
- **Contact Form** - Handle contact form submissions with email notifications
- **Admin Interface** - Easy content management through Django admin
- **CORS Configured** - Ready for React frontend integration

## Tech Stack

- Python 3.12+
- Django 5.2.8
- Django REST Framework 3.15.2
- SQLite (development) / PostgreSQL (production)
- Pillow (image handling)

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/` | GET | API overview |
| `/api/status/` | GET | Health check |
| `/api/projects/` | GET | List all projects |
| `/api/projects/<id>/` | GET | Get project details |
| `/api/skills/` | GET | List skills grouped by category |
| `/api/experience/` | GET | List work experience |
| `/api/contact/` | POST | Submit contact form |

## Setup Instructions

### 1. Clone the Repository

```bash
cd portfolio/backend
```

### 2. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment Configuration

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 5. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create Superuser

```bash
python manage.py createsuperuser
```

### 7. Populate Sample Data (Optional)

```bash
python manage.py populate_data
```

### 8. Run Development Server

```bash
python manage.py runserver 8000
```

The API will be available at `http://localhost:8000/api/`

### 9. Access Admin Panel

Visit `http://localhost:8000/admin/` and login with your superuser credentials.

## Project Structure

```
backend/
├── api/
│   ├── management/
│   │   └── commands/
│   │       └── populate_data.py    # Sample data command
│   ├── admin.py                    # Admin configuration
│   ├── models.py                   # Database models
│   ├── serializers.py              # DRF serializers
│   ├── views.py                    # API views
│   └── urls.py                     # API URL patterns
├── core/
│   ├── settings.py                 # Django settings
│   ├── urls.py                     # Main URL configuration
│   └── wsgi.py                     # WSGI config
├── manage.py                       # Django management script
├── requirements.txt                # Python dependencies
└── .env.example                    # Environment template
```

## Database Models

### Project
- Portfolio projects with name, description, images, links
- Supports categorization and featured projects
- Many-to-many relationship with technologies

### Technology
- Technical skills and tools
- Categorized (frontend, backend, database, etc.)
- Proficiency levels

### Experience
- Work experience entries
- Start/end dates with duration calculation
- Company information and links

### ContactSubmission
- Contact form submissions
- Email notifications
- Admin management interface

## Email Configuration

To enable contact form email notifications:

1. Update `.env` with your email credentials
2. For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833)
3. Configure `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD`

## Development

### Adding New Data

Use the Django admin panel at `/admin/` to:
- Add/edit projects
- Manage technologies
- Update experience
- View contact submissions

### Custom Management Commands

```bash
# Populate sample data
python manage.py populate_data
```

## Frontend Integration

The API is configured to work with the React frontend:

1. Update frontend `app.config.js`:
```javascript
baseUrl: 'http://localhost:8000/api'
```

2. CORS is configured for development ports (3000, 3001, 5173)

## Production Deployment

For production deployment:

1. Set `DEBUG=False` in settings
2. Configure PostgreSQL database
3. Set strong `SECRET_KEY`
4. Configure `ALLOWED_HOSTS`
5. Set up static/media file serving
6. Use environment variables for sensitive data
7. Enable HTTPS
8. Configure email backend for production

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": [...],
  "message": "Optional message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "errors": {...}  // Validation errors if applicable
}
```

## License

MIT License - See LICENSE file for details

## Contact

For questions or support, please use the contact form on the website or open an issue.
