from django.db import models
from django.core.validators import URLValidator
import uuid


class Project(models.Model):
    """Model for portfolio projects"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    description = models.TextField()
    long_description = models.TextField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    github_url = models.URLField(validators=[URLValidator()])
    demo_url = models.URLField(validators=[URLValidator()])
    category = models.CharField(max_length=100)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    order = models.PositiveIntegerField(default=0, help_text="Display order")

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.name


class Technology(models.Model):
    """Model for technologies/skills"""
    name = models.CharField(max_length=100, unique=True)
    icon_class = models.CharField(max_length=100, help_text="CSS class or React icon name")
    color = models.CharField(max_length=50, help_text="Color for the technology (e.g., text-blue-500)")
    category = models.CharField(max_length=50, choices=[
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('tool', 'Tool'),
        ('framework', 'Framework'),
        ('language', 'Language'),
    ])
    proficiency = models.IntegerField(default=80, help_text="Proficiency level (0-100)")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']
        verbose_name_plural = 'Technologies'

    def __str__(self):
        return self.name


class ProjectTechnology(models.Model):
    """Many-to-many relationship between projects and technologies"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='technologies')
    technology = models.ForeignKey(Technology, on_delete=models.CASCADE, related_name='projects')
    
    class Meta:
        unique_together = ['project', 'technology']
        verbose_name_plural = 'Project Technologies'

    def __str__(self):
        return f"{self.project.name} - {self.technology.name}"


class Experience(models.Model):
    """Model for work experience"""
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True, help_text="Leave blank if current")
    location = models.CharField(max_length=200, blank=True)
    company_url = models.URLField(blank=True)
    is_current = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-start_date', 'order']

    def __str__(self):
        return f"{self.position} at {self.company}"

    @property
    def duration(self):
        """Calculate duration of experience"""
        from datetime import date
        end = self.end_date or date.today()
        years = end.year - self.start_date.year
        months = end.month - self.start_date.month
        
        if months < 0:
            years -= 1
            months += 12
            
        if years > 0 and months > 0:
            return f"{years}y {months}m"
        elif years > 0:
            return f"{years}y"
        elif months > 0:
            return f"{months}m"
        else:
            return "< 1m"


class ContactSubmission(models.Model):
    """Model for contact form submissions"""
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=300)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.subject}"
