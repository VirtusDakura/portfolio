# Portfolio Backend - Complete Structure

## 📁 Files Created

### Core Configuration
- ✅ `core/settings.py` - Updated with REST Framework, CORS, media files
- ✅ `core/urls.py` - Updated with API routes and media serving
- ✅ `.gitignore` - Python/Django specific ignores
- ✅ `.env.example` - Environment variable template
- ✅ `requirements.txt` - Python dependencies

### API Application
- ✅ `api/__init__.py` - App initialization
- ✅ `api/apps.py` - App configuration
- ✅ `api/models.py` - Database models (Project, Technology, Experience, ContactSubmission)
- ✅ `api/serializers.py` - DRF serializers for all models
- ✅ `api/views.py` - API views and endpoints
- ✅ `api/urls.py` - API URL patterns
- ✅ `api/admin.py` - Django admin configuration

### Management Commands
- ✅ `api/management/__init__.py`
- ✅ `api/management/commands/__init__.py`
- ✅ `api/management/commands/populate_data.py` - Sample data command

### Documentation
- ✅ `README.md` - Complete backend documentation
- ✅ `QUICKSTART.md` - Quick start guide
- ✅ `setup.sh` - Automated setup script

## 🗄️ Database Models

### Project
- id (UUID)
- name, description, long_description
- image (ImageField)
- github_url, demo_url
- category, is_featured
- created_at, updated_at, order
- Many-to-many with Technology

### Technology
- name (unique)
- icon_class (React icon name)
- color (Tailwind CSS class)
- category (frontend/backend/database/tool/framework/language)
- proficiency (0-100)
- order

### ProjectTechnology
- project (FK)
- technology (FK)
- Manages many-to-many relationship

### Experience
- company, position
- description
- start_date, end_date, is_current
- location, company_url
- order
- Computed property: duration

### ContactSubmission
- name, email, subject, message
- created_at, is_read
- ip_address

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/` | GET | API overview |
| `/api/status/` | GET | Health check |
| `/api/projects/` | GET | List projects (supports ?category= and ?featured= filters) |
| `/api/projects/<uuid>/` | GET | Get project detail |
| `/api/skills/` | GET | List skills grouped by category |
| `/api/experience/` | GET | List work experience |
| `/api/contact/` | POST | Submit contact form |

## 🎨 Features

### REST API
- Django REST Framework integration
- JSON responses
- Pagination support (20 items per page)
- Error handling with proper HTTP status codes

### CORS Configuration
- Configured for Vite dev server (ports 5173)
- Configured for React dev servers (ports 3000, 3001)
- Easy to add production domains

### Admin Interface
- Custom admin for all models
- Inline editing for project technologies
- List filters and search
- Readonly fields where appropriate
- Color preview for technologies

### Email Integration
- SMTP configuration for contact form
- HTML and plain text email templates
- Error handling (continues if email fails)
- IP address logging for submissions

### Sample Data
- Management command to populate database
- Sample projects with technologies
- Sample technologies/skills
- Sample work experience
- Easy to customize or extend

## 📦 Dependencies

```
Django==5.2.8
djangorestframework==3.15.2
django-cors-headers==4.6.0
Pillow==10.4.0
python-decouple==3.8
```

## 🚀 Setup Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Populate sample data
python manage.py populate_data

# Run server
python manage.py runserver 8000
```

## 🔗 Frontend Integration

Your frontend API service (`frontend/src/utils/api.js`) will work seamlessly with these endpoints:

- `sendContactForm()` → `POST /api/contact/`
- `getProjects()` → `GET /api/projects/`
- `getSkills()` → `GET /api/skills/`
- `getExperience()` → `GET /api/experience/`

Update `frontend/src/config/app.config.js`:
```javascript
baseUrl: 'http://localhost:8000/api'
```

## 🎯 Next Steps

1. **Install dependencies**: `pip install -r requirements.txt`
2. **Run migrations**: `python manage.py migrate`
3. **Create superuser**: `python manage.py createsuperuser`
4. **Add sample data**: `python manage.py populate_data`
5. **Start server**: `python manage.py runserver 8000`
6. **Access admin**: http://localhost:8000/admin/
7. **Test API**: http://localhost:8000/api/
8. **Update frontend config** to point to backend
9. **Add your portfolio content** via admin
10. **Deploy** to production

## 📝 Notes

- SQLite is used for development (included)
- Configure PostgreSQL for production
- Update SECRET_KEY for production
- Set DEBUG=False in production
- Configure email credentials in .env
- Add production domain to ALLOWED_HOSTS
- Media files stored in `/media/` directory
- Static files collected in `/staticfiles/`

## 🎨 Customization

### Adding a New Model
1. Add model to `api/models.py`
2. Create serializer in `api/serializers.py`
3. Add view in `api/views.py`
4. Add URL pattern in `api/urls.py`
5. Register in `api/admin.py`
6. Run migrations

### Adding New Technologies
Use admin panel or:
```python
Technology.objects.create(
    name="Django",
    icon_class="SiDjango",
    color="text-green-600",
    category="backend",
    proficiency=85
)
```

## 🐛 Troubleshooting

See `QUICKSTART.md` for common issues and solutions.

## 📄 License

MIT License - Customize as needed for your portfolio.
